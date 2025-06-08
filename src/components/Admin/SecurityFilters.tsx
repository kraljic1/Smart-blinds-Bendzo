import React from 'react';
import { SecuritySeverity, SecurityIncidentType } from '../../types/security';
import { formatIncidentType } from './SecurityFiltersUtils';

interface SecurityFiltersProps {
  selectedSeverity: SecuritySeverity | 'all';
  selectedType: SecurityIncidentType | 'all';
  showResolved: boolean;
  onSeverityChange: (severity: SecuritySeverity | 'all') => void;
  onTypeChange: (type: SecurityIncidentType | 'all') => void;
  onShowResolvedChange: (show: boolean) => void;
}

const SecurityFilters: React.FC<SecurityFiltersProps> = ({
  selectedSeverity,
  selectedType,
  showResolved,
  onSeverityChange,
  onTypeChange,
  onShowResolvedChange
}) => {

  return (
    <div className="p-6 border-b border-gray-200">
      <div className="flex flex-wrap gap-4">
        <div>
          <label htmlFor="severity-filter" className="block text-sm font-medium text-gray-700 mb-1">
            Severity
          </label>
          <select
            id="severity-filter"
            name="severity-filter"
            value={selectedSeverity}
            onChange={(e) => onSeverityChange(e.target.value as SecuritySeverity | 'all')}
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
          <label htmlFor="type-filter" className="block text-sm font-medium text-gray-700 mb-1">
            Type
          </label>
          <select
            id="type-filter"
            name="type-filter"
            value={selectedType}
            onChange={(e) => onTypeChange(e.target.value as SecurityIncidentType | 'all')}
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
              onChange={(e) => onShowResolvedChange(e.target.checked)}
              className="rounded border-gray-300"
              aria-label="Show resolved incidents"
            />
            <span className="text-sm text-gray-700">Show resolved</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default SecurityFilters; 