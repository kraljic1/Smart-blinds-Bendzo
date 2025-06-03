import { SupabaseOrderData, SupabaseOrderItem } from './orderTypes';
import { supabase } from './supabaseClient';

// Interface for the transformed order data that matches the expected format
interface TransformedOrderData {
  orderId: string;
  customerName: string;
  email: string;
  phone: string;
  billingAddress: string;
  shippingAddress?: string;
  totalAmount: number;
  taxAmount?: number;
  shippingCost?: number;
  discountAmount?: number;
  discountCode?: string;
  paymentMethod?: string;
  paymentStatus?: string;
  shippingMethod?: string;
  trackingNumber?: string;
  status: string;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    subtotal: number;
    width?: number;
    height?: number;
    options: Record<string, any>;
  }>;
}

/**
 * Test function to verify order fetching functionality
 */
export const testOrderFetching = async (): Promise<boolean> => {
  try {
    console.log('Testing order fetching functionality...');
    
    // Test 1: Check if Supabase client is available
    if (!supabase) {
      console.error('❌ Supabase client not available');
      return false;
    }
    console.log('✅ Supabase client available');
    
    // Test 2: Check if we can connect to the database
    const { error } = await supabase
      .from('orders')
      .select('count(*)')
      .limit(1);
    
    if (error) {
      console.error('❌ Database connection failed:', error.message);
      return false;
    }
    console.log('✅ Database connection successful');
    
    // Test 3: Check if Netlify function is available (in production)
    const isDevelopment = typeof window !== 'undefined' && 
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
    
    if (!isDevelopment) {
      try {
        const response = await fetch('/.netlify/functions/get-orders?limit=1');
        if (response.ok) {
          console.log('✅ Netlify function available');
        } else {
          console.warn('⚠️ Netlify function not responding correctly');
        }
      } catch (error) {
        console.warn('⚠️ Netlify function test failed:', error);
      }
    }
    
    console.log('✅ Order fetching functionality test completed');
    return true;
    
  } catch (error) {
    console.error('❌ Order fetching test failed:', error);
    return false;
  }
};

/**
 * Get order history for a customer by email
 */
export const getOrderHistory = async (email: string): Promise<SupabaseOrderData[]> => {
  try {
    // Validate email parameter
    if (!email || typeof email !== 'string') {
      console.error('Invalid email parameter provided to getOrderHistory');
      return [];
    }

    // Check if we're in development mode (localhost)
    const isDevelopment = typeof window !== 'undefined' && 
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
    
    if (isDevelopment) {
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

/**
 * Get a specific order by ID
 */
export const getOrderById = async (orderId: string): Promise<TransformedOrderData | null> => {
  try {
    // Validate orderId parameter
    if (!orderId || typeof orderId !== 'string') {
      console.error('Invalid orderId parameter provided to getOrderById');
      return null;
    }

    console.log('Fetching order by ID:', orderId);
    
    // Check if we're in development mode (localhost)
    const isDevelopment = typeof window !== 'undefined' && 
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
    
    if (isDevelopment) {
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
      
      // Transform to expected format
      const transformedOrder: TransformedOrderData = {
        orderId: order.order_id,
        customerName: order.customer_name,
        email: order.customer_email,
        phone: order.customer_phone,
        billingAddress: order.billing_address,
        shippingAddress: order.shipping_address,
        totalAmount: order.total_amount,
        taxAmount: order.tax_amount,
        shippingCost: order.shipping_cost,
        discountAmount: order.discount_amount,
        discountCode: order.discount_code,
        paymentMethod: order.payment_method,
        paymentStatus: order.payment_status,
        shippingMethod: order.shipping_method,
        trackingNumber: order.tracking_number,
        status: order.status,
        notes: order.notes,
        createdAt: order.created_at,
        updatedAt: order.updated_at,
        items: (order.order_items || []).map((item: SupabaseOrderItem) => ({
          productId: item.product_id || `item-${item.id}`,
          productName: item.product_name || 'Proizvod bez naziva',
          quantity: item.quantity,
          unitPrice: item.unit_price,
          subtotal: item.subtotal,
          width: item.width,
          height: item.height,
          options: item.options || {}
        }))
      };
      
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
    
    // Transform the order data to match expected format
    const transformedOrder: TransformedOrderData = {
      orderId: order.order_id,
      customerName: order.customer_name,
      email: order.customer_email,
      phone: order.customer_phone,
      billingAddress: order.billing_address,
      shippingAddress: order.shipping_address,
      totalAmount: order.total_amount,
      taxAmount: order.tax_amount,
      shippingCost: order.shipping_cost,
      discountAmount: order.discount_amount,
      discountCode: order.discount_code,
      paymentMethod: order.payment_method,
      paymentStatus: order.payment_status,
      shippingMethod: order.shipping_method,
      trackingNumber: order.tracking_number,
      status: order.status,
      notes: order.notes,
      createdAt: order.created_at,
      updatedAt: order.updated_at,
      items: (order.order_items || []).map((item: any) => ({
        productId: item.product_id || `item-${item.id}`,
        productName: item.product_name || 'Proizvod bez naziva',
        quantity: item.quantity,
        unitPrice: item.unit_price,
        subtotal: item.subtotal,
        width: item.width,
        height: item.height,
        options: item.options || {}
      }))
    };
    
    console.log('Final transformed order:', transformedOrder);
    return transformedOrder;
    
  } catch (error) {
    console.error(`Failed to fetch order ${orderId}:`, error);
    throw error; // Re-throw to let the calling code handle it
  }
}; 