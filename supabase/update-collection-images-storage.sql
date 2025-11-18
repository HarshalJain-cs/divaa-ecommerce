-- =============================================
-- Update Collection Images for Storage Support
-- Divaa E-Commerce Platform
-- =============================================
-- Description: Add Supabase storage integration to collection_images
-- Version: 1.0.0
-- =============================================

-- =============================================
-- ADD STORAGE COLUMNS TO collection_images
-- =============================================

-- Add reference to storage_metadata table
ALTER TABLE collection_images
ADD COLUMN IF NOT EXISTS storage_metadata_id UUID REFERENCES storage_metadata(id) ON DELETE SET NULL;

-- Add bucket reference for direct storage queries
ALTER TABLE collection_images
ADD COLUMN IF NOT EXISTS storage_bucket VARCHAR(255);

-- Add flag to indicate if using new storage system
ALTER TABLE collection_images
ADD COLUMN IF NOT EXISTS uses_storage BOOLEAN DEFAULT false;

-- Add comments
COMMENT ON COLUMN collection_images.storage_metadata_id IS 'Reference to storage_metadata for Supabase-hosted images';
COMMENT ON COLUMN collection_images.storage_bucket IS 'Supabase storage bucket name (e.g., collection-images)';
COMMENT ON COLUMN collection_images.uses_storage IS 'True if image is stored in Supabase storage, false if external CDN';

-- =============================================
-- ADD INDEX FOR PERFORMANCE
-- =============================================

CREATE INDEX IF NOT EXISTS idx_collection_images_storage_metadata
ON collection_images(storage_metadata_id);

CREATE INDEX IF NOT EXISTS idx_collection_images_uses_storage
ON collection_images(uses_storage);

-- =============================================
-- HELPER VIEW: Unified Image URLs
-- =============================================

-- View that returns the correct image URL regardless of source (storage or external)
CREATE OR REPLACE VIEW collection_images_unified AS
SELECT
  ci.id,
  ci.collection_id,
  ci.image_type,
  ci.alt_text,
  ci.title,
  ci.width,
  ci.height,
  ci.display_order,
  ci.is_primary,
  ci.is_active,
  -- Return storage URL if available, otherwise external URL
  COALESCE(
    sm.public_url,
    ci.image_url
  ) as effective_image_url,
  ci.image_url as external_url,
  sm.public_url as storage_url,
  ci.storage_metadata_id,
  ci.storage_bucket,
  ci.uses_storage,
  ci.is_external,
  ci.created_at,
  ci.updated_at
FROM collection_images ci
LEFT JOIN storage_metadata sm ON ci.storage_metadata_id = sm.id
WHERE ci.is_active = true;

COMMENT ON VIEW collection_images_unified IS 'Unified view showing effective image URLs from either storage or external CDN';

-- =============================================
-- FUNCTION: Migrate Image to Storage
-- =============================================

-- Function to migrate a collection image from external CDN to Supabase storage
CREATE OR REPLACE FUNCTION migrate_collection_image_to_storage(
  p_collection_image_id UUID,
  p_storage_metadata_id UUID
)
RETURNS BOOLEAN AS $$
DECLARE
  v_storage_path TEXT;
  v_public_url TEXT;
  v_bucket VARCHAR;
BEGIN
  -- Get storage details
  SELECT storage_path, public_url, bucket_id
  INTO v_storage_path, v_public_url, v_bucket
  FROM storage_metadata
  WHERE id = p_storage_metadata_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Storage metadata not found: %', p_storage_metadata_id;
  END IF;

  -- Update collection_images record
  UPDATE collection_images
  SET
    storage_metadata_id = p_storage_metadata_id,
    storage_path = v_storage_path,
    storage_bucket = v_bucket,
    uses_storage = true,
    is_external = false,
    -- Keep original image_url as backup
    cdn_url = image_url,
    updated_at = NOW()
  WHERE id = p_collection_image_id;

  RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION migrate_collection_image_to_storage IS 'Migrate a collection image from external CDN to Supabase storage';

-- =============================================
-- FUNCTION: Get Collection Images with Variants
-- =============================================

