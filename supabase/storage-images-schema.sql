-- =============================================
-- Storage Images Database Schema
-- Divaa E-Commerce Platform
-- =============================================
-- Description: Enhanced schema for managing Supabase storage images
-- Version: 1.0.0
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- TABLE: storage_metadata
-- Tracks all files uploaded to Supabase storage
-- =============================================

CREATE TABLE IF NOT EXISTS storage_metadata (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Storage Information
  bucket_id VARCHAR(255) NOT NULL,
  storage_path TEXT NOT NULL UNIQUE, -- Full path in storage: bucket/folder/file.ext
  file_name VARCHAR(255) NOT NULL,
  original_name VARCHAR(255), -- Original filename from upload

  -- File Details
  file_size BIGINT NOT NULL, -- Size in bytes
  mime_type VARCHAR(100) NOT NULL,
  file_format VARCHAR(10) NOT NULL, -- webp, jpg, png, gif
  width INTEGER,
  height INTEGER,
  aspect_ratio DECIMAL(10, 4), -- width/height

  -- Classification
  image_type VARCHAR(50), -- 'collection', 'product', 'user', 'temp', 'banner', 'thumbnail'
  category VARCHAR(100), -- Additional categorization
  tags TEXT[], -- Searchable tags

  -- Access Control
  is_public BOOLEAN DEFAULT true,
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,

  -- URLs
  public_url TEXT, -- Pre-computed public URL
  cdn_url TEXT, -- CDN URL if using external CDN

  -- Optimization
  is_optimized BOOLEAN DEFAULT false,
  optimization_quality INTEGER CHECK (optimization_quality BETWEEN 1 AND 100),
  has_variants BOOLEAN DEFAULT false, -- Whether thumbnails/variants exist

  -- Metadata
  alt_text TEXT,
  title TEXT,
  description TEXT,
  exif_data JSONB, -- EXIF data from camera/photo

  -- Status
  status VARCHAR(50) DEFAULT 'active' CHECK (
    status IN ('active', 'processing', 'archived', 'deleted')
  ),

  -- Timestamps
  uploaded_at TIMESTAMPTZ DEFAULT NOW(),
  last_accessed_at TIMESTAMPTZ,
  archived_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Constraints
  UNIQUE(bucket_id, storage_path)
);

-- Add comments
COMMENT ON TABLE storage_metadata IS 'Tracks all files uploaded to Supabase storage buckets';
COMMENT ON COLUMN storage_metadata.storage_path IS 'Full path: bucket/folder/file.ext';
COMMENT ON COLUMN storage_metadata.image_type IS 'Type: collection, product, user, temp, banner, thumbnail';
COMMENT ON COLUMN storage_metadata.has_variants IS 'True if thumbnail/optimized versions exist';

-- =============================================
-- TABLE: image_variants (Extended)
-- Already exists from collection-images-schema.sql
-- We'll extend it to work with storage_metadata
-- =============================================

-- Add storage reference to existing image_variants table
ALTER TABLE image_variants
ADD COLUMN IF NOT EXISTS storage_metadata_id UUID REFERENCES storage_metadata(id) ON DELETE CASCADE;

ALTER TABLE image_variants
ADD COLUMN IF NOT EXISTS storage_path TEXT;

COMMENT ON COLUMN image_variants.storage_metadata_id IS 'Reference to storage_metadata for Supabase storage files';
COMMENT ON COLUMN image_variants.storage_path IS 'Path in Supabase storage if stored there';

-- =============================================
-- TABLE: upload_sessions
-- Track upload progress and batches
-- =============================================

CREATE TABLE IF NOT EXISTS upload_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Session Info
  session_name VARCHAR(255),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,

  -- Upload Details
  total_files INTEGER DEFAULT 0,
  uploaded_files INTEGER DEFAULT 0,
  failed_files INTEGER DEFAULT 0,
  total_size_bytes BIGINT DEFAULT 0,

  -- Status
  status VARCHAR(50) DEFAULT 'pending' CHECK (
    status IN ('pending', 'uploading', 'completed', 'failed', 'cancelled')
  ),

  -- Error Tracking
  error_log JSONB,
  failed_file_names TEXT[],

  -- Timestamps
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE upload_sessions IS 'Tracks batch upload sessions and progress';

-- =============================================
-- TABLE: storage_quotas
-- Track storage usage per user/bucket
-- =============================================

CREATE TABLE IF NOT EXISTS storage_quotas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- User/Bucket
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  bucket_id VARCHAR(255),

  -- Quota Limits
  max_files INTEGER DEFAULT 1000,
  max_storage_bytes BIGINT DEFAULT 1073741824, -- 1GB default
  max_file_size_bytes BIGINT DEFAULT 10485760, -- 10MB default

  -- Current Usage
  current_files INTEGER DEFAULT 0,
  current_storage_bytes BIGINT DEFAULT 0,

  -- Status
  is_exceeded BOOLEAN DEFAULT false,
  warning_sent BOOLEAN DEFAULT false,

  -- Timestamps
  last_checked_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Constraints
  UNIQUE(user_id, bucket_id)
);

