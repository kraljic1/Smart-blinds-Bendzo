-- Simple fix: Add admin user with only the columns that exist in the database
-- Based on the original schema: id, email, created_at, updated_at

INSERT INTO admin_users (email, created_at, updated_at)
VALUES (
  'vidkraljic1@gmail.com',
  NOW(),
  NOW()
)
ON CONFLICT (email) DO NOTHING;

-- Also check what columns actually exist in the table
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'admin_users' 
ORDER BY ordinal_position; 