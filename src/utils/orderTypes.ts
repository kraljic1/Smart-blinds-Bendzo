// Re-export types for convenience
export type { BasketItem } from '../hooks/useBasket';

/**
 * Type definitions for order processing
 */
export interface CustomerInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  shippingAddress?: string;
  paymentMethod?: string;
  shippingMethod?: string;
}

// Valid order statuses
export type OrderStatus = 'received' | 'processing' | 'shipped' | 'completed' | 'cancelled';

export interface OrderItem {
  productId: string;
  productName: string;
  productImage?: string;
  quantity: number;
  price: number;
  width?: number;
  height?: number;
  options?: Record<string, string | number | boolean>;
}

export interface OrderData {
  customer: CustomerInfo;
  items: OrderItem[];
  notes?: string;
  totalAmount: number;
  taxAmount?: number;
  shippingCost?: number;
  discount?: {
    code?: string;
    amount?: number;
  };
}

export interface OrderResponse {
  success: boolean;
  orderId?: string;
  message: string;
  error?: string;
}

// Supabase order data structure (from database)
export interface SupabaseOrderData {
  id?: number;
  order_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  billing_address: string;
  shipping_address?: string;
  notes?: string;
  total_amount: number;
  tax_amount?: number;
  shipping_cost?: number;
  discount_amount?: number;
  discount_code?: string;
  payment_method?: string;
  payment_status?: string;
  shipping_method?: string;
  tracking_number?: string;
  status: string;
  created_at: string;
  updated_at?: string;
  stripe_payment_intent_id?: string;
  company_name?: string;
  company_oib?: string;
  needs_r1_invoice?: boolean;
  order_items?: SupabaseOrderItem[];
}

// Supabase order item structure
export interface SupabaseOrderItem {
  id: number;
  order_id: number;
  product_id?: string;
  product_name: string;
  product_image?: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
  options?: Record<string, any>;
  width?: number;
  height?: number;
} 