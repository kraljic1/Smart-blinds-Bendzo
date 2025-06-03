-- Add missing admin user vidkraljic1@gmail.com
-- This user exists in Supabase Auth but not in admin_users table

INSERT INTO admin_users (email, username, password_hash, role, is_active, created_at, updated_at)
VALUES (
  'vidkraljic1@gmail.com',
  'vidkraljic1',
  'supabase_auth',
  'admin',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (email) DO NOTHING; 