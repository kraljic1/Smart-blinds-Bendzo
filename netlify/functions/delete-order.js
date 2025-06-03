import { createClient } from '@supabase/supabase-js';

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'DELETE, OPTIONS',
};

export const handler = async (event, context) => {
  console.log('Delete order function invoked');
  console.log('HTTP Method:', event.httpMethod);
  console.log('Request body:', event.body);
  
  // Handle CORS preflight request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  if (event.httpMethod !== 'DELETE') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ success: false, message: 'Method not allowed' }),
    };
  }

  try {
    // Initialize Supabase client with fallback environment variables
    const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

    console.log('Environment check:', {
      hasSupabaseUrl: !!supabaseUrl,
      hasServiceKey: !!supabaseServiceKey,
      urlLength: supabaseUrl?.length || 0,
      keyLength: supabaseServiceKey?.length || 0
    });

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Missing Supabase environment variables');
      console.error('Available env vars:', {
        SUPABASE_URL: !!process.env.SUPABASE_URL,
        VITE_SUPABASE_URL: !!process.env.VITE_SUPABASE_URL,
        SUPABASE_SERVICE_KEY: !!process.env.SUPABASE_SERVICE_KEY,
        SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
        SUPABASE_ANON_KEY: !!process.env.SUPABASE_ANON_KEY,
        VITE_SUPABASE_ANON_KEY: !!process.env.VITE_SUPABASE_ANON_KEY
      });
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          success: false, 
          message: 'Server configuration error',
          error: 'Missing database configuration'
        }),
      };
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      db: { schema: 'public' },
      auth: { persistSession: false }
    });

    // Parse request body
    let parsedBody;
    try {
      parsedBody = JSON.parse(event.body);
      console.log('Parsed request body:', parsedBody);
    } catch (parseError) {
      console.error('Failed to parse request body:', parseError);
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          success: false, 
          message: 'Invalid JSON in request body' 
        }),
      };
    }

    const { orderId } = parsedBody;

    if (!orderId) {
      console.error('Missing orderId in request');
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          success: false, 
          message: 'Missing required field: orderId' 
        }),
      };
    }

    console.log(`Attempting to delete order: ${orderId}`);
    console.log('Order ID type:', typeof orderId);
    console.log('Order ID length:', orderId.length);

    // First, check if the order exists
    const { data: existingOrder, error: fetchError } = await supabase
      .from('orders')
      .select('id, order_id, customer_name, customer_email')
      .eq('order_id', orderId)
      .single();

    console.log('Database query result:', { existingOrder, fetchError });

    if (fetchError || !existingOrder) {
      console.error('Order not found:', fetchError);
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ 
          success: false, 
          message: 'Order not found',
          error: fetchError?.message || 'Order does not exist'
        }),
      };
    }

    console.log(`Found order to delete: ${existingOrder.order_id} for customer: ${existingOrder.customer_name}`);

    // Delete the order (this will cascade delete order_items due to foreign key constraint)
    const { error: deleteError } = await supabase
      .from('orders')
      .delete()
      .eq('order_id', orderId);

    if (deleteError) {
      console.error('Error deleting order:', deleteError);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          success: false, 
          message: 'Failed to delete order',
          error: deleteError.message
        }),
      };
    }

    console.log(`Order ${orderId} deleted successfully`);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        message: `Order ${orderId} has been successfully deleted`,
        deletedOrder: {
          orderId: existingOrder.order_id,
          customerName: existingOrder.customer_name,
          customerEmail: existingOrder.customer_email
        }
      }),
    };

  } catch (error) {
    console.error('Unexpected error in delete-order function:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        success: false, 
        message: 'Internal server error',
        error: error.message
      }),
    };
  }
}; 