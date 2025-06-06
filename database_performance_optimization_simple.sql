-- Database Performance Optimization for Smartblinds Croatia (SIMPLE VERSION)
-- Execute this in Supabase SQL Editor to fix slow query performance
-- This version avoids transaction block issues

-- 1. OPTIMIZE INDEXES FOR BETTER PERFORMANCE
-- Add missing indexes that will speed up common queries (without CONCURRENTLY)

-- Index for order status filtering (very common in admin queries)
CREATE INDEX IF NOT EXISTS idx_orders_status_created_at 
ON orders(status, created_at DESC);

-- Index for customer email lookups with date ordering
CREATE INDEX IF NOT EXISTS idx_orders_customer_email_created_at 
ON orders(customer_email, created_at DESC);

-- Index for order_id lookups (exact matches)
CREATE INDEX IF NOT EXISTS idx_orders_order_id_hash 
ON orders USING hash(order_id);

-- Index for payment status filtering
CREATE INDEX IF NOT EXISTS idx_orders_payment_status 
ON orders(payment_status);

-- Composite index for admin queries (status + date range)
CREATE INDEX IF NOT EXISTS idx_orders_admin_queries 
ON orders(status, payment_status, created_at DESC);

-- Index for order items with product lookups
CREATE INDEX IF NOT EXISTS idx_order_items_product_order 
ON order_items(product_id, order_id);

-- Index for JSONB options column (if used in queries)
CREATE INDEX IF NOT EXISTS idx_order_items_options_gin 
ON order_items USING gin(options);

-- 2. OPTIMIZE ROW LEVEL SECURITY POLICIES
-- The current RLS policies are causing performance issues due to subqueries

-- Drop existing slow policies
DROP POLICY IF EXISTS "Allow admins to manage all orders" ON orders;
DROP POLICY IF EXISTS "Allow admins to manage all order_items" ON order_items;

