-- =============================================
-- DIAGNOSTIC: Check All Issues
-- =============================================

-- 1. Check if categories exist
SELECT 'CATEGORIES' as table_name, COUNT(*) as count FROM categories;
SELECT * FROM categories ORDER BY display_order;

-- 2. Check if products exist
SELECT 'PRODUCTS' as table_name, COUNT(*) as count FROM products;
SELECT id, name, price, category_id, stock_quantity, created_at
FROM products
ORDER BY created_at DESC
LIMIT 10;

-- 3. Check RLS policies on categories
SELECT
    'CATEGORY POLICIES' as info,
    policyname,
    cmd,
    qual
FROM pg_policies
WHERE tablename = 'categories';

-- 4. Check RLS policies on products
SELECT
    'PRODUCT POLICIES' as info,
    policyname,
    cmd,
    qual
FROM pg_policies
WHERE tablename = 'products';

-- 5. Check if RLS is enabled
SELECT
    schemaname,
    tablename,
    rowsecurity as rls_enabled
FROM pg_tables
WHERE tablename IN ('products', 'categories', 'profiles', 'wishlist');

-- 6. Check storage bucket
SELECT * FROM storage.buckets WHERE id = 'product-images';

-- 7. Check storage policies
SELECT
    'STORAGE POLICIES' as info,
    policyname,
    definition
FROM storage.policies
WHERE bucket_id = 'product-images';

-- 8. Test if you can select categories (should return data)
SELECT 'TEST SELECT CATEGORIES' as test;
SELECT * FROM categories LIMIT 5;

-- 9. Test if you can select products (should return data)
SELECT 'TEST SELECT PRODUCTS' as test;
SELECT * FROM products LIMIT 5;
