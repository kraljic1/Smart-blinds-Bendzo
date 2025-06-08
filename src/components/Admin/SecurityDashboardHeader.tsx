import React from 'react';
import { Shield } from 'lucide-react';

interface SecurityDashboardHeaderProps {
  onRefresh: () => void;
}

const SecurityDashboardHeader: React.FC<SecurityDashboardHeaderProps> = ({ onRefresh }) => {
  return (
    <div className="border-b border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Shield className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">Security Dashboard</h2>
        </div>
        <button
          onClick={onRefresh}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Refresh
        </button>
      </div>
    </div>
  );
};

export default SecurityDashboardHeader; 