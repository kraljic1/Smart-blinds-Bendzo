import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseKey);

// Order data type definition
export interface OrderData {
  id?: number;
  order_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  billing_address: string;
  shipping_address?: string;
  notes?: string;
  total_amount: number;
  tax_amount?: number;
  shipping_cost?: number;
  discount_amount?: number;
  discount_code?: string;
  payment_method?: string;
  payment_status?: string;
  shipping_method?: string;
  tracking_number?: string;
  status: string;
  created_at: string;
  updated_at?: string;
}

// Order item data type definition
export interface OrderItemData {
  id?: number;
  order_id: number;
  product_id: string;
  product_name: string;
  product_image?: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
  width?: number;
  height?: number;
  options?: Record<string, string | number | boolean>;
  created_at?: string;
}

/**
 * Admin user management functions
 */

/**
 * Add a user as an admin
 * @param email The email of the user to add as admin
 * @returns True if successful, false otherwise
 */
export async function addAdminUser(email: string): Promise<boolean> {
  try {
    // First check if the user already exists
    const { data: existingAdmin } = await supabase
      .from('admin_users')
      .select('email')
      .eq('email', email)
      .single();
      
    if (existingAdmin) {
      console.log('User is already an admin');
      return true;
    }
    
    // Add the user to admin_users
    const { error } = await supabase
      .from('admin_users')
      .insert([{ email }]);
      
    if (error) {
      console.error('Error adding admin user:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error in addAdminUser:', error);
    return false;
  }
}

/**
 * Remove admin privileges from a user
 * @param email The email of the admin to remove
 * @returns True if successful, false otherwise
 */
export async function removeAdminUser(email: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('admin_users')
      .delete()
      .eq('email', email);
      
    if (error) {
      console.error('Error removing admin user:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error in removeAdminUser:', error);
    return false;
  }
}

/**
 * Check if a user is an admin
 * @param email The email to check
 * @returns True if the user is an admin, false otherwise
 */
export async function isUserAdmin(email: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('admin_users')
      .select('id')
      .eq('email', email)
      .single();
      
    if (error || !data) {
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
}

/**
 * Order management functions
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
    const orderIds = data.map(order => order.id);
    
    const { data: items, error: itemsError } = await supabase
      .from('order_items')
      .select('*')
      .in('order_id', orderIds);
    
    if (itemsError) {
      console.error('Error fetching order items:', itemsError);
    } else {
      // Group items by order_id
      const itemsByOrderId = items.reduce((acc, item) => {
        if (!acc[item.order_id]) {
          acc[item.order_id] = [];
        }
        acc[item.order_id].push(item);
        return acc;
      }, {});
      
      // Add items to their respective orders
      return data.map(order => ({
        ...order,
        items: itemsByOrderId[order.id] || []
      }));
    }
  }
  
  return data;
}

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