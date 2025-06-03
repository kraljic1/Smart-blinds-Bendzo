import React from 'react';
import { Search } from 'lucide-react';

interface OrderSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  totalOrders: number;
  filteredOrdersCount: number;
  currentPage?: number;
  itemsPerPage?: number;
}

const OrderSearch: React.FC<OrderSearchProps> = ({
  searchTerm,
  setSearchTerm,
  totalOrders,
  filteredOrdersCount,
  currentPage,
  itemsPerPage
}) => {
  // Calculate display information for pagination
  const getDisplayInfo = () => {
    if (currentPage && itemsPerPage) {
      const startItem = (currentPage - 1) * itemsPerPage + 1;
      const endItem = Math.min(currentPage * itemsPerPage, filteredOrdersCount);
      return `Stranica ${currentPage} - prikazano ${startItem}-${endItem} od ${filteredOrdersCount} ${searchTerm ? 'filtriranih' : ''} narudžbi (ukupno ${totalOrders})`;
    }
    return `Prikazano ${filteredOrdersCount} od ${totalOrders} narudžbi`;
  };
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900 sm:rounded-t-lg">
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <div className="relative rounded-md shadow-sm max-w-xs">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            id="order-search"
            name="orderSearch"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Pretraži narudžbe..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {getDisplayInfo()}
        </div>
      </div>
    </div>
  );
};

export default OrderSearch; 