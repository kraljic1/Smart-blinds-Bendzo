import { useState, useEffect } from 'react';
import securityLogger from '../utils/securityLogger';
import { SecurityIncident, SecuritySeverity, SecurityIncidentType } from '../types/security';

interface SecurityStats {
 totalIncidents: number;
 unresolvedIncidents: number;
 incidentsBySeverity: Record<string, number>;
}

export const useSecurityDashboard = () => {
 const [incidents, setIncidents] = useState<SecurityIncident[]>([]);
 const [stats, setStats] = useState<SecurityStats | null>(null);
 const [selectedSeverity, setSelectedSeverity] = useState<SecuritySeverity | 'all'>('all');
 const [selectedType, setSelectedType] = useState<SecurityIncidentType | 'all'>('all');
 const [showResolved, setShowResolved] = useState(false);

 const refreshData = () => {
 setIncidents(securityLogger.getRecentIncidents(100));
 setStats(securityLogger.getSecurityStats());
 };

 useEffect(() => {
 // Load initial data
 refreshData();
 
 // Set up periodic refresh
 const interval = setInterval(refreshData, 30000); // Refresh every 30 seconds
 
 return () => clearInterval(interval);
 }, []);

 const filteredIncidents = incidents.filter(incident => {
 if (!showResolved && incident.resolved) return false;
 if (selectedSeverity !== 'all' && incident.severity !== selectedSeverity) return false;
 if (selectedType !== 'all' && incident.type !== selectedType) return false;
 return true;
 });

 const resolveIncident = (incidentId: string) => {
 if (securityLogger.resolveIncident(incidentId, 'admin')) {
 refreshData();
 }
 };

 return {
 incidents,
 stats,
 selectedSeverity,
 selectedType,
 showResolved,
 filteredIncidents,
 setSelectedSeverity,
 setSelectedType,
 setShowResolved,
 refreshData,
 resolveIncident
 };
}; 