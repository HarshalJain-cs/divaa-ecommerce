# Collection Images Database System

## Overview

A comprehensive database system for managing collection images, banners, and media assets for the Divaa E-Commerce platform.

## Quick Start

### 1. Create the Schema

```bash
# In Supabase SQL Editor
# Run: supabase/collection-images-schema.sql
```

### 2. Load Sample Data

```bash
# In Supabase SQL Editor
# Run: supabase/setup-collection-images-data.sql
```

### 3. Verify Installation

```sql
SELECT * FROM active_collections_with_images;
```

---

## Database Tables

### `collections`
Stores collection metadata and configuration.

**Key Fields:**
- `name` - Internal identifier (e.g., "everyday-wear")
- `slug` - URL-friendly identifier (e.g., "style-everyday")
- `display_name` - User-facing name (e.g., "Everyday Wear")
- `category` - Collection type: `style`, `material`, `wedding`, `occasion`, `collection`
- `is_featured` - Show in featured sections
- `primary_color` / `secondary_color` - Brand colors for theming
- `gradient_from` / `gradient_to` - CSS gradient colors

### `collection_images`
Stores all images for collections.

**Image Types:**
- `banner` - Large hero/banner images
- `thumbnail` - Small preview images
- `grid` - Grid layout images
- `hero` - Main hero images
- `card` - Card component images
- `background` - Background images

**Key Fields:**
- `collection_id` - Links to collections table
- `image_url` - Full image URL
- `image_type` - Type of image (see above)
- `is_primary` - Primary/featured image for collection
- `is_external` - Using external CDN (like Giva)
- `display_order` - Sort order for display

### `image_variants`
Stores different size variants for responsive images.

**Variants:**
- `thumbnail` - 200x200
- `small` - 400x400
- `medium` - 800x800
- `large` - 1200x1200
- `xlarge` - 1920x1920

### `collection_banners`
Dedicated table for collection promotional banners.

**Banner Types:**
- `hero` - Main hero banner
- `secondary` - Secondary promotional banner
- `promotional` - Special promotions
- `seasonal` - Seasonal campaigns

### `image_uploads`
Tracks image upload history and processing.

**Processing Status:**
- `pending` - Upload received, awaiting processing
- `processing` - Currently being processed
- `completed` - Successfully processed
- `failed` - Processing failed

---

## Your Collections

### Style Collections
1. **Everyday Wear** (`style-everyday`)
   - Perfect for daily wear
   - Lightweight and comfortable

2. **Traditional** (`style-traditional`)
   - Classic Indian designs
   - Perfect for festivals

3. **Party Wear** (`style-party`)
   - Glamorous pieces
   - Special occasions

4. **Twinning** (`gifts-for-friends`)
   - Matching sets
   - Perfect for friends/sisters

5. **Minimalistic** (`casual`)
   - Simple and elegant
   - Understated beauty

6. **Office Wear** (`style-office`)
   - Professional jewelry
   - Workplace appropriate

### Special
7. **Gift Cards** (`gift-cards`)
   - Digital gift cards
   - Perfect gifts

---

## Common Queries

### Get All Collections with Primary Images

```sql
SELECT * FROM active_collections_with_images;
```

### Get Collection by Slug with All Images

```sql
SELECT * FROM get_collection_with_images('style-everyday');
```

### Get Collection Image Statistics

```sql
SELECT * FROM collection_image_stats;
```

### Get All Images for a Collection

```sql
SELECT
  ci.id,
  ci.image_url,
  ci.image_type,
  ci.alt_text,
  ci.is_primary,
  ci.display_order
FROM collection_images ci
JOIN collections c ON c.id = ci.collection_id
WHERE c.slug = 'style-everyday'
  AND ci.is_active = true
ORDER BY ci.display_order;
```

### Get Featured Collections

```sql
SELECT
  c.id,
  c.display_name,
  c.slug,
  c.description,
  ci.image_url as primary_image
FROM collections c
LEFT JOIN collection_images ci ON c.id = ci.collection_id AND ci.is_primary = true
WHERE c.is_featured = true AND c.is_active = true
ORDER BY c.display_order;
```

### Add New Collection

