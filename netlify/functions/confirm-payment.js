/**
 * Netlify function to confirm payment and process orders
 * This handles payment confirmation from Stripe and creates orders
 */

import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import fetch from 'node-fetch';

// Initialize Stripe with error handling
let stripe = null;
try {
  if (process.env.STRIPE_SECRET_KEY) {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-11-20.acacia',
    });
  }
} catch (stripeError) {
  console.error('Failed to initialize Stripe:', stripeError.message);
}

// Initialize Supabase client with error handling
let supabase = null;
try {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  
  if (supabaseUrl && supabaseKey) {
    supabase = createClient(supabaseUrl, supabaseKey);
  } else {
    console.error('Missing Supabase configuration');
  }
} catch (supabaseError) {
  console.error('Failed to initialize Supabase:', supabaseError.message);
}

// Secure logging function
function secureLog(level, message, data = null) {
  const isDev = process.env.NODE_ENV === 'development';
  
  if (isDev) {
    console[level](`[CONFIRM-PAYMENT] ${message}`, data);
  } else {
    // In production, only log minimal information
    console[level](`[CONFIRM-PAYMENT] ${message}`);
  }
}

// Sanitize error messages for client response
function sanitizeError(error, context = 'general') {
  const userMessages = {
    validation: 'Invalid order data provided',
    payment: 'Payment verification failed',
    database: 'Failed to save order to database',
    email: 'Order created but confirmation email failed',
    general: 'Payment confirmation failed',
    config: 'Service configuration error'
  };
  
  return userMessages[context] || userMessages.general;
}

// Simple validation function
function validateOrderData(data) {
  const errors = [];
  
  if (!data.customer) errors.push('Customer data is required');
  if (!data.items || !Array.isArray(data.items) || data.items.length === 0) {
    errors.push('Order items are required');
  }
  if (!data.totalAmount || typeof data.totalAmount !== 'number' || data.totalAmount <= 0) {
    errors.push('Valid total amount is required');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    sanitizedData: data // For now, return original data
  };
}

