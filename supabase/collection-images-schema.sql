-- =============================================
-- Collection Images Database Schema
-- For Divaa E-Commerce Platform
-- =============================================
-- Description: Stores collection images, banners, and media assets
-- Version: 1.0.0
-- Created: January 2025
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- TABLE: collections
-- Stores collection metadata and information
-- =============================================

CREATE TABLE IF NOT EXISTS collections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Collection Info
  name VARCHAR(255) NOT NULL UNIQUE,
  slug VARCHAR(255) NOT NULL UNIQUE,
  display_name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100), -- 'style', 'material', 'occasion', 'wedding', 'gifting', etc.

  -- SEO & Marketing
  meta_title VARCHAR(255),
  meta_description TEXT,
  keywords TEXT[],

  -- Display Settings
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,

  -- Colors & Theme (for consistent branding)
  primary_color VARCHAR(7), -- Hex color #B76E79
  secondary_color VARCHAR(7), -- Hex color #E0BFB8
  gradient_from VARCHAR(7),
  gradient_to VARCHAR(7),

  -- Statistics
  view_count INTEGER DEFAULT 0,
  product_count INTEGER DEFAULT 0,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add comments
COMMENT ON TABLE collections IS 'Stores collection metadata and configuration';
COMMENT ON COLUMN collections.slug IS 'URL-friendly identifier (e.g., style-everyday, polki-bride)';
COMMENT ON COLUMN collections.category IS 'Collection category for grouping and filtering';

-- =============================================
-- TABLE: collection_images
-- Stores all images for collections
-- =============================================

CREATE TABLE IF NOT EXISTS collection_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Relationships
  collection_id UUID NOT NULL REFERENCES collections(id) ON DELETE CASCADE,

  -- Image Info
  image_url TEXT NOT NULL,
  image_type VARCHAR(50) NOT NULL, -- 'banner', 'thumbnail', 'grid', 'hero', 'card', 'background'
  alt_text VARCHAR(255),
  title VARCHAR(255),

  -- Image Details
  width INTEGER,
  height INTEGER,
  file_size_bytes INTEGER,
  file_format VARCHAR(10), -- 'webp', 'jpg', 'png', 'svg'

  -- CDN & Storage
  cdn_url TEXT, -- Cloudflare, AWS CloudFront, etc.
  storage_path TEXT, -- Path in storage bucket
  is_external BOOLEAN DEFAULT false, -- Using external CDN (like Giva)

  -- Display Settings
  display_order INTEGER DEFAULT 0,
  is_primary BOOLEAN DEFAULT false, -- Primary image for collection
  is_active BOOLEAN DEFAULT true,

  -- Responsive Images (different sizes)
  thumbnail_url TEXT,
  medium_url TEXT,
  large_url TEXT,

  -- SEO
  srcset TEXT, -- For responsive images
  sizes VARCHAR(255), -- Image sizes attribute

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add comments
COMMENT ON TABLE collection_images IS 'Stores all images and media for collections';
COMMENT ON COLUMN collection_images.image_type IS 'Type of image: banner, thumbnail, grid, hero, card, background';
COMMENT ON COLUMN collection_images.is_primary IS 'Primary/featured image for the collection';

-- =============================================
-- TABLE: image_variants
-- Stores different size variants of images
-- =============================================

CREATE TABLE IF NOT EXISTS image_variants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Relationships
  parent_image_id UUID NOT NULL REFERENCES collection_images(id) ON DELETE CASCADE,

  -- Variant Info
  variant_name VARCHAR(50) NOT NULL, -- 'thumbnail', 'small', 'medium', 'large', 'xlarge'
  image_url TEXT NOT NULL,
  width INTEGER NOT NULL,
  height INTEGER NOT NULL,
  file_size_bytes INTEGER,

  -- Quality & Optimization
  quality INTEGER, -- 1-100
  is_optimized BOOLEAN DEFAULT false,
  compression_type VARCHAR(50), -- 'lossy', 'lossless'

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add comments
COMMENT ON TABLE image_variants IS 'Stores different size variants for responsive images';
COMMENT ON COLUMN image_variants.variant_name IS 'Size variant: thumbnail, small, medium, large, xlarge';

-- =============================================
-- TABLE: image_uploads
-- Tracks image upload history and metadata
-- =============================================

CREATE TABLE IF NOT EXISTS image_uploads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Upload Info
  original_filename VARCHAR(255) NOT NULL,
  uploaded_by_user_id UUID, -- Reference to users table
  upload_source VARCHAR(50), -- 'admin', 'api', 'import', 'scraper'

  -- File Info
  file_size_bytes INTEGER NOT NULL,
  mime_type VARCHAR(50) NOT NULL,
  original_url TEXT,
  processed_url TEXT,

  -- Processing Status
  processing_status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'failed'
  processing_started_at TIMESTAMP WITH TIME ZONE,
  processing_completed_at TIMESTAMP WITH TIME ZONE,
  processing_error TEXT,

  -- Image Analysis (optional)
  dominant_color VARCHAR(7), -- Hex color extracted from image
  has_transparency BOOLEAN,
  is_animated BOOLEAN,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add comments
