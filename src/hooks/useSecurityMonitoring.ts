import React, { useEffect, useCallback, useRef } from 'react';
import { logSecurityEvent, securityLogger, SecurityIncidentType, SecuritySeverity } from '../utils/securityLogger';

interface SecurityMonitoringOptions {
  enableRateLimitMonitoring?: boolean;
  enableSuspiciousActivityDetection?: boolean;
  enableUnauthorizedAccessDetection?: boolean;
  rateLimitThreshold?: number;
  rateLimitWindow?: number; // in milliseconds
}

interface SecurityMonitoringHook {
  logFailedAuth: (email?: string, reason?: string) => void;
  logSuspiciousActivity: (activity: string, metadata?: Record<string, any>) => void;
  logUnauthorizedAccess: (resource: string, userId?: string) => void;
  logMaliciousRequest: (requestType: string, payload?: any) => void;
  checkRateLimit: (endpoint: string) => boolean;
  getSecurityStats: () => any;
  isSecurityIncident: (type: SecurityIncidentType) => boolean;
}

/**
 * Custom hook for security monitoring in React components
 * Provides utilities for logging security events and monitoring suspicious activities
 */
export const useSecurityMonitoring = (
  options: SecurityMonitoringOptions = {}
): SecurityMonitoringHook => {
  const {
    enableRateLimitMonitoring = true,
    enableSuspiciousActivityDetection = true,
    enableUnauthorizedAccessDetection = true,
    rateLimitThreshold = 10,
    rateLimitWindow = 60000 // 1 minute
  } = options;

  const requestCounts = useRef<Map<string, { count: number; firstRequest: number }>>(new Map());
  const suspiciousPatterns = useRef<Map<string, number>>(new Map());

  // Clean up old rate limit data periodically
  useEffect(() => {
    if (!enableRateLimitMonitoring) return;

    const cleanup = setInterval(() => {
      const now = Date.now();
      const entries = Array.from(requestCounts.current.entries());
      
      entries.forEach(([key, data]) => {
        if (now - data.firstRequest > rateLimitWindow) {
          requestCounts.current.delete(key);
        }
      });
    }, rateLimitWindow);

    return () => clearInterval(cleanup);
  }, [enableRateLimitMonitoring, rateLimitWindow]);

  // Monitor for suspicious patterns
  useEffect(() => {
    if (!enableSuspiciousActivityDetection) return;

    const monitorPatterns = () => {
      // Check for rapid consecutive failed attempts
      const failedLogins = securityLogger.getIncidentsByType(SecurityIncidentType.FAILED_LOGIN);
      const recentFailures = failedLogins.filter(
        incident => Date.now() - incident.timestamp.getTime() < 300000 // 5 minutes
      );

      if (recentFailures.length >= 5) {
        logSuspiciousActivity('Multiple failed login attempts detected', {
          count: recentFailures.length,
          timeWindow: '5 minutes'
        });
      }

      // Check for unusual access patterns
      const unauthorizedAccess = securityLogger.getIncidentsByType(SecurityIncidentType.UNAUTHORIZED_ACCESS);
      const recentUnauthorized = unauthorizedAccess.filter(
        incident => Date.now() - incident.timestamp.getTime() < 600000 // 10 minutes
      );

      if (recentUnauthorized.length >= 3) {
        logSuspiciousActivity('Multiple unauthorized access attempts detected', {
          count: recentUnauthorized.length,
          timeWindow: '10 minutes'
        });
      }
    };

    const interval = setInterval(monitorPatterns, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, [enableSuspiciousActivityDetection]);

  /**
   * Log failed authentication attempt
   */
  const logFailedAuth = useCallback((email?: string, reason?: string) => {
    logSecurityEvent.failedAuth(email, reason);

    // Track suspicious patterns
    if (email && enableSuspiciousActivityDetection) {
      const key = `failed_auth_${email}`;
      const current = suspiciousPatterns.current.get(key) || 0;
      suspiciousPatterns.current.set(key, current + 1);

      // Alert if too many failures for same email
      if (current + 1 >= 3) {
        logSuspiciousActivity(`Repeated failed authentication for ${email}`, {
          email,
          attempts: current + 1
        });
      }
    }
  }, [enableSuspiciousActivityDetection]);

  /**
   * Log suspicious activity
   */
  const logSuspiciousActivity = useCallback((activity: string, metadata?: Record<string, any>) => {
    logSecurityEvent.suspiciousActivity(activity, metadata);
  }, []);

  /**
   * Log unauthorized access attempt
   */
  const logUnauthorizedAccess = useCallback((resource: string, userId?: string) => {
    logSecurityEvent.unauthorizedAccess(resource, userId);

    // Additional monitoring for unauthorized access patterns
    if (enableUnauthorizedAccessDetection && userId) {
      const key = `unauthorized_${userId}`;
      const current = suspiciousPatterns.current.get(key) || 0;
      suspiciousPatterns.current.set(key, current + 1);

      if (current + 1 >= 2) {
        logSuspiciousActivity(`User ${userId} attempting multiple unauthorized accesses`, {
          userId,
          resource,
          attempts: current + 1
        });
      }
    }
  }, [enableUnauthorizedAccessDetection]);

  /**
   * Log malicious request
   */
  const logMaliciousRequest = useCallback((requestType: string, payload?: any) => {
    logSecurityEvent.maliciousRequest(requestType, payload);
  }, []);

  /**
   * Check and enforce rate limits
   */
  const checkRateLimit = useCallback((endpoint: string): boolean => {
    if (!enableRateLimitMonitoring) return true;

    const now = Date.now();
    const key = `rate_limit_${endpoint}`;
    const current = requestCounts.current.get(key);

    if (!current) {
      requestCounts.current.set(key, { count: 1, firstRequest: now });
      return true;
    }

    // Reset if window has passed
    if (now - current.firstRequest > rateLimitWindow) {
      requestCounts.current.set(key, { count: 1, firstRequest: now });
      return true;
    }

    // Increment count
    current.count++;

    // Check if limit exceeded
    if (current.count > rateLimitThreshold) {
      logSecurityEvent.rateLimitExceeded(endpoint, rateLimitThreshold);
      return false;
    }

    return true;
  }, [enableRateLimitMonitoring, rateLimitThreshold, rateLimitWindow]);

  /**
   * Get security statistics
   */
  const getSecurityStats = useCallback(() => {
    return securityLogger.getSecurityStats();
  }, []);

  /**
   * Check if there are recent incidents of a specific type
   */
  const isSecurityIncident = useCallback((type: SecurityIncidentType): boolean => {
    const incidents = securityLogger.getIncidentsByType(type);
    const recentIncidents = incidents.filter(
      incident => Date.now() - incident.timestamp.getTime() < 300000 // 5 minutes
    );
    return recentIncidents.length > 0;
  }, []);

  return {
    logFailedAuth,
    logSuspiciousActivity,
    logUnauthorizedAccess,
    logMaliciousRequest,
    checkRateLimit,
    getSecurityStats,
    isSecurityIncident
  };
};

/**
 * Higher-order component for automatic security monitoring
 */
export function withSecurityMonitoring<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options: SecurityMonitoringOptions = {}
): React.ComponentType<P> {
  const SecurityMonitoredComponent = (props: P) => {
    const security = useSecurityMonitoring(options);

    // Monitor component mount/unmount for suspicious patterns
    useEffect(() => {
      const componentName = WrappedComponent.displayName || WrappedComponent.name || 'Unknown';
      
      // Log component access for sensitive components
      if (componentName.includes('Admin') || componentName.includes('Payment')) {
        security.logSuspiciousActivity(`Sensitive component accessed: ${componentName}`, {
          component: componentName,
          timestamp: new Date().toISOString()
        });
      }

      return () => {
        // Component unmount - could be used for session tracking
      };
    }, [security]);

    return React.createElement(WrappedComponent, props);
  };

  SecurityMonitoredComponent.displayName = `withSecurityMonitoring(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  
  return SecurityMonitoredComponent;
}

/**
 * Security monitoring context for error boundaries
 */
export const useSecurityErrorHandler = () => {
  const security = useSecurityMonitoring();

  return useCallback((error: Error, errorInfo: any) => {
    // Check if error might be security-related
    const securityKeywords = ['unauthorized', 'forbidden', 'token', 'auth', 'permission'];
    const isSecurityError = securityKeywords.some(keyword => 
      error.message.toLowerCase().includes(keyword) ||
      error.stack?.toLowerCase().includes(keyword)
    );

    if (isSecurityError) {
      security.logSuspiciousActivity('Security-related error detected', {
        error: error.message,
        stack: error.stack,
        errorInfo
      });
    }
  }, [security]);
};

export default useSecurityMonitoring; 