-- Final fix for log_security_event function search path
-- Execute this in Supabase SQL Editor

-- Drop the existing function completely
DROP FUNCTION IF EXISTS public.log_security_event(text, text, uuid);
DROP FUNCTION IF EXISTS public.log_security_event(text, text);
DROP FUNCTION IF EXISTS public.log_security_event;

-- Recreate with proper security configuration
CREATE OR REPLACE FUNCTION public.log_security_event(
  event_type text,
  event_description text,
  user_id uuid DEFAULT NULL
) 
RETURNS void 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = public, pg_catalog
AS $$
BEGIN
  INSERT INTO public.security_logs (
    event_type,
    description,
    user_id,
    created_at
  ) VALUES (
    event_type,
    event_description,
    user_id,
    NOW()
  );
END;
$$;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION public.log_security_event(text, text, uuid) TO authenticated;

-- Test the function to ensure it works
SELECT public.log_security_event(
  'FINAL_SECURITY_FIX',
  'Applied final search path fix to log_security_event function',
  NULL
);

-- Verify the function now has secure search path
SELECT 
  p.proname as "Function Name",
  CASE 
    WHEN p.proconfig IS NOT NULL THEN '✅ SECURE - Has search_path set'
    ELSE '❌ STILL VULNERABLE'
  END as "Security Status",
  p.proconfig as "Configuration"
FROM pg_proc p
JOIN pg_namespace n ON p.pronamespace = n.oid
WHERE n.nspname = 'public'
  AND p.proname = 'log_security_event'; 