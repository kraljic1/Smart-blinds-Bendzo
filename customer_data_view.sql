-- Customer Data View - Names, Emails, Phone Numbers
-- Execute this in Supabase SQL Editor to see actual customer data

-- 1. All registered users with contact information
SELECT 
  'REGISTERED USERS' as "Section",
  '' as "Details";

SELECT 
  id as "User ID",
  email as "Email Address",
  created_at as "Registration Date",
  email_confirmed_at as "Email Confirmed",
  last_sign_in_at as "Last Login",
  CASE 
    WHEN email_confirmed_at IS NOT NULL THEN '✅ Verified'
    ELSE '❌ Unverified'
  END as "Status"
FROM auth.users 
ORDER BY created_at DESC;

-- 2. Customer orders with contact details
SELECT 
  'CUSTOMER ORDERS WITH CONTACT INFO' as "Section",
  '' as "Details";

SELECT 
  o.id as "Order ID",
  o.customer_name as "Customer Name",
  o.customer_email as "Email",
  o.customer_phone as "Phone Number",
  o.total_amount as "Order Total",
  o.status as "Order Status",
  o.created_at as "Order Date",
  o.shipping_address as "Shipping Address"
FROM public.orders o
ORDER BY o.created_at DESC;

-- 3. Count customers by status
SELECT 
  'CUSTOMER STATISTICS' as "Section",
  '' as "Details";

SELECT 
  'Total Registered Users' as "Metric",
  COUNT(*)::text as "Count"
FROM auth.users

UNION ALL

SELECT 
  'Verified Email Users' as "Metric",
  COUNT(*)::text as "Count"
FROM auth.users 
WHERE email_confirmed_at IS NOT NULL

UNION ALL

SELECT 
  'Total Orders Placed' as "Metric",
  COUNT(*)::text as "Count"
FROM public.orders

UNION ALL

SELECT 
  'Unique Customers (by email)' as "Metric",
  COUNT(DISTINCT customer_email)::text as "Count"
FROM public.orders
WHERE customer_email IS NOT NULL;

-- 4. Recent customer activity
SELECT 
  'RECENT CUSTOMER ACTIVITY' as "Section",
  '' as "Details";

SELECT 
  o.customer_name as "Customer",
  o.customer_email as "Email",
  o.customer_phone as "Phone",
  o.total_amount as "Amount",
  o.status as "Status",
  o.created_at as "Date"
FROM public.orders o
WHERE o.created_at >= NOW() - INTERVAL '30 days'
ORDER BY o.created_at DESC
LIMIT 10;

-- 5. Customer contact information summary
SELECT 
  'CUSTOMER CONTACT SUMMARY' as "Section",
  '' as "Details";

SELECT 
  customer_email as "Email",
  customer_name as "Name",
  customer_phone as "Phone",
  COUNT(*) as "Total Orders",
  SUM(total_amount) as "Total Spent",
  MAX(created_at) as "Last Order Date"
FROM public.orders
WHERE customer_email IS NOT NULL
GROUP BY customer_email, customer_name, customer_phone
ORDER BY "Total Spent" DESC;

-- 6. Email domains analysis
SELECT 
  'EMAIL DOMAINS' as "Section",
  '' as "Details";

SELECT 
  SPLIT_PART(customer_email, '@', 2) as "Email Domain",
  COUNT(*) as "Customer Count"
FROM public.orders
WHERE customer_email IS NOT NULL
GROUP BY SPLIT_PART(customer_email, '@', 2)
ORDER BY "Customer Count" DESC;

-- 7. Phone number patterns
SELECT 
  'PHONE NUMBER PATTERNS' as "Section",
  '' as "Details";

SELECT 
  customer_phone as "Phone Number",
  customer_name as "Customer Name",
  customer_email as "Email",
  COUNT(*) as "Orders"
FROM public.orders
WHERE customer_phone IS NOT NULL
GROUP BY customer_phone, customer_name, customer_email
ORDER BY "Orders" DESC; 