import { supabase } from '../../supabaseClient';

/**
 * Service for fetching orders via direct Supabase client
 */
export class SupabaseOrderService {
 /**
 * Fetches order via direct Supabase client
 * @param orderId The order ID to fetch
 * @returns Promise<Record<string, unknown> | null>
 */
 static async fetchOrder(orderId: string): Promise<Record<string, unknown> | null> {
 console.log('Using direct Supabase client as fallback for order details');
 
 const { data: order, error } = await supabase
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
 .eq('order_id', orderId)
 .single();
 
 if (error) {
 console.error('Supabase error:', error);
 return null;
 }
 
 if (!order) return null;
 
 return order;
 }
} 