import { supabase } from '../supabaseClient';
import type { OrderData } from '../../types/order';

/**
 * Order creation functions
 */

/**
 * Creates a new order
 * @param orderData The order data to insert
 */
export async function createOrder(orderData: OrderData) {
 const { data, error } = await supabase
 .from('orders')
 .insert([orderData])
 .select();
 
 if (error) {
 console.error('Error creating order:', error);
 throw error;
 }
 
 return data?.[0];
} 