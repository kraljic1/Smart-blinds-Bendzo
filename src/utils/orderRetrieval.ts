import { SupabaseOrderData } from './orderTypes';
import { supabase } from './supabaseClient';

/**
 * Get order history for a customer by email
 */
export const getOrderHistory = async (email: string): Promise<SupabaseOrderData[]> => {
  try {
    // Check if we're in development mode (localhost)
    const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    
    if (isDevelopment) {
      console.log('Development mode detected - using direct Supabase client');
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
export const getOrderById = async (orderId: string): Promise<any | null> => {
  try {
    console.log('Fetching order by ID:', orderId);
    
    // Check if we're in development mode (localhost)
    const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    
    if (isDevelopment) {
      console.log('Development mode detected - using direct Supabase client');
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
        return null;
      }
      
      if (!order) return null;
      
      // Transform to expected format
      return {
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
          productName: item.product_name,
          quantity: item.quantity,
          unitPrice: item.unit_price,
          subtotal: item.subtotal,
          width: item.width,
          height: item.height,
          options: item.options || {}
        }))
      };
    }
    
    // Use the serverless function to fetch order with items included
    const response = await fetch(`/.netlify/functions/get-orders?orderId=${encodeURIComponent(orderId)}`);
    
    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }
    
    const result = await response.json();
    return result.success && result.orders.length > 0 ? result.orders[0] : null;
    
  } catch (error) {
    console.error(`Failed to fetch order ${orderId}:`, error);
    return null;
  }
}; 