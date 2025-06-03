import { createClient } from '@supabase/supabase-js';

// CORS headers
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Content-Type': 'application/json',
};

export const handler = async (event, context) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ success: false, message: 'Method not allowed' }),
    };
  }

  try {
    // Initialize Supabase client with service role key only
    const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          success: false, 
          message: 'Missing environment variables'
        }),
      };
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      db: { schema: 'public' },
      auth: { persistSession: false }
    });

    // Get all auth users
    const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
    
    // Get all admin_users
    const { data: adminUsers, error: adminError } = await supabase
      .from('admin_users')
      .select('*');

    // Try to query auth.users directly
    const { data: directAuthUsers, error: directError } = await supabase
      .from('auth.users')
      .select('id, email, email_confirmed_at, deleted_at, banned_until, created_at');

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        data: {
          authUsersFromAPI: {
            count: authUsers?.users?.length || 0,
            users: authUsers?.users?.map(u => ({
              id: u.id,
              email: u.email,
              email_confirmed_at: u.email_confirmed_at,
              created_at: u.created_at
            })) || [],
            error: authError?.message
          },
          adminUsersFromTable: {
            count: adminUsers?.length || 0,
            users: adminUsers || [],
            error: adminError?.message
          },
          directAuthQuery: {
            count: directAuthUsers?.length || 0,
            users: directAuthUsers || [],
            error: directError?.message
          }
        }
      }),
    };

  } catch (error) {
    console.error('Debug auth error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        success: false, 
        message: 'Debug failed',
        error: error.message 
      }),
    };
  }
}; 