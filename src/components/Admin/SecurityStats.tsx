import React from 'react';
import { Shield, AlertTriangle, XCircle, Clock } from 'lucide-react';

interface SecurityStatsProps {
 stats: {
 totalIncidents: number;
 unresolvedIncidents: number;
 incidentsBySeverity: Record<string, number>;
 };
 incidents: Array<{ timestamp: Date }>;
}

const SecurityStats: React.FC<SecurityStatsProps> = ({ stats, incidents }) => {
 const last24hIncidents = incidents.filter(
 i => Date.now() - i.timestamp.getTime() < 86400000
 ).length;

 const highCriticalCount = (stats.incidentsBySeverity.high || 0) + 
 (stats.incidentsBySeverity.critical || 0);

 return (
 <div className="p-6 border-b border-gray-200">
 <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
 <div className="bg-blue-50 p-4 rounded-lg">
 <div className="flex items-center justify-between">
 <div>
 <p className="text-sm font-medium text-blue-600">Total Incidents</p>
 <p className="text-2xl font-bold text-blue-900">{stats.totalIncidents}</p>
 </div>
 <Shield className="w-8 h-8 text-blue-600"/>
 </div>
 </div>

 <div className="bg-red-50 p-4 rounded-lg">
 <div className="flex items-center justify-between">
 <div>
 <p className="text-sm font-medium text-red-600">Unresolved</p>
 <p className="text-2xl font-bold text-red-900">{stats.unresolvedIncidents}</p>
 </div>
 <AlertTriangle className="w-8 h-8 text-red-600"/>
 </div>
 </div>

 <div className="bg-yellow-50 p-4 rounded-lg">
 <div className="flex items-center justify-between">
 <div>
 <p className="text-sm font-medium text-yellow-600">High/Critical</p>
 <p className="text-2xl font-bold text-yellow-900">{highCriticalCount}</p>
 </div>
 <XCircle className="w-8 h-8 text-yellow-600"/>
 </div>
 </div>

 <div className="bg-green-50 p-4 rounded-lg">
 <div className="flex items-center justify-between">
 <div>
 <p className="text-sm font-medium text-green-600">Last 24h</p>
 <p className="text-2xl font-bold text-green-900">{last24hIncidents}</p>
 </div>
 <Clock className="w-8 h-8 text-green-600"/>
 </div>
 </div>
 </div>
 </div>
 );
};

export default SecurityStats; 