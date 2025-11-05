# Database Setup Guide

This guide will help you fix the RLS policy issues and update product images.

---

## 🔴 Issue 1: "Row-level security policy" Error

**Problem:** Cannot add products in admin panel because RLS policies require authentication.

**Solution:** Run the SQL script to allow public access to admin operations.

---

## 🖼️ Issue 2: Product Images Not Loading

**Problem:** Product images show placeholder instead of real jewelry photos.

**Solution:** Run the SQL script to update all product images with working URLs.

---

## 📝 How to Run SQL Scripts

### Option 1: Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard
2. Click on **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy and paste the SQL script (see below)
5. Click **Run** or press `Ctrl+Enter`

### Option 2: psql Command Line

```bash
psql -h your-supabase-host -U postgres -d postgres -f database/fix-public-admin-access.sql
psql -h your-supabase-host -U postgres -d postgres -f database/update-product-images-fixed.sql
```

---

## 🔧 SQL Scripts to Run

### Step 1: Fix RLS Policies (Required)

Run this script to allow public admin access:

```sql
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
```

### Step 2: Update Product Images (Required)

Run this script to add real jewelry images:

```sql
-- =============================================
-- UPDATE PRODUCT IMAGES WITH WORKING URLS
-- Using reliable Unsplash jewelry images
-- =============================================

-- Update Rings
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop' WHERE name = 'Classic Solitaire Diamond Ring';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&auto=format&fit=crop' WHERE name = 'Rose Gold Eternity Band';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&auto=format&fit=crop' WHERE name = 'Sapphire Halo Engagement Ring';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop' WHERE name = 'Emerald Cut Ruby Ring';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&auto=format&fit=crop' WHERE name = 'Vintage Pearl Cocktail Ring';

-- Update Necklaces
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800&auto=format&fit=crop' WHERE name = 'Diamond Tennis Necklace';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&auto=format&fit=crop' WHERE name = 'Heart Pendant Necklace';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop' WHERE name = 'Tahitian Pearl Strand';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=800&auto=format&fit=crop' WHERE name = 'Emerald Drop Necklace';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&auto=format&fit=crop' WHERE name = 'Infinity Symbol Necklace';

-- Update Earrings
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop' WHERE name = 'Diamond Hoop Earrings';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&auto=format&fit=crop' WHERE name = 'Ruby Teardrop Earrings';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&auto=format&fit=crop' WHERE name = 'Pearl Stud Earrings';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop' WHERE name = 'Sapphire Chandelier Earrings';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&auto=format&fit=crop' WHERE name = 'Rose Gold Geometric Earrings';

-- Update Bracelets
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&auto=format&fit=crop' WHERE name = 'Diamond Tennis Bracelet';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&auto=format&fit=crop' WHERE name = 'Charm Bracelet Collection';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop' WHERE name = 'Emerald Bangle Set';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop' WHERE name = 'Pearl Strand Bracelet';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&auto=format&fit=crop' WHERE name = 'Rose Gold Link Bracelet';

-- Update Sets
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800&auto=format&fit=crop' WHERE name = 'Bridal Diamond Set';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop' WHERE name = 'Pearl Ensemble Set';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop' WHERE name = 'Ruby Deluxe Set';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&auto=format&fit=crop' WHERE name = 'Everyday Elegance Set';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&auto=format&fit=crop' WHERE name = 'Sapphire Collection Set';
```

---

## ✅ Verification

After running both scripts:

1. **Test Product Creation:**
   - Go to http://localhost:5173/admin/products/new
   - Try to add a new product
   - Should work without RLS errors ✅

2. **Check Product Images:**
   - Go to http://localhost:5173/products
   - All products should show real jewelry images ✅

---

## 📂 Quick Access to SQL Files

The SQL scripts are located in:
- `database/fix-public-admin-access.sql`
- `database/update-product-images-fixed.sql`

---

## 🔒 Security Note

**Important:** These policies allow PUBLIC access to product management. This is fine for development/demo purposes, but for production you should:

1. Add authentication checks
2. Restrict admin operations to authenticated admin users
3. Use proper role-based access control (RBAC)

For now, this allows you to test all features without authentication barriers.

---

## 🆘 Troubleshooting

### Issue: SQL script fails
- Make sure you're connected to the correct database
- Check if tables exist: `SELECT * FROM products LIMIT 1;`
- Verify RLS is enabled: `SELECT * FROM pg_policies WHERE tablename = 'products';`

### Issue: Images still not loading
- Check browser console for errors
- Verify Unsplash URLs are accessible
- Clear browser cache and refresh

### Issue: Still getting RLS errors
- Verify the policies were created: `SELECT * FROM pg_policies WHERE tablename = 'products';`
- Check Supabase logs for detailed error messages
- Ensure you're using the anon key (not service role key) in your .env file

---

## 💡 Need Help?

If you're still facing issues, provide:
1. The exact error message
2. Screenshots of Supabase SQL editor
3. Browser console errors (F12 -> Console tab)
