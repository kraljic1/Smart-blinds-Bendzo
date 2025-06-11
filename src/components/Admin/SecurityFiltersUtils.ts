import { SecurityIncidentType } from '../../types/security';

export const formatIncidentType = (type: SecurityIncidentType): string => {
 return type.split('_').map(word => 
 word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
 ).join(' ');
}; 