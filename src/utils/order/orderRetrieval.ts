import { supabase } from '../supabaseClient';

/**
 * Basic order retrieval functions
 */

/**
 * Retrieves an order by its ID
 * @param orderId The unique ID of the order to retrieve
 */
export async function getOrderById(orderId: string) {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('order_id', orderId)
    .single();
  
  if (error) {
    console.error('Error fetching order:', error);
    throw error;
  }

  // Get order items if order exists
  if (data?.id) {
    const items = await getOrderItems(data.id);
    return { ...data, items };
  }
  
  return data;
}

/**
 * Retrieves order items for a specific order
 * @param orderId The internal order ID
 */
export async function getOrderItems(orderId: number) {
  const { data: items, error: itemsError } = await supabase
    .from('order_items')
    .select('*')
    .eq('order_id', orderId);
  
  if (itemsError) {
    console.error('Error fetching order items:', itemsError);
    return [];
  }
  
  return items || [];
}

/**
 * Retrieves orders by customer email
 * @param email The email of the customer
 */
export async function getOrdersByEmail(email: string) {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('customer_email', email)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching orders by email:', error);
    throw error;
  }

  // Get order items for all orders
  if (data && data.length > 0) {
    const ordersWithItems = await attachItemsToOrders(data);
    return ordersWithItems;
  }
  
  return data;
}

/**
 * Attaches items to multiple orders
 * @param orders Array of orders to attach items to
 */
async function attachItemsToOrders(orders: Array<{ id: number; [key: string]: unknown }>) {
  const orderIds = orders.map(order => order.id);
  
  const { data: items, error: itemsError } = await supabase
    .from('order_items')
    .select('*')
    .in('order_id', orderIds);
  
  if (itemsError) {
    console.error('Error fetching order items:', itemsError);
    return orders.map(order => ({ ...order, items: [] }));
  }
  
  // Group items by order_id
  const itemsByOrderId = groupItemsByOrderId(items || []);
  
  // Add items to their respective orders
  return orders.map(order => ({
    ...order,
    items: itemsByOrderId[order.id] || []
  }));
}

/**
 * Groups items by order ID
 * @param items Array of order items
 */
function groupItemsByOrderId(items: Array<{ order_id: number; [key: string]: unknown }>) {
  return items.reduce((acc: Record<number, Array<{ order_id: number; [key: string]: unknown }>>, item) => {
    if (!acc[item.order_id]) {
      acc[item.order_id] = [];
    }
    acc[item.order_id].push(item);
    return acc;
  }, {});
} 