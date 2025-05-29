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
  // Check if email credentials are configured
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error('Email credentials not configured. Please set EMAIL_USER and EMAIL_PASS environment variables.');
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

// Croatian status translations
const getStatusTranslation = (status) => {
  switch(status) {
    case 'received':
      return 'Zaprimljeno';
    case 'processing':
      return 'U obradi';
    case 'shipped':
      return 'Poslano';
    case 'completed':
      return 'Završeno';
    case 'cancelled':
      return 'Otkazano';
    default:
      return status.charAt(0).toUpperCase() + status.slice(1);
  }
};

// Generate email HTML content for status update
const generateStatusUpdateHTML = (order, statusInfo) => {
  const { order_id, customer_name, customer_email, total_amount, status } = order;
  
  // Get order items from the order_items table
  const itemsList = order.order_items ? order.order_items.map(item => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.product_name}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.quantity}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">€${(item.unit_price * item.quantity).toFixed(2)}</td>
    </tr>
  `).join('') : '<tr><td colspan="3" style="padding: 10px; text-align: center;">Nema dostupnih stavki</td></tr>';
  
  // Get status-specific message
  const statusMessage = statusInfo.message || `Vaša narudžba je sada ${getStatusTranslation(status)}`;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Ažuriranje Statusa Narudžbe</title>
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
          <h1>Ažuriranje Statusa Narudžbe</h1>
          <p class="status-badge">${getStatusTranslation(status).toUpperCase()}</p>
          <p style="margin-top: 20px;">${statusMessage}</p>
        </div>
        
        <div class="order-details">
          <h2>Informacije o Narudžbi</h2>
          <p><strong>Referenca Narudžbe:</strong> ${order_id}</p>
          
          <h3>Informacije o Kupcu</h3>
          <p><strong>Ime:</strong> ${customer_name}</p>
          <p><strong>Email:</strong> ${customer_email}</p>
          
          <h3>Sažetak Narudžbe</h3>
          <table class="order-table">
            <thead>
              <tr>
                <th>Proizvod</th>
                <th>Količina</th>
                <th style="text-align: right;">Cijena</th>
              </tr>
            </thead>
            <tbody>
              ${itemsList}
            </tbody>
          </table>
          
          <div class="order-total">
            <p>Ukupno: €${parseFloat(total_amount).toFixed(2)}</p>
          </div>
        </div>
        
        <div class="footer">
          <p>Ako imate pitanja o vašoj narudžbi, molimo kontaktirajte nas.</p>
          <p>© ${new Date().getFullYear()} Smartblinds Croatia. Sva prava pridržana.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Get status-specific information for email design (Croatian)
const getStatusInfo = (status) => {
  switch(status) {
    case 'processing':
      return {
        color: '#f59e0b', // Amber
        message: 'Dobre vijesti! Sada obrađujemo vašu narudžbu. Naš tim priprema vaše proizvode za dostavu.'
      };
    case 'shipped':
      return {
        color: '#10b981', // Green
        message: 'Odlične vijesti! Vaša narudžba je poslana i na putu je do vas. Hvala vam na strpljenju.'
      };
    case 'completed':
      return {
        color: '#059669', // Emerald
        message: 'Vaša narudžba je dostavljena i sada je završena. Nadamo se da ćete uživati u vašim novim proizvodima!'
      };
    case 'cancelled':
      return {
        color: '#ef4444', // Red
        message: 'Vaša narudžba je otkazana. Ako niste zatražili ovo otkazivanje, molimo kontaktirajte nas odmah.'
      };
    default:
      return {
        color: '#3b82f6', // Blue
        message: `Status vaše narudžbe je ažuriran na ${getStatusTranslation(status)}.`
      };
  }
};

// Use named export for compatibility with ESM
export const handler = async function(event, context) {
  // Handle CORS preflight request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: '',
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ success: false, message: 'Method Not Allowed' })
    };
  }
  
  try {
    // Check if email is configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.warn('Email not configured - skipping email notification');
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          success: true,
          message: 'Email not configured - status updated but no email sent'
        })
      };
    }

    // Parse the incoming request body
    const { orderId, status, previousStatus } = JSON.parse(event.body);
    
    // Validate required data
    if (!orderId || !status) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ success: false, message: 'Missing required order information' })
      };
    }
    
    // Skip sending email if status didn't change
    if (status === previousStatus) {
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          success: true,
          message: 'Status unchanged, no email sent'
        })
      };
    }
    
    // Get order data from Supabase with order items
    const { data: order, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          id,
          product_name,
          quantity,
          unit_price,
          subtotal
        )
      `)
      .eq('order_id', orderId)
      .single();
    
    if (error || !order) {
      console.error('Supabase error:', error);
      return {
        statusCode: 404,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
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
      subject: `Ažuriranje Statusa Narudžbe - #${order.order_id} je sada ${getStatusTranslation(status).toUpperCase()}`,
      html: htmlContent
    });
    
    console.log(`Status update email sent successfully to ${order.customer_email}`);
    
    // Return success response
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        success: true, 
        message: 'Order status update email sent successfully'
      })
    };
  } catch (error) {
    console.error('Email sending error:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        success: false, 
        message: 'Failed to send status update email',
        error: error.message
      })
    };
  }
}; 