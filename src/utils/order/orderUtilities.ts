import { supabase } from '../supabaseClient';

/**
 * Order utility functions
 */

/**
 * Quick order status check
 * @param orderId The order ID to check
 */
export async function getOrderStatus(orderId: string) {
 const { data, error } = await supabase
 .from('orders')
 .select('status, payment_status')
 .eq('order_id', orderId)
 .single();
 
 if (error) {
 console.error('Error fetching order status:', error);
 return null;
 }
 
 return data;
}

/**
 * Update order status
 * @param orderId The order ID to update
 * @param status The new status
 */
export async function updateOrderStatus(orderId: string, status: string) {
 const { data, error } = await supabase
 .from('orders')
 .update({ status, updated_at: new Date().toISOString() })
 .eq('order_id', orderId)
 .select();
 
 if (error) {
 console.error('Error updating order status:', error);
 throw error;
 }
 
 return data?.[0];
}

/**
 * Update payment status
 * @param orderId The order ID to update
 * @param paymentStatus The new payment status
 */
export async function updatePaymentStatus(orderId: string, paymentStatus: string) {
 const { data, error } = await supabase
 .from('orders')
 .update({ payment_status: paymentStatus, updated_at: new Date().toISOString() })
 .eq('order_id', orderId)
 .select();
 
 if (error) {
 console.error('Error updating payment status:', error);
 throw error;
 }
 
 return data?.[0];
}

/**
 * Get order count by status
 * @param status Optional status filter
 */
export async function getOrderCount(status?: string) {
 let query = supabase
 .from('orders')
 .select('*', { count: 'exact', head: true });
 
 if (status) {
 query = query.eq('status', status);
 }
 
 const { count, error } = await query;
 
 if (error) {
 console.error('Error getting order count:', error);
 return 0;
 }
 
 return count || 0;
}

/**
 * Delete an order (admin only)
 * @param orderId The order ID to delete
 */
export async function deleteOrder(orderId: string) {
 // First delete order items
 const { error: itemsError } = await supabase
 .from('order_items')
 .delete()
 .eq('order_id', orderId);
 
 if (itemsError) {
 console.error('Error deleting order items:', itemsError);
 throw itemsError;
 }
 
 // Then delete the order
 const { error } = await supabase
 .from('orders')
 .delete()
 .eq('order_id', orderId);
 
 if (error) {
 console.error('Error deleting order:', error);
 throw error;
 }
 
 return true;
} 