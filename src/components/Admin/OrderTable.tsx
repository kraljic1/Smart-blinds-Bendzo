import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpDown } from 'lucide-react';
import { OrderData } from '../../utils/supabaseClient';
import { getStatusStyle, getStatusTranslation, formatDate } from '../../utils/orderStatusFormatter';

interface OrderTableProps {
  orders: OrderData[];
}

const OrderTable: React.FC<OrderTableProps> = ({ orders }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-900">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              <div className="flex items-center">
                ID Narudžbe
                <ArrowUpDown className="ml-1 h-4 w-4" />
              </div>
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              <div className="flex items-center">
                Datum
                <ArrowUpDown className="ml-1 h-4 w-4" />
              </div>
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              <div className="flex items-center">
                Kupac
                <ArrowUpDown className="ml-1 h-4 w-4" />
              </div>
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Email
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              <div className="flex items-center justify-end">
                Iznos
                <ArrowUpDown className="ml-1 h-4 w-4" />
              </div>
            </th>
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Akcije
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {orders.map((order) => (
            <tr key={order.order_id} className="hover:bg-gray-50 dark:hover:bg-gray-750">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                {order.order_id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {formatDate(order.created_at)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {order.customer_name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {order.customer_email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900 dark:text-white">
                €{order.total_amount.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusStyle(order.status)}`}>
                  {getStatusTranslation(order.status)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                <Link 
                  to={`/admin/orders/${order.order_id}`}
                  className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                >
                  Pregledaj Detalje
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable; 