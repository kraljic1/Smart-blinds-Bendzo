-- Fix admin_users RLS policies to allow authenticated admin users to manage other admin users
-- This fixes the 406 (Not Acceptable) error when adding new admin users

-- Drop existing policies
DROP POLICY IF EXISTS "Allow service role to manage admin users" ON admin_users;
DROP POLICY IF EXISTS "Allow users to check if they are admins" ON admin_users;
DROP POLICY IF EXISTS "Allow admins to manage admin users" ON admin_users;

-- Recreate policies with proper permissions
CREATE POLICY "Allow service role to manage admin users" ON admin_users
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Allow users to check if they are admins" ON admin_users
  FOR SELECT USING (auth.email() = email);

CREATE POLICY "Allow admins to manage admin users" ON admin_users
  FOR ALL USING (EXISTS (
    SELECT 1 FROM admin_users 
    WHERE admin_users.email = auth.email()
  )); 