import { createClient } from '@supabase/supabase-js';

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

export const handler = async (event, context) => {
  console.log('Update order status function invoked');
  
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
      console.error('Missing Supabase environment variables');
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

    console.log(`Updating order ${orderId} to status: ${status}`);

    // Get the current order to check the previous status
    const { data: currentOrder, error: fetchError } = await supabase
      .from('orders')
      .select('status, customer_email, customer_name')
      .eq('order_id', orderId)
      .single();

    if (fetchError) {
      console.error('Error fetching current order:', fetchError);
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ 
          success: false, 
          message: 'Order not found',
          error: fetchError.message
        }),
      };
    }

    const previousStatus = currentOrder?.status;
    console.log(`Previous status: ${previousStatus}, New status: ${status}`);

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
      console.error('Error updating order:', updateError);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          success: false, 
          message: 'Failed to update order status',
          error: updateError.message
        }),
      };
    }

    console.log('Order status updated successfully');

    // Send email notification if status changed
    if (previousStatus !== status) {
      try {
        console.log('Sending status update email notification');
        
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
          console.warn('Email service responded with non-200 status:', emailResponse.status);
          const emailError = await emailResponse.text();
          console.warn('Email error details:', emailError);
        } else {
          console.log('Status update email sent successfully');
        }
      } catch (emailError) {
        console.error('Failed to send status update email:', emailError);
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
    console.error('Unexpected error in update-order-status function:', error);
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