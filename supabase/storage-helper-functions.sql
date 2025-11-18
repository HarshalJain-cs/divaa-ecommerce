-- =============================================
-- Storage Helper Functions
-- Divaa E-Commerce Platform
-- =============================================
-- Description: Utility functions for Supabase storage operations
-- Version: 1.0.0
-- =============================================

-- =============================================
-- FUNCTION: register_upload
-- Register a newly uploaded file in storage_metadata
-- =============================================

CREATE OR REPLACE FUNCTION register_upload(
  p_bucket_id VARCHAR,
  p_storage_path TEXT,
  p_file_name VARCHAR,
  p_original_name VARCHAR,
  p_file_size BIGINT,
  p_mime_type VARCHAR,
  p_width INTEGER DEFAULT NULL,
  p_height INTEGER DEFAULT NULL,
  p_image_type VARCHAR DEFAULT 'product',
  p_uploaded_by UUID DEFAULT NULL,
  p_alt_text TEXT DEFAULT NULL,
  p_title TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  v_file_format VARCHAR;
  v_public_url TEXT;
  v_metadata_id UUID;
  v_user_id UUID;
BEGIN
  -- Use provided user_id or get from auth context
  v_user_id := COALESCE(p_uploaded_by, auth.uid());

  -- Extract file format from mime type
  v_file_format := CASE
    WHEN p_mime_type LIKE '%webp%' THEN 'webp'
    WHEN p_mime_type LIKE '%jpeg%' OR p_mime_type LIKE '%jpg%' THEN 'jpg'
    WHEN p_mime_type LIKE '%png%' THEN 'png'
    WHEN p_mime_type LIKE '%gif%' THEN 'gif'
    ELSE 'unknown'
  END;

  -- Generate public URL (adjust based on your Supabase project)
  v_public_url := get_storage_public_url(p_bucket_id, p_storage_path);

  -- Insert metadata
  INSERT INTO storage_metadata (
    bucket_id,
    storage_path,
    file_name,
    original_name,
    file_size,
    mime_type,
    file_format,
    width,
    height,
    image_type,
    uploaded_by,
    public_url,
    alt_text,
    title,
    is_public,
    status
  )
  VALUES (
    p_bucket_id,
    p_storage_path,
    p_file_name,
    p_original_name,
    p_file_size,
    p_mime_type,
    v_file_format,
    p_width,
    p_height,
    p_image_type,
    v_user_id,
    v_public_url,
    p_alt_text,
    p_title,
    p_bucket_id IN ('collection-images', 'product-images'), -- Public if in these buckets
    'active'
  )
  RETURNING id INTO v_metadata_id;

  RETURN v_metadata_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION register_upload IS 'Register a newly uploaded file in storage_metadata table';

-- =============================================
-- FUNCTION: delete_file_cascade
-- Delete file from storage and all metadata/variants
-- =============================================

CREATE OR REPLACE FUNCTION delete_file_cascade(
  p_storage_metadata_id UUID
)
RETURNS BOOLEAN AS $$
DECLARE
  v_storage_path TEXT;
  v_bucket_id VARCHAR;
BEGIN
  -- Get file info
  SELECT storage_path, bucket_id
  INTO v_storage_path, v_bucket_id
  FROM storage_metadata
  WHERE id = p_storage_metadata_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'File not found: %', p_storage_metadata_id;
  END IF;

  -- Delete from storage.objects (actual file)
  DELETE FROM storage.objects
  WHERE bucket_id = v_bucket_id
    AND name = v_storage_path;

  -- Delete metadata (will CASCADE to variants via FK)
  DELETE FROM storage_metadata
  WHERE id = p_storage_metadata_id;

  RETURN TRUE;
EXCEPTION
  WHEN OTHERS THEN
    RAISE WARNING 'Error deleting file: %', SQLERRM;
    RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION delete_file_cascade IS 'Delete file from storage and all related metadata';

-- =============================================
-- FUNCTION: create_image_variant
-- Create and register a new image variant (thumbnail, etc.)
-- =============================================

CREATE OR REPLACE FUNCTION create_image_variant(
  p_parent_metadata_id UUID,
  p_variant_name VARCHAR, -- 'thumbnail', 'medium', 'large'
  p_variant_storage_path TEXT,
  p_width INTEGER,
  p_height INTEGER,
  p_file_size BIGINT
)
RETURNS UUID AS $$
DECLARE
  v_variant_id UUID;
  v_parent_bucket VARCHAR;
  v_public_url TEXT;
BEGIN
  -- Get parent bucket
  SELECT bucket_id INTO v_parent_bucket
  FROM storage_metadata
  WHERE id = p_parent_metadata_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Parent file not found: %', p_parent_metadata_id;
  END IF;

  -- Generate public URL for variant
  v_public_url := get_storage_public_url(v_parent_bucket, p_variant_storage_path);

  -- Insert variant record
  INSERT INTO image_variants (
    storage_metadata_id,
    variant_name,
    storage_path,
    image_url,
    width,
    height,
    file_size_bytes
  )
  VALUES (
    p_parent_metadata_id,
    p_variant_name,
    p_variant_storage_path,
    v_public_url,
    p_width,
    p_height,
    p_file_size
  )
  RETURNING id INTO v_variant_id;

  -- Mark parent as having variants
  UPDATE storage_metadata
  SET has_variants = TRUE,
      updated_at = NOW()
  WHERE id = p_parent_metadata_id;

  RETURN v_variant_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION create_image_variant IS 'Create and register a new image variant';

-- =============================================
-- FUNCTION: search_images
-- Search images with filters
-- =============================================

CREATE OR REPLACE FUNCTION search_images(
  p_search_term TEXT DEFAULT NULL,
  p_image_type VARCHAR DEFAULT NULL,
  p_bucket_id VARCHAR DEFAULT NULL,
  p_tags TEXT[] DEFAULT NULL,
  p_limit INTEGER DEFAULT 50,
  p_offset INTEGER DEFAULT 0
)
RETURNS TABLE (
  id UUID,
  file_name VARCHAR,
  storage_path TEXT,
  public_url TEXT,
  file_size BIGINT,
  width INTEGER,
  height INTEGER,
  image_type VARCHAR,
  tags TEXT[],
  uploaded_at TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    sm.id,
    sm.file_name,
    sm.storage_path,
    sm.public_url,
    sm.file_size,
    sm.width,
    sm.height,
    sm.image_type,
    sm.tags,
    sm.uploaded_at
  FROM storage_metadata sm
  WHERE sm.status = 'active'
    AND (p_search_term IS NULL OR
         sm.file_name ILIKE '%' || p_search_term || '%' OR
         sm.alt_text ILIKE '%' || p_search_term || '%' OR
         sm.title ILIKE '%' || p_search_term || '%')
    AND (p_image_type IS NULL OR sm.image_type = p_image_type)
    AND (p_bucket_id IS NULL OR sm.bucket_id = p_bucket_id)
    AND (p_tags IS NULL OR sm.tags && p_tags) -- Array overlap operator
  ORDER BY sm.uploaded_at DESC
  LIMIT p_limit
  OFFSET p_offset;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION search_images IS 'Search images with various filters';

-- =============================================
-- FUNCTION: get_storage_stats
-- Get storage statistics
-- =============================================

CREATE OR REPLACE FUNCTION get_storage_stats(
  p_user_id UUID DEFAULT NULL
)
RETURNS TABLE (
  bucket_id VARCHAR,
  total_files BIGINT,
  total_size_bytes BIGINT,
  total_size_formatted TEXT,
  avg_file_size_bytes BIGINT,
  largest_file_bytes BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    sm.bucket_id,
    COUNT(*)::BIGINT as total_files,
    SUM(sm.file_size)::BIGINT as total_size_bytes,
    pg_size_pretty(SUM(sm.file_size)) as total_size_formatted,
    AVG(sm.file_size)::BIGINT as avg_file_size_bytes,
    MAX(sm.file_size)::BIGINT as largest_file_bytes
  FROM storage_metadata sm
  WHERE sm.status = 'active'
    AND (p_user_id IS NULL OR sm.uploaded_by = p_user_id)
  GROUP BY sm.bucket_id
  ORDER BY total_size_bytes DESC;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION get_storage_stats IS 'Get storage statistics by bucket';

-- =============================================
-- FUNCTION: check_quota
-- Check if user has exceeded storage quota
-- =============================================

CREATE OR REPLACE FUNCTION check_quota(
  p_user_id UUID,
  p_bucket_id VARCHAR,
  p_additional_bytes BIGINT DEFAULT 0
)
RETURNS BOOLEAN AS $$
DECLARE
  v_current_bytes BIGINT;
  v_max_bytes BIGINT;
BEGIN
  -- Get or create quota record
  INSERT INTO storage_quotas (user_id, bucket_id)
  VALUES (p_user_id, p_bucket_id)
  ON CONFLICT (user_id, bucket_id) DO NOTHING;

  -- Get current usage and limits
  SELECT current_storage_bytes, max_storage_bytes
  INTO v_current_bytes, v_max_bytes
  FROM storage_quotas
  WHERE user_id = p_user_id
    AND bucket_id = p_bucket_id;

  -- Check if adding new file would exceed quota
  RETURN (v_current_bytes + p_additional_bytes) <= v_max_bytes;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION check_quota IS 'Check if user has available storage quota';

-- =============================================
-- FUNCTION: archive_old_files
-- Archive files older than specified days
-- =============================================

CREATE OR REPLACE FUNCTION archive_old_files(
  p_days_old INTEGER DEFAULT 365,
  p_bucket_id VARCHAR DEFAULT NULL
)
RETURNS INTEGER AS $$
DECLARE
  v_archived_count INTEGER;
BEGIN
  -- Update status to archived
  UPDATE storage_metadata
  SET
    status = 'archived',
    archived_at = NOW(),
    updated_at = NOW()
  WHERE uploaded_at < NOW() - INTERVAL '1 day' * p_days_old
    AND status = 'active'
    AND (p_bucket_id IS NULL OR bucket_id = p_bucket_id);

  GET DIAGNOSTICS v_archived_count = ROW_COUNT;

  RETURN v_archived_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION archive_old_files IS 'Archive files older than specified days';

-- =============================================
-- FUNCTION: cleanup_deleted_files
-- Remove metadata for files deleted from storage
-- =============================================

CREATE OR REPLACE FUNCTION cleanup_deleted_files()
RETURNS INTEGER AS $$
DECLARE
  v_deleted_count INTEGER;
  v_metadata_record RECORD;
BEGIN
  v_deleted_count := 0;

  -- Find metadata records where file no longer exists in storage
  FOR v_metadata_record IN
    SELECT sm.id, sm.bucket_id, sm.storage_path
    FROM storage_metadata sm
    WHERE sm.status = 'active'
      AND NOT EXISTS (
        SELECT 1
        FROM storage.objects so
        WHERE so.bucket_id = sm.bucket_id
          AND so.name = sm.storage_path
      )
  LOOP
    -- Delete metadata for missing files
    DELETE FROM storage_metadata
    WHERE id = v_metadata_record.id;

    v_deleted_count := v_deleted_count + 1;
  END LOOP;

  RETURN v_deleted_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION cleanup_deleted_files IS 'Remove metadata for files no longer in storage';

-- =============================================
-- FUNCTION: migrate_external_url_to_storage
-- Helper function to track migration of external URLs
-- =============================================

CREATE OR REPLACE FUNCTION migrate_external_url_to_storage(
  p_external_url TEXT,
  p_new_storage_metadata_id UUID,
  p_table_name TEXT,
  p_record_id UUID
)
RETURNS BOOLEAN AS $$
BEGIN
  -- This is a placeholder function to track migrations
  -- Actual implementation would update the specific table
  -- For now, just log the migration

  -- Example: UPDATE collection_images SET storage_metadata_id = p_new_storage_metadata_id WHERE id = p_record_id;

  RAISE NOTICE 'Migration tracked: % -> storage_metadata.id = %', p_external_url, p_new_storage_metadata_id;

  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION migrate_external_url_to_storage IS 'Track migration of external URLs to Supabase storage';

-- =============================================
-- FUNCTION: get_image_variants
-- Get all variants of an image
-- =============================================

CREATE OR REPLACE FUNCTION get_image_variants(
  p_storage_metadata_id UUID
)
RETURNS TABLE (
  variant_id UUID,
  variant_name VARCHAR,
  image_url TEXT,
  width INTEGER,
  height INTEGER,
  file_size BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    iv.id as variant_id,
    iv.variant_name,
    iv.image_url,
    iv.width,
    iv.height,
    iv.file_size_bytes as file_size
  FROM image_variants iv
  WHERE iv.storage_metadata_id = p_storage_metadata_id
  ORDER BY iv.width ASC;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION get_image_variants IS 'Get all size variants of an image';

-- =============================================
-- FUNCTION: batch_tag_images
-- Add tags to multiple images
-- =============================================

CREATE OR REPLACE FUNCTION batch_tag_images(
  p_image_ids UUID[],
  p_tags TEXT[]
)
RETURNS INTEGER AS $$
DECLARE
  v_updated_count INTEGER;
BEGIN
  -- Add tags to existing tags array (union of arrays)
  UPDATE storage_metadata
  SET
    tags = ARRAY(SELECT DISTINCT unnest(tags || p_tags)),
    updated_at = NOW()
  WHERE id = ANY(p_image_ids)
    AND status = 'active';

  GET DIAGNOSTICS v_updated_count = ROW_COUNT;

  RETURN v_updated_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION batch_tag_images IS 'Add tags to multiple images at once';

-- =============================================
-- USAGE EXAMPLES
-- =============================================

/*
-- 1. Register a new upload
SELECT register_upload(
  'collection-images',                      -- bucket_id
  'collection-images/originals/test.webp',  -- storage_path
  'test.webp',                              -- file_name
  'original-test-image.webp',               -- original_name
  1048576,                                  -- file_size (1MB)
  'image/webp',                             -- mime_type
  1920,                                     -- width
  1080,                                     -- height
  'collection',                             -- image_type
  auth.uid(),                               -- uploaded_by
  'Test collection image',                  -- alt_text
  'Test Image'                              -- title
);

-- 2. Create image variant (thumbnail)
SELECT create_image_variant(
  'parent-image-uuid',                           -- parent_metadata_id
  'thumbnail',                                   -- variant_name
  'collection-images/thumbnails/test_thumb.webp', -- variant_storage_path
  300,                                          -- width
  200,                                          -- height
  102400                                        -- file_size (100KB)
);

-- 3. Search images
SELECT * FROM search_images(
  'collection',                                 -- search_term
  'collection',                                 -- image_type
  'collection-images',                          -- bucket_id
  ARRAY['featured', 'hero']::TEXT[],           -- tags
  20,                                           -- limit
  0                                             -- offset
);

-- 4. Check user quota before upload
SELECT check_quota(
  auth.uid(),                                   -- user_id
  'product-images',                             -- bucket_id
  2097152                                       -- additional_bytes (2MB)
);

-- 5. Get storage statistics
SELECT * FROM get_storage_stats(auth.uid());

-- 6. Get all variants of an image
SELECT * FROM get_image_variants('parent-image-uuid');

-- 7. Archive old files (older than 1 year)
SELECT archive_old_files(365, 'temp-uploads');

-- 8. Cleanup deleted files
SELECT cleanup_deleted_files();

-- 9. Batch tag images
SELECT batch_tag_images(
  ARRAY['image-uuid-1', 'image-uuid-2']::UUID[],
  ARRAY['featured', 'bestseller', 'new']::TEXT[]
);

-- 10. Delete file with all variants
SELECT delete_file_cascade('storage-metadata-uuid');
*/
