import React from 'react';
import { Eye, AlertTriangle, XCircle, CheckCircle, Shield } from 'lucide-react';
import { SecurityIncident, SecuritySeverity } from '../../types/security';
import { getSeverityColor, formatIncidentType } from './SecurityIncidentUtils';

interface SecurityIncidentHeaderProps {
  incident: SecurityIncident;
}

const SecurityIncidentHeader: React.FC<SecurityIncidentHeaderProps> = ({ incident }) => {
  const getSeverityIcon = (severity: SecuritySeverity) => {
    switch (severity) {
      case SecuritySeverity.LOW: return <Eye className="w-4 h-4" />;
      case SecuritySeverity.MEDIUM: return <AlertTriangle className="w-4 h-4" />;
      case SecuritySeverity.HIGH: return <AlertTriangle className="w-4 h-4" />;
      case SecuritySeverity.CRITICAL: return <XCircle className="w-4 h-4" />;
      default: return <Shield className="w-4 h-4" />;
    }
  };

  return (
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
  );
};

export default SecurityIncidentHeader; 