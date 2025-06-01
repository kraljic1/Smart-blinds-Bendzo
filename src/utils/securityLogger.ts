/**
 * Security Logger - Handles security incident logging and monitoring
 * Tracks security events, failed authentication attempts, and suspicious activities
 */

export interface SecurityIncident {
  id: string;
  timestamp: Date;
  type: SecurityIncidentType;
  severity: SecuritySeverity;
  description: string;
  userAgent?: string;
  ipAddress?: string;
  userId?: string;
  metadata?: Record<string, unknown>;
  resolved: boolean;
  resolvedAt?: Date;
  resolvedBy?: string;
}

export enum SecurityIncidentType {
  FAILED_LOGIN = 'failed_login',
  SUSPICIOUS_ACTIVITY = 'suspicious_activity',
  UNAUTHORIZED_ACCESS = 'unauthorized_access',
  DATA_BREACH_ATTEMPT = 'data_breach_attempt',
  MALICIOUS_REQUEST = 'malicious_request',
  RATE_LIMIT_EXCEEDED = 'rate_limit_exceeded',
  INVALID_TOKEN = 'invalid_token',
  PERMISSION_VIOLATION = 'permission_violation',
  SECURITY_SCAN_DETECTED = 'security_scan_detected',
  UNUSUAL_BEHAVIOR = 'unusual_behavior'
}

export enum SecuritySeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

class SecurityLogger {
  private incidents: SecurityIncident[] = [];
  private readonly maxIncidents = 1000; // Keep last 1000 incidents in memory
  private alertThresholds = {
    [SecuritySeverity.LOW]: 10,
    [SecuritySeverity.MEDIUM]: 5,
    [SecuritySeverity.HIGH]: 3,
    [SecuritySeverity.CRITICAL]: 1
  };

  /**
   * Log a security incident
   */
  logIncident(
    type: SecurityIncidentType,
    severity: SecuritySeverity,
    description: string,
    metadata?: Record<string, unknown>
  ): void {
    const incident: SecurityIncident = {
      id: this.generateIncidentId(),
      timestamp: new Date(),
      type,
      severity,
      description,
      userAgent: this.getUserAgent(),
      ipAddress: this.getClientIP(),
      metadata,
      resolved: false
    };

    this.incidents.unshift(incident);
    
    // Keep only the most recent incidents
    if (this.incidents.length > this.maxIncidents) {
      this.incidents = this.incidents.slice(0, this.maxIncidents);
    }

    // Log to console in development
    if (import.meta.env.DEV) {
      console.warn(`[SECURITY] ${severity.toUpperCase()}: ${description}`, incident);
    }

    // Send to monitoring service in production
    if (import.meta.env.PROD) {
      this.sendToMonitoringService(incident);
    }

    // Check if alert threshold is reached
    this.checkAlertThresholds(severity);
  }

  /**
   * Log failed authentication attempt
   */
  logFailedAuth(email?: string, reason?: string): void {
    this.logIncident(
      SecurityIncidentType.FAILED_LOGIN,
      SecuritySeverity.MEDIUM,
      `Failed authentication attempt${email ? ` for ${email}` : ''}`,
      { email, reason }
    );
  }

  /**
   * Log suspicious activity
   */
  logSuspiciousActivity(activity: string, metadata?: Record<string, unknown>): void {
    this.logIncident(
      SecurityIncidentType.SUSPICIOUS_ACTIVITY,
      SecuritySeverity.HIGH,
      `Suspicious activity detected: ${activity}`,
      metadata
    );
  }

  /**
   * Log unauthorized access attempt
   */
  logUnauthorizedAccess(resource: string, userId?: string): void {
    this.logIncident(
      SecurityIncidentType.UNAUTHORIZED_ACCESS,
      SecuritySeverity.HIGH,
      `Unauthorized access attempt to ${resource}`,
      { resource, userId }
    );
  }

  /**
   * Log rate limit exceeded
   */
  logRateLimitExceeded(endpoint: string, limit: number): void {
    this.logIncident(
      SecurityIncidentType.RATE_LIMIT_EXCEEDED,
      SecuritySeverity.MEDIUM,
      `Rate limit exceeded for ${endpoint} (limit: ${limit})`,
      { endpoint, limit }
    );
  }

  /**
   * Log malicious request
   */
  logMaliciousRequest(requestType: string, payload?: unknown): void {
    this.logIncident(
      SecurityIncidentType.MALICIOUS_REQUEST,
      SecuritySeverity.HIGH,
      `Malicious request detected: ${requestType}`,
      { requestType, payload: this.sanitizePayload(payload) }
    );
  }

  /**
   * Get recent incidents
   */
  getRecentIncidents(limit = 50): SecurityIncident[] {
    return this.incidents.slice(0, limit);
  }

  /**
   * Get incidents by type
   */
  getIncidentsByType(type: SecurityIncidentType): SecurityIncident[] {
    return this.incidents.filter(incident => incident.type === type);
  }

