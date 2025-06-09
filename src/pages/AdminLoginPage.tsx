import React from 'react';
import { Helmet } from 'react-helmet-async';
import SEO from '../components/SEO/SEO';
import { LoginForm, ErrorAlert, LoginHeader } from './AdminLoginPage/components';
import { useAdminAuth } from './AdminLoginPage/hooks/useAdminAuth';

const AdminLoginPage: React.FC = () => {
  const { loading, error, handleLogin } = useAdminAuth();

  return (
    <>
      <Helmet>
        <SEO
          title="Admin Login | Smartblinds"
          description="Admin login page for Smartblinds management system"
          noindex={true}
          nofollow={true}
        />
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
            <LoginHeader />
            <ErrorAlert error={error} />
            <LoginForm onSubmit={handleLogin} loading={loading} />
          </div>
          
          <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
            <a href="/" className="font-medium text-blue-600 hover:text-blue-500">
              Povratak na Smartblinds Croatia
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLoginPage; 