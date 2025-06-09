import React from 'react';
import { ExtendedOrderData, OrderItemDisplay } from '../types';
import { OrderCalculations } from '../utils/orderCalculations';
import CustomerInformation from '../CustomerInformation';
import OrderItemsTable from '../OrderItemsTable';
import OrderSummary from '../OrderSummary';
import OrderNotes from '../OrderNotes';

interface OrderDetailsContentProps {
  orderDetails: ExtendedOrderData;
  orderItems: OrderItemDisplay[];
  calculations: OrderCalculations;
}

const OrderDetailsContent: React.FC<OrderDetailsContentProps> = ({
  orderDetails,
  orderItems,
  calculations
}) => {
  const { subtotal, taxAmount, shippingCost, total } = calculations;

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
};

export default OrderDetailsContent; 