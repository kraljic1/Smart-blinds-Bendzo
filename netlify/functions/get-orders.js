/**
 * Netlify function to retrieve order history
 * This handles retrieving orders from Supabase based on customer email
 */

import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

// Create a single supabase client for interacting with the database
const supabase = createClient(supabaseUrl, supabaseKey);

export const handler = async function(event, context) {
  // Allow both GET (with query params) and POST (with body)
  const params = event.httpMethod === 'GET' 
    ? event.queryStringParameters 
    : JSON.parse(event.body || '{}');
  
  const { email, orderId } = params;
  
  try {
    // If neither email nor orderId provided, return an error
    if (!email && !orderId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          success: false, 
          message: 'Missing required parameter: email or orderId' 
        })
      };
    }

    // Fetch orders
    let query = supabase.from('orders').select('*');
    
    // If we have an email, filter by customer email
    if (email) {
      query = query.eq('customer_email', email);
    }
    
    // If we have an order ID, filter by order ID
    if (orderId) {
      query = query.eq('order_id', orderId);
    }
    
    // Order by created_at descending (newest first)
    query = query.order('created_at', { ascending: false });
    
    // Execute the query
    const { data: orders, error } = await query;
    
    if (error) {
      console.error('Supabase error fetching orders:', error);
      throw new Error('Failed to retrieve orders from database');
    }

    // Fetch items for all the orders
    const orderIds = orders.map(order => order.id);
    
    let orderItems = [];
    if (orderIds.length > 0) {
      const { data: items, error: itemsError } = await supabase
        .from('order_items')
        .select('*')
        .in('order_id', orderIds);
      
      if (itemsError) {
        console.error('Supabase error fetching order items:', itemsError);
        throw new Error('Failed to retrieve order items from database');
      }
      
      orderItems = items || [];
    }
    
    // Group order items by order ID
    const itemsByOrderId = orderItems.reduce((acc, item) => {
      if (!acc[item.order_id]) {
        acc[item.order_id] = [];
      }
      acc[item.order_id].push({
        productId: item.product_id,
        productName: item.product_name,
        productImage: item.product_image,
        quantity: item.quantity,
        unitPrice: item.unit_price,
        subtotal: item.subtotal,
        width: item.width,
        height: item.height,
        options: item.options ? JSON.parse(item.options) : null
      });
      return acc;
    }, {});
    
    // Format the orders for display
    const formattedOrders = orders.map(order => ({
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
      items: itemsByOrderId[order.id] || []
    }));
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        orders: formattedOrders
      })
    };
  } catch (error) {
    console.error('Error retrieving orders:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        success: false, 
        message: 'Failed to retrieve orders',
        error: error.message
      })
    };
  }
}; 