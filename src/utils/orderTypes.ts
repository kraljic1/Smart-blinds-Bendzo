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

// Re-export Supabase types for convenience
export type { OrderData as SupabaseOrderData } from './supabaseClient'; 