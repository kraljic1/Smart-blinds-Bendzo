import React, { useState } from 'react';
import { Loader, RotateCcw } from 'lucide-react';
import AdminEmailInput from './AdminEmailInput';

interface ResetPasswordSectionProps {
  onSubmit: (email: string) => Promise<void>;
  isLoading: boolean;
}

const ResetPasswordSection: React.FC<ResetPasswordSectionProps> = ({
  onSubmit,
  isLoading
}) => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    await onSubmit(email);
    setEmail(''); // Clear form on successful submission
  };

  return (
    <div className="px-4 py-5 sm:p-6 border-t border-gray-200 dark:border-gray-700">
      <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">
        Resetuj Lozinku Postojećeg Administratora
      </h3>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <AdminEmailInput
          id="reset-email"
          value={email}
          onChange={setEmail}
          focusColor="orange"
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? (
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
  );
};

export default ResetPasswordSection; 