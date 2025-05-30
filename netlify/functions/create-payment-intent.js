/**
 * Netlify function to create Stripe Payment Intent
 * This creates a payment intent for processing card payments
 */

import Stripe from 'stripe';

// Initialize Stripe with secret key and latest API version
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-11-20.acacia', // Latest API version with enhanced privacy browser support
});

// Secure logging function
function secureLog(level, message, data = null) {
  const isDev = process.env.NODE_ENV === 'development';
  
  if (isDev) {
    console[level](`[CREATE-PAYMENT-INTENT] ${message}`, data);
  } else {
    // In production, only log minimal information
    console[level](`[CREATE-PAYMENT-INTENT] ${message}`);
  }
}

// Sanitize error messages for client response
function sanitizeError(error, context = 'general') {
  const userMessages = {
    validation: 'Invalid payment data provided',
    stripe: 'Payment service temporarily unavailable',
    general: 'Failed to create payment intent'
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

  try {
    const { amount, currency = 'eur', customer, items, metadata } = JSON.parse(event.body);

    // Validate required data
    if (!amount || amount <= 0) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ 
          success: false, 
          message: sanitizeError(null, 'validation')
        })
      };
    }

    secureLog('info', 'Creating payment intent');

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: currency.toLowerCase(),
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        customerName: customer?.fullName || '',
        customerEmail: customer?.email || '',
        customerPhone: customer?.phone || '',
        itemsCount: items?.length?.toString() || '0',
        ...metadata
      }
    });

    secureLog('info', 'Payment intent created successfully');

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      },
      body: JSON.stringify({
        success: true,
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id
      })
    };

  } catch (error) {
    secureLog('error', 'Payment Intent creation error', process.env.NODE_ENV === 'development' ? error : null);
    
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
        success: false,
        message: sanitizeError(error, 'stripe')
      })
    };
  }
}; 