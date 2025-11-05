-- =============================================
-- CREATE ADMIN USER - BYPASS EMAIL VERIFICATION
-- =============================================
-- This script creates an admin user directly in the database
-- bypassing the email verification requirement

-- IMPORTANT: Replace these values with YOUR desired credentials
-- Email: Change to your email
-- Password: The password will be 'admin123' (change after first login)

-- Step 1: Create user in auth.users (Supabase authentication table)
-- Note: You'll need to do this through Supabase Dashboard > Authentication > Users > Invite User
-- OR disable email confirmation in Supabase Dashboard > Authentication > Settings

-- For now, let's assume you already have a user created
-- If you have a user but can't log in, let's check:

-- Check all existing users
SELECT
    id,
    email,
    email_confirmed_at,
    created_at,
    CASE
        WHEN email_confirmed_at IS NULL THEN 'NOT VERIFIED ❌'
        ELSE 'VERIFIED ✅'
    END as status
FROM auth.users
ORDER BY created_at DESC;

-- =============================================
-- OPTION 1: MANUAL USER CREATION (RECOMMENDED)
-- =============================================
-- Go to Supabase Dashboard:
-- 1. Click "Authentication" in left sidebar
-- 2. Click "Users" tab
-- 3. Click "Add User" button
-- 4. Choose "Create User" (not invite)
-- 5. Enter:
--    - Email: admin@test.com (or any email you want)
--    - Password: Admin123! (or any password)
--    - Auto Confirm User: CHECK THIS BOX ✅ (Very Important!)
-- 6. Click "Create User"

-- Then come back and run this to make them admin:
-- UPDATE profiles SET role = 'admin' WHERE email = 'admin@test.com';

-- =============================================
-- OPTION 2: CONFIRM EXISTING USER
-- =============================================
-- If you already created a user but can't log in because email isn't verified:

-- Step 1: Find your user ID (look at the output above)
-- Step 2: Confirm the user's email manually:

-- Replace 'YOUR-USER-ID-HERE' with actual user ID from above query
-- UPDATE auth.users
-- SET email_confirmed_at = NOW()
-- WHERE id = 'YOUR-USER-ID-HERE';

-- Step 3: Make them admin in profiles table
-- UPDATE profiles
-- SET role = 'admin'
-- WHERE id = 'YOUR-USER-ID-HERE';

-- =============================================
-- OPTION 3: DISABLE EMAIL CONFIRMATION (EASIEST)
-- =============================================
-- Go to Supabase Dashboard:
-- 1. Click "Authentication" in left sidebar
-- 2. Click "Settings" tab
-- 3. Scroll to "Email Auth"
-- 4. Find "Confirm email"
-- 5. UNCHECK "Enable email confirmations" ❌
-- 6. Click "Save"
--
-- Now you can sign up normally without email verification!

-- =============================================
-- VERIFY YOUR SETUP
-- =============================================
-- After creating user, run these to verify everything:

-- Check if user exists
SELECT
    u.id,
    u.email,
    u.email_confirmed_at,
    p.full_name,
    p.role,
    CASE
        WHEN u.email_confirmed_at IS NULL THEN 'Cannot login - email not confirmed ❌'
        WHEN p.role = 'admin' THEN 'Ready to login as ADMIN ✅'
        WHEN p.role = 'customer' THEN 'Ready to login as CUSTOMER ✅'
        ELSE 'Profile missing ❌'
    END as login_status
FROM auth.users u
LEFT JOIN profiles p ON u.id = p.id
ORDER BY u.created_at DESC
LIMIT 5;

-- If login_status shows an issue, follow the option above to fix it!
