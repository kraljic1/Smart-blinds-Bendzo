/**
 * Netlify function to process orders
 * This handles order submission, saves orders to Supabase, and returns an order ID
 */

const { createClient } = require('@supabase/supabase-js');
const fetch = require('node-fetch'); // Add node-fetch for making HTTP requests

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
    const { customer, items, notes, totalAmount, taxAmount, shippingCost, discount } = data;
    
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
      billing_address: customer.address,
      shipping_address: customer.shippingAddress || customer.address,
      notes: notes || '',
      total_amount: totalAmount,
      tax_amount: taxAmount || null,
      shipping_cost: shippingCost || null,
      discount_amount: discount?.amount || null,
      discount_code: discount?.code || null,
      payment_method: customer.paymentMethod || 'Cash on delivery',
      payment_status: 'pending',
      shipping_method: customer.shippingMethod || 'Standard delivery',
      status: 'received',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
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

    const orderId_db = insertedOrder[0].id;
    
    // Process order items
    const orderItems = items.map(item => ({
      order_id: orderId_db,
      product_id: item.product.id,
      product_name: item.product.name,
      product_image: item.product.image,
      quantity: item.quantity,
      unit_price: item.product.price,
      subtotal: item.product.price * item.quantity,
      width: item.options?.width || null,
      height: item.options?.height || null,
      options: item.options ? JSON.stringify(item.options) : null,
      created_at: new Date().toISOString()
    }));
    
    // Insert order items into Supabase
    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);
    
    if (itemsError) {
      console.error('Supabase error inserting order items:', itemsError);
      throw new Error('Failed to save order items to database');
    }
    
    // Send order confirmation email
    try {
      const emailData = {
        orderId, 
        customer,
        items,
        totalAmount
      };
      
      const appUrl = process.env.VITE_APP_URL || 'https://bendzosmartblinds.netlify.app';
      const emailUrl = new URL('/.netlify/functions/send-order-confirmation', appUrl).toString();
      
      const emailResponse = await fetch(emailUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(emailData)
      });
      
      if (emailResponse.ok) {
        console.log('Order confirmation email sent successfully');
      } else {
        console.warn('Email service responded with non-200 status:', emailResponse.status);
      }
    } catch (emailError) {
      console.error('Failed to send order confirmation email:', emailError);
      // Continue processing - don't fail the order if email fails
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