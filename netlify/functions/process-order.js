/**
 * Netlify function to process orders
 * This handles order submission, saves orders to Supabase, and returns an order ID
 */

const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

// Create a single supabase client for interacting with the database
const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      body: JSON.stringify({ success: false, message: 'Method Not Allowed' })
    };
  }
  
  try {
    // Parse the incoming request body
    const data = JSON.parse(event.body);
    const { customer, items, notes, totalAmount } = data;
    
    // Validate required data
    if (!customer || !items || !totalAmount) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, message: 'Missing required order information' })
      };
    }
    
    // Generate a unique order ID
    const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
    // Log the order (will be visible in Netlify function logs)
    console.log('New order received:', orderId);
    console.log('Customer:', customer);
    console.log('Items:', items);
    console.log('Total Amount:', totalAmount);
    
    // Create the order object to store in Supabase
    const orderData = {
      order_id: orderId,
      customer_name: customer.fullName,
      customer_email: customer.email,
      customer_phone: customer.phone,
      customer_address: customer.address,
      items: JSON.stringify(items),
      notes: notes || '',
      total_amount: totalAmount,
      status: 'received',
      created_at: new Date().toISOString()
    };
    
    // Insert the order into Supabase
    const { data: insertedOrder, error } = await supabase
      .from('orders')
      .insert([orderData])
      .select();
    
    if (error) {
      console.error('Supabase error:', error);
      throw new Error('Failed to save order to database');
    }
    
    // Return success response with order ID
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true, 
        orderId,
        message: 'Order received and saved successfully'
      })
    };
  } catch (error) {
    console.error('Order processing error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        success: false, 
        message: 'Order processing failed',
        error: error.message
      })
    };
  }
}; 