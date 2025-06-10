import React from 'react';
import { OrderData } from '../../../utils/supabaseClient';
import { getStatusStyle, getStatusTranslation, formatDate } from '../../../utils/orderStatusFormatter';
import OrderTableActions from './OrderTableActions';

interface OrderTableRowProps {
  order: OrderData;
  onDeleteClick: (orderId: string, customerName: string) => void;
}

/**
 * Individual order row component
 * Displays order information and actions
 */
const OrderTableRow: React.FC<OrderTableRowProps> = ({ order, onDeleteClick }) => {
  return (
    <tr key={order.order_id} className="hover:bg-gray-50 dark:hover:bg-gray-750">
      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white text-wrap">
        {order.order_id}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
        {formatDate(order.created_at)}
      </td>
      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white text-wrap">
        {order.customer_name}
      </td>
      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 text-wrap">
        {order.customer_email}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900 dark:text-white">
        €{order.total_amount.toFixed(2)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-center">
        <span className={`status-badge inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusStyle(order.status)}`}>
          {getStatusTranslation(order.status)}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
        <OrderTableActions
          orderId={order.order_id}
          customerName={order.customer_name}
          onDeleteClick={onDeleteClick}
        />
      </td>
    </tr>
  );
};

export default OrderTableRow; 