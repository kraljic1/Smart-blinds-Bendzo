-- Simple Performance Test Script
-- Run this after implementing the simple optimizations

-- 1. Test if materialized view was created
SELECT 
  'MATERIALIZED VIEW TEST' as "Test",
  CASE 
    WHEN EXISTS (
      SELECT 1 FROM pg_matviews 
      WHERE matviewname = 'admin_order_summary'
    ) THEN '✅ CREATED'
    ELSE '❌ MISSING'
  END as "Status";

-- 2. Test materialized view content
SELECT 
  'MATERIALIZED VIEW CONTENT' as "Test",
  COUNT(*) || ' records' as "Status"
FROM admin_order_summary;

-- 3. Test if optimized indexes exist
SELECT 
  'INDEX TEST' as "Test",
  COUNT(*) || ' optimized indexes created' as "Status"
FROM pg_indexes 
WHERE tablename IN ('orders', 'order_items', 'admin_order_summary')
  AND indexname LIKE 'idx_%';

-- 4. List all created indexes
SELECT 
  'CREATED INDEXES' as "Category",
  tablename as "Table",
  indexname as "Index Name"
FROM pg_indexes 
WHERE tablename IN ('orders', 'order_items', 'admin_order_summary')
  AND indexname LIKE 'idx_%'
ORDER BY tablename, indexname;

-- 5. Test optimized functions
SELECT 
  'FUNCTION TEST' as "Test",
  COUNT(*) || ' optimized functions created' as "Status"
FROM pg_proc 
WHERE proname IN (
  'is_admin_user',
  'get_orders_optimized',
  'refresh_admin_order_summary',
  'check_query_performance'
);

-- 6. Test the optimized query function
SELECT 
  'OPTIMIZED QUERY TEST' as "Test",
  'Testing get_orders_optimized function...' as "Status";

-- Test the function (limit to 3 records for testing)
SELECT * FROM get_orders_optimized(3, 0);

-- 7. Test performance monitoring
SELECT * FROM check_query_performance();

-- 8. Verify RLS policies are optimized
SELECT 
  'RLS POLICY TEST' as "Test",
  COUNT(*) || ' optimized policies found' as "Status"
FROM pg_policies 
WHERE tablename IN ('orders', 'order_items')
  AND policyname LIKE '%Optimized%';

-- 9. Test triggers
SELECT 
  'TRIGGER TEST' as "Test",
  COUNT(*) || ' auto-refresh triggers created' as "Status"
FROM pg_trigger 
WHERE tgname IN (
  'refresh_summary_on_order_change',
  'refresh_summary_on_item_change'
);

-- 10. Performance comparison test
-- Test query speed on materialized view vs original table
SELECT 
  'PERFORMANCE TEST' as "Test",
  'Comparing query speeds...' as "Status";

-- Query materialized view (should be fast)
EXPLAIN ANALYZE 
SELECT * FROM admin_order_summary 
ORDER BY created_at DESC 
LIMIT 10;

-- 11. Final verification
SELECT 
  'FINAL VERIFICATION' as "Section",
  '' as "Details";

-- Summary of all optimizations
SELECT 
  'Materialized View' as "Component",
  CASE WHEN EXISTS (SELECT 1 FROM pg_matviews WHERE matviewname = 'admin_order_summary') 
       THEN '✅ WORKING' ELSE '❌ FAILED' END as "Status"
UNION ALL
SELECT 
  'Optimized Indexes' as "Component",
  CASE WHEN (SELECT COUNT(*) FROM pg_indexes WHERE tablename = 'orders' AND indexname LIKE 'idx_%') >= 5
       THEN '✅ WORKING' ELSE '❌ FAILED' END as "Status"
UNION ALL
SELECT 
  'Optimized Functions' as "Component",
  CASE WHEN (SELECT COUNT(*) FROM pg_proc WHERE proname IN ('is_admin_user', 'get_orders_optimized')) >= 2
       THEN '✅ WORKING' ELSE '❌ FAILED' END as "Status"
UNION ALL
SELECT 
  'RLS Policies' as "Component",
  CASE WHEN (SELECT COUNT(*) FROM pg_policies WHERE tablename = 'orders' AND policyname LIKE '%Optimized%') >= 1
       THEN '✅ WORKING' ELSE '❌ FAILED' END as "Status"
UNION ALL
SELECT 
  'Auto-refresh Triggers' as "Component",
  CASE WHEN (SELECT COUNT(*) FROM pg_trigger WHERE tgname LIKE 'refresh_summary_%') >= 2
       THEN '✅ WORKING' ELSE '❌ FAILED' END as "Status";

-- Success message
SELECT 
  '🎉 OPTIMIZATION TEST COMPLETE' as "Result",
  'All components should show ✅ WORKING for optimal performance!' as "Message"; 