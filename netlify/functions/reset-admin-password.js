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
    const { email } = JSON.parse(event.body);

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

    // Check if admin exists
    const { data: existingAdmin } = await supabase
      .from('admin_users')
      .select('email')
      .eq('email', email)
      .single();

    if (!existingAdmin) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ 
          success: false, 
          message: 'Admin user not found' 
        }),
      };
    }

    // Generate new temporary password
    const tempPassword = generateTemporaryPassword();

    // Try to update password for existing user first
    try {
      // Get user by email from auth
      const { data: authUsers, error: getUserError } = await supabase.auth.admin.listUsers();
      
      if (getUserError) {
        console.error('Error listing users:', getUserError);
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ 
            success: false, 
            message: 'Failed to find user account',
            error: getUserError.message 
          }),
        };
      }

      console.log(`Looking for user: ${email}`);
      console.log(`Total users found: ${authUsers.users.length}`);
      console.log(`User emails: ${authUsers.users.map(u => u.email).join(', ')}`);

      const authUser = authUsers.users.find(user => user.email === email);

      if (authUser) {
        console.log(`Found existing user: ${authUser.id}`);
        // User exists, update their password
        const { error: updateError } = await supabase.auth.admin.updateUserById(
          authUser.id,
          { password: tempPassword }
        );

        if (updateError) {
          console.error('Error updating password:', updateError);
          return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ 
              success: false, 
              message: 'Failed to reset password',
              error: updateError.message 
            }),
          };
        }
        console.log('Password updated successfully');
      } else {
        console.log(`User ${email} not found in auth, attempting to create...`);
        // User doesn't exist in auth, try to create them
        const { data: authData, error: authError } = await supabase.auth.admin.createUser({
          email,
          password: tempPassword,
          email_confirm: true
        });

        if (authError) {
          console.error('Error creating auth user:', authError);
          
          // If user already exists (soft deleted or other issue), try to get them by email and update
          if (authError.message.includes('already') || authError.message.includes('Database error')) {
            console.log('User might already exist, trying alternative approach...');
            
                         // Try to query auth.users table directly
             try {
               console.log('Querying auth.users table directly...');
               const { data: directAuthQuery, error: directQueryError } = await supabase
                 .from('auth.users')
                 .select('id, email')
                 .eq('email', email)
                 .single();
               
               if (directAuthQuery && directAuthQuery.id) {
                 console.log(`Found user in auth.users: ${directAuthQuery.id}`);
                 // Update password for found user
                 const { error: updateError } = await supabase.auth.admin.updateUserById(
                   directAuthQuery.id,
                   { password: tempPassword }
                 );
                 
                 if (updateError) {
                   console.error('Error updating password for existing user:', updateError);
                   return {
                     statusCode: 500,
                     headers,
                     body: JSON.stringify({ 
                       success: false, 
                       message: 'Failed to reset password for existing user',
                       error: updateError.message 
                     }),
                   };
                 }
                 console.log('Password updated for existing user');
               } else {
                 console.error('Could not find user in auth.users table either');
                 console.log('This user exists in admin_users but not in auth - creating fresh auth account...');
                 
                 // User truly doesn't exist in auth, but the create failed
                 // This might be a temporary issue, let's try once more with a different email format
                 const { data: retryAuthData, error: retryAuthError } = await supabase.auth.admin.createUser({
                   email: email.toLowerCase().trim(),
                   password: tempPassword,
                   email_confirm: true
                 });
                 
                 if (retryAuthError) {
                   console.error('Retry create also failed:', retryAuthError);
                   return {
                     statusCode: 500,
                     headers,
                     body: JSON.stringify({ 
                       success: false, 
                       message: 'User exists in admin table but cannot be created in auth system. This may be due to email conflicts or auth restrictions.',
                       error: retryAuthError.message 
                     }),
                   };
                 }
                 console.log('Retry create succeeded');
               }
             } catch (emailLookupError) {
               console.error('Direct auth query failed:', emailLookupError);
               return {
                 statusCode: 500,
                 headers,
                 body: JSON.stringify({ 
                   success: false, 
                   message: 'Failed to query auth system directly',
                   error: emailLookupError.message 
                 }),
               };
             }
          } else {
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
        } else {
          console.log('New user created successfully');
        }
      }
    } catch (authOperationError) {
      console.error('Auth operation failed:', authOperationError);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          success: false, 
          message: 'Authentication operation failed',
          error: authOperationError.message 
        }),
      };
    }

    // Update admin_users table to indicate password change required
    const { error: dbError } = await supabase
      .from('admin_users')
      .update({ 
        password_hash: 'temp_password_change_required'
      })
      .eq('email', email);

    if (dbError) {
      console.error('Error updating admin_users:', dbError);
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        temporaryPassword: tempPassword,
        message: 'Password reset successfully'
      }),
    };

  } catch (error) {
    console.error('Error in reset-admin-password function:', error);
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