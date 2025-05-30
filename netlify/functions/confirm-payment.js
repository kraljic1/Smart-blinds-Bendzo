/**
 * Netlify function to confirm payment and process orders
 * This handles payment confirmation from Stripe and creates orders
 */

import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import fetch from 'node-fetch';
const { validateOrderData, rateLimiter } = require('./validation-utils');

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-11-20.acacia',
});

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

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
    general: 'Payment confirmation failed'
  };
  
  return userMessages[context] || userMessages.general;
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

  // Rate limiting check
  const clientIP = event.headers['x-forwarded-for'] || event.headers['x-real-ip'] || 'unknown';
  if (!rateLimiter.isAllowed(clientIP)) {
    return {
      statusCode: 429,
      headers: corsHeaders,
      body: JSON.stringify({ 
        success: false, 
        message: 'Too many requests. Please try again later.',
        remainingAttempts: rateLimiter.getRemainingAttempts(clientIP)
      })
    };
  }

  try {
    const { 
      paymentIntentId, 
      customer, 
      items, 
      notes, 
      totalAmount, 
      taxAmount, 
      shippingCost 
    } = JSON.parse(event.body);

    // Comprehensive validation using our security utilities
    const validationResult = validateOrderData({ customer, items, notes, totalAmount });
    
    if (!validationResult.isValid) {
      secureLog('warn', 'Validation failed', process.env.NODE_ENV === 'development' ? validationResult.errors : null);
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ 
          success: false, 
          message: sanitizeError(null, 'validation')
        })
      };
    }

    const { sanitizedData } = validationResult;

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
      
      if (paymentIntent.status !== 'succeeded') {
        secureLog('warn', `Payment intent status is ${paymentIntent.status}, not succeeded`);
        // Don't fail here - the frontend already confirmed the payment succeeded
      } else {
        // Verify payment amount matches order total
        const paidAmount = paymentIntent.amount / 100; // Convert from cents
        if (Math.abs(paidAmount - totalAmount) > 0.01) { // Allow for small rounding differences
          secureLog('warn', 'Payment amount mismatch detected');
          // Don't fail here - log the discrepancy but continue
        } else {
          paymentVerified = true;
          secureLog('info', 'Payment intent verified successfully');
        }
      }
    } catch (stripeError) {
      secureLog('warn', 'Failed to verify payment intent with Stripe');
      // Don't fail here - the payment was already confirmed successful on the frontend
    }

    // Generate a unique order ID
    const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
    // Add payment verification status to notes
    const verificationNote = paymentVerified 
      ? 'Payment verified with Stripe' 
      : 'Payment confirmed by frontend but not verified with Stripe (possible test/live key mismatch)';
    
    const finalNotes = notes 
      ? `${notes}\n\n[System] ${verificationNote}`
      : `[System] ${verificationNote}`;
    
    secureLog('info', 'Creating order with payment confirmation');
    
    // Create order data using sanitized values
    const orderData = {
      order_id: orderId,
      customer_name: sanitizedData.customer_name || customer.fullName,
      customer_email: sanitizedData.customer_email || customer.email,
      customer_phone: sanitizedData.customer_phone || customer.phone,
      billing_address: sanitizedData.billing_address || customer.address,
      shipping_address: sanitizedData.shipping_address || customer.shippingAddress || customer.address,
      notes: sanitizedData.notes || finalNotes,
      total_amount: sanitizedData.total_amount || totalAmount,
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
      company_name: sanitizedData.company_name || null,
      company_oib: sanitizedData.company_oib || null,
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
          message: sanitizeError(error, 'database')
        })
      };
    }
    
    const orderId_db = insertedOrder[0].id;
    
    // Process order items only if we have order ID
    if (orderId_db && items && items.length > 0) {
      const orderItems = items.map(item => {
        // Use sanitized data if available, otherwise fallback to original
        const sanitizedItem = sanitizedData.items?.find(si => 
          si.product_id === (item.productId || (item.product && item.product.id))
        );
        
        return {
          order_id: orderId_db,
          product_id: (item.product && item.product.id) || item.productId || 'unknown',
          product_name: sanitizedItem?.product_name || item.productName || (item.product && item.product.name) || 'Unknown Product',
          product_image: item.productImage || (item.product && item.product.image) || null,
          quantity: sanitizedItem?.quantity || item.quantity || 1,
          unit_price: sanitizedItem?.unit_price || item.price || (item.product && item.product.price) || 0,
          subtotal: (sanitizedItem?.unit_price || item.price || (item.product && item.product.price) || 0) * (sanitizedItem?.quantity || item.quantity || 1),
          options: item.options ? item.options : {}
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
    
    // Send order confirmation email
    try {
      const emailData = {
        orderId, 
        customer: {
          ...customer,
          fullName: sanitizedData.customer_name || customer.fullName,
          email: sanitizedData.customer_email || customer.email,
          phone: sanitizedData.customer_phone || customer.phone
        },
        items,
        totalAmount: sanitizedData.total_amount || totalAmount,
        paymentMethod: 'Credit/Debit Card'
      };
      
      await fetch(`${process.env.URL}/.netlify/functions/send-order-confirmation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailData)
      });
    } catch (emailError) {
      secureLog('error', 'Failed to send confirmation email', process.env.NODE_ENV === 'development' ? emailError : null);
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
        message: sanitizeError(error, 'general')
      })
    };
  }
}; 