```sql
INSERT INTO collections (
  name,
  slug,
  display_name,
  description,
  category,
  is_featured,
  primary_color,
  secondary_color,
  gradient_from,
  gradient_to
) VALUES (
  'new-arrivals',
  'collections/new-arrivals',
  'New Arrivals',
  'Latest jewelry additions',
  'collection',
  true,
  '#B76E79',
  '#E0BFB8',
  '#E0BFB8',
  '#B76E79'
);
```

### Add Image to Collection

```sql
INSERT INTO collection_images (
  collection_id,
  image_url,
  image_type,
  alt_text,
  title,
  is_primary,
  width,
  height,
  file_format,
  is_external
)
SELECT
  c.id,
  '//your-cdn.com/image.webp',
  'grid',
  'Collection Image',
  'Image Title',
  true,
  900,
  900,
  'webp',
  true
FROM collections c
WHERE c.slug = 'style-everyday';
```

### Update Collection Image

```sql
UPDATE collection_images
SET
  image_url = '//new-url.com/image.webp',
  updated_at = NOW()
WHERE id = 'image-uuid-here';
```

### Set Primary Image

```sql
-- This will automatically unset other primary images
UPDATE collection_images
SET is_primary = true
WHERE id = 'image-uuid-here';
```

---

## TypeScript Types

Create these types in your frontend:

```typescript
// src/types/collection.types.ts

export type CollectionCategory = 'style' | 'material' | 'wedding' | 'occasion' | 'collection' | 'special';

export type ImageType = 'banner' | 'thumbnail' | 'grid' | 'hero' | 'card' | 'background';

export interface Collection {
  id: string;
  name: string;
  slug: string;
  display_name: string;
  description: string | null;
  category: CollectionCategory;
  meta_title: string | null;
  meta_description: string | null;
  keywords: string[] | null;
  is_featured: boolean;
  is_active: boolean;
  display_order: number;
  primary_color: string | null;
  secondary_color: string | null;
  gradient_from: string | null;
  gradient_to: string | null;
  view_count: number;
  product_count: number;
  created_at: string;
  updated_at: string;
}

export interface CollectionImage {
  id: string;
  collection_id: string;
  image_url: string;
  image_type: ImageType;
  alt_text: string | null;
  title: string | null;
  width: number | null;
  height: number | null;
  file_size_bytes: number | null;
  file_format: string | null;
  cdn_url: string | null;
  storage_path: string | null;
  is_external: boolean;
  display_order: number;
  is_primary: boolean;
  is_active: boolean;
  thumbnail_url: string | null;
  medium_url: string | null;
  large_url: string | null;
  srcset: string | null;
  sizes: string | null;
  created_at: string;
  updated_at: string;
}

export interface CollectionWithImages extends Collection {
  images: CollectionImage[];
  primary_image?: CollectionImage;
}

export interface CollectionBanner {
  id: string;
  collection_id: string;
  banner_type: 'hero' | 'secondary' | 'promotional' | 'seasonal';
  title: string | null;
  subtitle: string | null;
  cta_text: string | null;
  cta_link: string | null;
  desktop_image_url: string;
  desktop_width: number | null;
  desktop_height: number | null;
  mobile_image_url: string | null;
  mobile_width: number | null;
  mobile_height: number | null;
  is_active: boolean;
  display_order: number;
  start_date: string | null;
  end_date: string | null;
  view_count: number;
  click_count: number;
  created_at: string;
  updated_at: string;
}
```

---

## Frontend Integration

### Fetch Collections with Images

```typescript
import { supabase } from '@/lib/supabase';
import type { CollectionWithImages } from '@/types/collection.types';

export async function getCollectionsWithImages(): Promise<CollectionWithImages[]> {
  const { data, error } = await supabase
    .from('collections')
    .select(`
      *,
      images:collection_images(*)
    `)
    .eq('is_active', true)
    .order('display_order');

  if (error) throw error;
  return data;
}
```

### Fetch Single Collection

```typescript
export async function getCollectionBySlug(slug: string): Promise<CollectionWithImages | null> {
  const { data, error } = await supabase
    .from('collections')
    .select(`
      *,
      images:collection_images(*),
      banners:collection_banners(*)
    `)
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (error) throw error;
  return data;
}
```

### Fetch Featured Collections

