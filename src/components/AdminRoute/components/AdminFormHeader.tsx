import React from 'react';

const AdminFormHeader: React.FC = () => {
  return (
    <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
      <h2 className="text-lg font-medium text-gray-900 dark:text-white">
        Dodaj Novog Administratora
      </h2>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Dodajte novog administratora ili obnovite postojećeg. Ako admin već postoji, biće obrisan i kreiran ponovo.
      </p>
    </div>
  );
};

export default AdminFormHeader; 