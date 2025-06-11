import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, Loader } from 'lucide-react';
import { OrderStatus, updateOrderStatus } from '../../utils/orderUtils';
import { getStatusTranslation } from '../../utils/orderStatusFormatter';
import ModernDropdown from '../UI/ModernDropdown';

interface OrderStatusUpdateProps {
 orderId: string;
 currentStatus: string;
 onStatusUpdate: () => void;
}

const OrderStatusUpdate: React.FC<OrderStatusUpdateProps> = ({
 orderId,
 currentStatus,
 onStatusUpdate
}) => {
 const [status, setStatus] = useState<OrderStatus>(currentStatus as OrderStatus);
 const [isLoading, setIsLoading] = useState(false);
 const [result, setResult] = useState<{
 success?: boolean;
 message?: string;
 }>({});

 // Available statuses for the dropdown
 const availableStatuses: OrderStatus[] = [
 'received',
 'processing',
 'shipped',
 'completed',
 'cancelled'
 ];

 // Convert statuses to dropdown options
 const dropdownOptions = availableStatuses.map(statusOption => ({
 value: statusOption,
 label: getStatusTranslation(statusOption)
 }));



 const handleStatusChange = async () => {
 if (status === currentStatus) {
 setResult({
 success: false,
 message: 'Nema promjena za spremanje. Status je isti.'
 });
 return;
 }

 setIsLoading(true);
 setResult({});

 try {
 console.log(`Attempting to update order ${orderId} from ${currentStatus} to ${status}`);
 const result = await updateOrderStatus(orderId, status);
 
 console.log('Update result:', result);
 
 // Translate success message to Croatian
 let message = result.message;
 if (result.success) {
 message = `Status narudžbe je uspješno ažuriran na"${getStatusTranslation(status)}". ${result.message.includes('email') ? 'Email obavijest je poslana kupcu.' : 'Email obavijest nije konfigurirana.'}`;
 }
 
 setResult({
 success: result.success,
 message: message
 });

 if (result.success) {
 // Give user feedback about the successful update
 console.log('Order status updated successfully, calling onStatusUpdate');
 onStatusUpdate();
 }
 } catch (error) {
 console.error('Error in handleStatusChange:', error);
 setResult({
 success: false,
 message: error instanceof Error ? error.message : 'Dogodila se mrežna greška. Molimo pokušajte ponovno.'
 });
 } finally {
 setIsLoading(false);
 }
 };

 return (
 <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 p-4">
 <h3 className="text-lg font-medium text-gray-900 mb-4">Ažuriraj Status Narudžbe</h3>
 
 {/* Current status display */}
 <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
 <span className="text-sm text-gray-600">Trenutni Status: </span>
 <span className="font-semibold text-gray-900 capitalize">
 {getStatusTranslation(currentStatus)}
 </span>
 </div>
 
 <div className="flex flex-col sm:flex-row gap-3">
 <div className="flex-1">
 <label htmlFor="status-select"className="sr-only">
 Odaberi Status
 </label>
 <ModernDropdown
 options={dropdownOptions}
 value={status}
 onChange={(value) => setStatus(value as OrderStatus)}
 placeholder="Odaberi status"
 disabled={isLoading}
 className="w-full"
 id="status-select"
 />
 </div>
 
 <button
 type="button"
 className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
 onClick={handleStatusChange}
 disabled={isLoading || status === currentStatus}
 >
 {isLoading ? (
 <>
 <Loader className="h-4 w-4 animate-spin mr-2"/>
 Ažuriranje...
 </>
 ) : (
 'Ažuriraj Status'
 )}
 </button>
 </div>
 
 {result.message && (
 <div className={`mt-4 rounded-md p-3 ${
 result.success 
 ? 'bg-green-50 dark:bg-green-900/20 text-green-800 '
 : 'bg-red-50 dark:bg-red-900/20 text-red-800 '
 }`}>
 <div className="flex">
 <div className="flex-shrink-0">
 {result.success ? (
 <CheckCircle className="h-5 w-5 text-green-500"/>
 ) : (
 <AlertTriangle className="h-5 w-5 text-red-500"/>
 )}
 </div>
 <div className="ml-3">
 <p className="text-sm">{result.message}</p>
 </div>
 </div>
 </div>
 )}
 </div>
 );
};

export default OrderStatusUpdate; 