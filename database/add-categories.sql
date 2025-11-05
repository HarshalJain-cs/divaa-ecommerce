-- =============================================
-- Add Categories for Shop by Category Section
-- 8 Categories with Unsplash Images
-- =============================================

-- Clear existing categories (optional - remove if you want to keep existing data)
-- TRUNCATE TABLE categories CASCADE;

-- Insert 8 main categories with beautiful jewelry images from Unsplash
INSERT INTO categories (name, description, image_url, created_at) VALUES
  (
    'Rings',
    'Elegant rings for every occasion - from daily wear to special celebrations',
    'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop&q=80',
    NOW()
  ),
  (
    'Earrings',
    'Stunning earrings to complement your style and personality',
    'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop&q=80',
    NOW()
  ),
  (
    'Bracelets',
    'Beautiful bracelets and bangles for a touch of elegance',
    'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&auto=format&fit=crop&q=80',
    NOW()
  ),
  (
    'Necklaces',
    'Exquisite necklaces to enhance your natural beauty',
    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80',
    NOW()
  ),
  (
    'Anklets',
    'Delicate anklets for a subtle statement of style',
    'https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=800&auto=format&fit=crop&q=80',
    NOW()
  ),
  (
    'Nose Pins',
    'Traditional and modern nose pins for timeless beauty',
    'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&auto=format&fit=crop&q=80',
    NOW()
  ),
  (
    'Pendants',
    'Charming pendants to add personality to any outfit',
    'https://images.unsplash.com/photo-1611652022419-a9419f74343f?w=800&auto=format&fit=crop&q=80',
    NOW()
  ),
  (
    'Wedding Sets',
    'Complete bridal jewelry sets for your special day',
    'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&auto=format&fit=crop&q=80',
    NOW()
  )
ON CONFLICT (name) DO UPDATE SET
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url;

-- Verify the categories were added
SELECT id, name, description FROM categories ORDER BY name;

-- =============================================
-- Optional: Add Gift Sets as 9th category
-- =============================================
-- Uncomment if you want to add Gift Sets
-- INSERT INTO categories (name, description, image_url, created_at) VALUES
--   (
--     'Gift Sets',
--     'Thoughtfully curated jewelry sets perfect for gifting',
--     'https://images.unsplash.com/photo-1549803973-3f0b51366dad?w=800&auto=format&fit=crop&q=80',
--     NOW()
--   )
-- ON CONFLICT (name) DO UPDATE SET
--   description = EXCLUDED.description,
--   image_url = EXCLUDED.image_url;
