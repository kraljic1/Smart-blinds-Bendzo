-- Fix admin_users RLS policies to avoid circular dependency
-- This script solves the login issue by allowing proper admin verification

-- Drop all existing policies
DROP POLICY IF EXISTS "Users can check their own admin status" ON admin_users;
DROP POLICY IF EXISTS "Allow admin creation via service role" ON admin_users;
DROP POLICY IF EXISTS "Allow admin updates" ON admin_users;
DROP POLICY IF EXISTS "Admin users can view all admin users" ON admin_users;
DROP POLICY IF EXISTS "Admin users can insert new admin users" ON admin_users;
DROP POLICY IF EXISTS "Admin users can update admin users" ON admin_users;
DROP POLICY IF EXISTS "Allow authenticated users to check admin status" ON admin_users;
DROP POLICY IF EXISTS "Allow admins to view all admin users" ON admin_users;
DROP POLICY IF EXISTS "Allow admins to insert new admin users" ON admin_users;
DROP POLICY IF EXISTS "Allow admins to update admin users" ON admin_users;

-- Create the correct policies

-- 1. Allow any authenticated user to check if THEY are an admin (for login)
-- This is the key policy that fixes the circular dependency
CREATE POLICY "authenticated_users_can_check_own_admin_status" ON admin_users
    FOR SELECT USING (
        auth.role() = 'authenticated' AND 
        email = auth.jwt() ->> 'email'
    );

-- 2. Allow service role (Netlify functions) to do everything
CREATE POLICY "service_role_full_access" ON admin_users
    FOR ALL USING (auth.role() = 'service_role');

-- 3. Allow authenticated users to view all admins IF they are already verified as admin
-- This is for the admin management interface
CREATE POLICY "verified_admins_can_view_all" ON admin_users
    FOR SELECT USING (
        auth.role() = 'authenticated' AND
        EXISTS (
            SELECT 1 FROM admin_users au 
            WHERE au.email = auth.jwt() ->> 'email' 
            AND au.is_active = true
        )
    );

-- 4. Allow verified admins to insert new admin users
CREATE POLICY "verified_admins_can_insert" ON admin_users
    FOR INSERT WITH CHECK (
        auth.role() = 'service_role' OR
        (auth.role() = 'authenticated' AND
         EXISTS (
             SELECT 1 FROM admin_users au 
             WHERE au.email = auth.jwt() ->> 'email' 
             AND au.is_active = true
         ))
    );

-- 5. Allow verified admins to update admin users
CREATE POLICY "verified_admins_can_update" ON admin_users
    FOR UPDATE USING (
        auth.role() = 'service_role' OR
        (auth.role() = 'authenticated' AND
         EXISTS (
             SELECT 1 FROM admin_users au 
             WHERE au.email = auth.jwt() ->> 'email' 
             AND au.is_active = true
         ))
    );

-- 6. Allow verified admins to delete admin users
CREATE POLICY "verified_admins_can_delete" ON admin_users
    FOR DELETE USING (
        auth.role() = 'service_role' OR
        (auth.role() = 'authenticated' AND
         EXISTS (
             SELECT 1 FROM admin_users au 
             WHERE au.email = auth.jwt() ->> 'email' 
             AND au.is_active = true
         ))
    );

-- Verify the policies were created
SELECT schemaname, tablename, policyname, cmd 
FROM pg_policies 
WHERE tablename = 'admin_users'
ORDER BY policyname; 