import { supabase } from './supabaseClient';

/**
 * Admin user management functions
 */

// Helper function to generate temporary password
function generateTemporaryPassword(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let password = '';
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

/**
 * Add a user as an admin with temporary password
 * @param email The email of the user to add as admin
 * @param temporaryPassword The temporary password for the new admin
 * @returns Object with success status and temporary password
 */
export async function addAdminUser(email: string, temporaryPassword?: string): Promise<{success: boolean, temporaryPassword?: string}> {
  try {
    // Generate temporary password if not provided
    const finalPassword = temporaryPassword || generateTemporaryPassword();
    
    // Call the Netlify function to create admin user (server-side with service role)
    const response = await fetch('/.netlify/functions/create-admin-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        temporaryPassword: finalPassword
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error from create-admin-user function:', errorText);
      return { success: false };
    }

    const result = await response.json();

    return {
      success: result.success,
      temporaryPassword: result.temporaryPassword
    };
  } catch (error) {
    console.error('Error in addAdminUser:', error);
    return { success: false };
  }
}

export async function resetAdminPassword(email: string): Promise<{success: boolean, temporaryPassword?: string}> {
  try {
    // Call the Netlify function to reset admin password (server-side with service role)
    const response = await fetch('/.netlify/functions/reset-admin-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error from reset-admin-password function:', errorText);
      return { success: false };
    }

    const result = await response.json();

    return {
      success: result.success,
      temporaryPassword: result.temporaryPassword
    };
  } catch (error) {
    console.error('Error in resetAdminCredentials:', error);
    return { success: false };
  }
}

/**
 * Remove admin privileges from a user
 * @param email The email of the admin to remove
 * @returns True if successful, false otherwise
 */
export async function removeAdminUser(email: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('admin_users')
      .delete()
      .eq('email', email);
      
    if (error) {
      console.error('Error removing admin user:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error in removeAdminUser:', error);
    return false;
  }
}

/**
 * Check if a user is an admin
 * @param email The email to check
 * @returns True if the user is an admin, false otherwise
 */
export async function isUserAdmin(email: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('admin_users')
      .select('id')
      .eq('email', email)
      .single();
      
    if (error || !data) {
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
} 