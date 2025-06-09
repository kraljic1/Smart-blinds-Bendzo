import { ExtendedOrderData } from '../../types/adminOrder';
import { ApiOrderTransformer } from './transformers/ApiOrderTransformer';
import { SupabaseOrderTransformer } from './transformers/SupabaseOrderTransformer';
import { NetlifyOrderService } from './services/NetlifyOrderService';
import { SupabaseOrderService } from './services/SupabaseOrderService';

/**
 * Order fallback service with Netlify function support
 * Provides a unified interface for fetching orders from multiple sources
 */

/**
 * Function to get order by ID using the Netlify function with fallback
 * @param orderId The order ID to fetch
 * @returns Promise<ExtendedOrderData | null>
 */
export const getOrderByIdFallback = async (orderId: string): Promise<ExtendedOrderData | null> => {
  try {
    // Try Netlify function first
    const netlifyResult = await NetlifyOrderService.fetchOrder(orderId);
    if (netlifyResult) {
      return ApiOrderTransformer.transform(netlifyResult);
    }
    
    // Fallback to direct Supabase client
    const supabaseResult = await SupabaseOrderService.fetchOrder(orderId);
    if (supabaseResult) {
      return SupabaseOrderTransformer.transform(supabaseResult);
    }
    
    return null;
    
  } catch (error) {
    console.error(`Failed to fetch order ${orderId}:`, error);
    return null;
  }
}; 