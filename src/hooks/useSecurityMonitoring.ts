import { useEffect, useCallback, useRef } from 'react';
import { logSecurityEvent, securityLogger, SecurityIncidentType } from '../utils/securityLogger';
import { RateLimitManager } from '../utils/security/rateLimitUtils';
import { SuspiciousActivityDetector } from '../utils/security/suspiciousActivityDetector';

interface SecurityMonitoringOptions {
  enableRateLimitMonitoring?: boolean;
  enableSuspiciousActivityDetection?: boolean;
  enableUnauthorizedAccessDetection?: boolean;
  rateLimitThreshold?: number;
  rateLimitWindow?: number; // in milliseconds
}

interface SecurityMonitoringHook {
  logFailedAuth: (email?: string, reason?: string) => void;
  logSuspiciousActivity: (activity: string, metadata?: Record<string, unknown>) => void;
  logUnauthorizedAccess: (resource: string, userId?: string) => void;
  logMaliciousRequest: (requestType: string, payload?: unknown) => void;
  checkRateLimit: (endpoint: string) => boolean;
  getSecurityStats: () => Record<string, unknown>;
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

  const rateLimitManager = useRef(new RateLimitManager(rateLimitThreshold, rateLimitWindow));
  const activityDetector = useRef(new SuspiciousActivityDetector());

  /**
   * Log suspicious activity
   */
  const logSuspiciousActivity = useCallback((activity: string, metadata?: Record<string, unknown>) => {
    logSecurityEvent.suspiciousActivity(activity, metadata);
  }, []);

  // Clean up old rate limit data periodically
  useEffect(() => {
    if (!enableRateLimitMonitoring) return;

    const cleanup = setInterval(() => {
      rateLimitManager.current.cleanup();
    }, rateLimitWindow);

    return () => clearInterval(cleanup);
  }, [enableRateLimitMonitoring, rateLimitWindow]);

  // Monitor for suspicious patterns
  useEffect(() => {
    if (!enableSuspiciousActivityDetection) return;

    const interval = setInterval(() => {
      activityDetector.current.monitorPatterns(logSuspiciousActivity);
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [enableSuspiciousActivityDetection, logSuspiciousActivity]);

  /**
   * Log failed authentication attempt
   */
  const logFailedAuth = useCallback((email?: string, reason?: string) => {
    logSecurityEvent.failedAuth(email, reason);

    // Track suspicious patterns
    if (email && enableSuspiciousActivityDetection) {
      activityDetector.current.trackFailedAuth(email, logSuspiciousActivity);
    }
  }, [enableSuspiciousActivityDetection, logSuspiciousActivity]);

  /**
   * Log unauthorized access attempt
   */
  const logUnauthorizedAccess = useCallback((resource: string, userId?: string) => {
    logSecurityEvent.unauthorizedAccess(resource, userId);

    // Additional monitoring for unauthorized access patterns
    if (enableUnauthorizedAccessDetection && userId) {
      activityDetector.current.trackUnauthorizedAccess(userId, resource, logSuspiciousActivity);
    }
  }, [enableUnauthorizedAccessDetection, logSuspiciousActivity]);

  /**
   * Log malicious request
   */
  const logMaliciousRequest = useCallback((requestType: string, payload?: unknown) => {
    logSecurityEvent.maliciousRequest(requestType, payload);
  }, []);

  /**
   * Check and enforce rate limits
   */
  const checkRateLimit = useCallback((endpoint: string): boolean => {
    if (!enableRateLimitMonitoring) return true;
    return rateLimitManager.current.checkRateLimit(endpoint);
  }, [enableRateLimitMonitoring]);

  /**
   * Get security statistics
   */
  const getSecurityStats = useCallback(() => {
    return {
      ...securityLogger.getSecurityStats(),
      rateLimits: rateLimitManager.current.getStats(),
      suspiciousPatterns: activityDetector.current.getStats()
    };
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

export default useSecurityMonitoring; 