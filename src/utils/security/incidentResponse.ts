/**
 * Security Incident Response System
 * Handles detection, logging, and response to security incidents
 */

import { SecurityIncident, SecurityIncidentType, UserContext } from './incidentTypes';
import { SecurityIncidentHandlers } from './incidentHandlers';

class SecurityIncidentManager {
  private incidents: SecurityIncident[] = [];
  private readonly maxIncidents = 1000;
  private handlers = new SecurityIncidentHandlers();

  /**
   * Report a security incident
   */
  reportIncident(
    type: SecurityIncidentType,
    severity: SecurityIncident['severity'],
    details: Record<string, unknown>,
    userContext?: UserContext
  ): string {
    const incident: SecurityIncident = {
      id: this.generateIncidentId(),
      type,
      severity,
      timestamp: new Date(),
      details,
      userAgent: userContext?.userAgent,
      ipAddress: userContext?.ipAddress,
      userId: userContext?.userId,
      resolved: false
    };

    this.incidents.push(incident);
    this.trimIncidents();
    
    // Log incident
    this.handlers.logIncident(incident);
    
    // Auto-respond based on severity
    this.handlers.autoRespond(incident);
    
    return incident.id;
  }

  /**
   * Get incidents by type or severity
   */
  getIncidents(filter?: {
    type?: SecurityIncidentType;
    severity?: SecurityIncident['severity'];
    resolved?: boolean;
    since?: Date;
  }): SecurityIncident[] {
    let filtered = [...this.incidents];

    if (filter?.type) {
      filtered = filtered.filter(i => i.type === filter.type);
    }
    if (filter?.severity) {
      filtered = filtered.filter(i => i.severity === filter.severity);
    }
    if (filter?.resolved !== undefined) {
      filtered = filtered.filter(i => i.resolved === filter.resolved);
    }
    if (filter?.since) {
      filtered = filtered.filter(i => i.timestamp >= filter.since!);
    }

    return filtered.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  /**
   * Mark incident as resolved
   */
  resolveIncident(incidentId: string): boolean {
    const incident = this.incidents.find(i => i.id === incidentId);
    if (incident) {
      incident.resolved = true;
      return true;
    }
    return false;
  }

  /**
   * Get security statistics
   */
  getSecurityStats(): {
    totalIncidents: number;
    incidentsByType: Record<string, number>;
    incidentsBySeverity: Record<string, number>;
    recentIncidents: number;
    resolvedIncidents: number;
  } {
    const now = new Date();
    const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const incidentsByType: Record<string, number> = {};
    const incidentsBySeverity: Record<string, number> = {};

    this.incidents.forEach(incident => {
      incidentsByType[incident.type] = (incidentsByType[incident.type] || 0) + 1;
      incidentsBySeverity[incident.severity] = (incidentsBySeverity[incident.severity] || 0) + 1;
    });

    return {
      totalIncidents: this.incidents.length,
      incidentsByType,
      incidentsBySeverity,
      recentIncidents: this.incidents.filter(i => i.timestamp >= last24Hours).length,
      resolvedIncidents: this.incidents.filter(i => i.resolved).length
    };
  }

  private generateIncidentId(): string {
    return `SEC_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private trimIncidents(): void {
    if (this.incidents.length > this.maxIncidents) {
      // Keep most recent incidents
      this.incidents = this.incidents
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
        .slice(0, this.maxIncidents);
    }
  }
}

// Export singleton instance
export const securityIncidentManager = new SecurityIncidentManager();

// Convenience functions for common incident types
export const reportSecurityIncident = {
  rateLimitExceeded: (endpoint: string, limit: number, userContext?: UserContext) =>
    securityIncidentManager.reportIncident(
      SecurityIncidentType.RATE_LIMIT_EXCEEDED,
      'medium',
      { endpoint, limit },
      userContext
    ),

  suspiciousInput: (input: string, field: string, userContext?: UserContext) =>
    securityIncidentManager.reportIncident(
      SecurityIncidentType.SUSPICIOUS_INPUT,
      'high',
      { input: input.substring(0, 100), field },
      userContext
    ),

  authenticationFailure: (email: string, reason: string, userContext?: UserContext) =>
    securityIncidentManager.reportIncident(
      SecurityIncidentType.AUTHENTICATION_FAILURE,
      'medium',
      { email, reason },
      userContext
    ),

  paymentFraudAttempt: (details: Record<string, unknown>, userContext?: UserContext) =>
    securityIncidentManager.reportIncident(
      SecurityIncidentType.PAYMENT_FRAUD_ATTEMPT,
      'critical',
      details,
      userContext
    ),

  xssAttempt: (input: string, field: string, userContext?: UserContext) =>
    securityIncidentManager.reportIncident(
      SecurityIncidentType.XSS_ATTEMPT,
      'high',
      { input: input.substring(0, 100), field },
      userContext
    ),

  sqlInjectionAttempt: (input: string, field: string, userContext?: UserContext) =>
    securityIncidentManager.reportIncident(
      SecurityIncidentType.SQL_INJECTION_ATTEMPT,
      'critical',
      { input: input.substring(0, 100), field },
      userContext
    )
}; 