import React from 'react';

interface SecurityDashboardLoadingProps {
 className?: string;
}

const SecurityDashboardLoading: React.FC<SecurityDashboardLoadingProps> = ({ className = '' }) => {
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
};

export default SecurityDashboardLoading; 