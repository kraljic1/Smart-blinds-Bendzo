/**
 * Netlify function to confirm Stripe payment and process order
 * This verifies payment success and creates the order in database
 */

import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import fetch from 'node-fetch';

// Initialize Stripe with secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      body: JSON.stringify({ success: false, message: 'Method Not Allowed' })
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

    // Validate required data
    if (!paymentIntentId || !customer || !items || !totalAmount) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          success: false, 
          message: 'Missing required payment confirmation data' 
        })
      };
    }

    // Retrieve and verify payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
    if (paymentIntent.status !== 'succeeded') {
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          message: 'Payment has not been completed successfully',
          paymentStatus: paymentIntent.status
        })
      };
    }

    // Verify payment amount matches order total
    const paidAmount = paymentIntent.amount / 100; // Convert from cents
    if (Math.abs(paidAmount - totalAmount) > 0.01) { // Allow for small rounding differences
      console.error(`Payment amount mismatch: paid ${paidAmount}, expected ${totalAmount}`);
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          message: 'Payment amount does not match order total'
        })
      };
    }

    // Generate a unique order ID
    const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
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
      payment_method: 'Stripe Card Payment',
      payment_status: 'paid',
      payment_intent_id: paymentIntentId,
      shipping_method: customer.shippingMethod || 'Standard delivery',
      status: 'paid',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    console.log('Creating order with payment confirmation:', orderId);
    
    // Insert the order into Supabase
    const { data: insertedOrder, error } = await supabase
      .from('orders')
      .insert([orderData])
      .select();
    
    if (error) {
      console.error('Supabase insert error:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          success: false, 
          message: 'Failed to save order to database',
          error: error.message
        })
      };
    }

    const orderId_db = insertedOrder[0].id;
    
    // Process order items
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
    
    // Insert order items into Supabase
    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);
    
    if (itemsError) {
      console.error('Supabase order items error:', itemsError);
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          success: false, 
          message: 'Failed to save order items to database',
          error: itemsError.message
        })
      };
    }
    
    // Send order confirmation email
    try {
      const emailData = {
        orderId, 
        customer,
        items,
        totalAmount,
        paymentMethod: 'Credit/Debit Card'
      };
      
      await fetch(`${process.env.URL}/.netlify/functions/send-order-confirmation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailData)
      });
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
      // Don't fail the order if email fails
    }
    
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
        orderId,
        paymentStatus: 'completed',
        message: 'Order placed successfully with card payment'
      })
    };

  } catch (error) {
    console.error('Payment confirmation error:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: 'Failed to confirm payment and process order',
        error: error.message
      })
    };
  }
}; 