import { ExtendedOrderData, SupabaseOrderItem } from '../../../types/adminOrder';
import { OrderItemTransformer } from './OrderItemTransformer';

/**
 * Transforms Supabase order responses to ExtendedOrderData format
 */
export class SupabaseOrderTransformer {
  /**
   * Transforms Supabase order response to ExtendedOrderData format
   * @param order The order data from Supabase
   * @returns Transformed ExtendedOrderData
   */
  static transform(order: Record<string, unknown>): ExtendedOrderData {
    return {
      orderId: order.order_id as string,
      customerName: order.customer_name as string,
      email: order.customer_email as string,
      phone: order.customer_phone as string,
      billingAddress: order.billing_address as string,
      shippingAddress: order.shipping_address as string,
      totalAmount: order.total_amount as number,
      taxAmount: order.tax_amount as number,
      shippingCost: order.shipping_cost as number,
      discountAmount: order.discount_amount as number,
      discountCode: order.discount_code as string,
      paymentMethod: order.payment_method as string,
      paymentStatus: order.payment_status as string,
      shippingMethod: order.shipping_method as string,
      trackingNumber: order.tracking_number as string,
      status: order.status as string,
      notes: order.notes as string,
      createdAt: order.created_at as string,
      updatedAt: order.updated_at as string,
      // Company fields for R1 invoices
      companyName: order.company_name as string,
      companyOib: order.company_oib as string,
      needsR1Invoice: order.needs_r1_invoice as boolean,
      items: OrderItemTransformer.transformSupabaseItems(order.order_items as SupabaseOrderItem[] || [])
    };
  }
} 