COMMENT ON TABLE storage_quotas IS 'Tracks storage usage and limits per user/bucket';

-- =============================================
-- INDEXES FOR PERFORMANCE
-- =============================================

-- storage_metadata indexes
CREATE INDEX IF NOT EXISTS idx_storage_metadata_bucket ON storage_metadata(bucket_id);
CREATE INDEX IF NOT EXISTS idx_storage_metadata_uploaded_by ON storage_metadata(uploaded_by);
CREATE INDEX IF NOT EXISTS idx_storage_metadata_type ON storage_metadata(image_type);
CREATE INDEX IF NOT EXISTS idx_storage_metadata_status ON storage_metadata(status);
CREATE INDEX IF NOT EXISTS idx_storage_metadata_created_at ON storage_metadata(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_storage_metadata_tags ON storage_metadata USING GIN(tags);

-- upload_sessions indexes
CREATE INDEX IF NOT EXISTS idx_upload_sessions_user ON upload_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_upload_sessions_status ON upload_sessions(status);

-- storage_quotas indexes
CREATE INDEX IF NOT EXISTS idx_storage_quotas_user ON storage_quotas(user_id);
CREATE INDEX IF NOT EXISTS idx_storage_quotas_exceeded ON storage_quotas(is_exceeded);

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================

-- Enable RLS
ALTER TABLE storage_metadata ENABLE ROW LEVEL SECURITY;
ALTER TABLE upload_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE storage_quotas ENABLE ROW LEVEL SECURITY;

-- ============================================
-- STORAGE_METADATA POLICIES
-- ============================================

-- Public images: Anyone can view
CREATE POLICY "Public images viewable by all"
  ON storage_metadata FOR SELECT
  USING (is_public = true);

-- Users can view their own uploads
CREATE POLICY "Users can view own uploads"
  ON storage_metadata FOR SELECT
  USING (auth.uid() = uploaded_by);

-- Users can upload files
CREATE POLICY "Authenticated users can upload"
  ON storage_metadata FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = uploaded_by);

-- Users can update their own files
CREATE POLICY "Users can update own files"
  ON storage_metadata FOR UPDATE
  USING (auth.uid() = uploaded_by);

-- Users can delete their own files
CREATE POLICY "Users can delete own files"
  ON storage_metadata FOR DELETE
  USING (auth.uid() = uploaded_by);

-- Admins have full access
CREATE POLICY "Admins have full access to storage metadata"
  ON storage_metadata FOR ALL
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ============================================
-- UPLOAD_SESSIONS POLICIES
-- ============================================

-- Users can view their own sessions
CREATE POLICY "Users can view own sessions"
  ON upload_sessions FOR SELECT
  USING (auth.uid() = user_id);

-- Users can create sessions
CREATE POLICY "Users can create sessions"
  ON upload_sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own sessions
CREATE POLICY "Users can update own sessions"
  ON upload_sessions FOR UPDATE
  USING (auth.uid() = user_id);

-- Admins have full access
CREATE POLICY "Admins have full access to sessions"
  ON upload_sessions FOR ALL
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ============================================
-- STORAGE_QUOTAS POLICIES
-- ============================================

-- Users can view their own quotas
CREATE POLICY "Users can view own quotas"
  ON storage_quotas FOR SELECT
  USING (auth.uid() = user_id);

-- Admins have full access
CREATE POLICY "Admins have full access to quotas"
  ON storage_quotas FOR ALL
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- =============================================
-- TRIGGERS
-- =============================================

-- Update storage_metadata updated_at timestamp
CREATE OR REPLACE FUNCTION update_storage_metadata_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS storage_metadata_updated_at ON storage_metadata;
CREATE TRIGGER storage_metadata_updated_at
  BEFORE UPDATE ON storage_metadata
  FOR EACH ROW
  EXECUTE FUNCTION update_storage_metadata_updated_at();

-- Update upload_sessions updated_at timestamp
CREATE OR REPLACE FUNCTION update_upload_sessions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS upload_sessions_updated_at ON upload_sessions;
CREATE TRIGGER upload_sessions_updated_at
  BEFORE UPDATE ON upload_sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_upload_sessions_updated_at();

-- Calculate aspect ratio automatically
CREATE OR REPLACE FUNCTION calculate_aspect_ratio()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.width IS NOT NULL AND NEW.height IS NOT NULL AND NEW.height > 0 THEN
    NEW.aspect_ratio = ROUND((NEW.width::DECIMAL / NEW.height::DECIMAL), 4);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS calculate_aspect_ratio_trigger ON storage_metadata;
CREATE TRIGGER calculate_aspect_ratio_trigger
  BEFORE INSERT OR UPDATE ON storage_metadata
  FOR EACH ROW
  EXECUTE FUNCTION calculate_aspect_ratio();

