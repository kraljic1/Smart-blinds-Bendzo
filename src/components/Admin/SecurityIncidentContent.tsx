import React from 'react';
import { SecurityIncident } from '../../types/security';

interface SecurityIncidentContentProps {
  incident: SecurityIncident;
}

const SecurityIncidentContent: React.FC<SecurityIncidentContentProps> = ({ incident }) => {
  return (
    <>
      <p className="text-gray-900 mb-2">{incident.description}</p>
      {incident.metadata && (
        <div className="text-xs text-gray-600">
          <strong>Details:</strong> {JSON.stringify(incident.metadata, null, 2)}
        </div>
      )}
    </>
  );
};

export default SecurityIncidentContent; 