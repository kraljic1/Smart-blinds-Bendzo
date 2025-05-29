/**
 * Netlify function to retrieve orders from Supabase
 * This function fetches orders with their items for admin viewing
 */

import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey, {
  db: { schema: 'public' },
  auth: { persistSession: false }
});

export const handler = async function(event, context) {
  // CORS headers for all responses
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Max-Age': '86400',
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: ''
    };
  }

  // Allow both GET and POST requests
  if (event.httpMethod !== 'GET' && event.httpMethod !== 'POST') {
    return { 
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ success: false, message: 'Method Not Allowed' })
    };
  }

  try {
    // Parse query parameters for filtering
    const queryParams = event.queryStringParameters || {};
    const limit = parseInt(queryParams.limit) || 50;
    const offset = parseInt(queryParams.offset) || 0;
    const orderId = queryParams.orderId;
    const email = queryParams.email;

    let query = supabase
      .from('orders')
      .select(`
        *,
        order_items (
          id,
          product_name,
          quantity,
          unit_price,
          subtotal,
          options
        )
      `)
      .order('created_at', { ascending: false });

    // Filter by specific order ID if provided
    if (orderId) {
      query = query.eq('order_id', orderId);
    }

    // Filter by customer email if provided
    if (email) {
      query = query.eq('customer_email', email);
    }

    // Apply pagination
    query = query.range(offset, offset + limit - 1);

    const { data: orders, error } = await query;

    if (error) {
      console.error('Supabase error:', error);
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({ 
          success: false, 
          message: 'Failed to fetch orders',
          error: error.message
        })
      };
    }

    // Process orders to ensure proper data structure
    const processedOrders = (orders || []).map(order => {
      // Ensure order_items is always an array
      const orderItems = Array.isArray(order.order_items) ? order.order_items : [];
      
      // Process each order item to ensure proper structure
      const processedItems = orderItems.map(item => ({
        id: item.id,
        product_name: item.product_name || '',
        quantity: item.quantity || 1,
        unit_price: item.unit_price || 0,
        subtotal: item.subtotal || 0,
        options: typeof item.options === 'string' ? 
          (() => {
            try {
              return JSON.parse(item.options);
            } catch {
              return {};
            }
          })() : 
          (item.options || {})
      }));

      return {
        ...order,
        order_items: processedItems
      };
    });

    // Get total count for pagination
    const { count, error: countError } = await supabase
      .from('orders')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      console.warn('Failed to get total count:', countError);
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      },
      body: JSON.stringify({
        success: true,
        orders: processedOrders,
        pagination: {
          total: count || 0,
          limit,
          offset,
          hasMore: (count || 0) > offset + limit
        }
      })
    };

  } catch (error) {
    console.error('Get orders error:', error);
    
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
        success: false,
        message: 'Failed to retrieve orders',
        error: error.message
      })
    };
  }
}; 