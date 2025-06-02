-- Comprehensive Database Security Audit
-- Execute this in Supabase SQL Editor to check all security configurations

-- 1. Check all tables and their RLS status
SELECT 
  schemaname,
  tablename,
  rowsecurity as "RLS Enabled",
  CASE 
    WHEN rowsecurity THEN '✅ Secured'
    ELSE '❌ VULNERABLE - No RLS'
  END as "Security Status"
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY tablename;

-- 2. Check all RLS policies
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd as "Command Type",
  qual as "USING Clause",
  with_check as "WITH CHECK Clause"
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- 3. Check all functions and their security settings
SELECT 
  n.nspname as "Schema",
  p.proname as "Function Name",
  pg_get_function_arguments(p.oid) as "Arguments",
  CASE p.prosecdef 
    WHEN true THEN '✅ SECURITY DEFINER'
    ELSE '⚠️ SECURITY INVOKER'
  END as "Security Type",
  CASE 
    WHEN p.proconfig IS NOT NULL THEN '✅ Has search_path set'
    ELSE '❌ No search_path - VULNERABLE'
  END as "Search Path Status",
  p.proconfig as "Configuration"
FROM pg_proc p
JOIN pg_namespace n ON p.pronamespace = n.oid
WHERE n.nspname = 'public'
  AND p.prokind = 'f'  -- Only functions, not procedures
ORDER BY p.proname;

-- 4. Check table permissions
SELECT 
  grantee,
  table_schema,
  table_name,
  privilege_type,
  is_grantable
FROM information_schema.table_privileges 
WHERE table_schema = 'public'
  AND grantee != 'postgres'  -- Exclude superuser
ORDER BY table_name, grantee, privilege_type;

-- 5. Check for tables without primary keys (security risk)
SELECT 
  t.table_name,
  CASE 
    WHEN tc.constraint_name IS NULL THEN '❌ NO PRIMARY KEY - Security Risk'
    ELSE '✅ Has Primary Key'
  END as "Primary Key Status"
FROM information_schema.tables t
LEFT JOIN information_schema.table_constraints tc 
  ON t.table_name = tc.table_name 
  AND tc.constraint_type = 'PRIMARY KEY'
  AND tc.table_schema = 'public'
WHERE t.table_schema = 'public'
  AND t.table_type = 'BASE TABLE'
ORDER BY t.table_name;

-- 6. Check for foreign key constraints (data integrity)
SELECT 
  tc.table_name,
  tc.constraint_name,
  kcu.column_name,
  ccu.table_name AS foreign_table_name,
  ccu.column_name AS foreign_column_name,
  '✅ Foreign Key Constraint' as "Status"
FROM information_schema.table_constraints AS tc 
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
  AND tc.table_schema = kcu.table_schema
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
  AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY' 
  AND tc.table_schema = 'public'
ORDER BY tc.table_name;

-- 7. Security Summary Report
SELECT 
  'SECURITY AUDIT SUMMARY' as "Report Section",
  '' as "Details";

SELECT 
  'Total Tables' as "Metric",
  COUNT(*)::text as "Count"
FROM pg_tables 
WHERE schemaname = 'public'

UNION ALL

SELECT 
  'Tables with RLS Enabled' as "Metric",
  COUNT(*)::text as "Count"
FROM pg_tables 
WHERE schemaname = 'public' AND rowsecurity = true

UNION ALL

SELECT 
  'Tables WITHOUT RLS (VULNERABLE)' as "Metric",
  COUNT(*)::text as "Count"
FROM pg_tables 
WHERE schemaname = 'public' AND rowsecurity = false

UNION ALL

SELECT 
  'Total Functions' as "Metric",
  COUNT(*)::text as "Count"
FROM pg_proc p
JOIN pg_namespace n ON p.pronamespace = n.oid
WHERE n.nspname = 'public' AND p.prokind = 'f'

UNION ALL

SELECT 
  'Functions with Secure Search Path' as "Metric",
  COUNT(*)::text as "Count"
FROM pg_proc p
JOIN pg_namespace n ON p.pronamespace = n.oid
WHERE n.nspname = 'public' 
  AND p.prokind = 'f'
  AND p.proconfig IS NOT NULL

UNION ALL

SELECT 
  'Functions WITHOUT Secure Search Path (VULNERABLE)' as "Metric",
  COUNT(*)::text as "Count"
FROM pg_proc p
JOIN pg_namespace n ON p.pronamespace = n.oid
WHERE n.nspname = 'public' 
  AND p.prokind = 'f'
  AND p.proconfig IS NULL;

-- 8. List all vulnerable items that need attention
SELECT 
  'ITEMS REQUIRING ATTENTION' as "Security Issue",
  '' as "Item",
  '' as "Action Needed";

-- Vulnerable tables (no RLS)
SELECT 
  'Table without RLS' as "Security Issue",
  tablename as "Item",
  'Enable RLS: ALTER TABLE ' || tablename || ' ENABLE ROW LEVEL SECURITY;' as "Action Needed"
FROM pg_tables 
WHERE schemaname = 'public' AND rowsecurity = false

UNION ALL

-- Vulnerable functions (no search path)
SELECT 
  'Function without secure search path' as "Security Issue",
  p.proname as "Item",
  'Add SET search_path = public, pg_catalog to function definition' as "Action Needed"
FROM pg_proc p
JOIN pg_namespace n ON p.pronamespace = n.oid
WHERE n.nspname = 'public' 
  AND p.prokind = 'f'
  AND p.proconfig IS NULL; 