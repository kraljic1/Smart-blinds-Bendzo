import React from 'react';
import { useAdminActions } from './hooks/useAdminActions';
import {
  AdminFormHeader,
  AddAdminSection,
  ResetPasswordSection,
  TemporaryPasswordDisplay
} from './components';

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
  const {
    actionLoading,
    resetLoading,
    temporaryPassword,
    handleAddAdmin,
    handleResetPassword,
    clearTemporaryPassword
  } = useAdminActions({
    onSuccess,
    onError,
    onAdminAdded
  });

  return (
    <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg mb-8">
      <AdminFormHeader />
      
      <AddAdminSection
        onSubmit={handleAddAdmin}
        isLoading={actionLoading}
      />

      <ResetPasswordSection
        onSubmit={handleResetPassword}
        isLoading={resetLoading}
      />

      {temporaryPassword && (
        <TemporaryPasswordDisplay
          password={temporaryPassword}
          onClose={clearTemporaryPassword}
        />
      )}
    </div>
  );
};

export default AddAdminForm; 