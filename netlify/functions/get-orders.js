/**
 * Netlify function to retrieve orders from Supabase
 * This function fetches orders with their items for admin viewing
 */

import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with error handling
let supabase = null;
try {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  
  if (supabaseUrl && supabaseKey) {
    supabase = createClient(supabaseUrl, supabaseKey, {
      db: { schema: 'public' },
      auth: { persistSession: false }
    });
  } else {
    console.error('Missing Supabase configuration for get-orders');
  }
} catch (supabaseError) {
  console.error('Failed to initialize Supabase in get-orders:', supabaseError.message);
}

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

  // Check if Supabase is initialized
  if (!supabase) {
    console.error('Supabase not initialized in get-orders');
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ 
        success: false, 
        message: 'Database connection not available'
      })
    };
  }

  try {
    // Parse query parameters for filtering
    const queryParams = event.queryStringParameters || {};
    const limit = parseInt(queryParams.limit) || 50;
    const offset = parseInt(queryParams.offset) || 0;
    const orderId = queryParams.orderId;
    const email = queryParams.email;

    console.log('Get orders request:', { limit, offset, orderId, email });

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
      console.error('Supabase error in get-orders:', error);
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({ 
          success: false, 
          message: 'Failed to fetch orders',
          error: error.message,
          details: process.env.NODE_ENV === 'development' ? error : undefined
        })
      };
    }

    console.log(`Retrieved ${orders?.length || 0} orders`);

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

    // Get total count for pagination (optional - don't fail if this fails)
    let totalCount = 0;
    try {
      const { count, error: countError } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true });

      if (countError) {
        console.warn('Failed to get total count:', countError);
      } else {
        totalCount = count || 0;
      }
    } catch (countError) {
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
          total: totalCount,
          limit,
          offset,
          hasMore: totalCount > offset + limit
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
        error: error.message,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      })
    };
  }
}; 