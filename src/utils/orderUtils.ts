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

// Valid order statuses
export type OrderStatus = 'received' | 'processing' | 'shipped' | 'completed' | 'cancelled';

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

/**
 * Update the status of an order
 * @param orderId The ID of the order to update
 * @param status The new status to set
 * @returns Updated order data or null on failure
 */
export const updateOrderStatus = async (
  orderId: string, 
  status: OrderStatus
): Promise<{ success: boolean; message: string; order?: SupabaseOrderData }> => {
  try {
    // Get the current order to check the previous status
    const { data: currentOrder, error: fetchError } = await supabase
      .from('orders')
      .select('status')
      .eq('order_id', orderId)
      .single();
    
    if (fetchError) throw fetchError;
    const previousStatus = currentOrder?.status;
    
    // Update the order status
    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('order_id', orderId)
      .select()
      .single();
    
    if (error) throw error;
    
    // Send email notification if status changed
    if (previousStatus !== status) {
      try {
        const appUrl = import.meta.env.VITE_APP_URL || window.location.origin;
        const emailUrl = new URL('/.netlify/functions/send-status-update', appUrl).toString();
        
        const emailResponse = await fetch(emailUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            orderId,
            status,
            previousStatus
          })
        });
        
        if (!emailResponse.ok) {
          console.warn('Email service responded with non-200 status:', emailResponse.status);
        }
      } catch (emailError) {
        console.error('Failed to send status update email:', emailError);
        // Continue processing - don't fail the update if email fails
      }
    }
    
    return {
      success: true,
      message: `Order status updated to ${status}`,
      order: data
    };
  } catch (error) {
    console.error(`Failed to update order ${orderId}:`, error);
    return {
      success: false,
      message: `Failed to update order status: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}; 