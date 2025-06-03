import React, { useState, useEffect } from 'react';
import { getOrderById } from '../../utils/orderUtils';
import { ExtendedOrderData, OrderItemDisplay } from './types';
import CustomerInformation from './CustomerInformation';
import OrderItemsTable from './OrderItemsTable';
import OrderSummary from './OrderSummary';
import OrderNotes from './OrderNotes';
import LoadingSpinner from './LoadingSpinner';

interface OrderDetailsSectionProps {
  orderId: string;
}

const OrderDetailsSection: React.FC<OrderDetailsSectionProps> = ({ orderId }) => {
  const [orderDetails, setOrderDetails] = useState<ExtendedOrderData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const fetchOrderDetails = async () => {
    if (!orderId) return;
    
    setIsLoading(true);
    setFetchError(null);
    
    console.log('Fetching order details for:', orderId);
    
    try {
      const data = await getOrderById(orderId);
      console.log('Order details received:', data);
      
      if (data) {
        setOrderDetails(data as unknown as ExtendedOrderData);
      } else {
        setFetchError('Narudžba nije pronađena u bazi podataka');
      }
    } catch (error) {
      console.error('Error fetching order details:', error);
      setFetchError('Greška pri dohvaćanju detalja narudžbe');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]);

  const handleRetryFetch = () => {
    fetchOrderDetails();
  };

  // Get items from the order details
  const orderItems: OrderItemDisplay[] = orderDetails?.items || [];

  // Calculate subtotal from items
  const subtotal = orderItems.reduce((sum, item) => sum + (item.subtotal || 0), 0);
  const taxAmount = orderDetails?.taxAmount || (subtotal * 0.25); // 25% PDV
  const shippingCost = orderDetails?.shippingCost || 0;
  const total = orderDetails?.totalAmount || (subtotal + taxAmount + shippingCost);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (orderDetails) {
    return (
      <>
        <CustomerInformation orderDetails={orderDetails} />
        
        <OrderItemsTable orderItems={orderItems} />

        <OrderSummary 
          subtotal={subtotal}
          taxAmount={taxAmount}
          shippingCost={shippingCost}
          total={total}
        />

        {orderDetails.notes && (
          <OrderNotes notes={orderDetails.notes} />
        )}
      </>
    );
  }

  // Error state
  return (
    <div className="p-6 text-center">
      <div className="mb-4">
        <p className="text-gray-500 dark:text-gray-400 mb-2">
          {fetchError || 'Nema dostupnih detalja narudžbe'}
        </p>
        <p className="text-sm text-gray-400 dark:text-gray-500">
          ID narudžbe: {orderId}
        </p>
      </div>
      
      {fetchError && (
        <div className="space-y-4">
          <button
            onClick={handleRetryFetch}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Pokušaj ponovno
          </button>
          
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <p>Ako se problem nastavi, molimo kontaktirajte nas:</p>
            <p className="mt-1">
              <a href="mailto:info@smartblinds.hr" className="text-blue-600 hover:underline">
                info@smartblinds.hr
              </a>
              {' '}ili{' '}
              <a href="tel:+385989861054" className="text-blue-600 hover:underline">
                +385 98 986 1054
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetailsSection; 