  /**
   * Get incidents by severity
   */
  getIncidentsBySeverity(severity: SecuritySeverity): SecurityIncident[] {
    return this.incidents.filter(incident => incident.severity === severity);
  }

  /**
   * Get unresolved incidents
   */
  getUnresolvedIncidents(): SecurityIncident[] {
    return this.incidents.filter(incident => !incident.resolved);
  }

  /**
   * Resolve an incident
   */
  resolveIncident(incidentId: string, resolvedBy?: string): boolean {
    const incident = this.incidents.find(i => i.id === incidentId);
    if (incident) {
      incident.resolved = true;
      incident.resolvedAt = new Date();
      incident.resolvedBy = resolvedBy;
      return true;
    }
    return false;
  }

  /**
   * Get security statistics
   */
  getSecurityStats(): {
    totalIncidents: number;
    unresolvedIncidents: number;
    incidentsByType: Record<string, number>;
    incidentsBySeverity: Record<string, number>;
    recentActivity: SecurityIncident[];
  } {
    const incidentsByType: Record<string, number> = {};
    const incidentsBySeverity: Record<string, number> = {};

    this.incidents.forEach(incident => {
      incidentsByType[incident.type] = (incidentsByType[incident.type] || 0) + 1;
      incidentsBySeverity[incident.severity] = (incidentsBySeverity[incident.severity] || 0) + 1;
    });

    return {
      totalIncidents: this.incidents.length,
      unresolvedIncidents: this.getUnresolvedIncidents().length,
      incidentsByType,
      incidentsBySeverity,
      recentActivity: this.getRecentIncidents(10)
    };
  }

  private generateIncidentId(): string {
    return `sec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private getUserAgent(): string {
    return typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown';
  }

  private getClientIP(): string {
    // In a real application, this would be obtained from the server
    return 'client-side-unknown';
  }

  private sanitizePayload(payload: unknown): unknown {
    if (!payload || typeof payload !== 'object') return payload;
    
    // Remove sensitive information from payload
    const sanitized = { ...payload as Record<string, unknown> };
    const sensitiveKeys = ['password', 'token', 'secret', 'key', 'auth'];
    
    sensitiveKeys.forEach(key => {
      if (sanitized[key]) {
        sanitized[key] = '[REDACTED]';
      }
    });
    
    return sanitized;
  }

  private async sendToMonitoringService(incident: SecurityIncident): Promise<void> {
    try {
      // In production, send to your monitoring service (e.g., Supabase, external logging service)
      // For now, we'll just log to console
      console.error('[SECURITY INCIDENT]', {
        id: incident.id,
        type: incident.type,
        severity: incident.severity,
        timestamp: incident.timestamp,
        description: incident.description
      });

      // Example: Send to Supabase or external monitoring service
      // await fetch('/api/security/incidents', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(incident)
      // });
    } catch (error) {
      console.error('Failed to send security incident to monitoring service:', error);
    }
  }

  private checkAlertThresholds(severity: SecuritySeverity): void {
    const recentIncidents = this.incidents.filter(
      incident => 
        incident.severity === severity && 
        Date.now() - incident.timestamp.getTime() < 60000 // Last minute
    );

    if (recentIncidents.length >= this.alertThresholds[severity]) {
      this.triggerAlert(severity, recentIncidents.length);
    }
  }

  private triggerAlert(severity: SecuritySeverity, count: number): void {
    const alertMessage = `SECURITY ALERT: ${count} ${severity} incidents in the last minute`;
    
    if (import.meta.env.DEV) {
      console.error(alertMessage);
    }

    // In production, send alert to monitoring system, email, Slack, etc.
    if (import.meta.env.PROD) {
      this.sendAlert(alertMessage, severity);
    }
  }

  private async sendAlert(message: string, severity: SecuritySeverity): Promise<void> {
    try {
      // Send alert to monitoring system
      // This could be email, Slack, PagerDuty, etc.
      console.error('[SECURITY ALERT]', { message, severity });
      
      // Example: Send to alerting service
      // await fetch('/api/security/alerts', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ message, severity, timestamp: new Date() })
      // });
    } catch (error) {
      console.error('Failed to send security alert:', error);
    }
  }
}

// Export singleton instance
export const securityLogger = new SecurityLogger();

// Export utility functions for common security events
export const logSecurityEvent = {
  failedAuth: (email?: string, reason?: string) => 
    securityLogger.logFailedAuth(email, reason),
  
  suspiciousActivity: (activity: string, metadata?: Record<string, unknown>) => 
    securityLogger.logSuspiciousActivity(activity, metadata),
  
  unauthorizedAccess: (resource: string, userId?: string) => 
    securityLogger.logUnauthorizedAccess(resource, userId),
  
  rateLimitExceeded: (endpoint: string, limit: number) => 
    securityLogger.logRateLimitExceeded(endpoint, limit),
  
  maliciousRequest: (requestType: string, payload?: unknown) => 
    securityLogger.logMaliciousRequest(requestType, payload)
};

export default securityLogger; 