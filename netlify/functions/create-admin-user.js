import { createClient } from '@supabase/supabase-js';

// CORS headers
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json',
};

// Generate a secure temporary password
function generateTemporaryPassword() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let password = '';
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

export const handler = async (event, context) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
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
      console.error('Missing Supabase environment variables');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          success: false, 
          message: 'Server configuration error',
          error: 'Missing database configuration'
        }),
      };
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      db: { schema: 'public' },
      auth: { persistSession: false }
    });

    // Parse request body
    const { email, temporaryPassword } = JSON.parse(event.body);

    if (!email) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          success: false, 
          message: 'Email is required' 
        }),
      };
    }

    // Generate temporary password
    const tempPassword = temporaryPassword || generateTemporaryPassword();

    // Check if admin already exists in admin_users table
    const { data: existingAdmin } = await supabase
      .from('admin_users')
      .select('email')
      .eq('email', email)
      .single();

    // Check if user exists in auth system
    const { data: authUsers } = await supabase.auth.admin.listUsers();
    const existingAuthUser = authUsers.users.find(user => user.email === email);

    // If admin exists, clean up and recreate
    if (existingAdmin || existingAuthUser) {
      console.log(`Admin ${email} already exists, cleaning up and recreating...`);
      
      // Delete from auth if exists
      if (existingAuthUser) {
        console.log(`Deleting existing auth user: ${existingAuthUser.id}`);
        const { error: deleteAuthError } = await supabase.auth.admin.deleteUser(existingAuthUser.id);
        if (deleteAuthError) {
          console.error('Error deleting existing auth user:', deleteAuthError);
        }
      }

      // Delete from admin_users if exists
      if (existingAdmin) {
        console.log(`Deleting existing admin_users record for: ${email}`);
        const { error: deleteAdminError } = await supabase
          .from('admin_users')
          .delete()
          .eq('email', email);
        if (deleteAdminError) {
          console.error('Error deleting existing admin_users record:', deleteAdminError);
        }
      }

      // Wait a moment for cleanup to complete
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Now create fresh auth user with the temporary password

    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password: tempPassword,
      email_confirm: true // Auto-confirm email
    });

    if (authError) {
      console.error('Error creating auth user:', authError);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          success: false, 
          message: 'Failed to create user account',
          error: authError.message 
        }),
      };
    }

    // Generate username from email (part before @)
    const username = email.split('@')[0];

    // Add user to admin_users table with temporary password stored
    const { error: dbError } = await supabase
      .from('admin_users')
      .insert([{ 
        email,
        username,
        password_hash: tempPassword, // Store temporary password until user changes it
        role: 'admin',
        is_active: true
      }]);

    if (dbError) {
      console.error('Error adding to admin_users:', dbError);
      
      // Clean up auth user if admin_users insert failed
      if (authData.user) {
        await supabase.auth.admin.deleteUser(authData.user.id);
      }
      
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          success: false, 
          message: 'Failed to create admin user',
          error: dbError.message 
        }),
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        temporaryPassword: tempPassword,
        message: 'Admin user created successfully'
      }),
    };

  } catch (error) {
    console.error('Error in create-admin-user function:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        success: false, 
        message: 'Internal server error',
        error: error.message 
      }),
    };
  }
}; 