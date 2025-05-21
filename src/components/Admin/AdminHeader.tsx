import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Home, RefreshCw, UserCog } from 'lucide-react';
import { supabase } from '../../utils/supabaseClient';

interface AdminHeaderProps {
  title: string;
  description: string;
  isRefreshing: boolean;
  onRefresh: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({
  title,
  description,
  isRefreshing,
  onRefresh
}) => {
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('isAdmin');
    navigate('/admin/login');
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          {description}
        </p>
      </div>
      
      <div className="flex flex-wrap items-center gap-3">
        <button 
          onClick={onRefresh}
          disabled={isRefreshing}
          className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          Osvježi
        </button>
        
        <Link 
          to="/admin/management"
          className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <UserCog className="w-4 h-4 mr-2" />
          Administracija
        </Link>
        
        <a 
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Home className="w-4 h-4 mr-2" />
          Početna Stranica
        </a>
        
        <button 
          onClick={handleLogout}
          className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Odjava
        </button>
      </div>
    </div>
  );
};

export default AdminHeader; 