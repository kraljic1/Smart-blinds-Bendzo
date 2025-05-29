/**
 * Netlify function to send order confirmation emails
 * This sends an email to customers after they place an order
 */

import nodemailer from 'nodemailer';

// Configure email transporter
const createTransporter = () => {
  // Check if email credentials are configured
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('Email credentials not configured. Emails will not be sent.');
    return null;
  }

  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Generate email HTML content
const generateEmailHTML = (order) => {
  const { orderId, customer, items, totalAmount } = order;
  
  // Format items list
  const itemsList = items.map(item => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.productName}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.quantity}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">€${(item.price * item.quantity).toFixed(2)}</td>
    </tr>
  `).join('');
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Order Confirmation</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; padding: 20px 0; }
        .order-details { background-color: #f9f9f9; padding: 20px; border-radius: 5px; }
        .order-table { width: 100%; border-collapse: collapse; }
        .order-table th { text-align: left; padding: 10px; border-bottom: 2px solid #ddd; }
        .order-total { font-weight: bold; text-align: right; padding: 10px; margin-top: 20px; }
        .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #777; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Thank You for Your Order!</h1>
          <p>We've received your order and are processing it now.</p>
        </div>
        
        <div class="order-details">
          <h2>Order Information</h2>
          <p><strong>Order Reference:</strong> ${orderId}</p>
          <p><strong>Order Date:</strong> ${new Date().toLocaleDateString()}</p>
          
          <h3>Customer Information</h3>
          <p><strong>Name:</strong> ${customer.fullName}</p>
          <p><strong>Email:</strong> ${customer.email}</p>
          <p><strong>Phone:</strong> ${customer.phone}</p>
          <p><strong>Address:</strong> ${customer.address}</p>
          
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
            <p>Total: €${totalAmount.toFixed(2)}</p>
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

// Use named export for compatibility with ESM
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
    // Parse the incoming request body
    const orderData = JSON.parse(event.body);
    const { orderId, customer, items, totalAmount } = orderData;
    
    // Validate required data
    if (!orderId || !customer || !items || !totalAmount) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ success: false, message: 'Missing required order information' })
      };
    }
    
    // Check if email is configured
    const transporter = createTransporter();
    
    if (!transporter) {
      console.log('Email not configured - skipping email send');
      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify({ 
          success: true, 
          message: 'Order processed successfully (email not configured)',
          emailSent: false
        })
      };
    }
    
    // Generate email content
    const htmlContent = generateEmailHTML(orderData);
    
    // Send email
    const info = await transporter.sendMail({
      from: `"Smartblinds Croatia" <${process.env.EMAIL_USER}>`,
      to: customer.email,
      subject: `Order Confirmation - #${orderId}`,
      html: htmlContent
    });
    
    console.log('Email sent:', info.messageId);
    
    // Return success response
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ 
        success: true, 
        messageId: info.messageId,
        message: 'Order confirmation email sent successfully',
        emailSent: true
      })
    };
  } catch (error) {
    console.error('Email sending error:', error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ 
        success: false, 
        message: 'Failed to send order confirmation email',
        error: error.message,
        emailSent: false
      })
    };
  }
}; 