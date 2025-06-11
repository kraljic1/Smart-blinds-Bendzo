/**
 * Security Incident Manager
 * Handles storage, retrieval, and management of security incidents
 */

import type { 
 SecurityIncident, 
 SecurityIncidentType, 
 SecuritySeverity, 
 SecurityStats 
} from '../../types/security';

export class IncidentManager {
 private incidents: SecurityIncident[] = [];
 private readonly maxIncidents: number;

 constructor(maxIncidents = 1000) {
 this.maxIncidents = maxIncidents;
 }

 /**
 * Add a new incident to the store
 */
 addIncident(incident: SecurityIncident): void {
 this.incidents.unshift(incident);
 
 // Keep only the most recent incidents
 if (this.incidents.length > this.maxIncidents) {
 this.incidents = this.incidents.slice(0, this.maxIncidents);
 }
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
 * Get incidents within a time range
 */
 getIncidentsInTimeRange(startTime: Date, endTime: Date): SecurityIncident[] {
 return this.incidents.filter(
 incident => 
 incident.timestamp >= startTime && 
 incident.timestamp <= endTime
 );
 }

 /**
 * Get recent incidents by severity (for alert checking)
 */
 getRecentIncidentsBySeverity(severity: SecuritySeverity, timeWindowMs = 60000): SecurityIncident[] {
 const cutoffTime = Date.now() - timeWindowMs;
 return this.incidents.filter(
 incident => 
 incident.severity === severity && 
 incident.timestamp.getTime() > cutoffTime
 );
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
 * Find incident by ID
 */
 findIncidentById(incidentId: string): SecurityIncident | undefined {
 return this.incidents.find(i => i.id === incidentId);
 }

 /**
 * Get security statistics
 */
 getSecurityStats(): SecurityStats {
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

 /**
 * Clear all incidents (for testing or reset)
 */
 clearIncidents(): void {
 this.incidents = [];
 }

 /**
 * Get total incident count
 */
 getTotalIncidentCount(): number {
 return this.incidents.length;
 }
} 