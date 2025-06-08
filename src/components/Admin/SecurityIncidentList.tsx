import React from 'react';
import { Shield } from 'lucide-react';
import { SecurityIncident } from '../../types/security';
import SecurityIncidentItem from './SecurityIncidentItem';

interface SecurityIncidentListProps {
  incidents: SecurityIncident[];
  onResolveIncident: (incidentId: string) => void;
}

const SecurityIncidentList: React.FC<SecurityIncidentListProps> = ({ 
  incidents, 
  onResolveIncident 
}) => {
  return (
    <div className="p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Recent Incidents ({incidents.length})
      </h3>

      {incidents.length === 0 ? (
        <div className="text-center py-8">
          <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No incidents match the current filters</p>
        </div>
      ) : (
        <div className="space-y-3">
          {incidents.map((incident) => (
            <SecurityIncidentItem
              key={incident.id}
              incident={incident}
              onResolve={onResolveIncident}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SecurityIncidentList; 