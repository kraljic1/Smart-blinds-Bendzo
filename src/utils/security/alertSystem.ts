/**
 * Security Alert System
 * Monitors incident thresholds and triggers alerts when limits are exceeded
 */

import { SecuritySeverity } from '../../types/security';
import type { AlertThresholds } from '../../types/security';
import type { IncidentManager } from './incidentManager';

export class AlertSystem {
  private alertThresholds: AlertThresholds;

  constructor(customThresholds?: Partial<AlertThresholds>) {
    this.alertThresholds = {
      [SecuritySeverity.LOW]: 10,
      [SecuritySeverity.MEDIUM]: 5,
      [SecuritySeverity.HIGH]: 3,
      [SecuritySeverity.CRITICAL]: 1,
      ...customThresholds
    };
  }

  /**
   * Check if alert thresholds are exceeded for a given severity
   */
  checkAlertThresholds(
    severity: SecuritySeverity, 
    incidentManager: IncidentManager,
    timeWindowMs = 60000
  ): boolean {
    const recentIncidents = incidentManager.getRecentIncidentsBySeverity(severity, timeWindowMs);
    const threshold = this.alertThresholds[severity];
    
    if (recentIncidents.length >= threshold) {
      this.triggerAlert(severity, recentIncidents.length, threshold);
      return true;
    }
    
    return false;
  }

  /**
   * Trigger an alert for threshold breach
   */
  private triggerAlert(severity: SecuritySeverity, count: number, threshold: number): void {
    const alertMessage = `SECURITY ALERT: ${count} ${severity} incidents in the last minute (threshold: ${threshold})`;
    
    if (import.meta.env.DEV) {
      console.error(alertMessage);
    }

    // In production, send alert to monitoring system
    if (import.meta.env.PROD) {
      this.sendAlert(alertMessage, severity);
    }
  }

  /**
   * Send alert to external monitoring system
   */
  private async sendAlert(message: string, severity: SecuritySeverity): Promise<void> {
    try {
      // Send alert to monitoring system
      // This could be email, Slack, PagerDuty, etc.
      console.error('[SECURITY ALERT]', { message, severity, timestamp: new Date() });
      
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

  /**
   * Update alert thresholds
   */
  updateThresholds(newThresholds: Partial<AlertThresholds>): void {
    this.alertThresholds = { ...this.alertThresholds, ...newThresholds };
  }

  /**
   * Get current alert thresholds
   */
  getThresholds(): AlertThresholds {
    return { ...this.alertThresholds };
  }

  /**
   * Check if a severity level would trigger an alert with given count
   */
  wouldTriggerAlert(severity: SecuritySeverity, count: number): boolean {
    return count >= this.alertThresholds[severity];
  }
} 