-- Migration to add company fields to orders table
-- Run this if you have an existing database

ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS needs_r1_invoice BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS company_name TEXT,
ADD COLUMN IF NOT EXISTS company_oib TEXT;

-- Add comment for documentation
COMMENT ON COLUMN orders.needs_r1_invoice IS 'Whether customer requested R1 invoice for company';
COMMENT ON COLUMN orders.company_name IS 'Company name for R1 invoice';
COMMENT ON COLUMN orders.company_oib IS 'Company OIB (tax number) for R1 invoice'; 