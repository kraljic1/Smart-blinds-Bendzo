import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase, addAdminUser, removeAdminUser } from '../utils/supabaseClient';
import { ChevronLeft, LogOut, UserPlus, UserMinus, AlertCircle, Search, Loader } from 'lucide-react';
import SEO from '../components/SEO';

interface AdminUser {
  id: number;
  email: string;
  created_at: string;
}

const AdminManagementPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);
  const navigate = useNavigate();

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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

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
      setError('Failed to load admin users');
    } finally {
      setLoading(false);
    }
  };

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    setError(null);
    setSuccess(null);

    if (!newAdminEmail.trim()) {
      setError('Please enter a valid email address');
      setActionLoading(false);
      return;
    }

    try {
      const success = await addAdminUser(newAdminEmail);
      if (!success) {
        throw new Error('Failed to add admin user');
      }
      
      setSuccess(`Successfully added ${newAdminEmail} as admin`);
      setNewAdminEmail('');
      fetchAdminUsers();
    } catch (err) {
      console.error('Error adding admin:', err);
      setError(err instanceof Error ? err.message : 'Failed to add admin user');
    } finally {
      setActionLoading(false);
    }
  };

  const handleRemoveAdmin = async (email: string) => {
    if (email === currentUserEmail) {
      setError("You cannot remove yourself as an admin");
      return;
    }

    setActionLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const success = await removeAdminUser(email);
      if (!success) {
        throw new Error('Failed to remove admin user');
      }
      
      setSuccess(`Successfully removed ${email} from admins`);
      fetchAdminUsers();
    } catch (err) {
      console.error('Error removing admin:', err);
      setError(err instanceof Error ? err.message : 'Failed to remove admin user');
    } finally {
      setActionLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <SEO 
        title="Admin Management | Smartblinds Croatia" 
        description="Admin user management page" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Management</h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Manage administrator access for your store
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/admin/orders"
              className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Orders
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded" role="alert">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
              <span>{error}</span>
            </div>
          </div>
        )}

        {success && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded" role="alert">
            <div className="flex">
              <svg className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>{success}</span>
            </div>
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg mb-8">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Add New Admin</h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Add a new administrator to your store
            </p>
          </div>

          <div className="px-4 py-5 sm:p-6">
            <form onSubmit={handleAddAdmin} className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <label htmlFor="email" className="sr-only">Email address</label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="admin@example.com"
                    value={newAdminEmail}
                    onChange={(e) => setNewAdminEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                disabled={actionLoading}
              >
                {actionLoading ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin mr-2" />
                    Adding...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add Admin
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Current Admins</h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              List of all administrators with access to your store
            </p>
          </div>

          {loading ? (
            <div className="px-4 py-12 text-center">
              <Loader className="mx-auto h-8 w-8 text-gray-400 animate-spin" />
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Loading administrators...</p>
            </div>
          ) : admins.length === 0 ? (
            <div className="px-4 py-12 text-center">
              <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No administrators</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Add an administrator to get started.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Added On
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {admins.map((admin) => (
                    <tr key={admin.id} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {admin.email}
                        {admin.email === currentUserEmail && (
                          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            You
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(admin.created_at)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                        <button
                          onClick={() => handleRemoveAdmin(admin.email)}
                          disabled={admin.email === currentUserEmail || actionLoading}
                          className={`text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 inline-flex items-center ${
                            admin.email === currentUserEmail ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                        >
                          <UserMinus className="w-4 h-4 mr-1" />
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminManagementPage; 