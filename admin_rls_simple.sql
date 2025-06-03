-- Simple RLS policies for admin_users table
-- Focus: Allow admin login to work properly

-- Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Drop all existing policies
DROP POLICY IF EXISTS "Allow service role to manage admin users" ON admin_users;
DROP POLICY IF EXISTS "Allow users to check if they are admins" ON admin_users;
DROP POLICY IF EXISTS "Allow admin user creation" ON admin_users;
DROP POLICY IF EXISTS "Allow admin user login" ON admin_users;
DROP POLICY IF EXISTS "Allow admin user updates" ON admin_users;
DROP POLICY IF EXISTS "Allow admins to manage admin users" ON admin_users;
DROP POLICY IF EXISTS "Secure admin verification" ON admin_users;
DROP POLICY IF EXISTS "admins_can_view_all_admins" ON admin_users;
DROP POLICY IF EXISTS "service_role_full_access" ON admin_users;
DROP POLICY IF EXISTS "authenticated_users_can_check_admin_status" ON admin_users;
DROP POLICY IF EXISTS "admins_can_manage_admin_users" ON admin_users;

-- Policy 1: Service role can do everything (for server operations)
CREATE POLICY "service_role_access" ON admin_users
  FOR ALL 
  USING (auth.role() = 'service_role');

-- Policy 2: Authenticated users can check their own admin status
-- This allows the login flow to work: user logs in with Supabase Auth,
-- then checks if their email exists in admin_users table
CREATE POLICY "users_can_check_own_admin_status" ON admin_users
  FOR SELECT 
  USING (auth.email() = email);

-- That's it! Keep it simple.
-- The key insight: users need to be able to SELECT their own record
-- from admin_users table after they authenticate with Supabase Auth

-- Test query to verify policies work:
-- This should work for an authenticated user checking their admin status:
-- SELECT id FROM admin_users WHERE email = auth.email(); 