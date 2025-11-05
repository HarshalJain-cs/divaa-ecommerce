-- =============================================
-- FIX: Allow Public Admin Access for Products
-- Remove authentication requirement for admin operations
-- =============================================

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Authenticated users can insert products" ON products;
DROP POLICY IF EXISTS "Authenticated users can update products" ON products;
DROP POLICY IF EXISTS "Authenticated users can delete products" ON products;
DROP POLICY IF EXISTS "Anyone can view products" ON products;

-- Allow EVERYONE to perform all operations on products (for public admin panel)
CREATE POLICY "Public read access for products"
  ON products FOR SELECT
  USING (true);

CREATE POLICY "Public insert access for products"
  ON products FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Public update access for products"
  ON products FOR UPDATE
  USING (true);

CREATE POLICY "Public delete access for products"
  ON products FOR DELETE
  USING (true);

-- =============================================
-- FIX: Categories - Allow public access
-- =============================================

DROP POLICY IF EXISTS "Anyone can view categories" ON categories;
DROP POLICY IF EXISTS "Authenticated users can modify categories" ON categories;

CREATE POLICY "Public read access for categories"
  ON categories FOR SELECT
  USING (true);

CREATE POLICY "Public modify access for categories"
  ON categories FOR ALL
  USING (true);