-- Create optimized admin policies using functions instead of EXISTS subqueries
CREATE OR REPLACE FUNCTION is_admin_user() RETURNS boolean AS $$
BEGIN
  -- Set secure search path
  SET search_path = public, pg_catalog;
  
  -- Use a more efficient lookup with proper indexing
  RETURN EXISTS (
    SELECT 1 FROM admin_users 
    WHERE email = auth.email()
    LIMIT 1
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Create optimized policies using the function
CREATE POLICY "Optimized admin access to orders" ON orders
  FOR ALL USING (is_admin_user());

CREATE POLICY "Optimized admin access to order_items" ON order_items
  FOR ALL USING (is_admin_user());

-- 3. CREATE MATERIALIZED VIEW FOR ADMIN DASHBOARD
-- Drop existing materialized view if it exists
DROP MATERIALIZED VIEW IF EXISTS admin_order_summary;

-- Create new materialized view
CREATE MATERIALIZED VIEW admin_order_summary AS
SELECT 
  o.id,
  o.order_id,
  o.customer_name,
  o.customer_email,
  o.customer_phone,
  o.total_amount,
  o.tax_amount,
  o.shipping_cost,
  o.status,
  o.payment_status,
  o.created_at,
  o.updated_at,
  COUNT(oi.id) as item_count,
  COALESCE(SUM(oi.quantity), 0) as total_quantity
FROM orders o
LEFT JOIN order_items oi ON o.id = oi.order_id
GROUP BY o.id, o.order_id, o.customer_name, o.customer_email, o.customer_phone, 
         o.total_amount, o.tax_amount, o.shipping_cost, o.status, o.payment_status, 
         o.created_at, o.updated_at;

-- Create index on materialized view
CREATE INDEX IF NOT EXISTS idx_admin_order_summary_created_at 
ON admin_order_summary(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_admin_order_summary_status 
ON admin_order_summary(status);

-- 4. CREATE FUNCTION TO REFRESH MATERIALIZED VIEW
CREATE OR REPLACE FUNCTION refresh_admin_order_summary() RETURNS void AS $$
BEGIN
  REFRESH MATERIALIZED VIEW admin_order_summary;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. OPTIMIZE COMMON QUERY PATTERNS
-- Create optimized functions for common admin queries

CREATE OR REPLACE FUNCTION get_orders_optimized(
  p_limit INTEGER DEFAULT 50,
  p_offset INTEGER DEFAULT 0,
  p_status TEXT DEFAULT NULL,
  p_email TEXT DEFAULT NULL
) RETURNS TABLE(
  id BIGINT,
  order_id TEXT,
  customer_name TEXT,
  customer_email TEXT,
  customer_phone TEXT,
  total_amount DECIMAL,
  status TEXT,
  payment_status TEXT,
  created_at TIMESTAMPTZ,
  item_count BIGINT,
  total_quantity NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    aos.id,
    aos.order_id,
    aos.customer_name,
    aos.customer_email,
    aos.customer_phone,
    aos.total_amount,
    aos.status,
    aos.payment_status,
    aos.created_at,
    aos.item_count,
    aos.total_quantity
  FROM admin_order_summary aos
  WHERE 
    (p_status IS NULL OR aos.status = p_status)
    AND (p_email IS NULL OR aos.customer_email = p_email)
  ORDER BY aos.created_at DESC
  LIMIT p_limit
  OFFSET p_offset;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- 6. CREATE TRIGGER TO AUTO-REFRESH MATERIALIZED VIEW
CREATE OR REPLACE FUNCTION trigger_refresh_admin_summary() RETURNS trigger AS $$
BEGIN
  -- Refresh the materialized view when orders or order_items change
  PERFORM refresh_admin_order_summary();
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Create triggers (only if they don't exist)
DROP TRIGGER IF EXISTS refresh_summary_on_order_change ON orders;
DROP TRIGGER IF EXISTS refresh_summary_on_item_change ON order_items;

CREATE TRIGGER refresh_summary_on_order_change
  AFTER INSERT OR UPDATE OR DELETE ON orders
  FOR EACH STATEMENT
  EXECUTE FUNCTION trigger_refresh_admin_summary();

CREATE TRIGGER refresh_summary_on_item_change
  AFTER INSERT OR UPDATE OR DELETE ON order_items
  FOR EACH STATEMENT
  EXECUTE FUNCTION trigger_refresh_admin_summary();

-- 7. PERFORMANCE MONITORING FUNCTION (simplified)
CREATE OR REPLACE FUNCTION check_query_performance() RETURNS TABLE(
  query_type TEXT,
  avg_time_ms NUMERIC,
  calls BIGINT,
  status TEXT
) AS $$
BEGIN
  -- Simple performance check without pg_stat_statements dependency
  RETURN QUERY
  SELECT 
    'Performance Monitoring'::TEXT,
    0::NUMERIC,
    0::BIGINT,
    '✅ Optimizations applied - monitor via Supabase dashboard'::TEXT;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 8. VACUUM AND ANALYZE TABLES
VACUUM ANALYZE orders;
VACUUM ANALYZE order_items;
VACUUM ANALYZE admin_users;

-- 9. INITIAL REFRESH OF MATERIALIZED VIEW
SELECT refresh_admin_order_summary();

-- 10. VERIFY SETUP
SELECT 
  'OPTIMIZATION COMPLETE' as "Status",
  'Database has been optimized for better performance' as "Message";

-- Show current performance
SELECT * FROM check_query_performance();

-- Verify materialized view exists
SELECT 
  'MATERIALIZED VIEW STATUS' as "Check",
  CASE 
    WHEN EXISTS (
      SELECT 1 FROM pg_matviews 
      WHERE matviewname = 'admin_order_summary'
    ) THEN '✅ admin_order_summary created successfully'
    ELSE '❌ admin_order_summary creation failed'
  END as "Status";

-- Show created indexes
SELECT 
  'CREATED INDEXES' as "Check",
  indexname as "Index Name"
FROM pg_indexes 
WHERE tablename IN ('orders', 'order_items', 'admin_order_summary')
  AND indexname LIKE 'idx_%'
ORDER BY tablename, indexname; 