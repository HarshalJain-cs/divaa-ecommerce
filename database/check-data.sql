-- =============================================
-- DIAGNOSTIC: Check Database Data
-- =============================================

-- Check if categories exist
SELECT 'Categories Count:' as check_type, COUNT(*) as count FROM categories;
SELECT * FROM categories ORDER BY display_order;

-- Check if products exist
SELECT 'Products Count:' as check_type, COUNT(*) as count FROM products;
SELECT id, name, price, category_id, stock_quantity FROM products LIMIT 10;

-- Check if there are any products without categories
SELECT 'Products without category:' as check_type, COUNT(*) as count
FROM products WHERE category_id IS NULL;

-- Check RLS is enabled
SELECT
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables
WHERE tablename IN ('products', 'categories', 'wishlist');

-- Check policies on products
SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies
WHERE tablename = 'products';
