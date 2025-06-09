import { ExtendedOrderData, ApiOrderItem } from '../../../types/adminOrder';
import { FieldMapper } from './FieldMapper';
import { OrderItemTransformer } from './OrderItemTransformer';

/**
 * Transforms API order responses to ExtendedOrderData format
 */
export class ApiOrderTransformer {
  /**
   * Transforms API order response to ExtendedOrderData format
   * @param order The order data from API
   * @returns Transformed ExtendedOrderData
   */
  static transform(order: Record<string, unknown>): ExtendedOrderData {
    return {
      orderId: FieldMapper.mapStringField(order, ['order_id', 'orderId']),
      customerName: FieldMapper.mapStringField(order, ['customer_name', 'customerName']),
      email: FieldMapper.mapStringField(order, ['customer_email', 'email']),
      phone: FieldMapper.mapStringField(order, ['customer_phone', 'phone']),
      billingAddress: FieldMapper.mapStringField(order, ['billing_address', 'billingAddress']),
      shippingAddress: FieldMapper.mapStringField(order, ['shipping_address', 'shippingAddress']),
      totalAmount: FieldMapper.mapNumberField(order, ['total_amount', 'totalAmount']),
      taxAmount: FieldMapper.mapNumberField(order, ['tax_amount', 'taxAmount']),
      shippingCost: FieldMapper.mapNumberField(order, ['shipping_cost', 'shippingCost']),
      discountAmount: FieldMapper.mapNumberField(order, ['discount_amount', 'discountAmount']),
      discountCode: FieldMapper.mapStringField(order, ['discount_code', 'discountCode']),
      paymentMethod: FieldMapper.mapStringField(order, ['payment_method', 'paymentMethod']),
      paymentStatus: FieldMapper.mapStringField(order, ['payment_status', 'paymentStatus']),
      shippingMethod: FieldMapper.mapStringField(order, ['shipping_method', 'shippingMethod']),
      trackingNumber: FieldMapper.mapStringField(order, ['tracking_number', 'trackingNumber']),
      status: order.status as string,
      notes: order.notes as string,
      createdAt: FieldMapper.mapStringField(order, ['created_at', 'createdAt']),
      updatedAt: FieldMapper.mapStringField(order, ['updated_at', 'updatedAt']),
      // Company fields for R1 invoices
      companyName: FieldMapper.mapStringField(order, ['company_name', 'companyName']),
      companyOib: FieldMapper.mapStringField(order, ['company_oib', 'companyOib']),
      needsR1Invoice: FieldMapper.mapBooleanField(order, ['needs_r1_invoice', 'needsR1Invoice']),
      items: OrderItemTransformer.transformApiItems(order.order_items as ApiOrderItem[] || [])
    };
  }
} 