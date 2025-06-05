/**
 * Order retrieval service
 */

import { supabase } from '../supabaseClient';
import { SupabaseOrderData } from './types';
import { isDevelopmentMode } from './environment';
import { validateEmail } from './transformer';

/**
 * Get order history for a customer by email
 * @param email - Customer email address
 * @returns Promise<SupabaseOrderData[]> - Array of orders
 */
export const getOrderHistory = async (email: string): Promise<SupabaseOrderData[]> => {
  try {
    // Validate email parameter
    if (!validateEmail(email)) {
      console.error('Invalid email parameter provided to getOrderHistory');
      return [];
    }

    if (isDevelopmentMode()) {
      console.log('Development mode detected - using direct Supabase client');
      
      // Ensure supabase client is available
      if (!supabase) {
        console.error('Supabase client not available in development mode');
        return [];
      }
      
      // Use direct Supabase client in development
      const { data: orders, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            id,
            product_name,
            quantity,
            unit_price,
            subtotal,
            options,
            width,
            height
          )
        `)
        .eq('customer_email', email)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Supabase error in development:', error);
        return [];
      }
      
      return orders || [];
    }
    
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