import React from 'react';
import { useSecurityDashboard } from '../../hooks/useSecurityDashboard';
import SecurityDashboardHeader from './SecurityDashboardHeader';
import SecurityDashboardLoading from './SecurityDashboardLoading';
import SecurityStats from './SecurityStats';
import SecurityFilters from './SecurityFilters';
import SecurityIncidentList from './SecurityIncidentList';

interface SecurityDashboardProps {
  className?: string;
}

const SecurityDashboard: React.FC<SecurityDashboardProps> = ({ className = '' }) => {
  const {
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
  } = useSecurityDashboard();

  if (!stats) {
    return <SecurityDashboardLoading className={className} />;
  }

  return (
    <div className={`bg-white rounded-lg shadow-md ${className}`}>
      <SecurityDashboardHeader onRefresh={refreshData} />
      
      <SecurityStats stats={stats} incidents={incidents} />

      <SecurityFilters
        selectedSeverity={selectedSeverity}
        selectedType={selectedType}
        showResolved={showResolved}
        onSeverityChange={setSelectedSeverity}
        onTypeChange={setSelectedType}
        onShowResolvedChange={setShowResolved}
      />

      <SecurityIncidentList
        incidents={filteredIncidents}
        onResolveIncident={resolveIncident}
      />
    </div>
  );
};

export default SecurityDashboard; 