-- Manually add vidkraljic1@gmail.com as admin user
-- This user exists in Supabase Auth but not in admin_users table

INSERT INTO admin_users (email, username, password_hash, role, is_active, created_at, updated_at)
VALUES (
  'vidkraljic1@gmail.com',
  'vidkraljic1',
  'password_set_by_user', -- Since this user already has a password set
  'admin',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (email) DO NOTHING;

-- Verify the admin was added
SELECT * FROM admin_users WHERE email = 'vidkraljic1@gmail.com'; 