/**
 * Order retrieval by ID service
 */

import { supabase } from '../supabaseClient';
import { TransformedOrderData } from './types';
import { isDevelopmentMode } from './environment';
import { transformOrderData, validateOrderId } from './transformer';

/**
 * Get a specific order by ID
 * @param orderId - Order ID to retrieve
 * @returns Promise<TransformedOrderData | null> - Transformed order data or null if not found
 */
export const getOrderById = async (orderId: string): Promise<TransformedOrderData | null> => {
  try {
    // Validate orderId parameter
    if (!validateOrderId(orderId)) {
      console.error('Invalid orderId parameter provided to getOrderById');
      return null;
    }

    console.log('Fetching order by ID:', orderId);
    
    if (isDevelopmentMode()) {
      console.log('Development mode detected - using direct Supabase client');
      
      // Ensure supabase client is available
      if (!supabase) {
        console.error('Supabase client not available in development mode');
        return null;
      }
      
      // Use direct Supabase client in development
      const { data: order, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            id,
            product_id,
            product_name,
            quantity,
            unit_price,
            subtotal,
            options,
            width,
            height
          )
        `)
        .eq('order_id', orderId)
        .single();
      
      if (error) {
        console.error('Supabase error in development:', error);
        if (error.code === 'PGRST116') {
          console.log('Order not found in database');
          return null;
        }
        throw new Error(`Database error: ${error.message}`);
      }
      
      if (!order) {
        console.log('No order data returned');
        return null;
      }
      
      console.log('Raw order data from Supabase:', order);
      const transformedOrder = transformOrderData(order);
      console.log('Transformed order data:', transformedOrder);
      return transformedOrder;
    }
    
    // Use the serverless function to fetch order with items included
    console.log('Production mode - using Netlify function');
    const url = `/.netlify/functions/get-orders?orderId=${encodeURIComponent(orderId)}`;
    console.log('Fetching from URL:', url);
    
    const response = await fetch(url);
    
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Server error response:', errorText);
      throw new Error(`Server responded with status: ${response.status} - ${errorText}`);
    }
    
    const result = await response.json();
    console.log('API response:', result);
    
    if (!result.success) {
      console.error('API returned error:', result.message);
      throw new Error(result.message || 'API request failed');
    }
    
    if (!result.orders || result.orders.length === 0) {
      console.log('No orders found in API response');
      return null;
    }
    
    const order = result.orders[0];
    console.log('Order found:', order);
    
    const transformedOrder = transformOrderData(order);
    console.log('Final transformed order:', transformedOrder);
    return transformedOrder;
    
  } catch (error) {
    console.error(`Failed to fetch order ${orderId}:`, error);
    throw error; // Re-throw to let the calling code handle it
  }
}; 