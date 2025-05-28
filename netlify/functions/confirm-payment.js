/**
 * Netlify function to confirm Stripe payment and process order
 * This verifies payment success and creates the order in database
 */

import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import fetch from 'node-fetch';

// Initialize Stripe with secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: process.env.STRIPE_API_VERSION || '2024-06-20',
});

// Initialize Supabase client with forced schema refresh
const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey, {
  db: { schema: 'public' },
  auth: { persistSession: false }
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
    
    // Create the order object with only safe columns to avoid schema cache issues
    const orderData = {
      order_number: orderId,
      customer_full_name: customer.fullName,
      customer_email: customer.email,
      customer_phone: customer.phone,
      billing_address: customer.address,
      billing_city: customer.city || 'Unknown',
      billing_postal_code: customer.postalCode || '00000',
      shipping_address: customer.shippingAddress || customer.address,
      shipping_city: customer.shippingCity || customer.city || 'Unknown',
      shipping_postal_code: customer.shippingPostalCode || customer.postalCode || '00000',
      same_as_billing: !customer.shippingAddress,
      subtotal_amount: totalAmount,
      shipping_amount: shippingCost || 0,
      tax_amount: taxAmount || 0,
      total_amount: totalAmount,
      payment_method: 'Credit card',
      payment_status: 'paid',
      payment_intent_id: paymentIntentId,
      shipping_method: customer.shippingMethod || 'Standard delivery',
      order_status: 'confirmed'
    };

    // Add optional fields only if they exist
    if (notes) {
      orderData.additional_notes = notes;
    }
    
    console.log('Creating order with payment confirmation:', orderId);
    
    // Use minimal order data to avoid schema cache problems
    const minimalOrderData = {
      order_number: orderId,
      customer_full_name: customer.fullName,
      customer_email: customer.email,
      customer_phone: customer.phone,
      billing_address: customer.address,
      billing_city: customer.city || 'Unknown',
      billing_postal_code: customer.postalCode || '00000',
      shipping_address: customer.shippingAddress || customer.address,
      shipping_city: customer.shippingCity || customer.city || 'Unknown',
      shipping_postal_code: customer.shippingPostalCode || customer.postalCode || '00000',
      total_amount: totalAmount,
      payment_method: 'Credit card',
      payment_status: 'paid',
      payment_intent_id: paymentIntentId
    };
    
    // Use raw SQL to bypass schema cache issues
    const { data: insertedOrder, error } = await supabase.rpc('exec_sql_with_params', {
      sql: `
        INSERT INTO orders (
          order_id, customer_name, customer_email, customer_phone,
          billing_address, shipping_address, notes,
          total_amount, payment_method, payment_status,
          needs_r1_invoice, company_name, company_oib
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
        RETURNING id, order_id;
      `,
      params: [
        orderId,
        customer.fullName,
        customer.email, 
        customer.phone,
        customer.address,
        customer.shippingAddress || customer.address,
        notes || '',
        totalAmount,
        'Credit card',
        'paid',
        customer.needsR1Invoice || false,
        customer.needsR1Invoice ? customer.companyName : null,
        customer.needsR1Invoice ? customer.companyOib : null
      ]
    });

    // Fallback to direct SQL if RPC doesn't work
    if (error && error.message.includes('function "exec_sql_with_params" does not exist')) {
      const insertQuery = `
        INSERT INTO orders (
          order_id, customer_name, customer_email, customer_phone,
          billing_address, shipping_address, notes,
          total_amount, payment_method, payment_status,
          needs_r1_invoice, company_name, company_oib
        ) VALUES (
          '${orderId}', '${customer.fullName}', '${customer.email}', '${customer.phone}',
          '${customer.address}', '${customer.shippingAddress || customer.address}', '${notes || ''}',
          ${totalAmount}, 'Credit card', 'paid',
          ${customer.needsR1Invoice || false}, 
          ${customer.needsR1Invoice ? `'${customer.companyName}'` : 'NULL'}, 
          ${customer.needsR1Invoice ? `'${customer.companyOib}'` : 'NULL'}
        ) RETURNING id, order_id;
      `;
      
      const result = await supabase.rpc('exec_sql', { query: insertQuery });
      if (result.error) {
        console.error('Direct SQL insert failed:', result.error);
        return {
          statusCode: 500,
          body: JSON.stringify({ 
            success: false, 
            message: 'Failed to save order to database via SQL',
            error: result.error.message
          })
        };
      }
      insertedOrder = result.data;
    }
    
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

    // Get order ID from result - handle different response formats
    const orderId_db = insertedOrder && insertedOrder[0] ? insertedOrder[0].id : null;
    
    if (!orderId_db) {
      console.warn('Could not get order ID from insert result, skipping order items');
    }
    
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
        options: item.options ? item.options : {}
      }));
      
      // Insert order items into Supabase
      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);
      
      if (itemsError) {
        console.error('Supabase order items error:', itemsError);
        // Don't fail the whole order for items error
        console.warn('Order created but items failed to save');
      }
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