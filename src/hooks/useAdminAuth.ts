import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';

export const useAdminAuth = () => {
 const navigate = useNavigate();

 const handleLogout = async () => {
 await supabase.auth.signOut();
 localStorage.removeItem('isAdmin');
 navigate('/admin/login');
 };

 return {
 handleLogout
 };
}; 