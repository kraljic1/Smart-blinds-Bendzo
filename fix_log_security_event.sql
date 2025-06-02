-- Fix log_security_event function search path issue
-- Execute this in Supabase SQL Editor

-- Check if security_logs table exists, create if not
CREATE TABLE IF NOT EXISTS public.security_logs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type text NOT NULL,
  description text,
  user_id uuid REFERENCES auth.users(id),
  created_at timestamp with time zone DEFAULT NOW()
);

-- Drop and recreate the function to ensure clean state
DROP FUNCTION IF EXISTS public.log_security_event(text, text, uuid);

-- Create the function with proper security settings
CREATE FUNCTION public.log_security_event(
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

-- Grant permissions
GRANT EXECUTE ON FUNCTION public.log_security_event(text, text, uuid) TO authenticated;

-- Test the function
SELECT public.log_security_event(
  'SECURITY_FIX',
  'Fixed log_security_event function search path vulnerability',
  NULL
); 