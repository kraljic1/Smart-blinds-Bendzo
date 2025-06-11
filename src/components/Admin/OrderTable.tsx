import React from 'react';
import { OrderData } from '../../utils/supabaseClient';
import OrderTableHeader from './components/OrderTableHeader';
import OrderTableRow from './components/OrderTableRow';
import DeleteOrderDialog from './DeleteOrderDialog';
import NotificationToast from './NotificationToast';
import { useOrderDeletion } from './hooks/useOrderDeletion';
import { useNotification } from './hooks/useNotification';


interface OrderTableProps {
 orders: OrderData[];
 onOrderDeleted?: () => void;
}

/**
 * Main order table component for admin interface
 * Displays orders with actions for viewing and deleting
 * Core admin functionality for order management
 */
const OrderTable: React.FC<OrderTableProps> = ({ orders, onOrderDeleted }) => {
 const { notification, showNotification, hideNotification } = useNotification();
 const { 
 deleteDialog, 
 isDeleting, 
 handleDeleteClick, 
 handleDeleteConfirm, 
 handleDeleteCancel 
 } = useOrderDeletion();

 const onDeleteSuccess = () => {
 showNotification('success', `Narudžba ${deleteDialog.orderId} je uspješno obrisana.`);
 if (onOrderDeleted) {
 onOrderDeleted();
 }
 };

 const onDeleteError = (message: string) => {
 showNotification('error', message);
 };

 const handleConfirmDeletion = async () => {
 await handleDeleteConfirm(onDeleteSuccess, onDeleteError);
 };

 return (
 <>
 <div className="overflow-x-auto">
 <table className="admin-order-table min-w-full divide-y divide-gray-200 ">
 <OrderTableHeader />
 <tbody className="bg-white divide-y divide-gray-200 ">
 {orders.map((order) => (
 <OrderTableRow
 key={order.order_id}
 order={order}
 onDeleteClick={handleDeleteClick}
 />
 ))}
 </tbody>
 </table>
 </div>

 <DeleteOrderDialog
 isOpen={deleteDialog.isOpen}
 orderId={deleteDialog.orderId}
 customerName={deleteDialog.customerName}
 onConfirm={handleConfirmDeletion}
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