import React, { useState } from 'react';
import { supabase } from '../../utils/supabaseClient';
import { Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';

interface ForcePasswordChangeProps {
  onPasswordChanged: () => void;
}

const ForcePasswordChange: React.FC<ForcePasswordChangeProps> = ({ onPasswordChanged }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validation
    if (newPassword.length < 8) {
      setError('Lozinka mora imati najmanje 8 karaktera');
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Lozinke se ne poklapaju');
      setLoading(false);
      return;
    }

    try {
      // Update password in Supabase Auth
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (updateError) throw updateError;

      // Update password_hash in admin_users table to indicate password has been changed
      const { data: sessionData } = await supabase.auth.getSession();
      if (sessionData.session?.user?.email) {
        const { error: dbError } = await supabase
          .from('admin_users')
          .update({ 
            password_hash: 'password_set_by_user',
            updated_at: new Date().toISOString()
          })
          .eq('email', sessionData.session.user.email);

        if (dbError) {
          console.error('Error updating admin_users:', dbError);
        }
      }

      onPasswordChanged();
    } catch (err: unknown) {
      console.error('Error changing password:', err);
      setError(err instanceof Error ? err.message : 'Greška pri promjeni lozinke');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
          <div className="text-center mb-8">
            <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900 mb-4">
              <Lock className="h-10 w-10 text-yellow-600 dark:text-yellow-300" />
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Promjena lozinke obavezna
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Morate promijeniti privremenu lozinku prije pristupa admin panelu
            </p>
          </div>

          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded" role="alert">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Greška</p>
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            </div>
          )}

          <form className="space-y-6" onSubmit={handlePasswordChange}>
            <div>
              <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Nova lozinka
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="new-password"
                  name="new-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  minLength={8}
                  className="block w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Najmanje 8 karaktera"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button 
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Potvrdi lozinku
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  className="block w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Ponovite novu lozinku"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button 
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  tabIndex={-1}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Mijenjam lozinku...
                  </>
                ) : (
                  'Promijeni lozinku'
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <p className="mb-2">Zahtjevi za lozinku:</p>
              <ul className="text-xs space-y-1">
                <li>• Najmanje 8 karaktera</li>
                <li>• Preporučuje se kombinacija slova, brojeva i simbola</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForcePasswordChange; 