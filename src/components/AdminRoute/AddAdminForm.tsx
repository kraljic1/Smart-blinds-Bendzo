import React, { useState } from 'react';
import { Search, Loader, UserPlus, RotateCcw } from 'lucide-react';
import { addAdminUser, resetAdminPassword } from '../../utils/supabaseClient';

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
  const [resetEmail, setResetEmail] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [temporaryPassword, setTemporaryPassword] = useState<string | null>(null);

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    
    if (!newAdminEmail.trim()) {
      onError('Molimo unesite valjanu e-mail adresu');
      setActionLoading(false);
      return;
    }

    try {
      const result = await addAdminUser(newAdminEmail);
      if (!result.success) {
        throw new Error('Greška pri dodavanju administratora');
      }
      
      setTemporaryPassword(result.temporaryPassword || null);
      onSuccess(`Uspješno dodan ${newAdminEmail} kao administrator`);
      setNewAdminEmail('');
      onAdminAdded();
    } catch (err) {
      console.error('Error adding admin user:', err);
      onError(err instanceof Error ? err.message : 'Greška pri dodavanju administratora');
    } finally {
      setActionLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetLoading(true);
    
    if (!resetEmail.trim()) {
      onError('Molimo unesite valjanu e-mail adresu');
      setResetLoading(false);
      return;
    }

    try {
      const result = await resetAdminPassword(resetEmail);
      if (!result.success) {
        throw new Error('Greška pri resetovanju lozinke');
      }
      
      setTemporaryPassword(result.temporaryPassword || null);
      onSuccess(`Uspješno resetovana lozinka za ${resetEmail}`);
      setResetEmail('');
    } catch (err) {
      console.error('Error resetting admin credentials:', err);
      onError(err instanceof Error ? err.message : 'Greška pri resetovanju lozinke');
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg mb-8">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">Dodaj Novog Administratora</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Dodajte novog administratora ili obnovite postojećeg. Ako admin već postoji, biće obrisan i kreiran ponovo.
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

      {/* Reset Password Section */}
      <div className="px-4 py-5 sm:p-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">Resetuj Lozinku Postojećeg Administratora</h3>
        <form onSubmit={handleResetPassword} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <label htmlFor="reset-email" className="sr-only">E-mail adresa za reset</label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                id="reset-email"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                placeholder="admin@primjer.com"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50"
            disabled={resetLoading}
          >
            {resetLoading ? (
              <>
                <Loader className="w-4 h-4 animate-spin mr-2" />
                Resetovanje...
              </>
            ) : (
              <>
                <RotateCcw className="w-4 h-4 mr-2" />
                Resetuj Lozinku
              </>
            )}
          </button>
        </form>
      </div>

      {temporaryPassword && (
        <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                Privremena lozinka kreirana
              </h3>
              <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                <p>Privremena lozinka za novog administratora:</p>
                <div className="mt-2 p-2 bg-white dark:bg-gray-800 border border-yellow-300 dark:border-yellow-600 rounded font-mono text-lg">
                  {temporaryPassword}
                </div>
                <p className="mt-2 text-xs">
                  ⚠️ Sačuvajte ovu lozinku i pošaljite je novom administratoru. 
                  Administrator će biti primoran da promijeni lozinku pri prvoj prijavi.
                </p>
              </div>
              <div className="mt-3">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(temporaryPassword);
                    // You could add a toast notification here
                  }}
                  className="text-sm bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 px-3 py-1 rounded hover:bg-yellow-200 dark:hover:bg-yellow-700"
                >
                  📋 Kopiraj lozinku
                </button>
                <button
                  onClick={() => setTemporaryPassword(null)}
                  className="ml-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  ✕ Zatvori
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddAdminForm; 