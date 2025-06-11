import { supabase } from '../supabaseClient';
import { ApiOrderResponse } from './orderTransformer';

/**
 * Fetches orders from Netlify function
 */
export const fetchOrdersFromNetlify = async (): Promise<ApiOrderResponse[]> => {
 const response = await fetch('/.netlify/functions/get-orders');
 
 if (!response.ok) {
 throw new Error(`Netlify function failed with status: ${response.status}`);
 }
 
 const result = await response.json();
 
 if (!result.success) {
 throw new Error('Netlify function returned unsuccessful response');
 }
 
 return result.orders;
};

/**
 * Fetches orders directly from Supabase
 */
export const fetchOrdersFromSupabase = async (): Promise<ApiOrderResponse[]> => {
 const { data, error } = await supabase
 .from('orders')
 .select('*')
 .order('created_at', { ascending: false });
 
 if (error) {
 throw error;
 }
 
 return data || [];
}; 