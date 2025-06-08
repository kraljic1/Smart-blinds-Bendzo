import React from 'react';
import { SecurityIncident } from '../../types/security';
import SecurityIncidentHeader from './SecurityIncidentHeader';
import SecurityIncidentContent from './SecurityIncidentContent';

interface SecurityIncidentItemProps {
  incident: SecurityIncident;
  onResolve: (incidentId: string) => void;
}

const SecurityIncidentItem: React.FC<SecurityIncidentItemProps> = ({ incident, onResolve }) => {
  return (
    <div
      className={`border rounded-lg p-4 ${
        incident.resolved ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-300'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <SecurityIncidentHeader incident={incident} />
          <SecurityIncidentContent incident={incident} />
        </div>
        {!incident.resolved && (
          <button
            onClick={() => onResolve(incident.id)}
            className="ml-4 px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
          >
            Resolve
          </button>
        )}
      </div>
    </div>
  );
};

export default SecurityIncidentItem; 