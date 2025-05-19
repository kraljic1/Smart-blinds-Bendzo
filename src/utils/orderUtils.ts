import { BasketItem } from '../hooks/useBasket';
import { supabase } from './supabaseClient';
import { OrderData as SupabaseOrderData } from './supabaseClient';

/**
 * Type definitions for order processing
 */
export interface CustomerInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  options?: Record<string, string | number | boolean>;
}

export interface OrderData {
  customer: CustomerInfo;
  items: OrderItem[];
  notes?: string;
  totalAmount: number;
}

export interface OrderResponse {
  success: boolean;
  orderId?: string;
  message: string;
  error?: string;
}

/**
 * Submit order to the serverless function
 */
export const submitOrder = async (orderData: OrderData): Promise<OrderResponse> => {
  try {
    // First, use our serverless function to process the order
    const response = await fetch('/.netlify/functions/process-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });
    
    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Order submission failed:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Order submission failed'
    };
  }
};

/**
 * Get order history for a customer by email
 */
export const getOrderHistory = async (email: string): Promise<SupabaseOrderData[]> => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('customer_email', email)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return data || [];
  } catch (error) {
    console.error('Failed to fetch order history:', error);
    return [];
  }
};

/**
 * Get a specific order by ID
 */
export const getOrderById = async (orderId: string): Promise<SupabaseOrderData | null> => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('order_id', orderId)
      .single();
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error(`Failed to fetch order ${orderId}:`, error);
    return null;
  }
};

/**
 * Convert basket items to order items format
 */
export const basketItemsToOrderItems = (items: BasketItem[]): OrderItem[] => {
  return items.map(item => ({
    productId: item.product.id,
    productName: item.product.name,
    quantity: item.quantity,
    price: item.product.price,
    options: item.options
  }));
}; 