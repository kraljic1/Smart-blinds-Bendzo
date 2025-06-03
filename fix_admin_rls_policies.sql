-- Fix RLS policies for admin_users table to allow proper admin login
-- The issue: Users need to check if they're admin BEFORE being authenticated as admin

-- First, ensure RLS is enabled
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to start fresh
DROP POLICY IF EXISTS "Allow service role to manage admin users" ON admin_users;
DROP POLICY IF EXISTS "Allow users to check if they are admins" ON admin_users;
DROP POLICY IF EXISTS "Allow admin user creation" ON admin_users;
DROP POLICY IF EXISTS "Allow admin user login" ON admin_users;
DROP POLICY IF EXISTS "Allow admin user updates" ON admin_users;
DROP POLICY IF EXISTS "Allow admins to manage admin users" ON admin_users;
DROP POLICY IF EXISTS "Secure admin verification" ON admin_users;
DROP POLICY IF EXISTS "admins_can_view_all_admins" ON admin_users;

-- Policy 1: Allow service role to manage everything (for server-side operations)
CREATE POLICY "service_role_full_access" ON admin_users
  FOR ALL 
  USING (auth.role() = 'service_role');

-- Policy 2: Allow authenticated users to check if they are admins
-- This is crucial for the login flow - users need to verify admin status after auth
CREATE POLICY "authenticated_users_can_check_admin_status" ON admin_users
  FOR SELECT 
  USING (auth.role() = 'authenticated' AND auth.email() = email);

-- Policy 3: Allow existing admins to view all admin users (for admin management)
CREATE POLICY "admins_can_view_all_admins" ON admin_users
  FOR SELECT 
  USING (
    auth.role() = 'authenticated' 
    AND EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.email = auth.email()
    )
  );

-- Policy 4: Allow existing admins to manage other admin users
CREATE POLICY "admins_can_manage_admin_users" ON admin_users
  FOR ALL 
  USING (
    auth.role() = 'authenticated' 
    AND EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.email = auth.email()
    )
  );

-- Verify the policies are created
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'admin_users'; 