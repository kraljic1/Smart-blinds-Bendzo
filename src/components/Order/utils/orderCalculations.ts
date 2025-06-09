import { OrderItemDisplay, ExtendedOrderData } from '../types';

export interface OrderCalculations {
  subtotal: number;
  taxAmount: number;
  shippingCost: number;
  total: number;
}

export const calculateOrderTotals = (
  orderItems: OrderItemDisplay[],
  orderDetails: ExtendedOrderData | null
): OrderCalculations => {
  // Calculate subtotal from items (VAT-inclusive prices)
  const subtotal = orderItems.reduce((sum, item) => sum + (item.subtotal || 0), 0);
  
  // Calculate VAT from VAT-inclusive prices: VAT = price × (25/125) = price × 0.2
  const taxAmount = orderDetails?.taxAmount || (subtotal * 0.2);
  const shippingCost = orderDetails?.shippingCost || 0;
  
  // Total is subtotal + shipping (VAT already included in subtotal)
  const total = orderDetails?.totalAmount || (subtotal + shippingCost);

  return {
    subtotal,
    taxAmount,
    shippingCost,
    total
  };
}; 