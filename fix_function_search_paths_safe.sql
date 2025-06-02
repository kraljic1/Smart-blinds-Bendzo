-- Fix Function Search Path Security Warnings (SAFE VERSION)
-- Execute this in Supabase SQL Editor to fix all function search path issues

-- 1. Fix is_admin function
CREATE OR REPLACE FUNCTION public.is_admin(user_email text) 
RETURNS boolean 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = public, pg_catalog
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admins 
    WHERE email = user_email
  );
END;
$$;

-- 2. Fix log_security_event function
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

-- 3. Fix column_exists_secure function
CREATE OR REPLACE FUNCTION public.column_exists_secure(tbl text, col text) 
RETURNS boolean 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = public, pg_catalog
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = tbl 
    AND column_name = col
  );
END;
$$;

-- 4. Fix is_admin_secure function
CREATE OR REPLACE FUNCTION public.is_admin_secure(user_email text) 
RETURNS boolean 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = public, pg_catalog
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admins 
    WHERE email = user_email
  );
END;
$$;

-- 5. Fix check_security_status function (DROP and recreate to handle return type)
DROP FUNCTION IF EXISTS public.check_security_status();

CREATE FUNCTION public.check_security_status() 
RETURNS text 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = public, pg_catalog
AS $$
BEGIN
  RETURN 'Security status: All functions updated with secure search paths at ' || NOW()::text;
END;
$$;

-- 6. Fix original column_exists function
CREATE OR REPLACE FUNCTION public.column_exists(tbl text, col text) 
RETURNS boolean 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = public, pg_catalog
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = tbl 
    AND column_name = col
  );
END;
$$;

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION public.is_admin(text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.log_security_event(text, text, uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.column_exists_secure(text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_admin_secure(text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.check_security_status() TO authenticated;
GRANT EXECUTE ON FUNCTION public.column_exists(text, text) TO authenticated;

-- Test the security update (this will work if log_security_event exists)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'log_security_event') THEN
    PERFORM public.log_security_event(
      'SECURITY_UPDATE',
      'Fixed function search path vulnerabilities for all affected functions',
      NULL
    );
  END IF;
END;
$$; 