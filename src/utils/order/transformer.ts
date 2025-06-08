/**
 * Order data transformation utilities
 */

import { TransformedOrderData, SupabaseOrderData, SupabaseOrderItem } from './types';

/**
 * Transform raw Supabase order data to the expected format
 * @param order - Raw order data from Supabase
 * @returns Transformed order data
 */
export const transformOrderData = (order: SupabaseOrderData): TransformedOrderData => {
  return {
    orderId: order.order_id,
    customerName: order.customer_name,
    email: order.customer_email,
    phone: order.customer_phone,
    billingAddress: order.billing_address,
    shippingAddress: order.shipping_address,
    totalAmount: order.total_amount,
    taxAmount: order.tax_amount,
    shippingCost: order.shipping_cost,
    discountAmount: order.discount_amount,
    discountCode: order.discount_code,
    paymentMethod: order.payment_method,
    paymentStatus: order.payment_status,
    shippingMethod: order.shipping_method,
    trackingNumber: order.tracking_number,
    status: order.status,
    notes: order.notes,
    createdAt: order.created_at,
    updatedAt: order.updated_at,
    // Company fields for R1 invoices
    companyName: order.company_name,
    companyOib: order.company_oib,
    needsR1Invoice: order.needs_r1_invoice,
    items: (order.order_items || []).map((item: SupabaseOrderItem) => ({
      productId: item.product_id || `item-${item.id}`,
      productName: item.product_name || 'Proizvod bez naziva',
      quantity: item.quantity,
      unitPrice: item.unit_price,
      subtotal: item.subtotal,
      width: item.width,
      height: item.height,
      options: item.options || {}
    }))
  };
};

/**
 * Validate order ID parameter
 * @param orderId - Order ID to validate
 * @returns true if valid, false otherwise
 */
export const validateOrderId = (orderId: string): boolean => {
  return !!(orderId && typeof orderId === 'string');
};

/**
 * Validate email parameter
 * @param email - Email to validate
 * @returns true if valid, false otherwise
 */
export const validateEmail = (email: string): boolean => {
  return !!(email && typeof email === 'string');
}; 