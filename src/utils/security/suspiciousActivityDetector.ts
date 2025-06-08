import { securityLogger, SecurityIncidentType } from '../securityLogger';

export class SuspiciousActivityDetector {
  private suspiciousPatterns = new Map<string, number>();

  /**
   * Monitor for suspicious patterns
   */
  monitorPatterns(logSuspiciousActivity: (activity: string, metadata?: Record<string, unknown>) => void): void {
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
  }

  /**
   * Track failed authentication patterns
   */
  trackFailedAuth(email: string, logSuspiciousActivity: (activity: string, metadata?: Record<string, unknown>) => void): void {
    const key = `failed_auth_${email}`;
    const current = this.suspiciousPatterns.get(key) || 0;
    this.suspiciousPatterns.set(key, current + 1);

    // Alert if too many failures for same email
    if (current + 1 >= 3) {
      logSuspiciousActivity(`Repeated failed authentication for ${email}`, {
        email,
        attempts: current + 1
      });
    }
  }

  /**
   * Track unauthorized access patterns
   */
  trackUnauthorizedAccess(userId: string, resource: string, logSuspiciousActivity: (activity: string, metadata?: Record<string, unknown>) => void): void {
    const key = `unauthorized_${userId}`;
    const current = this.suspiciousPatterns.get(key) || 0;
    this.suspiciousPatterns.set(key, current + 1);

    if (current + 1 >= 2) {
      logSuspiciousActivity(`User ${userId} attempting multiple unauthorized accesses`, {
        userId,
        resource,
        attempts: current + 1
      });
    }
  }

  /**
   * Get suspicious activity stats
   */
  getStats(): Record<string, number> {
    return Object.fromEntries(this.suspiciousPatterns);
  }

  /**
   * Clear old patterns
   */
  cleanup(): void {
    // Could implement time-based cleanup if needed
    // For now, patterns persist for the session
  }
} 