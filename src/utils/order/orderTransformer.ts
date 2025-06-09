import { SupabaseOrderData } from '../orderTypes';

// Interface for API response order format
export interface ApiOrderResponse {
  id: number;
  order_id?: string;
  orderId?: string;
  customer_name?: string;
  customerName?: string;
  customer_email?: string;
  email?: string;
  customer_phone?: string;
  phone?: string;
  billing_address?: string;
  billingAddress?: string;
  shipping_address?: string;
  shippingAddress?: string;
  notes?: string;
  total_amount?: number;
  totalAmount?: number;
  tax_amount?: number;
  taxAmount?: number;
  shipping_cost?: number;
  shippingCost?: number;
  discount_amount?: number;
  discountAmount?: number;
  discount_code?: string;
  discountCode?: string;
  payment_method?: string;
  paymentMethod?: string;
  payment_status?: string;
  paymentStatus?: string;
  shipping_method?: string;
  shippingMethod?: string;
  tracking_number?: string;
  trackingNumber?: string;
  status: string;
  needs_r1_invoice?: boolean;
  needsR1Invoice?: boolean;
  company_name?: string;
  companyName?: string;
  company_oib?: string;
  companyOib?: string;
  created_at?: string;
  createdAt?: string;
  updated_at?: string;
  updatedAt?: string;
}

/**
 * Field mapping configuration for transforming API responses
 */
const fieldMappings = {
  order_id: ['order_id', 'orderId'],
  customer_name: ['customer_name', 'customerName'],
  customer_email: ['customer_email', 'email'],
  customer_phone: ['customer_phone', 'phone'],
  billing_address: ['billing_address', 'billingAddress'],
  shipping_address: ['shipping_address', 'shippingAddress'],
  total_amount: ['total_amount', 'totalAmount'],
  tax_amount: ['tax_amount', 'taxAmount'],
  shipping_cost: ['shipping_cost', 'shippingCost'],
  discount_amount: ['discount_amount', 'discountAmount'],
  discount_code: ['discount_code', 'discountCode'],
  payment_method: ['payment_method', 'paymentMethod'],
  payment_status: ['payment_status', 'paymentStatus'],
  shipping_method: ['shipping_method', 'shippingMethod'],
  tracking_number: ['tracking_number', 'trackingNumber'],
  needs_r1_invoice: ['needs_r1_invoice', 'needsR1Invoice'],
  company_name: ['company_name', 'companyName'],
  company_oib: ['company_oib', 'companyOib'],
  created_at: ['created_at', 'createdAt'],
  updated_at: ['updated_at', 'updatedAt']
} as const;

/**
 * Gets the first available string value from multiple possible field names
 */
const getStringValue = (order: ApiOrderResponse, fieldNames: readonly string[]): string | undefined => {
  for (const fieldName of fieldNames) {
    const value = (order as unknown as Record<string, unknown>)[fieldName];
    if (typeof value === 'string' && value !== '') {
      return value;
    }
  }
  return undefined;
};

/**
 * Gets the first available number value from multiple possible field names
 */
const getNumberValue = (order: ApiOrderResponse, fieldNames: readonly string[]): number | undefined => {
  for (const fieldName of fieldNames) {
    const value = (order as unknown as Record<string, unknown>)[fieldName];
    if (typeof value === 'number') {
      return value;
    }
  }
  return undefined;
};

/**
 * Gets the first available boolean value from multiple possible field names
 */
const getBooleanValue = (order: ApiOrderResponse, fieldNames: readonly string[]): boolean | undefined => {
  for (const fieldName of fieldNames) {
    const value = (order as unknown as Record<string, unknown>)[fieldName];
    if (typeof value === 'boolean') {
      return value;
    }
  }
  return undefined;
};

/**
 * Transform API response order to match expected SupabaseOrderData format
 */
export const transformOrderData = (order: ApiOrderResponse): SupabaseOrderData => ({
  id: order.id,
  order_id: getStringValue(order, fieldMappings.order_id) || '',
  customer_name: getStringValue(order, fieldMappings.customer_name) || '',
  customer_email: getStringValue(order, fieldMappings.customer_email) || '',
  customer_phone: getStringValue(order, fieldMappings.customer_phone) || '',
  billing_address: getStringValue(order, fieldMappings.billing_address) || '',
  shipping_address: getStringValue(order, fieldMappings.shipping_address),
  notes: order.notes,
  total_amount: getNumberValue(order, fieldMappings.total_amount) || 0,
  tax_amount: getNumberValue(order, fieldMappings.tax_amount),
  shipping_cost: getNumberValue(order, fieldMappings.shipping_cost),
  discount_amount: getNumberValue(order, fieldMappings.discount_amount),
  discount_code: getStringValue(order, fieldMappings.discount_code),
  payment_method: getStringValue(order, fieldMappings.payment_method),
  payment_status: getStringValue(order, fieldMappings.payment_status),
  shipping_method: getStringValue(order, fieldMappings.shipping_method),
  tracking_number: getStringValue(order, fieldMappings.tracking_number),
  status: order.status,
  needs_r1_invoice: getBooleanValue(order, fieldMappings.needs_r1_invoice),
  company_name: getStringValue(order, fieldMappings.company_name),
  company_oib: getStringValue(order, fieldMappings.company_oib),
  created_at: getStringValue(order, fieldMappings.created_at) || '',
  updated_at: getStringValue(order, fieldMappings.updated_at)
}); 