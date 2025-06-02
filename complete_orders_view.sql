-- Complete Orders View - All Order Details
-- Execute this in Supabase SQL Editor to see complete order information

-- 1. All orders with complete details
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
  o.payment_status as "Payment Status",
  o.payment_method as "Payment Method",
  o.shipping_address as "Shipping Address",
  o.billing_address as "Billing Address",
  o.shipping_method as "Shipping Method",
  o.tracking_number as "Tracking Number",
  o.notes as "Order Notes",
  o.created_at as "Order Date",
  o.updated_at as "Last Updated",
  o.shipped_at as "Shipped Date",
  o.delivered_at as "Delivered Date"
FROM public.orders o
ORDER BY o.created_at DESC;

-- 2. Order items details (if order_items table exists)
SELECT 
  'ORDER ITEMS DETAILS' as "Section",
  '' as "Details";

-- Check if order_items table exists and show items
SELECT 
  oi.order_id as "Order ID",
  oi.product_name as "Product Name",
  oi.product_sku as "Product SKU",
  oi.quantity as "Quantity",
  oi.unit_price as "Unit Price",
  oi.total_price as "Item Total",
  oi.product_options as "Product Options",
  oi.customization_details as "Customization"
FROM public.order_items oi
JOIN public.orders o ON oi.order_id = o.id
ORDER BY o.created_at DESC, oi.id;

-- 3. Orders grouped by status
SELECT 
  'ORDERS BY STATUS' as "Section",
  '' as "Details";

SELECT 
  status as "Order Status",
  COUNT(*) as "Count",
  SUM(total_amount) as "Total Value",
  AVG(total_amount) as "Average Order Value"
FROM public.orders
GROUP BY status
ORDER BY "Count" DESC;

-- 4. Orders by payment status
SELECT 
  'ORDERS BY PAYMENT STATUS' as "Section",
  '' as "Details";

SELECT 
  payment_status as "Payment Status",
  COUNT(*) as "Count",
  SUM(total_amount) as "Total Value"
FROM public.orders
GROUP BY payment_status
ORDER BY "Count" DESC;

-- 5. Recent orders with full details
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
  o.payment_status as "Payment",
  o.payment_method as "Payment Method",
  o.shipping_address as "Shipping Address",
  o.created_at as "Order Date"
FROM public.orders o
WHERE o.created_at >= NOW() - INTERVAL '30 days'
ORDER BY o.created_at DESC;

-- 6. Orders with shipping information
SELECT 
  'SHIPPING INFORMATION' as "Section",
  '' as "Details";

SELECT 
  o.id as "Order ID",
  o.customer_name as "Customer",
  o.shipping_method as "Shipping Method",
  o.tracking_number as "Tracking Number",
  o.shipping_address as "Shipping Address",
  o.shipped_at as "Shipped Date",
  o.delivered_at as "Delivered Date",
  o.status as "Order Status"
FROM public.orders o
WHERE o.shipping_address IS NOT NULL
ORDER BY o.created_at DESC;

-- 7. Order value analysis
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

-- 8. Orders by month
SELECT 
  'ORDERS BY MONTH' as "Section",
  '' as "Details";

SELECT 
  DATE_TRUNC('month', created_at) as "Month",
  COUNT(*) as "Orders",
  SUM(total_amount) as "Revenue",
  AVG(total_amount) as "Avg Order Value"
FROM public.orders
GROUP BY DATE_TRUNC('month', created_at)
ORDER BY "Month" DESC;

-- 9. Customer order history
SELECT 
  'CUSTOMER ORDER HISTORY' as "Section",
  '' as "Details";

SELECT 
  customer_email as "Customer Email",
  customer_name as "Customer Name",
  COUNT(*) as "Total Orders",
  SUM(total_amount) as "Total Spent",
  AVG(total_amount) as "Average Order",
  MIN(created_at) as "First Order",
  MAX(created_at) as "Last Order"
FROM public.orders
WHERE customer_email IS NOT NULL
GROUP BY customer_email, customer_name
ORDER BY "Total Spent" DESC;

-- 10. Complete order details with JSON formatting (if applicable)
SELECT 
  'COMPLETE ORDER DETAILS (JSON)' as "Section",
  '' as "Details";

SELECT 
  id as "Order ID",
  row_to_json(orders.*) as "Complete Order Data"
FROM public.orders
ORDER BY created_at DESC
LIMIT 10; 