-- Update storage quota on file upload
CREATE OR REPLACE FUNCTION update_storage_quota_on_upload()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert or update quota record
  INSERT INTO storage_quotas (user_id, bucket_id, current_files, current_storage_bytes)
  VALUES (NEW.uploaded_by, NEW.bucket_id, 1, NEW.file_size)
  ON CONFLICT (user_id, bucket_id)
  DO UPDATE SET
    current_files = storage_quotas.current_files + 1,
    current_storage_bytes = storage_quotas.current_storage_bytes + NEW.file_size,
    is_exceeded = (storage_quotas.current_storage_bytes + NEW.file_size) > storage_quotas.max_storage_bytes,
    last_checked_at = NOW(),
    updated_at = NOW();

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_quota_on_upload ON storage_metadata;
CREATE TRIGGER update_quota_on_upload
  AFTER INSERT ON storage_metadata
  FOR EACH ROW
  EXECUTE FUNCTION update_storage_quota_on_upload();

-- Update storage quota on file deletion
CREATE OR REPLACE FUNCTION update_storage_quota_on_delete()
RETURNS TRIGGER AS $$
BEGIN
  -- Decrease quota usage
  UPDATE storage_quotas
  SET
    current_files = GREATEST(0, current_files - 1),
    current_storage_bytes = GREATEST(0, current_storage_bytes - OLD.file_size),
    is_exceeded = (current_storage_bytes - OLD.file_size) > max_storage_bytes,
    last_checked_at = NOW(),
    updated_at = NOW()
  WHERE user_id = OLD.uploaded_by
    AND bucket_id = OLD.bucket_id;

  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_quota_on_delete ON storage_metadata;
CREATE TRIGGER update_quota_on_delete
  AFTER DELETE ON storage_metadata
  FOR EACH ROW
  EXECUTE FUNCTION update_storage_quota_on_delete();

-- =============================================
-- VIEWS FOR EASY QUERYING
-- =============================================

-- View: Recent uploads
CREATE OR REPLACE VIEW recent_uploads AS
SELECT
  sm.id,
  sm.file_name,
  sm.storage_path,
  sm.public_url,
  sm.file_size,
  sm.image_type,
  sm.width,
  sm.height,
  p.email as uploaded_by_email,
  p.full_name as uploaded_by_name,
  sm.uploaded_at,
  sm.status
FROM storage_metadata sm
LEFT JOIN profiles p ON sm.uploaded_by = p.id
WHERE sm.status = 'active'
ORDER BY sm.uploaded_at DESC
LIMIT 100;

COMMENT ON VIEW recent_uploads IS 'Shows 100 most recent active uploads with uploader info';

-- View: Storage usage by user
CREATE OR REPLACE VIEW user_storage_usage AS
SELECT
  p.id as user_id,
  p.email,
  p.full_name,
  sq.bucket_id,
  sq.current_files,
  pg_size_pretty(sq.current_storage_bytes) as storage_used,
  pg_size_pretty(sq.max_storage_bytes) as storage_limit,
  ROUND((sq.current_storage_bytes::DECIMAL / sq.max_storage_bytes::DECIMAL) * 100, 2) as usage_percentage,
  sq.is_exceeded,
  sq.last_checked_at
FROM storage_quotas sq
JOIN profiles p ON sq.user_id = p.id
ORDER BY sq.current_storage_bytes DESC;

COMMENT ON VIEW user_storage_usage IS 'Shows storage usage statistics per user';

-- View: Large files
CREATE OR REPLACE VIEW large_files AS
SELECT
  id,
  file_name,
  storage_path,
  pg_size_pretty(file_size) as size,
  file_size as size_bytes,
  image_type,
  width,
  height,
  uploaded_at
FROM storage_metadata
WHERE file_size > 5242880 -- Files larger than 5MB
  AND status = 'active'
ORDER BY file_size DESC;

COMMENT ON VIEW large_files IS 'Lists files larger than 5MB for optimization review';

-- =============================================
-- SAMPLE QUERIES
-- =============================================

/*
-- Get all images in a bucket
SELECT * FROM storage_metadata WHERE bucket_id = 'collection-images';

-- Get user's total storage usage
SELECT
  user_id,
  SUM(current_storage_bytes) as total_bytes,
  pg_size_pretty(SUM(current_storage_bytes)) as total_size,
  SUM(current_files) as total_files
FROM storage_quotas
WHERE user_id = 'user-uuid-here'
GROUP BY user_id;

-- Find images without variants
SELECT id, file_name, storage_path
FROM storage_metadata
WHERE has_variants = false
  AND image_type IN ('collection', 'product')
  AND status = 'active';

-- Get upload session progress
SELECT
  session_name,
  uploaded_files || '/' || total_files as progress,
  ROUND((uploaded_files::DECIMAL / NULLIF(total_files, 0)::DECIMAL) * 100, 2) as percentage,
  status,
  started_at
FROM upload_sessions
WHERE user_id = auth.uid()
ORDER BY started_at DESC;
*/
