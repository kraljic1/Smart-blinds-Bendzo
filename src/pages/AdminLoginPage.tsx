import React from 'react';
import CroatianSEO from '../components/SEO/CroatianSEO';
import { LoginForm, ErrorAlert, LoginHeader } from './AdminLoginPage/components';
import { useAdminAuth } from './AdminLoginPage/hooks/useAdminAuth';

const AdminLoginPage: React.FC = () => {
 const { loading, error, handleLogin } = useAdminAuth();

 return (
 <>
 <CroatianSEO
 title="Admin Login | Smartblinds"
 description="Admin login page for Smartblinds management system"
 keywords="admin, login, smartblinds"
 pageType="info"
 noindex={true}
 />
 <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
 <div className="w-full max-w-md">
 <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
 <LoginHeader />
 <ErrorAlert error={error} />
 <LoginForm onSubmit={handleLogin} loading={loading} />
 </div>
 
 <div className="mt-4 text-center text-sm text-gray-600">
 <a href="/"className="font-medium text-blue-600 hover:text-blue-500">
 Povratak na Smartblinds Croatia
 </a>
 </div>
 </div>
 </div>
 </>
 );
};

export default AdminLoginPage; 