export const handler = async function(event, context) {
  // CORS headers for all responses
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
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

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ success: false, message: 'Method Not Allowed' })
    };
  }

  // Check if services are initialized
  if (!stripe) {
    secureLog('error', 'Stripe not initialized');
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ 
        success: false, 
        message: sanitizeError(null, 'config')
      })
    };
  }

  if (!supabase) {
    secureLog('error', 'Supabase not initialized');
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ 
        success: false, 
        message: sanitizeError(null, 'config')
      })
    };
  }

  try {
    // Parse request body
    let requestData;
    try {
      requestData = JSON.parse(event.body);
    } catch (parseError) {
      secureLog('error', 'Failed to parse request body');
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ 
          success: false, 
          message: 'Invalid request data'
        })
      };
    }
    const { 
      paymentIntentId, 
      customer, 
      items, 
      notes, 
      totalAmount, 
      taxAmount, 
      shippingCost 
    } = requestData;

    // Basic validation
    const validationResult = validateOrderData({ customer, items, notes, totalAmount });
    
    if (!validationResult.isValid) {
      secureLog('warn', 'Validation failed', validationResult.errors);
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ 
          success: false, 
          message: sanitizeError(null, 'validation'),
          errors: validationResult.errors
        })
      };
    }

    // Validate required data
    if (!paymentIntentId || !customer || !items || !totalAmount) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ 
          success: false, 
          message: 'Missing required payment confirmation data' 
        })
      };
    }

    // Retrieve and verify payment intent from Stripe
    let paymentIntent = null;
    let paymentVerified = false;
    
    try {
      paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      
      if (paymentIntent.status === 'succeeded') {
        // Verify payment amount matches order total
        const paidAmount = paymentIntent.amount / 100; // Convert from cents
        if (Math.abs(paidAmount - totalAmount) <= 0.01) { // Allow for small rounding differences
          paymentVerified = true;
          secureLog('info', 'Payment intent verified successfully');
        } else {
          secureLog('warn', `Payment amount mismatch: paid ${paidAmount}, expected ${totalAmount}`);
        }
      } else {
        secureLog('warn', `Payment intent status is ${paymentIntent.status}, not succeeded`);
      }
    } catch (stripeError) {
      secureLog('warn', 'Failed to verify payment intent with Stripe', stripeError.message);
      // Continue processing - payment was confirmed on frontend
    }

    // Generate a unique order ID
    const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
    // Add payment verification status to notes
    const verificationNote = paymentVerified 
      ? 'Payment verified with Stripe' 
      : 'Payment confirmed by frontend but not verified with Stripe';
    
    const finalNotes = notes 
      ? `${notes}\n\n[System] ${verificationNote}`
      : `[System] ${verificationNote}`;
    
    secureLog('info', 'Creating order with payment confirmation');
    
    // Create order data
    const orderData = {
      order_id: orderId,
      customer_name: customer.fullName || customer.name,
      customer_email: customer.email,
      customer_phone: customer.phone,
      billing_address: customer.address,
      shipping_address: customer.shippingAddress || customer.address,
      notes: finalNotes,
      total_amount: totalAmount,
      tax_amount: taxAmount || null,
      shipping_cost: shippingCost || null,
      payment_method: 'Credit/Debit Card',
      payment_status: paymentVerified ? 'completed' : 'pending_verification',
      shipping_method: customer.shippingMethod || 'Standard delivery',
      status: 'received',
      stripe_payment_intent_id: paymentIntentId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      // Add company fields if provided
      company_name: customer.companyName || null,
      company_oib: customer.companyOib || null,
      needs_r1_invoice: customer.needsR1Invoice || false
    };
    
    // Insert order into Supabase
    const { data: insertedOrder, error } = await supabase
      .from('orders')
      .insert([orderData])
      .select();
    
    if (error) {
      secureLog('error', 'Supabase insert error', process.env.NODE_ENV === 'development' ? error : null);
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({ 
          success: false, 
          message: sanitizeError(error, 'database'),
          details: process.env.NODE_ENV === 'development' ? error.message : undefined
        })
      };
    }
    
    const orderId_db = insertedOrder[0].id;
    
    // Process order items only if we have order ID
    if (orderId_db && items && items.length > 0) {
      const orderItems = items.map(item => ({
        order_id: orderId_db,
        product_id: (item.product && item.product.id) || item.productId || 'unknown',
        product_name: item.productName || (item.product && item.product.name) || 'Unknown Product',
        product_image: item.productImage || (item.product && item.product.image) || null,
        quantity: item.quantity || 1,
        unit_price: item.price || (item.product && item.product.price) || 0,
        subtotal: (item.price || (item.product && item.product.price) || 0) * (item.quantity || 1),
        options: item.options || {}
      }));
      
      // Insert order items into Supabase
      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);
      
      if (itemsError) {
        secureLog('error', 'Supabase order items error', process.env.NODE_ENV === 'development' ? itemsError : null);
        // Don't fail the whole order for items error
        secureLog('warn', 'Order created but items failed to save');
      }
    }
    
    // Send order confirmation email (optional - don't fail if this fails)
    try {
      const emailData = {
        orderId, 
        customer: {
          ...customer,
          fullName: customer.fullName || customer.name,
          email: customer.email,
          phone: customer.phone
        },
        items,
        totalAmount,
        paymentMethod: 'Credit/Debit Card'
      };
      
      const emailResponse = await fetch(`${process.env.URL}/.netlify/functions/send-order-confirmation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailData)
      });
      
      if (!emailResponse.ok) {
        secureLog('warn', 'Email confirmation failed but order was created');
      }
          } catch (emailError) {
        secureLog('error', 'Failed to send confirmation email', emailError.message);
        // Don't fail the order if email fails
      }
    
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        success: true,
        orderId,
        paymentVerified,
        message: 'Payment confirmed and order created successfully'
      })
    };

  } catch (error) {
    secureLog('error', 'Payment confirmation error', process.env.NODE_ENV === 'development' ? error : null);
    
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
        success: false,
        message: sanitizeError(error, 'general'),
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      })
    };
  }
}; 