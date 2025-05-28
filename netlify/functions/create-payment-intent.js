/**
 * Netlify function to create Stripe Payment Intent
 * This creates a payment intent for processing card payments
 */

import Stripe from 'stripe';

// Initialize Stripe with secret key and latest API version
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: process.env.STRIPE_API_VERSION || '2025-04-30.basil',
});

export const handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      body: JSON.stringify({ success: false, message: 'Method Not Allowed' })
    };
  }

  try {
    const { amount, currency = 'eur', customer, items, metadata } = JSON.parse(event.body);

    // Validate required data
    if (!amount || amount <= 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          success: false, 
          message: 'Invalid amount provided' 
        })
      };
    }

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

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({
        success: true,
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id
      })
    };

  } catch (error) {
    console.error('Payment Intent creation error:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: 'Failed to create payment intent',
        error: error.message
      })
    };
  }
}; 