# Troubleshooting Guide - DIVA Jewel Cart

## Issues Fixed

### 1. Profile Page Loading Forever ✅
**Status**: FIXED
**What was wrong**: Missing Header component and syntax error
**Solution**: Added Header component to ProfilePage

### 2. Admin Routes Not Protected ✅
**Status**: FIXED
**What was wrong**: Admin routes were not protected with authentication
**Solution**: Wrapped all admin routes with ProtectedRoute component
**Impact**: This fixes:
- Category dropdown being empty (401 error)
- Products not showing in admin panel (401 error)
- Product creation failing (401 error)

---

## IMPORTANT: Admin Panel Requires Authentication

**The admin panel now requires you to:**
1. ✅ Be logged in
2. ✅ Have admin role in your profile

**If you're not logged in or not an admin, you'll be redirected to the login page.**

---

## Quick Start: Access Admin Panel

### Step 1: Make Sure You Have an Account
1. Go to http://localhost:5174/signup
2. Create an account if you don't have one
3. Use a valid email and password

### Step 2: Make Yourself an Admin
1. Open **Supabase SQL Editor**
2. Run this SQL (replace with YOUR email):

```sql
-- Check your account
SELECT id, email, full_name, role FROM profiles WHERE email = 'your-email@example.com';

-- Make yourself admin
UPDATE profiles SET role = 'admin' WHERE email = 'your-email@example.com';

-- Verify
SELECT id, email, full_name, role FROM profiles WHERE email = 'your-email@example.com';
```

3. You should see `role: admin` in the result

Or use the helper file: `database/make-user-admin.sql`

### Step 3: Log In
1. Go to http://localhost:5174/login
2. Log in with your email and password
3. You should see your name/email in the top-right corner

### Step 4: Access Admin Panel
1. Go to http://localhost:5174/admin/products
2. You should now see the admin panel
3. Categories should load in the dropdown
4. Products should be visible

---

## Step-by-Step: Fix All Issues

### Step 1: Run Diagnostic SQL

Open **Supabase SQL Editor** and run this:

```sql
-- Check categories
SELECT 'CATEGORIES' as info, COUNT(*) as count FROM categories;
SELECT * FROM categories;

-- Check products
SELECT 'PRODUCTS' as info, COUNT(*) as count FROM products;
SELECT * FROM products LIMIT 5;

-- Check if you can see them (RLS test)
SELECT 'RLS TEST - Can you see categories?' as test;
SELECT * FROM categories;

SELECT 'RLS TEST - Can you see products?' as test;
SELECT * FROM products;
```

**Tell me what you see:**
- How many categories? (should be 5)
- How many products? (should be 25)
- Can you see the actual category names?
- Can you see the actual product names?

### Step 2: Check Browser Console

1. Go to http://localhost:5174/admin/products/new
2. Press F12 (open Developer Tools)
3. Go to Console tab
4. Look for these messages:
   - "Loading categories..."
   - "Categories loaded: ..."
   - "Categories set to state: ..."

**Tell me:**
- Do you see "Loading categories..."?
- What does "Categories loaded" show? (should show array of 5 categories)
- Are there any errors?

### Step 3: Check if You're Logged In

**THIS IS IMPORTANT!**

1. Look at the top-right of the page
2. Do you see your name/email, OR do you see "Login/Sign Up"?

**If you see "Login/Sign Up":**
- You are NOT logged in
- Go to `/login` and log in first
- Then go back to `/admin/products`

**The admin panel requires you to be logged in!**

### Step 4: Fix Storage Policies (for image upload)

Run this SQL in Supabase SQL Editor:

```sql
-- Drop all existing storage policies
DO $$
DECLARE
    pol record;
BEGIN
    FOR pol IN
        SELECT policyname
        FROM pg_policies
        WHERE schemaname = 'storage'
        AND tablename = 'objects'
    LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || pol.policyname || '" ON storage.objects';
    END LOOP;
END $$;

-- Create simple policies
CREATE POLICY "Anyone can view product images"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'product-images');
```

---

## Common Problems & Solutions

### Problem: "No categories found" in dropdown

**Cause 1**: Categories table is empty
**Solution**: Run this SQL:
```sql
INSERT INTO categories (name, description, display_order) VALUES
  ('Rings', 'Elegant rings for every occasion', 1),
  ('Necklaces', 'Beautiful necklaces and pendants', 2),
  ('Earrings', 'Stunning earrings collection', 3),
  ('Bracelets', 'Charming bracelets and bangles', 4),
  ('Sets', 'Complete jewelry sets', 5)
ON CONFLICT (name) DO NOTHING;
```

**Cause 2**: RLS policies blocking access
**Solution**: See Step 1 above to diagnose

### Problem: "Failed to save product" error

**Cause**: Storage RLS policies too restrictive
**Solution**: See Step 4 above

### Problem: Products not showing in admin panel

**Cause**: Products don't exist in database
**Solution**: Check Step 1 - if product count is 0, re-run `sample-products.sql`

---

## Quick Checks

Run these in your browser console (F12):

```javascript
// Check if user is logged in
console.log('User:', await supabase.auth.getUser());

// Check if categories load
console.log('Categories:', await supabase.from('categories').select('*'));

// Check if products load
console.log('Products:', await supabase.from('products').select('*'));
```

---

## What to Tell Me

After running the diagnostics, tell me:

1. **Categories Count**: How many? ____
2. **Products Count**: How many? ____
3. **Are you logged in?**: Yes / No
4. **Console messages**: Copy/paste what you see
5. **Any errors?**: Copy/paste any red errors

This will help me fix the exact issue!
