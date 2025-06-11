import { supabase } from '../supabaseClient';

/**
 * Order query and search functions
 */

/**
 * Get recent orders
 * @param limit Number of orders to fetch (default: 10)
 */
export async function getRecentOrders(limit: number = 10) {
 const { data, error } = await supabase
 .from('orders')
 .select('order_id, customer_name, total_amount, status, created_at')
 .order('created_at', { ascending: false })
 .limit(limit);
 
 if (error) {
 console.error('Error fetching recent orders:', error);
 return [];
 }
 
 return data || [];
}

/**
 * Search orders by customer name or email
 * @param searchTerm The search term
 * @param limit Number of results to return (default: 20)
 */
export async function searchOrders(searchTerm: string, limit: number = 20) {
 const { data, error } = await supabase
 .from('orders')
 .select('order_id, customer_name, customer_email, total_amount, status, created_at')
 .or(`customer_name.ilike.%${searchTerm}%,customer_email.ilike.%${searchTerm}%`)
 .order('created_at', { ascending: false })
 .limit(limit);
 
 if (error) {
 console.error('Error searching orders:', error);
 return [];
 }
 
 return data || [];
}

/**
 * Get orders by date range
 * @param startDate Start date (ISO string)
 * @param endDate End date (ISO string)
 */
export async function getOrdersByDateRange(startDate: string, endDate: string) {
 const { data, error } = await supabase
 .from('orders')
 .select('*')
 .gte('created_at', startDate)
 .lte('created_at', endDate)
 .order('created_at', { ascending: false });
 
 if (error) {
 console.error('Error fetching orders by date range:', error);
 return [];
 }
 
 return data || [];
} 