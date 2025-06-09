/**
 * Service for fetching orders via Netlify functions
 */
export class NetlifyOrderService {
  /**
   * Attempts to fetch order via Netlify function
   * @param orderId The order ID to fetch
   * @returns Promise<Record<string, unknown> | null>
   */
  static async fetchOrder(orderId: string): Promise<Record<string, unknown> | null> {
    try {
      const response = await fetch(`/.netlify/functions/get-orders?orderId=${encodeURIComponent(orderId)}`);
      
      if (response.ok) {
        const result = await response.json();
        if (result.success && result.orders.length > 0) {
          return result.orders[0];
        }
      }
    } catch (netlifyError) {
      console.warn('Netlify function not available for order details, falling back to direct Supabase:', netlifyError);
    }
    
    return null;
  }
} 