import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { usePasswordValidation } from '../../hooks/usePasswordValidation';
import { updateUserPassword } from '../../utils/passwordService';
import PasswordChangeHeader from './PasswordChangeHeader';
import PasswordField from './PasswordField';
import PasswordRequirements from './PasswordRequirements';

interface ForcePasswordChangeProps {
  onPasswordChanged: () => void;
}

const ForcePasswordChange: React.FC<ForcePasswordChangeProps> = ({ onPasswordChanged }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { error, setError, validatePassword } = usePasswordValidation();

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const validation = validatePassword(newPassword, confirmPassword);
    if (!validation.isValid) {
      setLoading(false);
      return;
    }

    try {
      await updateUserPassword(newPassword);
      onPasswordChanged();
    } catch (err: unknown) {
      console.error('❌ Error updating user credentials:', err);
      setError(err instanceof Error ? err.message : 'Greška pri promjeni lozinke');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
          <PasswordChangeHeader />

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
            <PasswordField
              id="new-password"
              label="Nova lozinka"
              placeholder="Najmanje 8 karaktera"
              value={newPassword}
              showPassword={showPassword}
              onChange={setNewPassword}
              onToggleVisibility={() => setShowPassword(!showPassword)}
            />

            <PasswordField
              id="confirm-password"
              label="Potvrdi lozinku"
              placeholder="Ponovite novu lozinku"
              value={confirmPassword}
              showPassword={showConfirmPassword}
              onChange={setConfirmPassword}
              onToggleVisibility={() => setShowConfirmPassword(!showConfirmPassword)}
            />

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

          <PasswordRequirements />
        </div>
      </div>
    </div>
  );
};

export default ForcePasswordChange; 