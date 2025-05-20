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