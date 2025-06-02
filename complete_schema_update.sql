-- Complete schema update to add all missing columns to orders table
-- This ensures the database schema matches what the application expects

-- Add stripe_payment_intent_id column
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS stripe_payment_intent_id TEXT;

-- Add company-related fields
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS company_name TEXT,
ADD COLUMN IF NOT EXISTS company_oib TEXT,
ADD COLUMN IF NOT EXISTS needs_r1_invoice BOOLEAN DEFAULT FALSE;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_orders_stripe_payment_intent_id 
ON orders(stripe_payment_intent_id);

CREATE INDEX IF NOT EXISTS idx_orders_company_name 
ON orders(company_name);

-- Add comments to document the columns
COMMENT ON COLUMN orders.stripe_payment_intent_id IS 'Stripe payment intent ID for tracking payments';
COMMENT ON COLUMN orders.company_name IS 'Company name for business orders';
COMMENT ON COLUMN orders.company_oib IS 'Company OIB (tax number) for Croatian businesses';
COMMENT ON COLUMN orders.needs_r1_invoice IS 'Whether this order requires an R1 invoice for business purposes'; 