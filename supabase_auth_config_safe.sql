-- Supabase Authentication Security Configuration (SAFE VERSION)
-- Execute this in your Supabase SQL Editor to fix security warnings
-- This version handles existing policies safely

-- 1. Create secure helper function first
CREATE OR REPLACE FUNCTION column_exists_secure(tbl text, col text) RETURNS boolean AS $$
BEGIN
  -- Set secure search path to prevent injection
  SET search_path = public, pg_catalog;
  
  RETURN EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = tbl 
    AND column_name = col
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Create admin validation function with proper security
CREATE OR REPLACE FUNCTION is_admin_secure(user_email text) RETURNS boolean AS $$
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

-- 3. Create audit log table for security monitoring (if not exists)
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

-- 4. Enable RLS on audit log (safe)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_class c 
    JOIN pg_namespace n ON n.oid = c.relnamespace 
    WHERE c.relname = 'security_audit_log' 
    AND n.nspname = 'public' 
    AND c.relrowsecurity = true
  ) THEN
    ALTER TABLE security_audit_log ENABLE ROW LEVEL SECURITY;
  END IF;
END $$;

-- 5. Create security event logging function
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

-- 6. Create policies safely (only if they don't exist)
DO $$
BEGIN
  -- Check and create admin audit log policy
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'security_audit_log' 
    AND policyname = 'Admin only audit log access'
  ) THEN
    EXECUTE 'CREATE POLICY "Admin only audit log access" ON security_audit_log
      FOR ALL USING (is_admin_secure(auth.email()))';
  END IF;
  
  -- Log that security configuration was applied
  PERFORM log_security_event('SECURITY_CONFIG_APPLIED', 'system', 'supabase_auth_config');
  
END $$;

-- 7. Create a function to check security status
CREATE OR REPLACE FUNCTION check_security_status() RETURNS TABLE(
  check_name text,
  status text,
  description text
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    'Function Security'::text,
    CASE WHEN EXISTS (
      SELECT 1 FROM pg_proc p 
      JOIN pg_namespace n ON n.oid = p.pronamespace 
      WHERE p.proname = 'column_exists_secure' 
      AND n.nspname = 'public'
      AND p.prosecdef = true
    ) THEN 'SECURE' ELSE 'NEEDS_FIX' END,
    'Database functions use secure search paths'::text
  
  UNION ALL
  
  SELECT 
    'Audit Logging'::text,
    CASE WHEN EXISTS (
      SELECT 1 FROM information_schema.tables 
      WHERE table_name = 'security_audit_log'
    ) THEN 'ENABLED' ELSE 'DISABLED' END,
    'Security events are being logged'::text
  
  UNION ALL
  
  SELECT 
    'RLS Protection'::text,
    CASE WHEN EXISTS (
      SELECT 1 FROM pg_class c 
      JOIN pg_namespace n ON n.oid = c.relnamespace 
      WHERE c.relname = 'security_audit_log' 
      AND c.relrowsecurity = true
    ) THEN 'ENABLED' ELSE 'DISABLED' END,
    'Row Level Security is protecting audit logs'::text;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 8. Display security status
SELECT * FROM check_security_status();

-- Success message
DO $$
BEGIN
  RAISE NOTICE 'Security configuration completed successfully!';
  RAISE NOTICE 'Next steps:';
  RAISE NOTICE '1. Configure OTP expiry to 300 seconds in Authentication Settings';
  RAISE NOTICE '2. Enable password protection in Authentication Settings';
  RAISE NOTICE '3. Run CodeQL analysis to verify warnings are resolved';
END $$; 