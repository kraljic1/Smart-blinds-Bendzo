import React from 'react';
import { ArrowUpDown } from 'lucide-react';

const OrderTableHeader: React.FC = () => {
  return (
    <thead className="bg-gray-50 dark:bg-gray-900">
      <tr>
        <th scope="col" className="col-order-id px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          <div className="flex items-center">
            ID Narudžbe
            <ArrowUpDown className="ml-1 h-4 w-4" />
          </div>
        </th>
        <th scope="col" className="col-date px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          <div className="flex items-center">
            Datum
            <ArrowUpDown className="ml-1 h-4 w-4" />
          </div>
        </th>
        <th scope="col" className="col-customer px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          <div className="flex items-center">
            Kupac
            <ArrowUpDown className="ml-1 h-4 w-4" />
          </div>
        </th>
        <th scope="col" className="col-email px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          Email
        </th>
        <th scope="col" className="col-amount px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          <div className="flex items-center justify-end">
            Iznos
            <ArrowUpDown className="ml-1 h-4 w-4" />
          </div>
        </th>
        <th scope="col" className="col-status px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          Status
        </th>
        <th scope="col" className="col-actions px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          Akcije
        </th>
      </tr>
    </thead>
  );
};

export default OrderTableHeader; 