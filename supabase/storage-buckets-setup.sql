-- =============================================
-- Supabase Storage Buckets Setup
-- Divaa E-Commerce Platform
-- =============================================
-- Description: Create and configure storage buckets for images
-- Version: 1.0.0
-- =============================================

-- =============================================
-- CREATE STORAGE BUCKETS
-- =============================================

-- Collection Images Bucket (public access)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'collection-images',
  'collection-images',
  true,
  10485760, -- 10MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Product Images Bucket (public access)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'product-images',
  'product-images',
  true,
  10485760, -- 10MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- User Uploads Bucket (authenticated access)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'user-uploads',
  'user-uploads',
  false,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Temporary Uploads Bucket (authenticated access, auto-delete)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'temp-uploads',
  'temp-uploads',
  false,
  10485760, -- 10MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- =============================================
-- STORAGE RLS POLICIES
-- =============================================

-- ============================================
-- COLLECTION-IMAGES BUCKET POLICIES
-- ============================================

-- Public: Anyone can view collection images
CREATE POLICY "Public Access - Collection Images"
ON storage.objects FOR SELECT
USING (bucket_id = 'collection-images');

-- Authenticated: Users can upload collection images
CREATE POLICY "Authenticated Upload - Collection Images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'collection-images');

-- Admin: Full access to collection images
CREATE POLICY "Admin Full Access - Collection Images"
ON storage.objects FOR ALL
TO authenticated
USING (
  bucket_id = 'collection-images' AND
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- ============================================
-- PRODUCT-IMAGES BUCKET POLICIES
-- ============================================

-- Public: Anyone can view product images
CREATE POLICY "Public Access - Product Images"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

-- Authenticated: Users can upload product images
CREATE POLICY "Authenticated Upload - Product Images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'product-images');

-- Admin: Full access to product images
CREATE POLICY "Admin Full Access - Product Images"
ON storage.objects FOR ALL
TO authenticated
USING (
  bucket_id = 'product-images' AND
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- ============================================
-- USER-UPLOADS BUCKET POLICIES
-- ============================================

-- Users can view their own uploads
CREATE POLICY "Users View Own Uploads"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'user-uploads' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Users can upload to their own folder
CREATE POLICY "Users Upload Own Files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'user-uploads' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Users can update their own uploads
CREATE POLICY "Users Update Own Uploads"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'user-uploads' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Users can delete their own uploads
CREATE POLICY "Users Delete Own Uploads"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'user-uploads' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Admin: Full access to all user uploads
CREATE POLICY "Admin Full Access - User Uploads"
ON storage.objects FOR ALL
TO authenticated
USING (
  bucket_id = 'user-uploads' AND
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- ============================================
-- TEMP-UPLOADS BUCKET POLICIES
-- ============================================

-- Users can manage their own temp uploads
CREATE POLICY "Users Manage Temp Uploads"
ON storage.objects FOR ALL
TO authenticated
USING (
  bucket_id = 'temp-uploads' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Admin: Full access to temp uploads
CREATE POLICY "Admin Full Access - Temp Uploads"
ON storage.objects FOR ALL
TO authenticated
USING (
  bucket_id = 'temp-uploads' AND
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- =============================================
-- CLEANUP FUNCTION FOR TEMP UPLOADS
-- =============================================

-- Function to delete old temp uploads (older than 24 hours)
CREATE OR REPLACE FUNCTION cleanup_temp_uploads()
RETURNS void AS $$
DECLARE
  old_files RECORD;
BEGIN
  -- Find files older than 24 hours in temp-uploads bucket
  FOR old_files IN
    SELECT name
    FROM storage.objects
    WHERE bucket_id = 'temp-uploads'
    AND created_at < NOW() - INTERVAL '24 hours'
  LOOP
    -- Delete the file
    DELETE FROM storage.objects
    WHERE bucket_id = 'temp-uploads'
    AND name = old_files.name;
  END LOOP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================
-- SCHEDULED CLEANUP (Optional - requires pg_cron extension)
-- =============================================

/*
-- Enable pg_cron extension (run as superuser)
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Schedule daily cleanup at 2 AM
SELECT cron.schedule(
  'cleanup-temp-uploads',
  '0 2 * * *',
  'SELECT cleanup_temp_uploads();'
);
*/

-- =============================================
-- HELPER FUNCTION: Get Public URL
-- =============================================

CREATE OR REPLACE FUNCTION get_storage_public_url(
  bucket_name TEXT,
  file_path TEXT
)
RETURNS TEXT AS $$
DECLARE
  base_url TEXT;
  project_url TEXT;
BEGIN
  -- Get project URL from environment or use placeholder
  -- In production, you would get this from your Supabase project settings
  project_url := current_setting('app.supabase_url', true);

  IF project_url IS NULL THEN
    project_url := 'YOUR_SUPABASE_URL';
  END IF;

  -- Construct public URL
  base_url := project_url || '/storage/v1/object/public/';

  RETURN base_url || bucket_name || '/' || file_path;
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- VERIFICATION QUERIES
-- =============================================

-- List all storage buckets
SELECT
  id,
  name,
  public,
  file_size_limit / 1048576 as size_limit_mb,
  allowed_mime_types,
  created_at
FROM storage.buckets
WHERE id IN ('collection-images', 'product-images', 'user-uploads', 'temp-uploads')
ORDER BY created_at;

-- Count files in each bucket
SELECT
  bucket_id,
  COUNT(*) as file_count,
  pg_size_pretty(SUM((metadata->>'size')::bigint)) as total_size
FROM storage.objects
WHERE bucket_id IN ('collection-images', 'product-images', 'user-uploads', 'temp-uploads')
GROUP BY bucket_id;

-- =============================================
-- NOTES FOR IMPLEMENTATION
-- =============================================

/*
Storage Bucket Structure:

collection-images/
├── originals/
│   ├── everyday-wear-001.webp
│   ├── traditional-002.webp
│   └── party-003.webp
├── thumbnails/
│   ├── everyday-wear-001_thumb.webp
│   └── traditional-002_thumb.webp
└── large/
    ├── everyday-wear-001_large.webp
    └── traditional-002_large.webp

product-images/
├── originals/
│   ├── product-uuid-001.webp
│   └── product-uuid-002.webp
├── thumbnails/
│   └── product-uuid-001_thumb.webp
└── gallery/
    └── product-uuid-001_gallery.webp

user-uploads/
├── user-uuid/
│   └── profile-picture.webp
└── another-user-uuid/
    └── profile-picture.webp

temp-uploads/
├── user-uuid/
│   ├── temp-file-1.webp
│   └── temp-file-2.webp
└── (auto-deleted after 24 hours)

Upload Examples:

1. Upload Collection Image:
   Path: collection-images/originals/everyday-wear-001.webp
   Public URL: https://your-project.supabase.co/storage/v1/object/public/collection-images/originals/everyday-wear-001.webp

2. Upload Product Image:
   Path: product-images/originals/product-uuid-001.webp
   Public URL: https://your-project.supabase.co/storage/v1/object/public/product-images/originals/product-uuid-001.webp

3. Upload User Profile:
   Path: user-uploads/user-uuid/profile-picture.webp
   Signed URL required (not public)

File Size Limits:
- Collection Images: 10MB
- Product Images: 10MB
- User Uploads: 5MB
- Temp Uploads: 10MB

Allowed File Types:
- JPEG (.jpg, .jpeg)
- PNG (.png)
- WebP (.webp)
- GIF (.gif) - for collection and product images only

Security:
- Public buckets: Anyone can read
- Authenticated uploads: Only logged-in users
- User uploads: Users can only access their own files
- Admin access: Full control over all buckets
*/
