-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id BIGSERIAL PRIMARY KEY,
  order_id TEXT NOT NULL UNIQUE,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_address TEXT NOT NULL,
  items JSONB NOT NULL,
  notes TEXT,
  total_amount DECIMAL(10, 2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'received',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on customer_email for faster customer order lookup
CREATE INDEX IF NOT EXISTS idx_customer_email ON orders(customer_email);

-- Create index on order_id for faster order lookup
CREATE INDEX IF NOT EXISTS idx_order_id ON orders(order_id);

-- Create RLS policy for orders
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Allow anonymous read access to orders (for public orders)
CREATE POLICY "Allow anonymous read access to orders" ON orders
  FOR SELECT USING (true);

-- Allow service role to manage orders
CREATE POLICY "Allow service role to manage orders" ON orders
  FOR ALL USING (auth.role() = 'service_role');

-- Allow users to view their own orders
CREATE POLICY "Users can view their own orders" ON orders
  FOR SELECT USING (auth.email() = customer_email);

-- Create admin_users table to store admin permissions
CREATE TABLE IF NOT EXISTS admin_users (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on admin email for faster lookup
CREATE INDEX IF NOT EXISTS idx_admin_email ON admin_users(email);

-- Create RLS policy for admin_users
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Only allow service role to manage admin users
CREATE POLICY "Allow service role to manage admin users" ON admin_users
  FOR ALL USING (auth.role() = 'service_role');

-- Allow authenticated users to check if they are admins
CREATE POLICY "Allow users to check if they are admins" ON admin_users
  FOR SELECT USING (auth.email() = email);

-- Add an RLS policy for admins to manage orders
CREATE POLICY "Allow admins to manage all orders" ON orders
  FOR ALL USING (EXISTS (
    SELECT 1 FROM admin_users 
    WHERE admin_users.email = auth.email()
  )); 