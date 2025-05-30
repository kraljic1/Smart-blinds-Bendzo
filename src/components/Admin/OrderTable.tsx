import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpDown, Trash2 } from 'lucide-react';
import { OrderData } from '../../utils/supabaseClient';
import { getStatusStyle, getStatusTranslation, formatDate } from '../../utils/orderStatusFormatter';
import { deleteOrder } from '../../utils/orderDeletion';
import DeleteOrderDialog from './DeleteOrderDialog';
import NotificationToast from './NotificationToast';
import '../../styles/AdminOrderTable.css';

interface OrderTableProps {
  orders: OrderData[];
  onOrderDeleted?: () => void;
}

const OrderTable: React.FC<OrderTableProps> = ({ orders, onOrderDeleted }) => {
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    orderId: string;
    customerName: string;
  }>({
    isOpen: false,
    orderId: '',
    customerName: ''
  });
  const [isDeleting, setIsDeleting] = useState(false);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
    isVisible: boolean;
  }>({
    type: 'success',
    message: '',
    isVisible: false
  });

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({
      type,
      message,
      isVisible: true
    });
  };

  const hideNotification = () => {
    setNotification(prev => ({ ...prev, isVisible: false }));
  };

  const handleDeleteClick = (orderId: string, customerName: string) => {
    setDeleteDialog({
      isOpen: true,
      orderId,
      customerName
    });
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteOrder(deleteDialog.orderId);
      
      if (result.success) {
        // Close dialog
        setDeleteDialog({ isOpen: false, orderId: '', customerName: '' });
        
        // Show success notification
        showNotification('success', `Narudžba ${deleteDialog.orderId} je uspješno obrisana.`);
        
        // Notify parent component to refresh the orders list
        if (onOrderDeleted) {
          onOrderDeleted();
        }
        
        console.log('Order deleted successfully:', result.message);
      } else {
        // Show error notification
        showNotification('error', `Greška pri brisanju narudžbe: ${result.message}`);
        console.error('Failed to delete order:', result.message);
      }
    } catch (error) {
      console.error('Unexpected error during deletion:', error);
      showNotification('error', 'Neočekivana greška pri brisanju narudžbe');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ isOpen: false, orderId: '', customerName: '' });
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="admin-order-table min-w-full divide-y divide-gray-200 dark:divide-gray-700">
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
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {orders.map((order) => (
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
                  <div className="action-buttons flex items-center justify-center space-x-3">
                    <Link 
                      to={`/admin/orders/${order.order_id}`}
                      className="action-button view text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                    >
                      Pregledaj Detalje
                    </Link>
                    <button
                      onClick={() => handleDeleteClick(order.order_id, order.customer_name)}
                      className="action-button delete text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 font-medium inline-flex items-center"
                      title="Obriši narudžbu"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Obriši
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DeleteOrderDialog
        isOpen={deleteDialog.isOpen}
        orderId={deleteDialog.orderId}
        customerName={deleteDialog.customerName}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        isDeleting={isDeleting}
      />

      <NotificationToast
        type={notification.type}
        message={notification.message}
        isVisible={notification.isVisible}
        onClose={hideNotification}
      />
    </>
  );
};

export default OrderTable; 