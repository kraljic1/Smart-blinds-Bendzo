/**
 * Security Logger - Handles security incident logging and monitoring
 * Orchestrates incident management, alerting, and monitoring services
 */

import { SecurityIncidentType, SecuritySeverity } from '../types/security';
import type { 
 SecurityIncident, 
 SecurityStats, 
 SecurityLoggerConfig 
} from '../types/security';
import { IncidentManager } from './security/incidentManager';
import { AlertSystem } from './security/alertSystem';
import { MonitoringService } from './security/monitoringService';
import { 
 createSecurityIncident, 
 validateIncidentData 
} from './security/securityUtils';

class SecurityLogger {
 private incidentManager: IncidentManager;
 private alertSystem: AlertSystem;
 private monitoringService: MonitoringService;

 constructor(config: SecurityLoggerConfig = {}) {
 this.incidentManager = new IncidentManager(config.maxIncidents);
 this.alertSystem = new AlertSystem(config.alertThresholds);
 this.monitoringService = new MonitoringService();
 }

 /**
 * Log a security incident
 */
 logIncident(
 type: SecurityIncidentType,
 severity: SecuritySeverity,
 description: string,
 metadata?: Record<string, unknown>
 ): void {
 const incident = createSecurityIncident(type, severity, description, metadata);
 
 if (!validateIncidentData(incident)) {
 console.error('Invalid incident data provided');
 return;
 }

 // Store the incident
 this.incidentManager.addIncident(incident);

 // Send to monitoring service
 this.monitoringService.sendIncident(incident);

 // Check alert thresholds
 this.alertSystem.checkAlertThresholds(severity, this.incidentManager);
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
 { requestType, payload }
 );
 }

 /**
 * Get recent incidents
 */
 getRecentIncidents(limit = 50): SecurityIncident[] {
 return this.incidentManager.getRecentIncidents(limit);
 }

 /**
 * Get incidents by type
 */
 getIncidentsByType(type: SecurityIncidentType): SecurityIncident[] {
 return this.incidentManager.getIncidentsByType(type);
 }

 /**
 * Get incidents by severity
 */
 getIncidentsBySeverity(severity: SecuritySeverity): SecurityIncident[] {
 return this.incidentManager.getIncidentsBySeverity(severity);
 }

 /**
 * Get unresolved incidents
 */
 getUnresolvedIncidents(): SecurityIncident[] {
 return this.incidentManager.getUnresolvedIncidents();
 }

 /**
 * Resolve an incident
 */
 resolveIncident(incidentId: string, resolvedBy?: string): boolean {
 return this.incidentManager.resolveIncident(incidentId, resolvedBy);
 }

 /**
 * Get security statistics
 */
 getSecurityStats(): SecurityStats {
 return this.incidentManager.getSecurityStats();
 }

 /**
 * Update alert thresholds
 */
 updateAlertThresholds(thresholds: Partial<SecurityLoggerConfig['alertThresholds']>): void {
 if (thresholds) {
 this.alertSystem.updateThresholds(thresholds);
 }
 }

 /**
 * Test monitoring service connectivity
 */
 async testMonitoringService(): Promise<boolean> {
 return this.monitoringService.testConnectivity();
 }

 /**
 * Clear all incidents (for testing)
 */
 clearIncidents(): void {
 this.incidentManager.clearIncidents();
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

// Re-export types and enums for convenience
export { SecurityIncidentType, SecuritySeverity } from '../types/security';
export type { SecurityIncident, SecurityStats } from '../types/security';

export default securityLogger; 