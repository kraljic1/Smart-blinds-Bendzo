-- Comprehensive Database Content Audit
-- Execute this in Supabase SQL Editor to see what's in your database

-- 1. List all schemas
SELECT 
  'DATABASE SCHEMAS' as "Section",
  '' as "Details";

SELECT 
  schema_name as "Schema Name",
  CASE 
    WHEN schema_name = 'public' THEN '✅ Your main schema'
    WHEN schema_name = 'auth' THEN '🔐 Authentication schema'
    WHEN schema_name = 'storage' THEN '📁 File storage schema'
    WHEN schema_name LIKE 'pg_%' THEN '⚙️ PostgreSQL system schema'
    ELSE '📋 Other schema'
  END as "Description"
FROM information_schema.schemata 
WHERE schema_name NOT IN ('information_schema')
ORDER BY schema_name;

-- 2. List all tables in public schema with row counts
SELECT 
  'PUBLIC SCHEMA TABLES' as "Section",
  '' as "Details";

SELECT 
  t.table_name as "Table Name",
  CASE 
    WHEN t.table_type = 'BASE TABLE' THEN '📊 Data Table'
    WHEN t.table_type = 'VIEW' THEN '👁️ View'
    ELSE t.table_type
  END as "Type",
  pg_size_pretty(pg_total_relation_size(quote_ident(t.table_schema)||'.'||quote_ident(t.table_name))) as "Size",
  COALESCE(
    (SELECT reltuples::bigint 
     FROM pg_class 
     WHERE oid = (quote_ident(t.table_schema)||'.'||quote_ident(t.table_name))::regclass),
    0
  ) as "Estimated Rows"
FROM information_schema.tables t
WHERE t.table_schema = 'public'
ORDER BY t.table_name;

-- 3. Get actual row counts for each table
SELECT 
  'ACTUAL ROW COUNTS' as "Section",
  '' as "Details";

-- Dynamic query to get exact row counts
DO $$
DECLARE
    table_record RECORD;
    row_count INTEGER;
    query_text TEXT;
BEGIN
    FOR table_record IN 
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_type = 'BASE TABLE'
    LOOP
        query_text := 'SELECT COUNT(*) FROM public.' || quote_ident(table_record.table_name);
        EXECUTE query_text INTO row_count;
        
        RAISE NOTICE 'Table: % | Rows: %', table_record.table_name, row_count;
    END LOOP;
END $$;

-- 4. Check table structures and columns
SELECT 
  'TABLE STRUCTURES' as "Section",
  '' as "Details";

SELECT 
  t.table_name as "Table",
  c.column_name as "Column",
  c.data_type as "Data Type",
  CASE 
    WHEN c.is_nullable = 'YES' THEN '❌ Nullable'
    ELSE '✅ Not Null'
  END as "Nullable",
  COALESCE(c.column_default, 'No default') as "Default Value",
  CASE 
    WHEN tc.constraint_type = 'PRIMARY KEY' THEN '🔑 Primary Key'
    WHEN tc.constraint_type = 'FOREIGN KEY' THEN '🔗 Foreign Key'
    WHEN tc.constraint_type = 'UNIQUE' THEN '⭐ Unique'
    ELSE ''
  END as "Constraints"
FROM information_schema.tables t
JOIN information_schema.columns c ON t.table_name = c.table_name
LEFT JOIN information_schema.key_column_usage kcu ON c.table_name = kcu.table_name AND c.column_name = kcu.column_name
LEFT JOIN information_schema.table_constraints tc ON kcu.constraint_name = tc.constraint_name
WHERE t.table_schema = 'public' 
  AND c.table_schema = 'public'
  AND t.table_type = 'BASE TABLE'
ORDER BY t.table_name, c.ordinal_position;

-- 5. Check for sample data in each table (first 3 rows)
SELECT 
  'SAMPLE DATA PREVIEW' as "Section",
  '' as "Details";

-- Orders table sample
SELECT 'ORDERS TABLE SAMPLE' as "Table", '' as "Data";
SELECT * FROM public.orders LIMIT 3;

-- Users from auth schema (safe fields only)
SELECT 'USERS SAMPLE (Safe Fields)' as "Table", '' as "Data";
SELECT 
  id,
  email,
  created_at,
  email_confirmed_at,
  last_sign_in_at
FROM auth.users 
LIMIT 3;

-- Security logs sample
SELECT 'SECURITY LOGS SAMPLE' as "Table", '' as "Data";
SELECT * FROM public.security_logs 
ORDER BY created_at DESC 
LIMIT 5;

-- 6. Check indexes
SELECT 
  'DATABASE INDEXES' as "Section",
  '' as "Details";

SELECT 
  schemaname as "Schema",
  tablename as "Table",
  indexname as "Index Name",
  indexdef as "Index Definition"
FROM pg_indexes 
WHERE schemaname = 'public'
ORDER BY tablename, indexname;

-- 7. Check foreign key relationships
SELECT 
  'FOREIGN KEY RELATIONSHIPS' as "Section",
  '' as "Details";

SELECT 
  tc.table_name as "Source Table",
  kcu.column_name as "Source Column",
  ccu.table_name as "Target Table",
  ccu.column_name as "Target Column",
  tc.constraint_name as "Constraint Name"
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

-- 8. Database summary
SELECT 
  'DATABASE SUMMARY' as "Section",
  '' as "Details";

SELECT 
  'Total Tables in Public Schema' as "Metric",
  COUNT(*)::text as "Value"
FROM information_schema.tables 
WHERE table_schema = 'public' AND table_type = 'BASE TABLE'

UNION ALL

SELECT 
  'Total Views in Public Schema' as "Metric",
  COUNT(*)::text as "Value"
FROM information_schema.tables 
WHERE table_schema = 'public' AND table_type = 'VIEW'

UNION ALL

SELECT 
  'Total Functions in Public Schema' as "Metric",
  COUNT(*)::text as "Value"
FROM pg_proc p
JOIN pg_namespace n ON p.pronamespace = n.oid
WHERE n.nspname = 'public' AND p.prokind = 'f'

UNION ALL

SELECT 
  'Database Size' as "Metric",
  pg_size_pretty(pg_database_size(current_database())) as "Value"

UNION ALL

SELECT 
  'Total Users' as "Metric",
  COUNT(*)::text as "Value"
FROM auth.users; 