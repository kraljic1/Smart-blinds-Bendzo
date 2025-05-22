-- Drop tables if they exist (in reverse order of dependencies)
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS admin_users CASCADE;

-- Create orders table with all required fields
CREATE TABLE orders (
  id BIGSERIAL PRIMARY KEY,
  order_id TEXT NOT NULL UNIQUE,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  billing_address TEXT NOT NULL,
  shipping_address TEXT,
  notes TEXT,
  total_amount DECIMAL(10, 2) NOT NULL,
  tax_amount DECIMAL(10, 2),
  shipping_cost DECIMAL(10, 2),
  discount_amount DECIMAL(10, 2),
  discount_code TEXT,
  payment_method TEXT,
  payment_status TEXT NOT NULL DEFAULT 'pending',
  shipping_method TEXT,
  tracking_number TEXT,
  status TEXT NOT NULL DEFAULT 'received',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create order_items table with foreign key reference
CREATE TABLE order_items (
  id BIGSERIAL PRIMARY KEY,
  order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL,
  product_name TEXT NOT NULL,
  product_image TEXT,
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  width DECIMAL(10, 2),
  height DECIMAL(10, 2),
  options JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admin_users table
CREATE TABLE admin_users (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_customer_email ON orders(customer_email);
CREATE INDEX idx_order_id ON orders(order_id);
CREATE INDEX idx_admin_email ON admin_users(email);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);

-- Enable RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies for orders table
CREATE POLICY "Allow anonymous read access to orders" ON orders
  FOR SELECT USING (true);

CREATE POLICY "Allow service role to manage orders" ON orders
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Users can view their own orders" ON orders
  FOR SELECT USING (auth.email() = customer_email); 

CREATE POLICY "Allow admins to manage all orders" ON orders
  FOR ALL USING (EXISTS (
    SELECT 1 FROM admin_users 
    WHERE admin_users.email = auth.email()
  ));

-- Policies for order_items table
CREATE POLICY "Allow anonymous read access to order_items" ON order_items
  FOR SELECT USING (true);

CREATE POLICY "Allow service role to manage order_items" ON order_items
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Users can view their own order_items" ON order_items
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM orders 
    WHERE orders.id = order_items.order_id 
    AND orders.customer_email = auth.email()
  )); 

CREATE POLICY "Allow admins to manage all order_items" ON order_items
  FOR ALL USING (EXISTS (
    SELECT 1 FROM admin_users 
    WHERE admin_users.email = auth.email()
  ));

-- Policies for admin_users table
CREATE POLICY "Allow service role to manage admin users" ON admin_users
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Allow users to check if they are admins" ON admin_users
  FOR SELECT USING (auth.email() = email); 