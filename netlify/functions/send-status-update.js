/**
 * Netlify function to send order status update emails
 * This sends an email to customers when their order status changes
 */

import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

// Initialize Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Configure email transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Generate email HTML content for status update
const generateStatusUpdateHTML = (order, statusInfo) => {
  const { order_id, customer_name, customer_email, items: itemsJson, total_amount, status } = order;
  
  // Parse items
  const items = JSON.parse(itemsJson);
  
  // Format items list
  const itemsList = items.map(item => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.productName}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.quantity}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">€${(item.price * item.quantity).toFixed(2)}</td>
    </tr>
  `).join('');
  
  // Get status-specific message
  const statusMessage = statusInfo.message || `Your order is now ${status}`;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Order Status Update</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; padding: 20px 0; }
        .status-badge { 
          display: inline-block;
          padding: 6px 12px;
          border-radius: 20px;
          font-weight: bold;
          background-color: ${statusInfo.color};
          color: white;
        }
        .order-details { background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin-top: 20px; }
        .order-table { width: 100%; border-collapse: collapse; }
        .order-table th { text-align: left; padding: 10px; border-bottom: 2px solid #ddd; }
        .order-total { font-weight: bold; text-align: right; padding: 10px; margin-top: 20px; }
        .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #777; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Order Status Update</h1>
          <p class="status-badge">${status.toUpperCase()}</p>
          <p style="margin-top: 20px;">${statusMessage}</p>
        </div>
        
        <div class="order-details">
          <h2>Order Information</h2>
          <p><strong>Order Reference:</strong> ${order_id}</p>
          
          <h3>Customer Information</h3>
          <p><strong>Name:</strong> ${customer_name}</p>
          <p><strong>Email:</strong> ${customer_email}</p>
          
          <h3>Order Summary</h3>
          <table class="order-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th style="text-align: right;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${itemsList}
            </tbody>
          </table>
          
          <div class="order-total">
            <p>Total: €${parseFloat(total_amount).toFixed(2)}</p>
          </div>
        </div>
        
        <div class="footer">
          <p>If you have any questions about your order, please contact us.</p>
          <p>© ${new Date().getFullYear()} Smartblinds Croatia. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Get status-specific information for email design
const getStatusInfo = (status) => {
  switch(status) {
    case 'processing':
      return {
        color: '#f59e0b', // Amber
        message: 'Good news! We are now processing your order. Our team is preparing your products for shipping.'
      };
    case 'shipped':
      return {
        color: '#10b981', // Green
        message: 'Great news! Your order has been shipped and is on its way to you. Thank you for your patience.'
      };
    case 'completed':
      return {
        color: '#059669', // Emerald
        message: 'Your order has been delivered and is now complete. We hope you enjoy your new products!'
      };
    case 'cancelled':
      return {
        color: '#ef4444', // Red
        message: 'Your order has been cancelled. If you did not request this cancellation, please contact us immediately.'
      };
    default:
      return {
        color: '#3b82f6', // Blue
        message: `Your order status has been updated to ${status}.`
      };
  }
};

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
    const { orderId, status, previousStatus } = JSON.parse(event.body);
    
    // Validate required data
    if (!orderId || !status) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, message: 'Missing required order information' })
      };
    }
    
    // Skip sending email if status didn't change
    if (status === previousStatus) {
      return {
        statusCode: 200,
        body: JSON.stringify({ 
          success: true,
          message: 'Status unchanged, no email sent'
        })
      };
    }
    
    // Get order data from Supabase
    const { data: order, error } = await supabase
      .from('orders')
      .select('*')
      .eq('order_id', orderId)
      .single();
    
    if (error || !order) {
      console.error('Supabase error:', error);
      return {
        statusCode: 404,
        body: JSON.stringify({ success: false, message: 'Order not found' })
      };
    }
    
    // Get status-specific information for the email
    const statusInfo = getStatusInfo(status);
    
    // Generate email content
    const htmlContent = generateStatusUpdateHTML(order, statusInfo);
    
    // Send email
    const transporter = createTransporter();
    await transporter.sendMail({
      from: `"Smartblinds Croatia" <${process.env.EMAIL_USER}>`,
      to: order.customer_email,
      subject: `Order Status Update - #${order.order_id} is now ${status.toUpperCase()}`,
      html: htmlContent
    });
    
    // Return success response
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true, 
        message: 'Order status update email sent successfully'
      })
    };
  } catch (error) {
    console.error('Email sending error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        success: false, 
        message: 'Failed to send status update email',
        error: error.message
      })
    };
  }
}; 