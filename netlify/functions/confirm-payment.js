/**
 * Netlify function to confirm payment and process orders
 * This handles payment confirmation from Stripe and creates orders
 */

import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

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
  console.log('[CONFIRM-PAYMENT] Function started');
  console.log('[CONFIRM-PAYMENT] HTTP Method:', event.httpMethod);
  
  // CORS headers for all responses
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Max-Age': '86400',
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    console.log('[CONFIRM-PAYMENT] Handling OPTIONS request');
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: ''
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    console.log('[CONFIRM-PAYMENT] Invalid method:', event.httpMethod);
    return { 
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ success: false, message: 'Method Not Allowed' })
    };
  }

  console.log('[CONFIRM-PAYMENT] Checking service initialization...');
  
  // Check if services are initialized
  if (!stripe) {
    console.error('[CONFIRM-PAYMENT] Stripe not initialized');
    console.log('[CONFIRM-PAYMENT] STRIPE_SECRET_KEY present:', !!process.env.STRIPE_SECRET_KEY);
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
    console.error('[CONFIRM-PAYMENT] Supabase not initialized');
    console.log('[CONFIRM-PAYMENT] SUPABASE_URL present:', !!process.env.SUPABASE_URL);
    console.log('[CONFIRM-PAYMENT] VITE_SUPABASE_URL present:', !!process.env.VITE_SUPABASE_URL);
    console.log('[CONFIRM-PAYMENT] SUPABASE_SERVICE_KEY present:', !!process.env.SUPABASE_SERVICE_KEY);
    console.log('[CONFIRM-PAYMENT] SUPABASE_ANON_KEY present:', !!process.env.SUPABASE_ANON_KEY);
    console.log('[CONFIRM-PAYMENT] VITE_SUPABASE_ANON_KEY present:', !!process.env.VITE_SUPABASE_ANON_KEY);
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

  console.log('[CONFIRM-PAYMENT] Services initialized successfully');

  try {
    console.log('[CONFIRM-PAYMENT] Starting request processing...');
    
    // Parse request body
    let requestData;
    try {
      console.log('[CONFIRM-PAYMENT] Parsing request body...');
      console.log('[CONFIRM-PAYMENT] Request body length:', event.body?.length || 0);
      requestData = JSON.parse(event.body);
      console.log('[CONFIRM-PAYMENT] Request data parsed successfully');
    } catch (parseError) {
      console.error('[CONFIRM-PAYMENT] Failed to parse request body:', parseError.message);
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
    
    // Handle test requests
    if (requestData.test === true) {
      console.log('[CONFIRM-PAYMENT] Test request received');
      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify({ 
          success: true, 
          message: 'Function is available',
          test: true
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

    console.log('[CONFIRM-PAYMENT] Extracted data:');
    console.log('[CONFIRM-PAYMENT] - paymentIntentId:', paymentIntentId ? 'present' : 'missing');
    console.log('[CONFIRM-PAYMENT] - customer:', customer ? 'present' : 'missing');
    console.log('[CONFIRM-PAYMENT] - items count:', items?.length || 0);
    console.log('[CONFIRM-PAYMENT] - totalAmount:', totalAmount);

    // Basic validation
    console.log('[CONFIRM-PAYMENT] Running validation...');
    const validationResult = validateOrderData({ customer, items, notes, totalAmount });
    
    if (!validationResult.isValid) {
      console.error('[CONFIRM-PAYMENT] Validation failed:', validationResult.errors);
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
      console.error('[CONFIRM-PAYMENT] Missing required data');
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ 
          success: false, 
          message: 'Missing required payment confirmation data' 
        })
      };
    }

    console.log('[CONFIRM-PAYMENT] Validation passed');

    // Retrieve and verify payment intent from Stripe
    console.log('[CONFIRM-PAYMENT] Verifying payment with Stripe...');
    let paymentIntent = null;
    let paymentVerified = false;
    
    try {
      console.log('[CONFIRM-PAYMENT] Retrieving payment intent:', paymentIntentId);
      paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      console.log('[CONFIRM-PAYMENT] Payment intent status:', paymentIntent.status);
      
      if (paymentIntent.status === 'succeeded') {
        // Verify payment amount matches order total
        const paidAmount = paymentIntent.amount / 100; // Convert from cents
        console.log('[CONFIRM-PAYMENT] Payment amounts - paid:', paidAmount, 'expected:', totalAmount);
        if (Math.abs(paidAmount - totalAmount) <= 0.01) { // Allow for small rounding differences
          paymentVerified = true;
          console.log('[CONFIRM-PAYMENT] Payment verification successful');
          secureLog('info', 'Payment intent verified successfully');
        } else {
          console.warn('[CONFIRM-PAYMENT] Payment amount mismatch');
          secureLog('warn', `Payment amount mismatch: paid ${paidAmount}, expected ${totalAmount}`);
        }
      } else {
        console.warn('[CONFIRM-PAYMENT] Payment not succeeded, status:', paymentIntent.status);
        secureLog('warn', `Payment intent status is ${paymentIntent.status}, not succeeded`);
      }
    } catch (stripeError) {
      console.error('[CONFIRM-PAYMENT] Stripe verification error:', stripeError.message);
      secureLog('warn', 'Failed to verify payment intent with Stripe', stripeError.message);
      // Continue processing - payment was confirmed on frontend
    }

    // Generate a unique order ID
    const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    console.log('[CONFIRM-PAYMENT] Generated order ID:', orderId);
    
    // Keep customer notes separate from system logs
    const finalNotes = notes || null;
    
    console.log('[CONFIRM-PAYMENT] Creating order with payment confirmation');
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
    
    console.log('[CONFIRM-PAYMENT] Order data prepared, inserting into database...');
    console.log('[CONFIRM-PAYMENT] Order data keys:', Object.keys(orderData));
    
    // Insert order into Supabase
    let insertedOrder = null;
    try {
      console.log('[CONFIRM-PAYMENT] Attempting Supabase insert...');
      const { data, error } = await supabase
        .from('orders')
        .insert([orderData])
        .select();
      
      if (error) {
        console.error('[CONFIRM-PAYMENT] Supabase insert error:', error);
        console.error('[CONFIRM-PAYMENT] Error code:', error.code);
        console.error('[CONFIRM-PAYMENT] Error message:', error.message);
        console.error('[CONFIRM-PAYMENT] Error details:', error.details);
        console.error('[CONFIRM-PAYMENT] Error hint:', error.hint);
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
      
      insertedOrder = data;
      console.log('[CONFIRM-PAYMENT] Order inserted successfully');
      console.log('[CONFIRM-PAYMENT] Inserted order ID:', insertedOrder[0]?.id);
    } catch (insertError) {
      console.error('[CONFIRM-PAYMENT] Database insert exception:', insertError);
      throw insertError;
    }
    
    const orderId_db = insertedOrder[0].id;
    
    // Process order items only if we have order ID
    if (orderId_db && items && items.length > 0) {
      console.log('[CONFIRM-PAYMENT] Processing order items:', JSON.stringify(items, null, 2));
      
      const orderItems = items.map(item => {
        // Extract price from various possible locations
        const unitPrice = item.price || item.unitPrice || (item.product && item.product.price) || 0;
        const quantity = item.quantity || 1;
        
        console.log('[CONFIRM-PAYMENT] Item processing:', {
          productId: item.productId,
          productName: item.productName,
          unitPrice,
          quantity,
          subtotal: unitPrice * quantity
        });
        
        return {
          order_id: orderId_db,
          product_id: item.productId || (item.product && item.product.id) || 'unknown',
          product_name: item.productName || (item.product && item.product.name) || 'Unknown Product',
          product_image: item.productImage || (item.product && item.product.image) || null,
          quantity: quantity,
          unit_price: unitPrice,
          subtotal: unitPrice * quantity,
          options: item.options || {}
        };
      });
      
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
    console.error('[CONFIRM-PAYMENT] Unhandled error in payment confirmation:', error);
    console.error('[CONFIRM-PAYMENT] Error stack:', error.stack);
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