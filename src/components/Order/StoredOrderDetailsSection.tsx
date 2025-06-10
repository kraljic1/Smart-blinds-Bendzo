import React from 'react';
import { OrderDetails } from '../Checkout/utils/orderDetails';
import CustomerInfoSection from './components/CustomerInfoSection';
import ShippingPaymentSection from './components/ShippingPaymentSection';
import OrderItemsTable from './components/OrderItemsTable';
import OrderSummarySection from './components/OrderSummarySection';
import OrderNotesSection from './components/OrderNotesSection';

interface StoredOrderDetailsSectionProps {
  orderDetails: OrderDetails;
}

/**
 * Main component for displaying stored order details
 * Orchestrates the display of customer info, shipping, items, and summary
 */
const StoredOrderDetailsSection: React.FC<StoredOrderDetailsSectionProps> = ({ orderDetails }) => {
  return (
    <>
      {/* Customer Information */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Billing Info */}
          <CustomerInfoSection orderDetails={orderDetails} />

          {/* Shipping & Payment Info */}
          <ShippingPaymentSection orderDetails={orderDetails} />
        </div>
      </div>

      {/* Order Items */}
      <OrderItemsTable orderDetails={orderDetails} />

      {/* Order Summary */}
      <OrderSummarySection orderDetails={orderDetails} />

      {/* Notes */}
      <OrderNotesSection notes={orderDetails.notes} />
    </>
  );
};

export default StoredOrderDetailsSection; 