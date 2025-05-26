import { OrderStatus, SupabaseOrderData } from './orderTypes';

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
    
    // Check if we're in development mode (localhost)
    const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    
    if (isDevelopment) {
      console.log('Development mode detected - returning mock order status update');
      // Return mock success response for development mode
      return {
        success: true,
        message: `Order ${orderId} status updated to ${status} (development mode - mock response)`
      };
    }
    
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