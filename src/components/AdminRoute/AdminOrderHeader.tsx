import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Printer, UserCog, LogOut } from 'lucide-react';

interface AdminOrderHeaderProps {
  onLogout: () => Promise<void>;
}

const AdminOrderHeader: React.FC<AdminOrderHeaderProps> = ({ onLogout }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
      <Link 
        to="/admin/orders"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
      >
        <ChevronLeft className="w-5 h-5 mr-1" />
        Back to Orders
      </Link>
      
      <div className="flex gap-2">
        <button 
          onClick={() => window.print()}
          className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Printer className="w-4 h-4 mr-2" />
          Print Order
        </button>
        
        <Link 
          to="/admin/management"
          className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <UserCog className="w-4 h-4 mr-2" />
          Admin Management
        </Link>
      
        <button 
          onClick={onLogout}
          className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminOrderHeader; 