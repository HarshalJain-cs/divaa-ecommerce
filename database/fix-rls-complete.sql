-- =============================================
-- COMPLETE FIX: Remove ALL policies and recreate simple ones
-- =============================================

-- =============================================
-- STEP 1: Drop ALL existing policies
-- =============================================

-- Drop ALL policies on products
DO $$
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'products') LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON products';
    END LOOP;
END $$;

-- Drop ALL policies on categories
DO $$
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'categories') LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON categories';
    END LOOP;
END $$;

-- Drop ALL policies on profiles
DO $$
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'profiles') LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON profiles';
    END LOOP;
END $$;

-- =============================================
-- STEP 2: Create NEW simple policies (NO RECURSION)
-- =============================================

-- PRODUCTS: Allow everyone to view, authenticated to modify
CREATE POLICY "products_select_policy"
  ON products FOR SELECT
  USING (true);

CREATE POLICY "products_insert_policy"
  ON products FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "products_update_policy"
  ON products FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "products_delete_policy"
  ON products FOR DELETE
  USING (auth.role() = 'authenticated');

-- CATEGORIES: Allow everyone to view, authenticated to modify
CREATE POLICY "categories_select_policy"
  ON categories FOR SELECT
  USING (true);

CREATE POLICY "categories_modify_policy"
  ON categories FOR ALL
  USING (auth.role() = 'authenticated');

-- PROFILES: Simple user policies
CREATE POLICY "profiles_select_own"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "profiles_update_own"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- =============================================
-- VERIFY: Show remaining policies
-- =============================================
SELECT tablename, policyname FROM pg_policies
WHERE tablename IN ('products', 'categories', 'profiles')
ORDER BY tablename, policyname;
