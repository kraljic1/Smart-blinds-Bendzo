import React, { useState } from 'react';
import { Loader, AlertCircle, UserMinus } from 'lucide-react';
import { removeAdminUser } from '../../utils/supabaseClient';

interface AdminUser {
  id: number;
  email: string;
  created_at: string;
}

interface AdminListProps {
  admins: AdminUser[];
  loading: boolean;
  currentUserEmail: string | null;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
  onAdminRemoved: () => void;
}

const AdminList: React.FC<AdminListProps> = ({
  admins,
  loading,
  currentUserEmail,
  onSuccess,
  onError,
  onAdminRemoved
}) => {
  const [actionLoading, setActionLoading] = useState(false);

  const handleRemoveAdmin = async (email: string) => {
    if (email === currentUserEmail) {
      onError("Ne možete ukloniti sami sebe kao administratora");
      return;
    }

    setActionLoading(true);

    try {
      const success = await removeAdminUser(email);
      if (!success) {
        throw new Error('Greška pri uklanjanju administratora');
      }
      
      onSuccess(`Uspješno uklonjen ${email} iz administratora`);
      onAdminRemoved();
    } catch (err) {
      console.error('Error removing admin:', err);
      onError(err instanceof Error ? err.message : 'Greška pri uklanjanju administratora');
    } finally {
      setActionLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('hr-HR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">Trenutni Administratori</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Popis svih administratora s pristupom vašoj trgovini
        </p>
      </div>

      {loading ? (
        <div className="px-4 py-12 text-center">
          <Loader className="mx-auto h-8 w-8 text-gray-400 animate-spin" />
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Učitavanje administratora...</p>
        </div>
      ) : admins.length === 0 ? (
        <div className="px-4 py-12 text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Nema administratora</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Dodajte administratora za početak.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  E-mail
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Dodan
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Akcije
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
                        Vi
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
                      Ukloni
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminList; 