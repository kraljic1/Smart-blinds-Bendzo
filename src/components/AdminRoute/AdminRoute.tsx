import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { supabase } from '../../utils/supabaseClient';
import ForcePasswordChange from './ForcePasswordChange';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [needsPasswordChange, setNeedsPasswordChange] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if user is authenticated
        const { data: sessionData } = await supabase.auth.getSession();
        
        if (!sessionData.session) {
          setIsAuthenticated(false);
          return;
        }
        
        // Get the user's email
        const userEmail = sessionData.session.user.email;
        
        if (!userEmail) {
          setIsAuthenticated(false);
          return;
        }
        
        // Check if the user is in the admin_users table
        const { data: adminData, error: adminError } = await supabase
          .from('admin_users')
          .select('id, password_hash')
          .eq('email', userEmail)
          .single();
        
        if (adminError || !adminData) {
          setIsAuthenticated(false);
          return;
        }
        
        // Check if user needs to change password
        // User needs to change password if:
        // 1. password_hash is 'temp_password_change_required' (old system)
        // 2. password_hash is a temporary password (new system - contains actual temp password)
        // 3. password_hash is NOT 'password_set_by_user' (indicates user has set their own password)
        if (adminData.password_hash === 'temp_password_change_required' || 
            (adminData.password_hash !== 'password_set_by_user' && adminData.password_hash !== 'supabase_auth')) {
          setNeedsPasswordChange(true);
          setIsAuthenticated(true);
          return;
        }
        
        // User exists in admin_users table and password is set
        setIsAuthenticated(true);
        setNeedsPasswordChange(false);
      } catch (error) {
        console.error('Auth check error:', error);
        setIsAuthenticated(false);
      }
    };
    
    checkAuth();
  }, []);

  // Show loading while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Show force password change if needed
  if (isAuthenticated && needsPasswordChange) {
    return (
      <ForcePasswordChange 
        onPasswordChanged={() => {
          setNeedsPasswordChange(false);
          // Refresh the auth check
          window.location.reload();
        }} 
      />
    );
  }

  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to="/admin/login" state={{ from: location }} replace />
  );
};

export default AdminRoute; 