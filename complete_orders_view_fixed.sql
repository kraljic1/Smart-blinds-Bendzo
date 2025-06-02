-- Complete Orders View - Fixed Version (Only Existing Columns)
-- Execute this in Supabase SQL Editor to see complete order information

-- First, let's check what columns actually exist in the orders table
SELECT 
  'ORDERS TABLE STRUCTURE' as "Section",
  '' as "Details";

SELECT 
  column_name as "Column Name",
  data_type as "Data Type",
  is_nullable as "Nullable"
FROM information_schema.columns 
WHERE table_schema = 'public' 
  AND table_name = 'orders'
ORDER BY ordinal_position;

-- 1. All orders with existing columns only
SELECT 
  'COMPLETE ORDERS LIST' as "Section",
  '' as "Details";

SELECT 
  o.id as "Order ID",
  o.customer_name as "Customer Name",
  o.customer_email as "Email",
  o.customer_phone as "Phone",
  o.total_amount as "Total Amount",
  o.status as "Order Status",
  o.created_at as "Order Date",
  o.updated_at as "Last Updated"
FROM public.orders o
ORDER BY o.created_at DESC;

-- 2. Check if order_items table exists
SELECT 
  'ORDER ITEMS TABLE CHECK' as "Section",
  '' as "Details";

SELECT 
  CASE 
    WHEN EXISTS (
      SELECT 1 FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_name = 'order_items'
    ) THEN '✅ order_items table exists'
    ELSE '❌ order_items table does not exist'
  END as "Table Status";

-- 3. Orders grouped by status
SELECT 
  'ORDERS BY STATUS' as "Section",
  '' as "Details";

SELECT 
  COALESCE(status, 'No Status') as "Order Status",
  COUNT(*) as "Count",
  COALESCE(SUM(total_amount), 0) as "Total Value",
  COALESCE(ROUND(AVG(total_amount), 2), 0) as "Average Order Value"
FROM public.orders
GROUP BY status
ORDER BY "Count" DESC;

-- 4. Recent orders (Last 30 Days)
SELECT 
  'RECENT ORDERS (Last 30 Days)' as "Section",
  '' as "Details";

SELECT 
  o.id as "Order ID",
  o.customer_name as "Customer",
  o.customer_email as "Email",
  o.customer_phone as "Phone",
  o.total_amount as "Amount",
  o.status as "Status",
  o.created_at as "Order Date"
FROM public.orders o
WHERE o.created_at >= NOW() - INTERVAL '30 days'
ORDER BY o.created_at DESC;

-- 5. Order value analysis
SELECT 
  'ORDER VALUE ANALYSIS' as "Section",
  '' as "Details";

SELECT 
  'Total Orders' as "Metric",
  COUNT(*)::text as "Value"
FROM public.orders

UNION ALL

SELECT 
  'Total Revenue' as "Metric",
  COALESCE(SUM(total_amount), 0)::text as "Value"
FROM public.orders

UNION ALL

SELECT 
  'Average Order Value' as "Metric",
  COALESCE(ROUND(AVG(total_amount), 2), 0)::text as "Value"
FROM public.orders

UNION ALL

SELECT 
  'Highest Order Value' as "Metric",
  COALESCE(MAX(total_amount), 0)::text as "Value"
FROM public.orders

UNION ALL

SELECT 
  'Lowest Order Value' as "Metric",
  COALESCE(MIN(total_amount), 0)::text as "Value"
FROM public.orders;

-- 6. Orders by month
SELECT 
  'ORDERS BY MONTH' as "Section",
  '' as "Details";

SELECT 
  DATE_TRUNC('month', created_at) as "Month",
  COUNT(*) as "Orders",
  COALESCE(SUM(total_amount), 0) as "Revenue",
  COALESCE(ROUND(AVG(total_amount), 2), 0) as "Avg Order Value"
FROM public.orders
GROUP BY DATE_TRUNC('month', created_at)
ORDER BY "Month" DESC;

-- 7. Customer order history
SELECT 
  'CUSTOMER ORDER HISTORY' as "Section",
  '' as "Details";

SELECT 
  customer_email as "Customer Email",
  customer_name as "Customer Name",
  COUNT(*) as "Total Orders",
  COALESCE(SUM(total_amount), 0) as "Total Spent",
  COALESCE(ROUND(AVG(total_amount), 2), 0) as "Average Order",
  MIN(created_at) as "First Order",
  MAX(created_at) as "Last Order"
FROM public.orders
WHERE customer_email IS NOT NULL
GROUP BY customer_email, customer_name
ORDER BY "Total Spent" DESC;

-- 8. All order data (raw)
SELECT 
  'ALL ORDER DATA (RAW)' as "Section",
  '' as "Details";

SELECT * FROM public.orders
ORDER BY created_at DESC;

-- 9. Customer statistics
SELECT 
  'CUSTOMER STATISTICS' as "Section",
  '' as "Details";

SELECT 
  'Total Unique Customers' as "Metric",
  COUNT(DISTINCT customer_email)::text as "Value"
FROM public.orders
WHERE customer_email IS NOT NULL

UNION ALL

SELECT 
  'Customers with Multiple Orders' as "Metric",
  COUNT(*)::text as "Value"
FROM (
  SELECT customer_email
  FROM public.orders
  WHERE customer_email IS NOT NULL
  GROUP BY customer_email
  HAVING COUNT(*) > 1
) repeat_customers

UNION ALL

SELECT 
  'Average Orders per Customer' as "Metric",
  COALESCE(ROUND(
    COUNT(*)::decimal / NULLIF(COUNT(DISTINCT customer_email), 0), 2
  ), 0)::text as "Value"
FROM public.orders
WHERE customer_email IS NOT NULL; 