import { SecuritySeverity, SecurityIncidentType } from '../../types/security';

export const getSeverityColor = (severity: SecuritySeverity): string => {
  switch (severity) {
    case SecuritySeverity.LOW: return 'text-blue-600 bg-blue-100';
    case SecuritySeverity.MEDIUM: return 'text-yellow-600 bg-yellow-100';
    case SecuritySeverity.HIGH: return 'text-orange-600 bg-orange-100';
    case SecuritySeverity.CRITICAL: return 'text-red-600 bg-red-100';
    default: return 'text-gray-600 bg-gray-100';
  }
};

export const formatIncidentType = (type: SecurityIncidentType): string => {
  return type.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ');
}; 