COMMENT ON TABLE image_uploads IS 'Tracks all image uploads and their processing status';

-- =============================================
-- TABLE: collection_banners
-- Dedicated table for collection banners
-- =============================================

CREATE TABLE IF NOT EXISTS collection_banners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Relationships
  collection_id UUID NOT NULL REFERENCES collections(id) ON DELETE CASCADE,

  -- Banner Info
  banner_type VARCHAR(50) NOT NULL, -- 'hero', 'secondary', 'promotional', 'seasonal'
  title VARCHAR(255),
  subtitle TEXT,
  cta_text VARCHAR(100), -- Call to action text
  cta_link VARCHAR(255), -- Call to action URL

  -- Desktop Image
  desktop_image_url TEXT NOT NULL,
  desktop_width INTEGER,
  desktop_height INTEGER,

  -- Mobile Image
  mobile_image_url TEXT,
  mobile_width INTEGER,
  mobile_height INTEGER,

  -- Display Settings
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,

  -- Analytics
  view_count INTEGER DEFAULT 0,
  click_count INTEGER DEFAULT 0,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add comments
COMMENT ON TABLE collection_banners IS 'Stores promotional banners for collections';

-- =============================================
-- INDEXES for Performance
-- =============================================

-- Collections indexes
CREATE INDEX idx_collections_slug ON collections(slug);
CREATE INDEX idx_collections_category ON collections(category);
CREATE INDEX idx_collections_is_active ON collections(is_active);
CREATE INDEX idx_collections_is_featured ON collections(is_featured);
CREATE INDEX idx_collections_display_order ON collections(display_order);

-- Collection images indexes
CREATE INDEX idx_collection_images_collection_id ON collection_images(collection_id);
CREATE INDEX idx_collection_images_image_type ON collection_images(image_type);
CREATE INDEX idx_collection_images_is_primary ON collection_images(is_primary);
CREATE INDEX idx_collection_images_is_active ON collection_images(is_active);

-- Image variants indexes
CREATE INDEX idx_image_variants_parent_id ON image_variants(parent_image_id);
CREATE INDEX idx_image_variants_variant_name ON image_variants(variant_name);

-- Image uploads indexes
CREATE INDEX idx_image_uploads_processing_status ON image_uploads(processing_status);
CREATE INDEX idx_image_uploads_created_at ON image_uploads(created_at);

-- Collection banners indexes
CREATE INDEX idx_collection_banners_collection_id ON collection_banners(collection_id);
CREATE INDEX idx_collection_banners_is_active ON collection_banners(is_active);
CREATE INDEX idx_collection_banners_banner_type ON collection_banners(banner_type);

-- =============================================
-- FUNCTIONS & TRIGGERS
-- =============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_collections_updated_at
  BEFORE UPDATE ON collections
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_collection_images_updated_at
  BEFORE UPDATE ON collection_images
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_collection_banners_updated_at
  BEFORE UPDATE ON collection_banners
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to ensure only one primary image per collection
CREATE OR REPLACE FUNCTION ensure_single_primary_image()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_primary = true THEN
    UPDATE collection_images
    SET is_primary = false
    WHERE collection_id = NEW.collection_id
      AND id != NEW.id
      AND is_primary = true;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to ensure single primary image
CREATE TRIGGER enforce_single_primary_image
  BEFORE INSERT OR UPDATE ON collection_images
  FOR EACH ROW
  WHEN (NEW.is_primary = true)
  EXECUTE FUNCTION ensure_single_primary_image();

-- =============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================

-- Enable RLS
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE collection_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE image_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE image_uploads ENABLE ROW LEVEL SECURITY;
ALTER TABLE collection_banners ENABLE ROW LEVEL SECURITY;

-- Public read access for active collections
CREATE POLICY "Public can view active collections"
  ON collections FOR SELECT
  USING (is_active = true);

-- Public read access for active collection images
CREATE POLICY "Public can view active collection images"
  ON collection_images FOR SELECT
  USING (is_active = true);

-- Public read access for image variants
CREATE POLICY "Public can view image variants"
  ON image_variants FOR SELECT
  USING (true);

-- Public read access for active banners
CREATE POLICY "Public can view active banners"
  ON collection_banners FOR SELECT
  USING (is_active = true);

