import React, { useState } from 'react';
import { Loader, UserPlus } from 'lucide-react';
import AdminEmailInput from './AdminEmailInput';

interface AddAdminSectionProps {
  onSubmit: (email: string) => Promise<void>;
  isLoading: boolean;
}

const AddAdminSection: React.FC<AddAdminSectionProps> = ({
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
    <div className="px-4 py-5 sm:p-6">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <AdminEmailInput
          id="email"
          value={email}
          onChange={setEmail}
          focusColor="blue"
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? (
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
  );
};

export default AddAdminSection; 