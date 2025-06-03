import React from 'react';
import { Loader } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-16">
      <Loader className="w-8 h-8 animate-spin text-blue-600" />
      <span className="ml-3 text-gray-600 dark:text-gray-300">Učitavam detalje narudžbe...</span>
    </div>
  );
};

export default LoadingSpinner; 