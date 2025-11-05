# Admin Panel Guide - DIVA Jewel Cart

## Accessing Admin Panel

Navigate to: **http://localhost:5174/admin**

You can also access it from the Header menu (when logged in as admin) by clicking "Admin Dashboard".

---

## Admin Panel Features

### 1. Dashboard (`/admin`)
- Overview of total products, orders, and users
- Quick actions to add/manage products
- Recent products table

### 2. Manage Products (`/admin/products`)
- View all products in a table
- Search products by name
- Edit or delete existing products
- Each product shows: image, name, price, stock, metal type, featured status

### 3. Add New Product (`/admin/products/new`)
- Upload product image
- Fill in product details
- Set price and stock quantity
- Choose category and specifications

### 4. Edit Product (`/admin/products/edit/:id`)
- Same form as "Add Product" but pre-filled with existing data
- Update any product information
- Change or upload new image

---

## How to Add/Edit Product Images

### Step 1: Make Sure Supabase Storage is Set Up

Run this SQL in your **Supabase SQL Editor** (if not already done):

```sql
-- Create product-images bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies for public access
DROP POLICY IF EXISTS "Public Access to Product Images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload product images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update product images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete product images" ON storage.objects;

CREATE POLICY "Public Access to Product Images"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

CREATE POLICY "Authenticated users can upload product images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'product-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update product images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'product-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete product images"
ON storage.objects FOR DELETE
USING (bucket_id = 'product-images' AND auth.role() = 'authenticated');
```

### Step 2: Add Products with Images

1. Go to **http://localhost:5174/admin/products/new**
2. Click "Choose Image" button
3. Select an image from your computer (JPG, PNG, max 5MB)
4. You'll see a preview of the image
5. Fill in all required fields:
   - Product Name *
   - Price *
   - Stock Quantity *
   - Category *
   - Gender *
   - Metal Type (optional)
   - Stone Type (optional)
6. Check "Mark as Featured" if needed
7. Click "Create Product"

### Step 3: Edit Existing Products

1. Go to **http://localhost:5174/admin/products**
2. Click the blue "Edit" button on any product
3. Update any fields (name, price, stock, etc.)
4. To change image:
   - Click the X button on current image
   - Click "Choose Image" to upload new one
5. Click "Update Product"

---

## How to Add Images to Existing 25 Products

You have 2 options:

### Option A: Edit Products One by One (Recommended)

1. Go to **http://localhost:5174/admin/products**
2. Find a product (e.g., "Classic Solitaire Diamond Ring")
3. Click the Edit button
4. Upload an image for that product
5. Click "Update Product"
6. Repeat for other products

### Option B: Update via SQL (Bulk Update)

If you have images hosted online (like from Unsplash or your own server):

```sql
-- Update specific product with image URL
UPDATE products
SET image_url = 'https://your-image-url.com/diamond-ring.jpg'
WHERE name = 'Classic Solitaire Diamond Ring';

-- Update multiple products at once
UPDATE products
SET image_url = 'https://unsplash.com/photos/jewelry-placeholder'
WHERE metal_type = 'gold';
```

---

## Managing Stock and Prices

### Update Stock Quantity

1. Go to **http://localhost:5174/admin/products**
2. Click Edit on the product
3. Change the "Stock Quantity" field
4. Click "Update Product"

**OR** via SQL:

```sql
-- Increase stock for a specific product
UPDATE products
SET stock_quantity = 20
WHERE name = 'Classic Solitaire Diamond Ring';

-- Decrease stock when sold
UPDATE products
SET stock_quantity = stock_quantity - 1
WHERE id = 'product-id-here';
```

### Update Prices

1. Go to **http://localhost:5174/admin/products**
2. Click Edit on the product
3. Change the "Price" field
4. Click "Update Product"

**OR** via SQL:

```sql
-- Update price for specific product
UPDATE products
SET price = 5999.99
WHERE name = 'Classic Solitaire Diamond Ring';

-- Apply 10% discount to all rings
UPDATE products
SET price = price * 0.9
WHERE category_id = (SELECT id FROM categories WHERE name = 'Rings');
```

---

## Delete Products

### Via Admin Panel

1. Go to **http://localhost:5174/admin/products**
2. Click the red "Delete" button (trash icon)
3. Confirm the deletion

### Via SQL

```sql
-- Delete specific product
DELETE FROM products
WHERE name = 'Product Name Here';

-- Delete all out-of-stock products
DELETE FROM products
WHERE stock_quantity = 0;
```

---

## Tips for Product Images

### Free Jewelry Image Sources

1. **Unsplash** - https://unsplash.com/s/photos/jewelry
2. **Pexels** - https://www.pexels.com/search/jewelry/
3. **Pixabay** - https://pixabay.com/images/search/jewelry/

### Image Guidelines

- **Format**: JPG or PNG
- **Size**: Maximum 5MB
- **Dimensions**: 800x800px or larger (square recommended)
- **Quality**: High resolution, well-lit
- **Background**: Clean, white or neutral background preferred

### Getting Good Product Photos

1. Use natural lighting or lightbox
2. Take photos from multiple angles
3. Show product details (engravings, stones, etc.)
4. Use white/neutral background
5. Edit to enhance colors and clarity

---

## Quick Reference

| Action | URL |
|--------|-----|
| Admin Dashboard | `/admin` |
| Manage Products | `/admin/products` |
| Add New Product | `/admin/products/new` |
| Edit Product | `/admin/products/edit/:id` |

---

## Need Help?

- Check browser console (F12) for errors
- Make sure you're logged in
- Verify Supabase Storage is configured
- Ensure image files are under 5MB
- Check that all required fields are filled

---

## Summary

✅ Admin Panel Created
✅ Product Management (View, Edit, Delete)
✅ Image Upload to Supabase Storage
✅ Stock & Price Management
✅ Category Management
✅ Featured Products Toggle

You now have a complete admin system to manage your jewelry store!
