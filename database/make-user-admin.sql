-- =============================================
-- HELPER: Make a User an Admin
-- =============================================
-- This script makes a user an admin so they can access the admin panel

-- STEP 1: Find your user ID
-- Replace 'your-email@example.com' with YOUR actual email
SELECT id, email, full_name, role
FROM profiles
WHERE email = 'your-email@example.com';

-- STEP 2: Make yourself admin
-- Replace 'your-email@example.com' with YOUR actual email
UPDATE profiles
SET role = 'admin'
WHERE email = 'your-email@example.com';

-- STEP 3: Verify you are now admin
SELECT id, email, full_name, role
FROM profiles
WHERE email = 'your-email@example.com';

-- Alternative: Make ALL users admins (for testing only!)
-- Uncomment the line below if you want to make everyone admin
-- UPDATE profiles SET role = 'admin';

-- Alternative: Make the FIRST user admin
-- UPDATE profiles SET role = 'admin' WHERE id = (SELECT id FROM profiles ORDER BY created_at ASC LIMIT 1);
