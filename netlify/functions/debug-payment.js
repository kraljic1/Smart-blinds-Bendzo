/**
 * Debug function to diagnose payment processing issues
 */

export const handler = async function(event, context) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Max-Age': '86400',
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: ''
    };
  }

  try {
    // Check environment variables
    const envCheck = {
      STRIPE_SECRET_KEY: !!process.env.STRIPE_SECRET_KEY,
      STRIPE_PUBLISHABLE_KEY: !!process.env.STRIPE_PUBLISHABLE_KEY,
      SUPABASE_URL: !!process.env.SUPABASE_URL,
      VITE_SUPABASE_URL: !!process.env.VITE_SUPABASE_URL,
      SUPABASE_SERVICE_KEY: !!process.env.SUPABASE_SERVICE_KEY,
      SUPABASE_ANON_KEY: !!process.env.SUPABASE_ANON_KEY,
      VITE_SUPABASE_ANON_KEY: !!process.env.VITE_SUPABASE_ANON_KEY,
      NODE_ENV: process.env.NODE_ENV
    };

    // Test Supabase connection
    let supabaseTest = null;
    try {
      const { createClient } = await import('@supabase/supabase-js');
      const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
      const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
      
      if (supabaseUrl && supabaseKey) {
        const supabase = createClient(supabaseUrl, supabaseKey);
        const { data, error } = await supabase.from('orders').select('count').limit(1);
        supabaseTest = {
          connected: !error,
          error: error?.message || null
        };
      } else {
        supabaseTest = {
          connected: false,
          error: 'Missing Supabase credentials'
        };
      }
    } catch (supabaseError) {
      supabaseTest = {
        connected: false,
        error: supabaseError.message
      };
    }

    // Test Stripe connection
    let stripeTest = null;
    try {
      if (process.env.STRIPE_SECRET_KEY) {
        const Stripe = await import('stripe');
        const stripe = new Stripe.default(process.env.STRIPE_SECRET_KEY, {
          apiVersion: '2024-11-20.acacia',
        });
        
        // Test with a simple API call
        await stripe.paymentMethods.list({ limit: 1 });
        stripeTest = {
          connected: true,
          error: null
        };
      } else {
        stripeTest = {
          connected: false,
          error: 'Missing Stripe secret key'
        };
      }
    } catch (stripeError) {
      stripeTest = {
        connected: false,
        error: stripeError.message
      };
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      },
      body: JSON.stringify({
        success: true,
        timestamp: new Date().toISOString(),
        environment: envCheck,
        supabase: supabaseTest,
        stripe: stripeTest,
        functionInfo: {
          region: process.env.AWS_REGION || 'unknown',
          runtime: process.version,
          memory: process.env.AWS_LAMBDA_FUNCTION_MEMORY_SIZE || 'unknown'
        }
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
        success: false,
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      })
    };
  }
}; 