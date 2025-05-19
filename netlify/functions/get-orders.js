/**
 * Netlify function to retrieve order history
 * This handles retrieving orders from Supabase based on customer email
 */

const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

// Create a single supabase client for interacting with the database
const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async function(event, context) {
  // Allow both GET (with query params) and POST (with body)
  const params = event.httpMethod === 'GET' 
    ? event.queryStringParameters 
    : JSON.parse(event.body || '{}');
  
  const { email, orderId } = params;
  
  try {
    let query = supabase.from('orders').select('*');
    
    // If we have an email, filter by customer email
    if (email) {
      query = query.eq('customer_email', email);
    }
    
    // If we have an order ID, filter by order ID
    if (orderId) {
      query = query.eq('order_id', orderId);
    }
    
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
    
    // Order by created_at descending (newest first)
    query = query.order('created_at', { ascending: false });
    
    // Execute the query
    const { data: orders, error } = await query;
    
    if (error) {
      console.error('Supabase error:', error);
      throw new Error('Failed to retrieve orders from database');
    }
    
    // Format the orders for display
    const formattedOrders = orders.map(order => ({
      orderId: order.order_id,
      customerName: order.customer_name,
      email: order.customer_email,
      totalAmount: order.total_amount,
      status: order.status,
      createdAt: order.created_at,
      items: JSON.parse(order.items || '[]')
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