-- Admin full access (you'll need to implement auth)
-- These are placeholder policies - adjust based on your auth setup
CREATE POLICY "Admins have full access to collections"
  ON collections FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admins have full access to collection images"
  ON collection_images FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admins have full access to image uploads"
  ON image_uploads FOR ALL
  USING (true)
  WITH CHECK (true);

-- =============================================
-- VIEWS for Common Queries
-- =============================================

-- View: Active collections with primary images
CREATE OR REPLACE VIEW active_collections_with_images AS
SELECT
  c.id,
  c.name,
  c.slug,
  c.display_name,
  c.description,
  c.category,
  c.is_featured,
  c.display_order,
  c.primary_color,
  c.secondary_color,
  ci.image_url as primary_image_url,
  ci.alt_text as primary_image_alt,
  ci.width as primary_image_width,
  ci.height as primary_image_height
FROM collections c
LEFT JOIN collection_images ci ON c.id = ci.collection_id AND ci.is_primary = true
WHERE c.is_active = true
ORDER BY c.display_order, c.display_name;

-- View: Collection image counts
CREATE OR REPLACE VIEW collection_image_stats AS
SELECT
  c.id,
  c.name,
  c.slug,
  COUNT(ci.id) as total_images,
  COUNT(CASE WHEN ci.is_primary THEN 1 END) as primary_images,
  COUNT(CASE WHEN ci.image_type = 'banner' THEN 1 END) as banner_images,
  COUNT(CASE WHEN ci.image_type = 'grid' THEN 1 END) as grid_images,
  SUM(ci.file_size_bytes) as total_file_size
FROM collections c
LEFT JOIN collection_images ci ON c.id = ci.collection_id
GROUP BY c.id, c.name, c.slug;

-- =============================================
-- UTILITY FUNCTIONS
-- =============================================

-- Function to get collection by slug with images
CREATE OR REPLACE FUNCTION get_collection_with_images(collection_slug VARCHAR)
RETURNS TABLE (
  collection_id UUID,
  collection_name VARCHAR,
  collection_display_name VARCHAR,
  collection_description TEXT,
  collection_category VARCHAR,
  images JSONB
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    c.id,
    c.name,
    c.display_name,
    c.description,
    c.category,
    COALESCE(
      jsonb_agg(
        jsonb_build_object(
          'id', ci.id,
          'url', ci.image_url,
          'type', ci.image_type,
          'alt', ci.alt_text,
          'is_primary', ci.is_primary
        )
        ORDER BY ci.display_order, ci.created_at
      ) FILTER (WHERE ci.id IS NOT NULL),
      '[]'::jsonb
    ) as images
  FROM collections c
  LEFT JOIN collection_images ci ON c.id = ci.collection_id AND ci.is_active = true
  WHERE c.slug = collection_slug AND c.is_active = true
  GROUP BY c.id, c.name, c.display_name, c.description, c.category;
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- SAMPLE DATA (for testing)
-- =============================================

-- Insert sample collections
INSERT INTO collections (name, slug, display_name, description, category, is_featured, primary_color, secondary_color, gradient_from, gradient_to) VALUES
('style-everyday', 'style-everyday', 'Everyday Style', 'Perfect for daily wear and casual occasions', 'style', true, '#B76E79', '#E0BFB8', '#E0BFB8', '#B76E79'),
('style-traditional', 'style-traditional', 'Traditional Style', 'Classic Indian jewelry designs', 'style', true, '#B76E79', '#E0BFB8', '#B76E79', '#DE5D83'),
('style-party', 'style-party', 'Party Style', 'Glamorous pieces for special occasions', 'style', true, '#DE5D83', '#E0BFB8', '#DE5D83', '#B76E79'),
('polki-bride', 'polki-bride', 'Polki Bride Collection', 'Traditional polki jewelry for brides', 'wedding', true, '#B76E79', '#E0BFB8', '#E0BFB8', '#DE5D83'),
('gold-bride', 'gold-bride', 'Gold Bride Collection', 'Stunning gold bridal sets', 'wedding', true, '#B76E79', '#E0BFB8', '#B76E79', '#E0BFB8'),
('timeless-pearls', 'timeless-pearls', 'Timeless Pearls', 'Elegant pearl jewelry collection', 'collection', false, '#E0BFB8', '#B76E79', '#E0BFB8', '#B76E79'),
('fresh-drops', 'fresh-drops', 'Fresh Drops', 'Modern and trendy designs', 'collection', false, '#DE5D83', '#E0BFB8', '#DE5D83', '#E0BFB8')
ON CONFLICT (slug) DO NOTHING;

-- Note: You would insert actual image URLs in production
-- This is just a sample structure
INSERT INTO collection_images (collection_id, image_url, image_type, alt_text, is_primary, width, height, file_format)
SELECT
  c.id,
  '//www.giva.co/cdn/shop/files/placeholder.webp',
  'grid',
  c.display_name,
  true,
  900,
  900,
  'webp'
FROM collections c
ON CONFLICT DO NOTHING;

-- =============================================
-- GRANTS (Adjust based on your setup)
-- =============================================

-- Grant read access to authenticated users
GRANT SELECT ON collections TO authenticated;
GRANT SELECT ON collection_images TO authenticated;
GRANT SELECT ON image_variants TO authenticated;
GRANT SELECT ON collection_banners TO authenticated;

-- Grant all access to service role (for admin operations)
GRANT ALL ON collections TO service_role;
GRANT ALL ON collection_images TO service_role;
GRANT ALL ON image_variants TO service_role;
GRANT ALL ON image_uploads TO service_role;
GRANT ALL ON collection_banners TO service_role;

-- =============================================
-- END OF SCHEMA
-- =============================================

-- Verify installation
SELECT 'Collection Images Schema installed successfully!' as status;
SELECT 'Total collections: ' || COUNT(*) FROM collections;
SELECT 'Total images: ' || COUNT(*) FROM collection_images;
