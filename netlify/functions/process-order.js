/**
 * Netlify function to process orders
 * This handles order submission, saves orders to Supabase, and returns an order ID
 */

import { createClient } from '@supabase/supabase-js';
import fetch from 'node-fetch'; // Add node-fetch for making HTTP requests

// Initialize Supabase client
// Try regular env vars first, then fallback to VITE_ prefixed ones
const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

// Debug environment
console.log('=== ENVIRONMENT DEBUG ===');
console.log('SUPABASE_URL from env:', process.env.SUPABASE_URL);
console.log('VITE_SUPABASE_URL from env:', process.env.VITE_SUPABASE_URL);
console.log('SUPABASE_ANON_KEY present:', !!process.env.SUPABASE_ANON_KEY);
console.log('VITE_SUPABASE_ANON_KEY present:', !!process.env.VITE_SUPABASE_ANON_KEY);
console.log('Final supabaseUrl:', supabaseUrl);
console.log('Final supabaseKey present:', !!supabaseKey);
console.log('=========================');

// Create a single supabase client for interacting with the database
const supabase = createClient(supabaseUrl, supabaseKey);

// Use named export for compatibility with ESM
export const handler = async function(event, context) {
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
    
    // Test database connection first
    console.log('=== TESTING DATABASE CONNECTION ===');
    try {
      const { data: testData, error: testError } = await supabase
        .from('orders')
        .select('count')
        .limit(1);
      
      console.log('Database test result:', testData);
      console.log('Database test error:', testError);
      
      if (testError) {
        console.error('Database connection failed:', JSON.stringify(testError, null, 2));
        return {
          statusCode: 500,
          body: JSON.stringify({ 
            success: false, 
            message: 'Database connection failed',
            error: testError
          })
        };
      }
    } catch (connectionError) {
      console.error('Database connection exception:', connectionError);
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          success: false, 
          message: 'Database connection exception',
          error: connectionError.message
        })
      };
    }
    console.log('=== DATABASE CONNECTION OK ===');
    
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
    
    console.log('Attempting to insert order:', JSON.stringify(orderData, null, 2));
    
    // Insert the order into Supabase
    const { data: insertedOrder, error } = await supabase
      .from('orders')
      .insert([orderData])
      .select();
    
    if (error) {
      console.error('Supabase insert error (detailed):', JSON.stringify(error, null, 2));
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      console.error('Error details:', error.details);
      console.error('Error hint:', error.hint);
      
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          success: false, 
          message: 'Failed to save order to database',
          error: {
            code: error.code,
            message: error.message,
            details: error.details,
            hint: error.hint
          }
        })
      };
    }

    console.log('Order inserted successfully:', insertedOrder);
    const orderId_db = insertedOrder[0].id;
    
    // Process order items
    console.log('Order items to process:', JSON.stringify(items));
    
    const orderItems = items.map(item => ({
      order_id: orderId_db,
      product_id: item.productId || (item.product && item.product.id),
      product_name: item.productName || (item.product && item.product.name),
      product_image: item.productImage || (item.product && item.product.image),
      quantity: item.quantity,
      unit_price: item.price || (item.product && item.product.price),
      subtotal: (item.price || (item.product && item.product.price)) * item.quantity,
      width: (item.width || (item.options && item.options.width)) || null,
      height: (item.height || (item.options && item.options.height)) || null,
      options: item.options ? JSON.stringify(item.options) : null,
      created_at: new Date().toISOString()
    }));
    
    console.log('Attempting to insert order items:', JSON.stringify(orderItems, null, 2));
    
    // Insert order items into Supabase
    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);
    
    if (itemsError) {
      console.error('Supabase order items error (detailed):', JSON.stringify(itemsError, null, 2));
      
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          success: false, 
          message: 'Failed to save order items to database',
          error: {
            code: itemsError.code,
            message: itemsError.message,
            details: itemsError.details,
            hint: itemsError.hint
          }
        })
      };
    }
    
    console.log('Order items inserted successfully');
    
    // Send order confirmation email
    try {
      const emailData = {
        orderId, 
        customer,
        items,
        totalAmount
      };
      
      const appUrl = process.env.VITE_APP_URL || process.env.APP_URL || 'https://bendzosmartblinds.netlify.app';
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
    console.error('Order processing error (detailed):', JSON.stringify(error, null, 2));
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        success: false, 
        message: 'Order processing failed',
        error: {
          name: error.name,
          message: error.message
        }
      })
    };
  }
}; 