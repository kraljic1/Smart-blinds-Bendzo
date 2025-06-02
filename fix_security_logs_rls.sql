-- Fix security_logs table RLS and add proper security policies
-- Execute this in Supabase SQL Editor

-- Enable Row Level Security on security_logs table
ALTER TABLE public.security_logs ENABLE ROW LEVEL SECURITY;

-- Policy 1: Only authenticated users can read their own security events
CREATE POLICY "Users can read own security logs" ON public.security_logs
  FOR SELECT 
  USING (auth.uid() = user_id OR auth.uid() IN (
    SELECT id FROM auth.users WHERE email IN (
      SELECT email FROM public.admins
    )
  ));

-- Policy 2: Only the system (and admins) can insert security logs
CREATE POLICY "System can insert security logs" ON public.security_logs
  FOR INSERT 
  WITH CHECK (
    -- Allow system inserts (when user_id is NULL or matches current user)
    user_id IS NULL OR 
    user_id = auth.uid() OR
    -- Allow admin inserts
    auth.uid() IN (
      SELECT id FROM auth.users WHERE email IN (
        SELECT email FROM public.admins
      )
    )
  );

-- Policy 3: Only admins can update security logs
CREATE POLICY "Admins can update security logs" ON public.security_logs
  FOR UPDATE 
  USING (auth.uid() IN (
    SELECT id FROM auth.users WHERE email IN (
      SELECT email FROM public.admins
    )
  ));

-- Policy 4: Only admins can delete security logs
CREATE POLICY "Admins can delete security logs" ON public.security_logs
  FOR DELETE 
  USING (auth.uid() IN (
    SELECT id FROM auth.users WHERE email IN (
      SELECT email FROM public.admins
    )
  ));

-- Grant proper permissions
GRANT SELECT ON public.security_logs TO authenticated;
GRANT INSERT ON public.security_logs TO authenticated;
GRANT UPDATE, DELETE ON public.security_logs TO authenticated;

-- Test the security update
SELECT public.log_security_event(
  'RLS_ENABLED',
  'Enabled Row Level Security on security_logs table with proper policies',
  NULL
); 