```typescript
export async function getFeaturedCollections(): Promise<CollectionWithImages[]> {
  const { data, error } = await supabase
    .from('collections')
    .select(`
      *,
      images:collection_images!inner(*)
    `)
    .eq('is_featured', true)
    .eq('is_active', true)
    .eq('images.is_primary', true)
    .order('display_order');

  if (error) throw error;
  return data;
}
```

---

## Image Upload Workflow

### 1. Upload to Storage

```typescript
async function uploadCollectionImage(file: File, collectionSlug: string) {
  // 1. Upload to Supabase Storage
  const fileName = `${collectionSlug}/${Date.now()}-${file.name}`;
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('collection-images')
    .upload(fileName, file);

  if (uploadError) throw uploadError;

  // 2. Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('collection-images')
    .getPublicUrl(fileName);

  // 3. Track upload
  const { data: upload } = await supabase
    .from('image_uploads')
    .insert({
      original_filename: file.name,
      file_size_bytes: file.size,
      mime_type: file.type,
      original_url: publicUrl,
      upload_source: 'admin',
      processing_status: 'pending'
    })
    .select()
    .single();

  // 4. Create collection image record
  const collection = await supabase
    .from('collections')
    .select('id')
    .eq('slug', collectionSlug)
    .single();

  await supabase
    .from('collection_images')
    .insert({
      collection_id: collection.data.id,
      image_url: publicUrl,
      image_type: 'grid',
      alt_text: `${collectionSlug} image`,
      file_format: file.type.split('/')[1],
      is_external: false
    });

  return publicUrl;
}
```

---

## Maintenance

### Update Product Counts

```sql
-- Run this periodically or via trigger
UPDATE collections c
SET product_count = (
  SELECT COUNT(*)
  FROM products p
  WHERE p.collection_id = c.id
    AND p.is_active = true
);
```

### Clean Up Unused Images

```sql
-- Find images not linked to any collection
SELECT * FROM collection_images
WHERE collection_id NOT IN (SELECT id FROM collections);

-- Delete them (be careful!)
DELETE FROM collection_images
WHERE collection_id NOT IN (SELECT id FROM collections);
```

### Optimize Large Images

```sql
-- Find images larger than 1MB
SELECT
  c.display_name,
  ci.image_url,
  ci.file_size_bytes / 1024 / 1024 as size_mb
FROM collection_images ci
JOIN collections c ON c.id = ci.collection_id
WHERE ci.file_size_bytes > 1048576
ORDER BY ci.file_size_bytes DESC;
```

---

## Best Practices

### Image Sizes
- **Grid Images:** 900x900px
- **Banners:** 1920x1080px (desktop), 750x1000px (mobile)
- **Thumbnails:** 400x400px
- **Cards:** 600x600px

### File Formats
- Use **WebP** for best compression and quality
- Fallback to **JPEG** for older browsers
- **PNG** for images requiring transparency
- **SVG** for icons and graphics

### Performance
- Always set `width` and `height` attributes
- Use `srcset` for responsive images
- Enable lazy loading: `loading="lazy"`
- Compress images before upload (target: <200KB)

### SEO
- Always include descriptive `alt_text`
- Use meaningful file names
- Set `meta_title` and `meta_description` for collections
- Use structured data for rich snippets

---

## Troubleshooting

### Images Not Showing

```sql
-- Check if image exists and is active
SELECT * FROM collection_images WHERE image_url = 'your-url-here';

-- Check collection is active
SELECT is_active FROM collections WHERE slug = 'style-everyday';
```

### Duplicate Primary Images

```sql
-- Find collections with multiple primary images
SELECT
  c.display_name,
  COUNT(*) as primary_count
FROM collections c
JOIN collection_images ci ON c.id = ci.collection_id
WHERE ci.is_primary = true
GROUP BY c.id, c.display_name
HAVING COUNT(*) > 1;
```

### Reset Primary Image

```sql
-- Unset all primary images for a collection
UPDATE collection_images
SET is_primary = false
WHERE collection_id = (SELECT id FROM collections WHERE slug = 'style-everyday');

-- Set new primary image
UPDATE collection_images
SET is_primary = true
WHERE id = 'your-image-uuid';
```

---

## Support

For questions or issues:
- Email: saj.query@gmail.com
- Check Supabase Dashboard → Database → Logs
- Run verification queries above

---

**Happy Coding! 🎨**
