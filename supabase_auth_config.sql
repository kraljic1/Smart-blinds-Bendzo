-- Supabase Authentication Security Configuration
-- Execute this in your Supabase SQL Editor to fix security warnings

-- 1. Configure secure OTP expiry (reduce from default to recommended threshold)
-- This should be done in Supabase Dashboard -> Authentication -> Settings
-- Set OTP expiry to 300 seconds (5 minutes) instead of default 3600 seconds

-- 2. Enable password strength requirements
-- This should be configured in Supabase Dashboard -> Authentication -> Settings
-- Enable "Minimum password length" and set to at least 8 characters

-- 3. Enable leaked password protection
-- This should be configured in Supabase Dashboard -> Authentication -> Settings
-- Enable "Check for breached passwords" option

-- 4. Create secure RLS policies for better security
-- Update existing policies to be more restrictive

-- Drop existing policies and recreate with better security
DROP POLICY IF EXISTS "Allow anonymous read access to orders" ON orders;
DROP POLICY IF EXISTS "Allow anonymous read access to order_items" ON order_items;

-- Create more secure policies
CREATE POLICY "Allow authenticated read access to orders" ON orders
  FOR SELECT USING (
    auth.role() = 'authenticated' OR 
    auth.role() = 'service_role' OR
    EXISTS (SELECT 1 FROM admin_users WHERE admin_users.email = auth.email())
  );

CREATE POLICY "Allow authenticated read access to order_items" ON order_items
  FOR SELECT USING (
    auth.role() = 'authenticated' OR 
    auth.role() = 'service_role' OR
    EXISTS (SELECT 1 FROM admin_users WHERE admin_users.email = auth.email())
  );

-- Create policy for secure admin access
CREATE POLICY "Secure admin verification" ON admin_users
  FOR SELECT USING (
    auth.role() = 'service_role' OR 
    auth.email() = email
  );

-- Add function to validate admin access with proper security
CREATE OR REPLACE FUNCTION is_admin(user_email text) RETURNS boolean AS $$
BEGIN
  -- Set secure search path
  SET search_path = public, pg_catalog;
  
  RETURN EXISTS (
    SELECT 1 FROM admin_users 
    WHERE email = user_email 
    AND email = auth.email()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create audit log table for security monitoring
CREATE TABLE IF NOT EXISTS security_audit_log (
  id BIGSERIAL PRIMARY KEY,
  user_email TEXT,
  action TEXT NOT NULL,
  table_name TEXT,
  record_id TEXT,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on audit log
ALTER TABLE security_audit_log ENABLE ROW LEVEL SECURITY;

-- Only admins can read audit logs
CREATE POLICY "Admin only audit log access" ON security_audit_log
  FOR ALL USING (is_admin(auth.email()));

-- Create function to log security events
CREATE OR REPLACE FUNCTION log_security_event(
  action_type text,
  table_name text DEFAULT NULL,
  record_id text DEFAULT NULL
) RETURNS void AS $$
BEGIN
  INSERT INTO security_audit_log (
    user_email,
    action,
    table_name,
    record_id,
    created_at
  ) VALUES (
    auth.email(),
    action_type,
    table_name,
    record_id,
    NOW()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 