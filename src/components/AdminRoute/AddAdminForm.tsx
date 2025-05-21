import React, { useState } from 'react';
import { Search, Loader, UserPlus } from 'lucide-react';
import { addAdminUser } from '../../utils/supabaseClient';

interface AddAdminFormProps {
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
  onAdminAdded: () => void;
}

const AddAdminForm: React.FC<AddAdminFormProps> = ({
  onSuccess,
  onError,
  onAdminAdded
}) => {
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    
    if (!newAdminEmail.trim()) {
      onError('Molimo unesite valjanu e-mail adresu');
      setActionLoading(false);
      return;
    }

    try {
      const success = await addAdminUser(newAdminEmail);
      if (!success) {
        throw new Error('Greška pri dodavanju administratora');
      }
      
      onSuccess(`Uspješno dodan ${newAdminEmail} kao administrator`);
      setNewAdminEmail('');
      onAdminAdded();
    } catch (err) {
      console.error('Error adding admin:', err);
      onError(err instanceof Error ? err.message : 'Greška pri dodavanju administratora');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg mb-8">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">Dodaj Novog Administratora</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Dodajte novog administratora vašoj trgovini
        </p>
      </div>

      <div className="px-4 py-5 sm:p-6">
        <form onSubmit={handleAddAdmin} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <label htmlFor="email" className="sr-only">E-mail adresa</label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="admin@primjer.com"
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
                Dodavanje...
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4 mr-2" />
                Dodaj Administratora
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAdminForm; 