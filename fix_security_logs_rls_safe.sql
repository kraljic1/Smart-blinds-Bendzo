-- Fix security_logs table RLS and add proper security policies (SAFE VERSION)
-- Execute this in Supabase SQL Editor

-- Enable Row Level Security on security_logs table
ALTER TABLE public.security_logs ENABLE ROW LEVEL SECURITY;

-- Policy 1: Authenticated users can read their own security events
CREATE POLICY "Users can read own security logs" ON public.security_logs
  FOR SELECT 
  USING (
    auth.uid() = user_id OR 
    user_id IS NULL  -- Allow reading system events
  );

-- Policy 2: Allow system inserts (for security logging)
CREATE POLICY "System can insert security logs" ON public.security_logs
  FOR INSERT 
  WITH CHECK (
    -- Allow system inserts (when user_id is NULL or matches current user)
    user_id IS NULL OR 
    user_id = auth.uid()
  );

-- Policy 3: Only authenticated users can update their own logs
CREATE POLICY "Users can update own security logs" ON public.security_logs
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Policy 4: Only authenticated users can delete their own logs
CREATE POLICY "Users can delete own security logs" ON public.security_logs
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Grant proper permissions
GRANT SELECT ON public.security_logs TO authenticated;
GRANT INSERT ON public.security_logs TO authenticated;
GRANT UPDATE, DELETE ON public.security_logs TO authenticated;

-- Test the security update
SELECT public.log_security_event(
  'RLS_ENABLED',
  'Enabled Row Level Security on security_logs table with user-based policies',
  NULL
); 