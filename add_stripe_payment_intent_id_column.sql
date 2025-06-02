-- Add stripe_payment_intent_id column to orders table
-- This column is needed to store the Stripe payment intent ID for order tracking

ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS stripe_payment_intent_id TEXT;

-- Create an index for better query performance
CREATE INDEX IF NOT EXISTS idx_orders_stripe_payment_intent_id 
ON orders(stripe_payment_intent_id);

-- Add a comment to document the column
COMMENT ON COLUMN orders.stripe_payment_intent_id IS 'Stripe payment intent ID for tracking payments'; 