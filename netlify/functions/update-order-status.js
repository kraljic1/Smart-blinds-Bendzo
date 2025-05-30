import { createClient } from '@supabase/supabase-js';

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

// Secure logging function
function secureLog(level, message, data = null) {
  const isDev = process.env.NODE_ENV === 'development';
  
  if (isDev) {
    console[level](`[UPDATE-ORDER-STATUS] ${message}`, data);
  } else {
    // In production, only log minimal information
    console[level](`[UPDATE-ORDER-STATUS] ${message}`);
  }
}

// Sanitize error messages for client response
function sanitizeError(error, context = 'general') {
  const userMessages = {
    validation: 'Invalid order status data provided',
    database: 'Failed to update order status',
    notfound: 'Order not found',
    config: 'Server configuration error',
    general: 'Failed to update order status'
  };
  
  return userMessages[context] || userMessages.general;
}

export const handler = async (event, context) => {
  secureLog('info', 'Update order status function invoked');
  
  // Handle CORS preflight request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ success: false, message: 'Method not allowed' }),
    };
  }

  try {
    // Initialize Supabase client
    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      secureLog('error', 'Missing Supabase environment variables');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          success: false, 
          message: sanitizeError(null, 'config')
        }),
      };
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Parse request body
    const { orderId, status } = JSON.parse(event.body);

    if (!orderId || !status) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          success: false, 
          message: 'Missing required fields: orderId and status' 
        }),
      };
    }

    // Validate status
    const validStatuses = ['received', 'processing', 'shipped', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          success: false, 
          message: `Invalid status. Must be one of: ${validStatuses.join(', ')}` 
        }),
      };
    }

    secureLog('info', `Updating order status to: ${status}`);

    // Get the current order to check the previous status
    const { data: currentOrder, error: fetchError } = await supabase
      .from('orders')
      .select('status, customer_email, customer_name')
      .eq('order_id', orderId)
      .single();

    if (fetchError) {
      secureLog('error', 'Error fetching current order', process.env.NODE_ENV === 'development' ? fetchError : null);
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ 
          success: false, 
          message: sanitizeError(fetchError, 'notfound')
        }),
      };
    }

    const previousStatus = currentOrder?.status;
    secureLog('info', `Status change: ${previousStatus} -> ${status}`);

    // Update the order status
    const { data: updatedOrder, error: updateError } = await supabase
      .from('orders')
      .update({ 
        status,
        updated_at: new Date().toISOString()
      })
      .eq('order_id', orderId)
      .select()
      .single();

    if (updateError) {
      secureLog('error', 'Error updating order', process.env.NODE_ENV === 'development' ? updateError : null);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          success: false, 
          message: sanitizeError(updateError, 'database')
        }),
      };
    }

    secureLog('info', 'Order status updated successfully');

    // Send email notification if status changed
    if (previousStatus !== status) {
      try {
        secureLog('info', 'Sending status update email notification');
        
        const appUrl = process.env.URL || 'https://your-app.netlify.app';
        const emailUrl = new URL('/.netlify/functions/send-status-update', appUrl).toString();
        
        const emailResponse = await fetch(emailUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            orderId,
            status,
            previousStatus,
            customerEmail: currentOrder.customer_email,
            customerName: currentOrder.customer_name
          })
        });

        if (!emailResponse.ok) {
          secureLog('warn', 'Email service responded with non-200 status');
        } else {
          secureLog('info', 'Status update email sent successfully');
        }
      } catch (emailError) {
        secureLog('error', 'Failed to send status update email', process.env.NODE_ENV === 'development' ? emailError : null);
        // Continue processing - don't fail the update if email fails
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: `Order status updated to ${status}`,
        order: updatedOrder,
        previousStatus
      }),
    };

  } catch (error) {
    secureLog('error', 'Unexpected error in update-order-status function', process.env.NODE_ENV === 'development' ? error : null);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        success: false, 
        message: sanitizeError(error, 'general')
      }),
    };
  }
}; 