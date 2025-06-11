/**
 * Monitoring Service
 * Handles external monitoring service integrations and incident reporting
 */

import type { SecurityIncident } from '../../types/security';
import { SecurityIncidentType, SecuritySeverity } from '../../types/security';

export class MonitoringService {
 private isProduction: boolean;

 constructor() {
 this.isProduction = import.meta.env.PROD;
 }

 /**
 * Send incident to monitoring service
 */
 async sendIncident(incident: SecurityIncident): Promise<void> {
 if (this.isProduction) {
 await this.sendToExternalService(incident);
 } else {
 this.logToDevelopmentConsole(incident);
 }
 }

 /**
 * Send incident to external monitoring service (production)
 */
 private async sendToExternalService(incident: SecurityIncident): Promise<void> {
 try {
 // Log to console for now (replace with actual service integration)
 console.error('[SECURITY INCIDENT]', {
 id: incident.id,
 type: incident.type,
 severity: incident.severity,
 timestamp: incident.timestamp,
 description: incident.description
 });

 // Example integrations (uncomment and configure as needed):
 
 // Supabase logging
 // await this.sendToSupabase(incident);
 
 // External logging service
 // await this.sendToLoggingService(incident);
 
 // Webhook notification
 // await this.sendWebhookNotification(incident);
 
 } catch (error) {
 console.error('Failed to send security incident to monitoring service:', error);
 }
 }

 /**
 * Log incident to development console
 */
 private logToDevelopmentConsole(incident: SecurityIncident): void {
 console.warn(`[SECURITY] ${incident.severity.toUpperCase()}: ${incident.description}`, incident);
 }

 /**
 * Send incident to Supabase (example implementation)
 * @unused - Example implementation for future use
 */
 
 private async sendToSupabase(incident: SecurityIncident): Promise<void> {
 try {
 const response = await fetch('/api/security/incidents', {
 method: 'POST',
 headers: { 
 'Content-Type': 'application/json',
 'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
 },
 body: JSON.stringify({
 incident_id: incident.id,
 incident_type: incident.type,
 severity: incident.severity,
 description: incident.description,
 user_agent: incident.userAgent,
 ip_address: incident.ipAddress,
 user_id: incident.userId,
 metadata: incident.metadata,
 timestamp: incident.timestamp.toISOString()
 })
 });

 if (!response.ok) {
 throw new Error(`HTTP error! status: ${response.status}`);
 }
 } catch (error) {
 console.error('Failed to send incident to Supabase:', error);
 }
 }

 /**
 * Send incident to external logging service (example implementation)
 * @unused - Example implementation for future use
 */
 
 private async sendToLoggingService(incident: SecurityIncident): Promise<void> {
 try {
 const response = await fetch('https://your-logging-service.com/api/incidents', {
 method: 'POST',
 headers: { 
 'Content-Type': 'application/json',
 'Authorization': `Bearer ${import.meta.env.VITE_LOGGING_SERVICE_TOKEN}`
 },
 body: JSON.stringify(incident)
 });

 if (!response.ok) {
 throw new Error(`HTTP error! status: ${response.status}`);
 }
 } catch (error) {
 console.error('Failed to send incident to logging service:', error);
 }
 }

 /**
 * Send webhook notification (example implementation)
 * @unused - Example implementation for future use
 */
 
 private async sendWebhookNotification(incident: SecurityIncident): Promise<void> {
 try {
 const webhookUrl = import.meta.env.VITE_SECURITY_WEBHOOK_URL;
 if (!webhookUrl) return;

 const response = await fetch(webhookUrl, {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({
 text: `🚨 Security Incident: ${incident.severity.toUpperCase()}`,
 attachments: [{
 color: this.getSeverityColor(incident.severity),
 fields: [
 { title: 'Type', value: incident.type, short: true },
 { title: 'Severity', value: incident.severity, short: true },
 { title: 'Description', value: incident.description, short: false },
 { title: 'Timestamp', value: incident.timestamp.toISOString(), short: true }
 ]
 }]
 })
 });

 if (!response.ok) {
 throw new Error(`HTTP error! status: ${response.status}`);
 }
 } catch (error) {
 console.error('Failed to send webhook notification:', error);
 }
 }

 /**
 * Get color code for severity level (for webhook formatting)
 */
 private getSeverityColor(severity: string): string {
 switch (severity) {
 case 'critical': return '#ff0000';
 case 'high': return '#ff6600';
 case 'medium': return '#ffcc00';
 case 'low': return '#00cc00';
 default: return '#cccccc';
 }
 }

 /**
 * Test monitoring service connectivity
 */
 async testConnectivity(): Promise<boolean> {
 try {
 // Test with a dummy incident
 const testIncident: Partial<SecurityIncident> = {
 id: 'test_' + Date.now(),
 type: SecurityIncidentType.SECURITY_SCAN_DETECTED,
 severity: SecuritySeverity.LOW,
 description: 'Connectivity test',
 timestamp: new Date()
 };

 await this.sendIncident(testIncident as SecurityIncident);
 return true;
 } catch (error) {
 console.error('Monitoring service connectivity test failed:', error);
 return false;
 }
 }
} 