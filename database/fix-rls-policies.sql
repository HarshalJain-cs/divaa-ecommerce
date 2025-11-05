-- =============================================
-- FIX: Row Level Security Policies
-- Fix infinite recursion in profiles policies
-- =============================================

-- Drop existing policies that cause recursion
DROP POLICY IF EXISTS "Only admins can modify products" ON products;
DROP POLICY IF EXISTS "Only admins can modify categories" ON categories;
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Admins can view all orders" ON orders;
DROP POLICY IF EXISTS "Admins can update orders" ON orders;
DROP POLICY IF EXISTS "Admins can view all order items" ON order_items;

-- =============================================
-- PRODUCTS: Simpler policies without recursion
-- =============================================

-- Anyone can view products (read-only for public)
-- Admin modifications will be handled by service role key, not RLS

CREATE POLICY "Anyone can view products"
  ON products FOR SELECT
  USING (true);

-- Only authenticated users can insert products (for now)
CREATE POLICY "Authenticated users can insert products"
  ON products FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Only authenticated users can update products (for now)
CREATE POLICY "Authenticated users can update products"
  ON products FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Only authenticated users can delete products (for now)
CREATE POLICY "Authenticated users can delete products"
  ON products FOR DELETE
  USING (auth.role() = 'authenticated');

-- =============================================
-- CATEGORIES: Simpler policies
-- =============================================

CREATE POLICY "Anyone can view categories"
  ON categories FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can modify categories"
  ON categories FOR ALL
  USING (auth.role() = 'authenticated');

-- =============================================
-- PROFILES: Fix recursion
-- =============================================

-- Simple profile policies without recursion
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Allow service role to view all profiles (no recursion)
CREATE POLICY "Service role can view all profiles"
  ON profiles FOR SELECT
  USING (auth.jwt()->>'role' = 'service_role');
