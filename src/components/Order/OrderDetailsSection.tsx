import React from 'react';
import { useOrderDetails } from './hooks/useOrderDetails';
import { calculateOrderTotals } from './utils/orderCalculations';
import { OrderItemDisplay } from './types';
import LoadingSpinner from './LoadingSpinner';
import OrderDetailsContent from './components/OrderDetailsContent';
import OrderErrorState from './components/OrderErrorState';

interface OrderDetailsSectionProps {
  orderId: string;
}

const OrderDetailsSection: React.FC<OrderDetailsSectionProps> = ({ orderId }) => {
  const { orderDetails, isLoading, fetchError, refetchOrder } = useOrderDetails(orderId);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (orderDetails) {
    // Get items from the order details
    const orderItems: OrderItemDisplay[] = orderDetails.items || [];
    
    // Calculate order totals
    const calculations = calculateOrderTotals(orderItems, orderDetails);

    return (
      <OrderDetailsContent
        orderDetails={orderDetails}
        orderItems={orderItems}
        calculations={calculations}
      />
    );
  }

  // Error state
  return (
    <OrderErrorState
      orderId={orderId}
      fetchError={fetchError}
      onRetry={refetchOrder}
    />
  );
};

export default OrderDetailsSection; 