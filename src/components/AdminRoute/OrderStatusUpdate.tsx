import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, Loader } from 'lucide-react';
import { OrderStatus, updateOrderStatus } from '../../utils/orderUtils';
import { OrderData as SupabaseOrderData } from '../../utils/supabaseClient';

interface OrderStatusUpdateProps {
  orderId: string;
  currentStatus: string;
  onStatusUpdate: (updatedOrder: SupabaseOrderData) => void;
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

  const handleStatusChange = async () => {
    if (status === currentStatus) {
      setResult({
        success: false,
        message: 'No changes to save. Status is the same.'
      });
      return;
    }

    setIsLoading(true);
    setResult({});

    try {
      const result = await updateOrderStatus(orderId, status);
      
      setResult({
        success: result.success,
        message: result.message
      });

      if (result.success && result.order) {
        onStatusUpdate(result.order);
      }
    } catch (error) {
      setResult({
        success: false,
        message: error instanceof Error ? error.message : 'An unknown error occurred'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Update Order Status</h3>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <label htmlFor="status-select" className="sr-only">
            Select Status
          </label>
          <select
            id="status-select"
            className="block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            value={status}
            onChange={(e) => setStatus(e.target.value as OrderStatus)}
            disabled={isLoading}
          >
            {availableStatuses.map((statusOption) => (
              <option key={statusOption} value={statusOption}>
                {statusOption.charAt(0).toUpperCase() + statusOption.slice(1)}
              </option>
            ))}
          </select>
        </div>
        
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          onClick={handleStatusChange}
          disabled={isLoading || status === currentStatus}
        >
          {isLoading ? (
            <>
              <Loader className="h-4 w-4 animate-spin mr-2" />
              Updating...
            </>
          ) : (
            'Update Status'
          )}
        </button>
      </div>
      
      {result.message && (
        <div className={`mt-4 rounded-md p-3 ${
          result.success 
            ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-400'
            : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-400'
        }`}>
          <div className="flex">
            <div className="flex-shrink-0">
              {result.success ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-red-500" />
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