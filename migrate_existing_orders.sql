-- Rename customer_address to billing_address if it exists
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'orders' AND column_name = 'customer_address'
    ) THEN
        ALTER TABLE orders RENAME COLUMN customer_address TO billing_address;
    END IF;
END $$;

-- Add new columns to orders table
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS shipping_address TEXT,
ADD COLUMN IF NOT EXISTS tax_amount DECIMAL(10, 2),
ADD COLUMN IF NOT EXISTS shipping_cost DECIMAL(10, 2),
ADD COLUMN IF NOT EXISTS discount_amount DECIMAL(10, 2),
ADD COLUMN IF NOT EXISTS discount_code TEXT,
ADD COLUMN IF NOT EXISTS payment_method TEXT,
ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS shipping_method TEXT,
ADD COLUMN IF NOT EXISTS tracking_number TEXT,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Migrate items from JSON column to order_items table
DO $$
DECLARE
    order_record RECORD;
    item_record RECORD;
    items_json JSON;
BEGIN
    -- Only proceed if the items column exists
    IF EXISTS (
        SELECT 1 FROM information_schema.columns WHERE table_name = 'orders' AND column_name = 'items'
    ) THEN
        -- For each order with items
        FOR order_record IN 
            SELECT id, items FROM orders 
            WHERE items IS NOT NULL AND items != '[]' AND items != '{}'
        LOOP
            BEGIN
                -- Parse the items JSON
                items_json := order_record.items::json;
                
                -- For each item in the JSON array
                FOR i IN 0..json_array_length(items_json) - 1 LOOP
                    -- Extract item data
                    SELECT 
                        COALESCE(items_json->i->>'productId', '') AS product_id,
                        COALESCE(items_json->i->>'productName', '') AS product_name,
                        COALESCE((items_json->i->>'quantity')::integer, 1) AS quantity,
                        COALESCE((items_json->i->>'price')::decimal, 0.0) AS price,
                        items_json->i->'options' AS options,
                        COALESCE((items_json->i->>'width')::decimal, NULL) AS width,
                        COALESCE((items_json->i->>'height')::decimal, NULL) AS height
                    INTO item_record;
                    
                    -- Insert into order_items
                    INSERT INTO order_items (
                        order_id, 
                        product_id, 
                        product_name, 
                        quantity, 
                        unit_price, 
                        subtotal,
                        width,
                        height,
                        options,
                        created_at
                    ) VALUES (
                        order_record.id,
                        item_record.product_id,
                        item_record.product_name,
                        item_record.quantity,
                        item_record.price,
                        item_record.price * item_record.quantity,
                        item_record.width,
                        item_record.height,
                        item_record.options,
                        NOW()
                    );
                END LOOP;
            EXCEPTION WHEN OTHERS THEN
                RAISE NOTICE 'Error processing order ID %: %', order_record.id, SQLERRM;
                CONTINUE; -- Skip to next order on error
            END;
        END LOOP;
    END IF;
END $$;

-- Set the shipping_address to be the same as billing_address for existing orders
UPDATE orders SET 
    shipping_address = billing_address, 
    payment_method = 'Cash on delivery',
    shipping_method = 'Standard delivery',
    updated_at = NOW()
WHERE shipping_address IS NULL;

-- Set all orders with NULL payment_status to 'pending'
UPDATE orders SET payment_status = 'pending' WHERE payment_status IS NULL;

-- Update timestamps to ensure they are in the correct format
UPDATE orders SET 
    created_at = created_at,
    updated_at = COALESCE(updated_at, created_at)
WHERE created_at IS NOT NULL;

-- This script handles data migration from old schema to new schema
-- It should be run AFTER create_tables.sql

-- Create helper function to check if a column exists
CREATE OR REPLACE FUNCTION column_exists(tbl text, col text) RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = tbl AND column_name = col
  );
END;
$$ LANGUAGE plpgsql;

-- First, create a backup of existing orders data if the table exists
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'orders_old') THEN
    RAISE NOTICE 'Backup table orders_old already exists, using it for migration';
  ELSIF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'orders') THEN
    RAISE NOTICE 'Creating backup of orders table';
    -- Rename the current orders table to orders_old
    ALTER TABLE orders RENAME TO orders_old;
    -- Run create_tables.sql to create the new tables with the right schema
  ELSE
    RAISE NOTICE 'No existing orders table found, nothing to migrate';
    RETURN;
  END IF;
END $$;

-- Now migrate data from orders_old to the new orders table if both exist
DO $$
DECLARE
  old_order RECORD;
  new_order_id BIGINT;
  items_json JSON;
BEGIN
  -- Only proceed if both tables exist
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'orders') AND 
     EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'orders_old') THEN
    
    -- For each order in orders_old
    FOR old_order IN 
      SELECT * FROM orders_old
    LOOP
      BEGIN
        -- Create a new order in the orders table
        INSERT INTO orders (
          order_id,
          customer_name,
          customer_email,
          customer_phone,
          billing_address,
          shipping_address,
          notes,
          total_amount,
          status,
          created_at
        ) VALUES (
          old_order.order_id,
          old_order.customer_name,
          old_order.customer_email,
          old_order.customer_phone,
          -- Rename customer_address to billing_address if column exists
          CASE 
            WHEN column_exists('orders_old', 'customer_address') THEN old_order.customer_address
            ELSE old_order.billing_address
          END,
          -- Use billing_address for shipping_address initially
          CASE 
            WHEN column_exists('orders_old', 'customer_address') THEN old_order.customer_address
            ELSE old_order.billing_address
          END,
          old_order.notes,
          old_order.total_amount,
          old_order.status,
          old_order.created_at
        ) RETURNING id INTO new_order_id;
        
        -- Set default values for new fields
        UPDATE orders SET
          payment_method = 'Cash on delivery',
          shipping_method = 'Standard delivery',
          payment_status = 'pending',
          updated_at = NOW()
        WHERE id = new_order_id;
        
        -- If items column exists and contains JSON data, migrate to order_items
        IF column_exists('orders_old', 'items') AND old_order.items IS NOT NULL AND old_order.items != '[]' AND old_order.items != '{}' THEN
          -- Parse the items JSON
          items_json := old_order.items::json;
          
          -- For each item in the JSON array
          FOR i IN 0..json_array_length(items_json) - 1 LOOP
            -- Insert into order_items
            INSERT INTO order_items (
              order_id, 
              product_id, 
              product_name, 
              quantity, 
              unit_price, 
              subtotal,
              width,
              height,
              options,
              created_at
            ) VALUES (
              new_order_id,
              COALESCE(items_json->i->>'productId', ''),
              COALESCE(items_json->i->>'productName', ''),
              COALESCE((items_json->i->>'quantity')::integer, 1),
              COALESCE((items_json->i->>'price')::decimal, 0.0),
              COALESCE((items_json->i->>'price')::decimal, 0.0) * COALESCE((items_json->i->>'quantity')::integer, 1),
              COALESCE((items_json->i->>'width')::decimal, NULL),
              COALESCE((items_json->i->>'height')::decimal, NULL),
              items_json->i->'options',
              NOW()
            );
          END LOOP;
        END IF;
      EXCEPTION WHEN OTHERS THEN
        RAISE NOTICE 'Error processing order ID %: %', old_order.order_id, SQLERRM;
        CONTINUE; -- Skip to next order on error
      END;
    END LOOP;
    
    RAISE NOTICE 'Migration completed successfully';
  ELSE
    RAISE NOTICE 'Missing required tables for migration';
  END IF;
END $$; 