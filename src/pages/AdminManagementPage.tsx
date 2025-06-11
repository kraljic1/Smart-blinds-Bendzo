import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import CroatianSEO from '../components/SEO/CroatianSEO';
import AdminHeader from '../components/AdminRoute/AdminHeader';
import AlertMessage from '../components/AdminRoute/AlertMessage';
import AddAdminForm from '../components/AdminRoute/AddAdminForm';
import AdminList from '../components/AdminRoute/AdminList';
import { AdminUser } from '../types/admin';

const AdminManagementPage: React.FC = () => {
 const [loading, setLoading] = useState(true);
 const [admins, setAdmins] = useState<AdminUser[]>([]);
 const [error, setError] = useState<string | null>(null);
 const [success, setSuccess] = useState<string | null>(null);
 const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);

 useEffect(() => {
 const fetchCurrentUser = async () => {
 const { data } = await supabase.auth.getSession();
 if (data.session && data.session.user.email) {
 setCurrentUserEmail(data.session.user.email);
 }
 };

 fetchCurrentUser();
 fetchAdminUsers();
 }, []);

 const fetchAdminUsers = async () => {
 setLoading(true);
 try {
 const { data, error } = await supabase
 .from('admin_users')
 .select('*')
 .order('created_at', { ascending: false });

 if (error) throw error;
 setAdmins(data || []);
 } catch (err) {
 console.error('Error fetching admin users:', err);
 setError('Greška pri učitavanju administratora');
 } finally {
 setLoading(false);
 }
 };

 return (
 <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
 <CroatianSEO
 title="Admin Management | Smartblinds"
 description="Admin management dashboard for Smartblinds"
 keywords="admin, management, smartblinds"
 pageType="info"
 noindex={true}
 />

 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
 <AdminHeader 
 title="Upravljanje Administratorima"
 description="Upravljajte administratorskim pristupom vašoj trgovini"
 />

 <AlertMessage type="error"message={error} />
 <AlertMessage type="success"message={success} />

 <AddAdminForm 
 onSuccess={(message) => {
 setSuccess(message);
 setError(null);
 }}
 onError={(message) => {
 setError(message);
 setSuccess(null);
 }}
 onAdminAdded={fetchAdminUsers}
 />

 <AdminList 
 admins={admins}
 loading={loading}
 currentUserEmail={currentUserEmail}
 onSuccess={(message) => {
 setSuccess(message);
 setError(null);
 }}
 onError={(message) => {
 setError(message);
 setSuccess(null);
 }}
 onAdminRemoved={fetchAdminUsers}
 />
 </div>
 </div>
 );
};

export default AdminManagementPage; 