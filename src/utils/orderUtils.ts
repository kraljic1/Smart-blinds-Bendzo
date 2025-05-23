import { BasketItem } from '../hooks/useBasket';
import { OrderData as SupabaseOrderData } from './supabaseClient';

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

/**
 * Submit order to the serverless function
 */
export const submitOrder = async (orderData: OrderData): Promise<OrderResponse> => {
  try {
    // Check if we're in development mode (localhost)
    const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    
    // Determine the API endpoint - can use either /api or /.netlify/functions paths
    const apiUrl = '/.netlify/functions/process-order';
    
    // If in development mode and not using Netlify Dev, create a mock response
    if (isDevelopment) {
      console.log('Development mode detected - using Netlify Dev or mocking response');
      
      // Use a slight delay to simulate network request
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Check if Netlify functions are available by making a test request
      try {
        const testResponse = await fetch(apiUrl, { method: 'HEAD' });
        if (testResponse.status === 404) {
          // Netlify functions not available, return mock data
          console.log('Netlify functions not available, returning mock response');
          
          // Generate a mock order ID
          const mockOrderId = `DEV-ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
          
          // Log order data for debugging
          console.log('Order data that would be submitted:', orderData);
          
          return {
            success: true,
            orderId: mockOrderId,
            message: 'Order received (development mode - mock response)'
          };
        }
      } catch {
        // If the test request fails, return mock data
        console.log('Netlify functions not available, returning mock response');
        
        // Generate a mock order ID
        const mockOrderId = `DEV-ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        
        // Log order data for debugging
        console.log('Order data that would be submitted:', orderData);
        
        return {
          success: true,
          orderId: mockOrderId,
          message: 'Order received (development mode - mock response)'
        };
      }
    }
    
    // Log the order data before submission for debugging
    console.log('Submitting order with data:', JSON.stringify(orderData));
    
    // Make the actual API call if we're in production or Netlify Dev is running
    const response = await fetch(apiUrl, {
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
    // Use the serverless function to fetch orders with items included
    const response = await fetch(`/.netlify/functions/get-orders?email=${encodeURIComponent(email)}`);
    
    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }
    
    const result = await response.json();
    return result.success ? result.orders : [];
    
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
    // Use the serverless function to fetch order with items included
    const response = await fetch(`/.netlify/functions/get-orders?orderId=${encodeURIComponent(orderId)}`);
    
    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }
    
    const result = await response.json();
    return result.success && result.orders.length > 0 ? result.orders[0] : null;
    
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
    productImage: item.product.image,
    quantity: item.quantity,
    price: item.product.price,
    width: item.options?.width as number | undefined,
    height: item.options?.height as number | undefined,
    options: item.options
  }));
};

/**
 * Update the status of an order using the Netlify function
 * @param orderId The ID of the order to update
 * @param status The new status to set
 * @returns Updated order data or null on failure
 */
export const updateOrderStatus = async (
  orderId: string, 
  status: OrderStatus
): Promise<{ success: boolean; message: string; order?: SupabaseOrderData }> => {
  try {
    console.log(`Updating order ${orderId} to status: ${status}`);
    
    // Use the Netlify function for more reliable server-side processing
    const response = await fetch('/.netlify/functions/update-order-status', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        orderId,
        status
      })
    });

    const result = await response.json();
    
    if (!response.ok) {
      console.error('Order status update failed:', result);
      return {
        success: false,
        message: result.message || `Server error: ${response.status}`,
      };
    }

    console.log('Order status updated successfully:', result);
    return result;
    
  } catch (error) {
    console.error(`Failed to update order ${orderId}:`, error);
    return {
      success: false,
      message: `Failed to update order status: ${error instanceof Error ? error.message : 'Network error'}`
    };
  }
}; 