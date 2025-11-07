# Product Images Instructions

## Overview
This document contains instructions for handling product images for the DIVAA E-Commerce gold and silver jewelry catalog.

## Option 1: Use Unsplash URLs Directly (Recommended for Testing)
The SQL file already includes Unsplash image URLs. These will work immediately without downloading.

**Pros:**
- No download/upload needed
- Works immediately
- High-quality jewelry images

**Cons:**
- External dependency
- Images might change over time

## Option 2: Download and Upload to Supabase (Production Ready)

### Step 1: Download Images
Run the provided script:
```bash
chmod +x download-images.sh
./download-images.sh
```

This downloads 143 images to `/home/user/Downloads/`

### Step 2: Upload to Supabase Storage

1. Go to your Supabase Dashboard
2. Navigate to Storage → product-images bucket
3. Upload all images from `/home/user/Downloads/`
4. Maintain the naming convention: `gold-rings-001.jpg`, `silver-earrings-001.jpg`, etc.

### Step 3: Update SQL File

Replace image URLs in `gold-silver-products.sql` with your Supabase URLs:

**Find pattern:**
```sql
image_url = 'gold-rings-001.jpg'
```

**Replace with:**
```sql
image_url = 'https://YOUR_SUPABASE_URL.supabase.co/storage/v1/object/public/product-images/gold-rings-001.jpg'
```

## Option 3: Use Your Own Images

1. Take/source your own jewelry photos
2. Name them according to the convention: `[category]-[number].jpg`
3. Upload to Supabase Storage
4. Update SQL file with your URLs

## Image Specifications

- **Format:** JPG or PNG
- **Size:** 600x600px minimum (square)
- **Quality:** High resolution for zoom
- **Background:** White or transparent preferred
- **Lighting:** Well-lit, professional product photography

## Categories and Image Counts

### Women's Gold (55 images)
- gold-rings-001.jpg to 012.jpg
- gold-earrings-001.jpg to 012.jpg
- gold-necklaces-001.jpg to 008.jpg
- gold-pendants-001.jpg to 008.jpg
- gold-bracelets-001.jpg to 008.jpg
- gold-anklets-001.jpg to 004.jpg
- gold-nosepins-001.jpg to 004.jpg
- gold-chains-001.jpg to 005.jpg
- gold-bangles-001.jpg to 005.jpg
- gold-mangalsutra-001.jpg to 004.jpg
- gold-sets-001.jpg to 004.jpg

### Women's Silver (55 images)
- silver-rings-001.jpg to 012.jpg
- silver-earrings-001.jpg to 012.jpg
- silver-necklaces-001.jpg to 008.jpg
- silver-pendants-001.jpg to 008.jpg
- silver-bracelets-001.jpg to 008.jpg
- silver-anklets-001.jpg to 004.jpg
- silver-nosepins-001.jpg to 004.jpg
- silver-chains-001.jpg to 004.jpg
- silver-bangles-001.jpg to 004.jpg
- silver-sets-001.jpg to 004.jpg

### Men's Gold (16 images)
- men-gold-rings-001.jpg to 005.jpg
- men-gold-bracelets-001.jpg to 004.jpg
- men-gold-chains-001.jpg to 004.jpg
- men-gold-pendants-001.jpg to 003.jpg
- men-gold-kadas-001.jpg to 002.jpg

### Men's Silver (17 images)
- men-silver-rings-001.jpg to 005.jpg
- men-silver-bracelets-001.jpg to 004.jpg
- men-silver-chains-001.jpg to 004.jpg
- men-silver-pendants-001.jpg to 003.jpg
- men-silver-kadas-001.jpg to 002.jpg

**Total: 143 images**

## Quick Start (Recommended)

For immediate testing, the SQL file uses Unsplash URLs. Just:
1. Run `gold-silver-categories.sql` in Supabase
2. Run `gold-silver-products.sql` in Supabase
3. Images will load automatically from Unsplash

Later, you can:
- Download images using the script
- Upload to your Supabase storage
- Update the URLs in your database using:
```sql
UPDATE products
SET image_url = REPLACE(image_url, 'OLD_URL_PATTERN', 'NEW_URL_PATTERN');
```

## Support

If images don't load, check:
1. Supabase storage bucket is public
2. URLs are correct
3. CORS is configured properly
4. Image files exist at the URLs
