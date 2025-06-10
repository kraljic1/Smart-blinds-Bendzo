/**
 * Security Incident Handlers
 * Handles logging and response to security incidents
 */

import { SecurityIncident } from './incidentTypes';

export class SecurityIncidentHandlers {
  
  logIncident(incident: SecurityIncident): void {
    const logLevel = this.getLogLevel(incident.severity);
    const message = `Security Incident [${incident.type}]: ${JSON.stringify(incident.details)}`;
    
    if (import.meta.env.DEV) {
      console[logLevel](`🚨 ${message}`, incident);
    }

    // In production, send to monitoring service
    if (import.meta.env.PROD && incident.severity === 'critical') {
      this.sendToMonitoringService(incident);
    }
  }

  autoRespond(incident: SecurityIncident): void {
    switch (incident.severity) {
      case 'critical':
        this.handleCriticalIncident(incident);
        break;
      case 'high':
        this.handleHighSeverityIncident(incident);
        break;
      case 'medium':
        this.handleMediumSeverityIncident(incident);
        break;
      case 'low':
        // Log only, no immediate action needed
        break;
    }
  }

  private handleCriticalIncident(incident: SecurityIncident): void {
    // Immediate response for critical incidents
    console.error('🚨 CRITICAL SECURITY INCIDENT:', incident);
    
    // Could implement:
    // - Temporary user blocking
    // - Alert administrators
    // - Increase monitoring
    // - Trigger security protocols
  }

  private handleHighSeverityIncident(incident: SecurityIncident): void {
    console.warn('⚠️ HIGH SEVERITY SECURITY INCIDENT:', incident);
    
    // Could implement:
    // - Enhanced monitoring for this user/IP
    // - Additional validation requirements
    // - Rate limit adjustments
  }

  private handleMediumSeverityIncident(incident: SecurityIncident): void {
    console.warn('⚠️ MEDIUM SEVERITY SECURITY INCIDENT:', incident);
    
    // Could implement:
    // - Log for review
    // - Pattern analysis
    // - Preventive measures
  }

  private getLogLevel(severity: SecurityIncident['severity']): 'log' | 'warn' | 'error' {
    switch (severity) {
      case 'critical':
      case 'high':
        return 'error';
      case 'medium':
        return 'warn';
      case 'low':
      default:
        return 'log';
    }
  }

  private async sendToMonitoringService(incident: SecurityIncident): Promise<void> {
    try {
      const webhookUrl = import.meta.env.VITE_SECURITY_WEBHOOK_URL;
      if (!webhookUrl) return;

      await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          alert: 'Security Incident',
          severity: incident.severity,
          type: incident.type,
          timestamp: incident.timestamp.toISOString(),
          details: incident.details
        })
      });
    } catch (error) {
      console.error('Failed to send security incident to monitoring service:', error);
    }
  }
} 