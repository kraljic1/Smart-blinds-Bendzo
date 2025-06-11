import { supabase } from './supabaseClient';

// Import functions from modular files
export { createOrder } from './order/orderCreation';
export { getOrderById, getOrdersByEmail, getOrderItems } from './order/orderRetrieval';
export { getOrderByIdFallback } from './order/orderFallback';
export { 
 getOrderStatus, 
 updateOrderStatus, 
 updatePaymentStatus, 
 getOrderCount, 
 deleteOrder 
} from './order/orderUtilities';
export { 
 getRecentOrders, 
 searchOrders, 
 getOrdersByDateRange 
} from './order/orderQueries';

/**
 * Order management functions - Main service file
 * This file serves as the main entry point for order-related operations
 * and re-exports functions from specialized modules.
 */

/**
 * Legacy function - kept for backward compatibility
 * @deprecated Use getOrderByIdFallback instead
 */
export async function getOrderByIdLegacy(orderId: string) {
 const { data, error } = await supabase
 .from('orders')
 .select('*')
 .eq('order_id', orderId)
 .single();
 
 if (error) {
 console.error('Error fetching order:', error);
 throw error;
 }

 // Get order items
 if (data?.id) {
 const { data: items, error: itemsError } = await supabase
 .from('order_items')
 .select('*')
 .eq('order_id', data.id);
 
 if (itemsError) {
 console.error('Error fetching order items:', itemsError);
 } else {
 return { ...data, items };
 }
 }
 
 return data;
}

 