-- Function to get all images for a collection including variants
CREATE OR REPLACE FUNCTION get_collection_images_with_variants(
  p_collection_id UUID
)
RETURNS TABLE (
  image_id UUID,
  image_type VARCHAR,
  effective_url TEXT,
  alt_text VARCHAR,
  title VARCHAR,
  width INTEGER,
  height INTEGER,
  is_primary BOOLEAN,
  display_order INTEGER,
  variants JSONB
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    ci.id as image_id,
    ci.image_type,
    COALESCE(sm.public_url, ci.image_url) as effective_url,
    ci.alt_text,
    ci.title,
    ci.width,
    ci.height,
    ci.is_primary,
    ci.display_order,
    -- Get variants as JSON array
    COALESCE(
      (
        SELECT jsonb_agg(
          jsonb_build_object(
            'variant_name', iv.variant_name,
            'url', iv.image_url,
            'width', iv.width,
            'height', iv.height
          )
          ORDER BY iv.width ASC
        )
        FROM image_variants iv
        WHERE iv.parent_image_id = ci.id
      ),
      '[]'::jsonb
    ) as variants
  FROM collection_images ci
  LEFT JOIN storage_metadata sm ON ci.storage_metadata_id = sm.id
  WHERE ci.collection_id = p_collection_id
    AND ci.is_active = true
  ORDER BY ci.display_order ASC, ci.created_at ASC;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION get_collection_images_with_variants IS 'Get all images for a collection including responsive variants';

-- =============================================
-- FUNCTION: Sync Storage Metadata
-- =============================================

-- Function to sync storage metadata when collection_images is updated
CREATE OR REPLACE FUNCTION sync_collection_image_storage_metadata()
RETURNS TRIGGER AS $$
BEGIN
  -- If storage_metadata_id is set, sync some basic info back
  IF NEW.storage_metadata_id IS NOT NULL THEN
    UPDATE storage_metadata
    SET
      alt_text = COALESCE(NEW.alt_text, alt_text),
      title = COALESCE(NEW.title, title),
      image_type = COALESCE(NEW.image_type, image_type),
      updated_at = NOW()
    WHERE id = NEW.storage_metadata_id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
DROP TRIGGER IF EXISTS sync_storage_metadata_trigger ON collection_images;
CREATE TRIGGER sync_storage_metadata_trigger
  AFTER UPDATE ON collection_images
  FOR EACH ROW
  WHEN (NEW.storage_metadata_id IS NOT NULL)
  EXECUTE FUNCTION sync_collection_image_storage_metadata();

-- =============================================
-- SAMPLE MIGRATION QUERIES
-- =============================================

/*
-- 1. Check current storage status
SELECT
  COUNT(*) as total_images,
  COUNT(storage_metadata_id) as using_storage,
  COUNT(CASE WHEN is_external = true THEN 1 END) as using_external
FROM collection_images;

-- 2. Get collections with external images that need migration
SELECT
  c.display_name,
  c.slug,
  COUNT(ci.id) as external_images
FROM collections c
JOIN collection_images ci ON c.id = ci.collection_id
WHERE ci.is_external = true
GROUP BY c.id, c.display_name, c.slug
ORDER BY external_images DESC;

-- 3. Migrate a single image (after uploading to storage)
SELECT migrate_collection_image_to_storage(
  'collection-image-uuid',  -- collection_images.id
  'storage-metadata-uuid'   -- storage_metadata.id (from register_upload)
);

-- 4. Get unified URLs for all collection images
SELECT
  collection_id,
  image_type,
  effective_image_url,
  uses_storage,
  is_external
FROM collection_images_unified
ORDER BY collection_id, display_order;

-- 5. Get collection images with all variants
SELECT * FROM get_collection_images_with_variants('collection-uuid');

-- Example output:
-- {
--   "image_id": "...",
--   "image_type": "grid",
--   "effective_url": "https://supabase.../originals/image.webp",
--   "variants": [
--     {"variant_name": "thumbnail", "url": "...", "width": 300, "height": 200},
--     {"variant_name": "medium", "url": "...", "width": 800, "height": 600},
--     {"variant_name": "large", "url": "...", "width": 1920, "height": 1080}
--   ]
-- }
*/

-- =============================================
-- MIGRATION WORKFLOW EXAMPLE
-- =============================================

/*
Complete workflow to migrate a collection image:

Step 1: Download external image (client-side or script)
  const response = await fetch(externalUrl);
  const blob = await response.blob();
  const file = new File([blob], 'image.webp');

Step 2: Upload to Supabase storage
  const { data: uploadData } = await supabase.storage
    .from('collection-images')
    .upload('originals/image.webp', file);

Step 3: Register in storage_metadata
  const { data: metadataId } = await supabase.rpc('register_upload', {
    p_bucket_id: 'collection-images',
    p_storage_path: 'collection-images/originals/image.webp',
    p_file_name: 'image.webp',
    p_original_name: 'original-image.webp',
    p_file_size: file.size,
    p_mime_type: file.type,
    p_image_type: 'collection',
    p_alt_text: 'Collection image',
    p_title: 'Image title'
  });

Step 4: Link to collection_images
  const { data } = await supabase.rpc('migrate_collection_image_to_storage', {
    p_collection_image_id: 'collection-image-uuid',
    p_storage_metadata_id: metadataId
  });

Step 5: Verify migration
  const { data: images } = await supabase
    .from('collection_images_unified')
    .select('*')
    .eq('collection_id', 'collection-uuid');

  // Check that effective_image_url now points to storage
*/

-- =============================================
-- BACKWARD COMPATIBILITY
-- =============================================

-- The system supports both storage and external URLs:
-- 1. New uploads go to Supabase storage
-- 2. Existing external URLs continue to work
-- 3. Migration can happen gradually
-- 4. Views and functions handle both sources transparently

-- =============================================
-- CLEANUP NOTES
-- =============================================

-- After full migration, you can optionally:
-- 1. Remove is_external column (if no longer needed)
-- 2. Make storage_metadata_id NOT NULL
-- 3. Remove external URL columns
-- But it's recommended to keep backward compatibility for now.
