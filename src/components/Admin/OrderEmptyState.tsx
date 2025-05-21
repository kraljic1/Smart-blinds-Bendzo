import React from 'react';
import { Filter } from 'lucide-react';

interface OrderEmptyStateProps {
  searchTerm: string;
  onClearFilter: () => void;
}

const OrderEmptyState: React.FC<OrderEmptyStateProps> = ({
  searchTerm,
  onClearFilter
}) => {
  if (searchTerm) {
    return (
      <div className="px-4 py-16 text-center">
        <Filter className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Nema rezultata pretrage</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Nismo mogli pronaći narudžbe koje odgovaraju vašoj pretrazi.</p>
        <div className="mt-6">
          <button 
            type="button" 
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={onClearFilter}
          >
            Očisti filter
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-16 text-center">
      <Filter className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Nema narudžbi</h3>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Započnite dodavanjem svoje prve narudžbe.</p>
    </div>
  );
};

export default OrderEmptyState; 