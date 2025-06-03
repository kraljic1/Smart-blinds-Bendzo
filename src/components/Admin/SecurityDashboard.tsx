import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, Eye, Clock, CheckCircle, XCircle } from 'lucide-react';
import securityLogger, { SecurityIncident, SecuritySeverity, SecurityIncidentType } from '../../utils/securityLogger';

interface SecurityDashboardProps {
  className?: string;
}

const SecurityDashboard: React.FC<SecurityDashboardProps> = ({ className = '' }) => {
  const [incidents, setIncidents] = useState<SecurityIncident[]>([]);
  const [stats, setStats] = useState<{
    totalIncidents: number;
    unresolvedIncidents: number;
    incidentsBySeverity: Record<string, number>;
  } | null>(null);
  const [selectedSeverity, setSelectedSeverity] = useState<SecuritySeverity | 'all'>('all');
  const [selectedType, setSelectedType] = useState<SecurityIncidentType | 'all'>('all');
  const [showResolved, setShowResolved] = useState(false);

  useEffect(() => {
    // Load initial data
    refreshData();
    
    // Set up periodic refresh
    const interval = setInterval(refreshData, 30000); // Refresh every 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  const refreshData = () => {
    setIncidents(securityLogger.getRecentIncidents(100));
    setStats(securityLogger.getSecurityStats());
  };

  const filteredIncidents = incidents.filter(incident => {
    if (!showResolved && incident.resolved) return false;
    if (selectedSeverity !== 'all' && incident.severity !== selectedSeverity) return false;
    if (selectedType !== 'all' && incident.type !== selectedType) return false;
    return true;
  });

  const getSeverityColor = (severity: SecuritySeverity): string => {
    switch (severity) {
      case SecuritySeverity.LOW: return 'text-blue-600 bg-blue-100';
      case SecuritySeverity.MEDIUM: return 'text-yellow-600 bg-yellow-100';
      case SecuritySeverity.HIGH: return 'text-orange-600 bg-orange-100';
      case SecuritySeverity.CRITICAL: return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSeverityIcon = (severity: SecuritySeverity) => {
    switch (severity) {
      case SecuritySeverity.LOW: return <Eye className="w-4 h-4" />;
      case SecuritySeverity.MEDIUM: return <AlertTriangle className="w-4 h-4" />;
      case SecuritySeverity.HIGH: return <AlertTriangle className="w-4 h-4" />;
      case SecuritySeverity.CRITICAL: return <XCircle className="w-4 h-4" />;
      default: return <Shield className="w-4 h-4" />;
    }
  };

  const formatIncidentType = (type: SecurityIncidentType): string => {
    return type.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
  };

  const resolveIncident = (incidentId: string) => {
    if (securityLogger.resolveIncident(incidentId, 'admin')) {
      refreshData();
    }
  };

  if (!stats) {
    return (
      <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-md ${className}`}>
      {/* Header */}
      <div className="border-b border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Security Dashboard</h2>
          </div>
          <button
            onClick={refreshData}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="p-6 border-b border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Incidents</p>
                <p className="text-2xl font-bold text-blue-900">{stats.totalIncidents}</p>
              </div>
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-red-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600">Unresolved</p>
                <p className="text-2xl font-bold text-red-900">{stats.unresolvedIncidents}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-600">High/Critical</p>
                <p className="text-2xl font-bold text-yellow-900">
                  {(stats.incidentsBySeverity.high || 0) + (stats.incidentsBySeverity.critical || 0)}
                </p>
              </div>
              <XCircle className="w-8 h-8 text-yellow-600" />
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Last 24h</p>
                <p className="text-2xl font-bold text-green-900">
                  {incidents.filter(i => Date.now() - i.timestamp.getTime() < 86400000).length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-wrap gap-4">
          <div>
            <label htmlFor="severity-filter" className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
            <select
              id="severity-filter"
              name="severity-filter"
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value as SecuritySeverity | 'all')}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              aria-label="Filter by incident severity"
            >
              <option value="all">All Severities</option>
              <option value={SecuritySeverity.LOW}>Low</option>
              <option value={SecuritySeverity.MEDIUM}>Medium</option>
              <option value={SecuritySeverity.HIGH}>High</option>
              <option value={SecuritySeverity.CRITICAL}>Critical</option>
            </select>
          </div>

          <div>
            <label htmlFor="type-filter" className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select
              id="type-filter"
              name="type-filter"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as SecurityIncidentType | 'all')}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              aria-label="Filter by incident type"
            >
              <option value="all">All Types</option>
              {Object.values(SecurityIncidentType).map(type => (
                <option key={type} value={type}>{formatIncidentType(type)}</option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <label htmlFor="show-resolved" className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="show-resolved"
                name="show-resolved"
                checked={showResolved}
                onChange={(e) => setShowResolved(e.target.checked)}
                className="rounded border-gray-300"
                aria-label="Show resolved incidents"
              />
              <span className="text-sm text-gray-700">Show resolved</span>
            </label>
          </div>
        </div>
      </div>

      {/* Incidents List */}
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Recent Incidents ({filteredIncidents.length})
        </h3>

        {filteredIncidents.length === 0 ? (
          <div className="text-center py-8">
            <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No incidents match the current filters</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredIncidents.map((incident) => (
              <div
                key={incident.id}
                className={`border rounded-lg p-4 ${
                  incident.resolved ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(incident.severity)}`}>
                        {getSeverityIcon(incident.severity)}
                        <span className="ml-1">{incident.severity.toUpperCase()}</span>
                      </span>
                      <span className="text-sm text-gray-600">
                        {formatIncidentType(incident.type)}
                      </span>
                      <span className="text-xs text-gray-500">
                        {incident.timestamp.toLocaleString()}
                      </span>
                      {incident.resolved && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-green-600 bg-green-100">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Resolved
                        </span>
                      )}
                    </div>
                    <p className="text-gray-900 mb-2">{incident.description}</p>
                    {incident.metadata && (
                      <div className="text-xs text-gray-600">
                        <strong>Details:</strong> {JSON.stringify(incident.metadata, null, 2)}
                      </div>
                    )}
                  </div>
                  {!incident.resolved && (
                    <button
                      onClick={() => resolveIncident(incident.id)}
                      className="ml-4 px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
                    >
                      Resolve
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SecurityDashboard; 