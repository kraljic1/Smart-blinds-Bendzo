import { useState } from 'react';
import { addAdminUser, resetAdminPassword } from '../../../utils/supabaseClient';

interface UseAdminActionsProps {
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
  onAdminAdded: () => void;
}

interface UseAdminActionsReturn {
  actionLoading: boolean;
  resetLoading: boolean;
  temporaryPassword: string | null;
  handleAddAdmin: (email: string) => Promise<void>;
  handleResetPassword: (email: string) => Promise<void>;
  clearTemporaryPassword: () => void;
}

export const useAdminActions = ({
  onSuccess,
  onError,
  onAdminAdded
}: UseAdminActionsProps): UseAdminActionsReturn => {
  const [actionLoading, setActionLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [temporaryPassword, setTemporaryPassword] = useState<string | null>(null);

  const handleAddAdmin = async (email: string): Promise<void> => {
    setActionLoading(true);
    
    if (!email.trim()) {
      onError('Molimo unesite valjanu e-mail adresu');
      setActionLoading(false);
      return;
    }

    try {
      const result = await addAdminUser(email);
      if (!result.success) {
        throw new Error('Greška pri dodavanju administratora');
      }
      
      setTemporaryPassword(result.temporaryPassword || null);
      onSuccess(`Uspješno dodan ${email} kao administrator`);
      onAdminAdded();
    } catch (err) {
      console.error('Error adding admin user:', err);
      onError(err instanceof Error ? err.message : 'Greška pri dodavanju administratora');
    } finally {
      setActionLoading(false);
    }
  };

  const handleResetPassword = async (email: string): Promise<void> => {
    setResetLoading(true);
    
    if (!email.trim()) {
      onError('Molimo unesite valjanu e-mail adresu');
      setResetLoading(false);
      return;
    }

    try {
      const result = await resetAdminPassword(email);
      if (!result.success) {
        throw new Error('Greška pri resetovanju lozinke');
      }
      
      setTemporaryPassword(result.temporaryPassword || null);
      onSuccess(`Uspješno resetovana lozinka za ${email}`);
    } catch (err) {
      console.error('Error resetting admin credentials:', err);
      onError(err instanceof Error ? err.message : 'Greška pri resetovanju lozinke');
    } finally {
      setResetLoading(false);
    }
  };

  const clearTemporaryPassword = (): void => {
    setTemporaryPassword(null);
  };

  return {
    actionLoading,
    resetLoading,
    temporaryPassword,
    handleAddAdmin,
    handleResetPassword,
    clearTemporaryPassword
  };
}; 