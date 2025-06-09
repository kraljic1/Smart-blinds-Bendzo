import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../utils/supabaseClient';

export const useAdminAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const authenticateUser = async (email: string, password: string) => {
    console.log('🔐 Login attempt started for email:', email);

    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log('🔍 Auth result:', { authData, authError });

    if (authError) throw authError;
    
    if (!authData.user || !authData.user.email) {
      console.log('❌ No user data in auth response');
      throw new Error('User authentication failed');
    }
    
    return authData.user.email;
  };

  const verifyAdminStatus = async (userEmail: string) => {
    console.log('✅ Auth successful, checking admin status for:', userEmail);
    
    const { data: adminData, error: adminError } = await supabase
      .from('admin_users')
      .select('id')
      .eq('email', userEmail)
      .single();
    
    console.log('🔍 Admin check result:', { adminData, adminError });
    console.log('🔍 Admin error details:', adminError?.message, adminError?.details, adminError?.hint);
    
    if (adminError || !adminData) {
      console.log('❌ User is not an admin, signing out');
      await supabase.auth.signOut();
      throw new Error('You do not have administrator privileges');
    }
  };

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const userEmail = await authenticateUser(email, password);
      await verifyAdminStatus(userEmail);
      
      console.log('✅ Admin verification successful, redirecting...');
      navigate('/admin/orders');
    } catch (err: unknown) {
      console.error('Error signing in:', err);
      setError(err instanceof Error ? err.message : 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    handleLogin,
  };
}; 