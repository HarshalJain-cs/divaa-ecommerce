# Supabase Storage System Documentation
## Divaa E-Commerce Platform

Complete guide to using the Supabase storage system for managing images and media files.

---

## Table of Contents
1. [Overview](#overview)
2. [Setup Instructions](#setup-instructions)
3. [Storage Buckets](#storage-buckets)
4. [Database Schema](#database-schema)
5. [Upload Images](#upload-images)
6. [React/TypeScript Integration](#reacttypescript-integration)
7. [Helper Functions](#helper-functions)
8. [Migration Guide](#migration-guide)
9. [Security & Access Control](#security--access-control)
10. [Best Practices](#best-practices)

---

## Overview

The storage system provides a comprehensive solution for managing all images in the Divaa e-commerce platform. It supports:

- ✅ **Multiple Storage Buckets** - Organized by content type
- ✅ **Automatic Metadata Tracking** - File size, dimensions, format
- ✅ **Image Variants** - Thumbnails, medium, large sizes
- ✅ **Quota Management** - Track and limit storage per user
- ✅ **Secure Access Control** - RLS policies for all operations
- ✅ **External CDN Support** - Maintain backward compatibility
- ✅ **Batch Operations** - Upload multiple files efficiently

---

## Setup Instructions

### 1. Run Database Migrations

Execute the SQL files in order:

```bash
# In Supabase SQL Editor, run these in order:

# Step 1: Create storage buckets and policies
supabase/storage-buckets-setup.sql

# Step 2: Create database tables and indexes
supabase/storage-images-schema.sql

# Step 3: Add helper functions
supabase/storage-helper-functions.sql

# Step 4: Update collection images schema (optional)
supabase/collection-images-schema.sql
```

### 2. Verify Setup

```sql
-- Check buckets are created
SELECT * FROM storage.buckets
WHERE id IN ('collection-images', 'product-images', 'user-uploads', 'temp-uploads');

-- Check tables exist
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN ('storage_metadata', 'upload_sessions', 'storage_quotas');
```

---

## Storage Buckets

### 1. **collection-images** (Public, 10MB limit)
For collection/category display images.

```
Structure:
collection-images/
├── originals/       # Full-size originals
├── thumbnails/      # Small previews (300x200)
├── medium/          # Medium size (800x600)
└── large/           # Large size (1920x1080)
```

**Allowed:** WebP, JPEG, PNG, GIF
**Access:** Public read, Authenticated write, Admin full

### 2. **product-images** (Public, 10MB limit)
For product photos and galleries.

```
Structure:
product-images/
├── originals/       # Full-size product images
├── thumbnails/      # Grid/list view thumbnails
└── gallery/         # Gallery/slider images
```

**Allowed:** WebP, JPEG, PNG, GIF
**Access:** Public read, Authenticated write, Admin full

### 3. **user-uploads** (Private, 5MB limit)
For user-generated content (profile pictures, reviews).

```
Structure:
user-uploads/
└── {user-id}/       # Each user has their own folder
    ├── profile-picture.webp
    └── review-image-1.webp
```

**Allowed:** WebP, JPEG, PNG
**Access:** User can only access their own files, Admin full

### 4. **temp-uploads** (Private, 10MB limit)
For temporary uploads (auto-deleted after 24 hours).

```
Structure:
temp-uploads/
└── {user-id}/       # Temporary uploads per user
    └── temp-file-1.webp
```

**Allowed:** WebP, JPEG, PNG, GIF
**Access:** User own files only, Auto-cleanup enabled

---

## Database Schema

### storage_metadata Table
Central registry for all uploaded files.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| bucket_id | VARCHAR | Bucket name |
| storage_path | TEXT | Full path: bucket/folder/file.ext |
| file_name | VARCHAR | File name |
| file_size | BIGINT | Size in bytes |
| mime_type | VARCHAR | MIME type |
| width/height | INTEGER | Image dimensions |
| image_type | VARCHAR | collection, product, user, etc. |
| uploaded_by | UUID | User who uploaded |
| public_url | TEXT | Direct access URL |
| tags | TEXT[] | Searchable tags |
| status | VARCHAR | active, processing, archived, deleted |

### storage_quotas Table
Track storage limits per user/bucket.

| Column | Type | Description |
|--------|------|-------------|
| user_id | UUID | User reference |
| bucket_id | VARCHAR | Bucket name |
| max_storage_bytes | BIGINT | Storage limit (default 1GB) |
| current_storage_bytes | BIGINT | Current usage |
| is_exceeded | BOOLEAN | Quota exceeded flag |

---

## Upload Images

### Method 1: Direct Upload (Client-side)

```typescript
import { supabase } from '@/lib/supabase';

async function uploadCollectionImage(file: File) {
  // 1. Generate unique filename
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
  const filePath = `collection-images/originals/${fileName}`;

  // 2. Upload to Supabase Storage
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('collection-images')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (uploadError) {
    throw uploadError;
  }

  // 3. Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('collection-images')
    .getPublicUrl(filePath);

  // 4. Register in database
  const { data: metadata, error: metadataError } = await supabase
    .rpc('register_upload', {
      p_bucket_id: 'collection-images',
      p_storage_path: filePath,
      p_file_name: fileName,
      p_original_name: file.name,
      p_file_size: file.size,
      p_mime_type: file.type,
      p_image_type: 'collection',
      p_alt_text: 'Collection image',
      p_title: file.name
    });

  if (metadataError) {
    throw metadataError;
  }

  return {
    path: filePath,
    publicUrl,
    metadataId: metadata
  };
}
```

### Method 2: Using React Hook

Create a custom hook for uploads:

```typescript
// src/hooks/useImageUpload.ts
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export function useImageUpload(bucket: string = 'product-images') {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const uploadImage = async (
    file: File,
    folder: string = 'originals',
    metadata?: {
      imageType?: string;
      altText?: string;
      title?: string;
    }
  ) => {
    setUploading(true);
    setProgress(0);

    try {
      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${bucket}/${folder}/${fileName}`;

      // Upload file
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      setProgress(50);

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      // Register in database
      const { data: metadataId, error: metadataError } = await supabase
        .rpc('register_upload', {
          p_bucket_id: bucket,
          p_storage_path: filePath,
          p_file_name: fileName,
          p_original_name: file.name,
          p_file_size: file.size,
          p_mime_type: file.type,
          p_image_type: metadata?.imageType || 'product',
          p_alt_text: metadata?.altText,
          p_title: metadata?.title || file.name
        });

      if (metadataError) throw metadataError;

      setProgress(100);

      return {
        success: true,
        metadataId,
        publicUrl,
        path: filePath
      };
    } catch (error) {
      console.error('Upload error:', error);
      return {
        success: false,
        error
      };
    } finally {
      setUploading(false);
    }
  };

  return {
    uploadImage,
    uploading,
    progress
  };
}
```

### Usage Example

```tsx
import { useImageUpload } from '@/hooks/useImageUpload';

function ImageUploadComponent() {
  const { uploadImage, uploading, progress } = useImageUpload('collection-images');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const result = await uploadImage(file, 'originals', {
      imageType: 'collection',
      altText: 'New collection image',
      title: file.name
    });

    if (result.success) {
      console.log('Uploaded:', result.publicUrl);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} disabled={uploading} />
      {uploading && <p>Uploading: {progress}%</p>}
    </div>
  );
}
```

---

## Helper Functions

### 1. Search Images

```typescript
const { data: images } = await supabase.rpc('search_images', {
  p_search_term: 'collection',
  p_image_type: 'collection',
  p_bucket_id: 'collection-images',
  p_tags: ['featured', 'hero'],
  p_limit: 20,
  p_offset: 0
});
```

### 2. Check Quota Before Upload

```typescript
const { data: hasQuota } = await supabase.rpc('check_quota', {
  p_user_id: userId,
  p_bucket_id: 'product-images',
  p_additional_bytes: file.size
});

if (!hasQuota) {
  alert('Storage quota exceeded!');
}
```

### 3. Get Storage Statistics

```typescript
const { data: stats } = await supabase.rpc('get_storage_stats', {
  p_user_id: userId
});

console.log('Storage usage:', stats);
// [{ bucket_id: 'product-images', total_files: 150, total_size: '45 MB', ... }]
```

### 4. Create Image Variant (Thumbnail)

```typescript
const { data: variantId } = await supabase.rpc('create_image_variant', {
  p_parent_metadata_id: originalImageId,
  p_variant_name: 'thumbnail',
  p_variant_storage_path: 'collection-images/thumbnails/image_thumb.webp',
  p_width: 300,
  p_height: 200,
  p_file_size: 102400 // 100KB
});
```

### 5. Delete Image with Variants

```typescript
const { data: deleted } = await supabase.rpc('delete_file_cascade', {
  p_storage_metadata_id: imageId
});

// Deletes: original file, all variants, metadata, and storage.objects record
```

---

## Migration Guide

### Migrating from External CDN to Supabase Storage

#### Option 1: Gradual Migration (Recommended)

Keep external URLs working while gradually migrating:

```typescript
// src/utils/imageUrl.ts
export function getImageUrl(imageData: {
  storageMetadataId?: string;
  externalUrl?: string;
  storagePath?: string;
}) {
  // Priority: Supabase storage > External URL
  if (imageData.storageMetadataId && imageData.storagePath) {
    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${imageData.storagePath}`;
  }

  if (imageData.externalUrl) {
    return imageData.externalUrl;
  }

  // Fallback to placeholder
  return '/images/placeholder.webp';
}
```

#### Option 2: Batch Migration Script

```typescript
// scripts/migrateExternalImages.ts
async function migrateCollectionImages() {
  // 1. Get all collection images with external URLs
  const { data: images } = await supabase
    .from('collection_images')
    .select('*')
    .eq('is_external', true);

  for (const image of images) {
    try {
      // 2. Download image from external URL
      const response = await fetch(image.image_url);
      const blob = await response.blob();
      const file = new File([blob], `migrated-${image.id}.webp`);

      // 3. Upload to Supabase
      const result = await uploadImage(file, 'originals', {
        imageType: 'collection',
        altText: image.alt_text,
        title: image.title
      });

      // 4. Update database
      await supabase
        .from('collection_images')
        .update({
          storage_metadata_id: result.metadataId,
          storage_path: result.path,
          is_external: false
        })
        .eq('id', image.id);

      console.log(`Migrated: ${image.id}`);
    } catch (error) {
      console.error(`Failed to migrate ${image.id}:`, error);
    }
  }
}
```

---

## Security & Access Control

### Row Level Security (RLS) Policies

All tables have RLS enabled with the following policies:

#### Public Images
- Anyone can **view** images in public buckets
- Authenticated users can **upload**
- Users can **manage** their own uploads
- Admins have **full access**

#### Private Images
- Users can only access **their own files**
- Files are organized by user ID
- Admins can access **all files**

### File Size Limits

| Bucket | Limit | Purpose |
|--------|-------|---------|
| collection-images | 10MB | High-quality collection photos |
| product-images | 10MB | Product photography |
| user-uploads | 5MB | Profile pictures, reviews |
| temp-uploads | 10MB | Temporary processing |

### Allowed File Types

- **Image formats:** WebP, JPEG, PNG, GIF
- **MIME types validated** on upload
- **File extension checked** for security

---

## Best Practices

### 1. File Naming Convention

```typescript
// Good: timestamp-random.ext
const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.webp`;

// Bad: using original filename (can cause conflicts)
const fileName = file.name; // ❌
```

### 2. Always Use WebP Format

```typescript
// Convert images to WebP for better compression
import imageCompression from 'browser-image-compression';

const compressedFile = await imageCompression(file, {
  maxSizeMB: 1,
  maxWidthOrHeight: 1920,
  useWebWorker: true,
  fileType: 'image/webp'
});
```

### 3. Generate Variants for Responsive Images

```typescript
const variants = ['thumbnail', 'medium', 'large'];
const sizes = [
  { width: 300, height: 200 },
  { width: 800, height: 600 },
  { width: 1920, height: 1080 }
];

// Upload original first
const original = await uploadImage(file, 'originals');

// Then create variants
for (let i = 0; i < variants.length; i++) {
  const variant = await createVariant(original.metadataId, variants[i], sizes[i]);
}
```

### 4. Clean Up Temporary Files

```typescript
// Delete temp files after processing
await supabase.rpc('delete_file_cascade', {
  p_storage_metadata_id: tempFileId
});
```

### 5. Use Tags for Organization

```typescript
await supabase.rpc('batch_tag_images', {
  p_image_ids: [imageId1, imageId2, imageId3],
  p_tags: ['featured', 'bestseller', 'new-arrival']
});
```

### 6. Monitor Storage Quotas

```typescript
// Check quota before upload
const { data: hasSpace } = await supabase.rpc('check_quota', {
  p_user_id: userId,
  p_bucket_id: bucket,
  p_additional_bytes: file.size
});

if (!hasSpace) {
  // Show upgrade prompt or delete old files
}
```

---

## Troubleshooting

### Common Issues

**Issue:** Upload fails with "Permission denied"
- **Solution:** Check RLS policies are properly configured
- **Solution:** Verify user is authenticated
- **Solution:** Check bucket permissions in Supabase dashboard

**Issue:** Public URL returns 404
- **Solution:** Ensure bucket is set to public
- **Solution:** Verify file path is correct
- **Solution:** Check file was actually uploaded to storage

**Issue:** Quota exceeded
- **Solution:** Check `storage_quotas` table
- **Solution:** Delete old/unused files
- **Solution:** Archive old images

**Issue:** Metadata not created
- **Solution:** Check `register_upload` function executed successfully
- **Solution:** Verify database triggers are enabled
- **Solution:** Check for unique constraint violations

---

## API Reference

### Storage Functions

| Function | Purpose | Parameters |
|----------|---------|------------|
| `register_upload()` | Register new file | bucket_id, storage_path, file_name, etc. |
| `delete_file_cascade()` | Delete file + metadata | storage_metadata_id |
| `create_image_variant()` | Create thumbnail/variant | parent_id, variant_name, path, dimensions |
| `search_images()` | Search with filters | search_term, image_type, bucket, tags |
| `check_quota()` | Check storage quota | user_id, bucket_id, additional_bytes |
| `get_storage_stats()` | Get usage statistics | user_id (optional) |
| `archive_old_files()` | Archive old files | days_old, bucket_id |
| `cleanup_deleted_files()` | Remove orphaned metadata | none |
| `batch_tag_images()` | Add tags to images | image_ids, tags |

---

## Support

For issues or questions:
- Check Supabase Dashboard → Storage
- Review RLS policies in Authentication → Policies
- Check browser console for errors
- Verify SQL functions executed successfully

---

## License

© 2025 Divaa E-Commerce Platform. All rights reserved.
