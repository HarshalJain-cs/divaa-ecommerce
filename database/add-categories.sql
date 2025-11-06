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
    'https://ceytiwiuidapmlzghlzo.supabase.co/storage/v1/object/public/category-images/andy-holmes-bRnzmMF7GCM-unsplash.jpg',
    NOW()
  ),
  (
    'Earrings',
    'Stunning earrings to complement your style and personality',
    'https://ceytiwiuidapmlzghlzo.supabase.co/storage/v1/object/public/category-images/parisa-safaei--_12be3InkQ-unsplash.jpg',
    NOW()
  ),
  (
    'Bracelets',
    'Beautiful bracelets and bangles for a touch of elegance',
    'https://ceytiwiuidapmlzghlzo.supabase.co/storage/v1/object/public/category-images/mansi-shah-C-XcZckjKQM-unsplash.jpg',
    NOW()
  ),
  (
    'Necklaces',
    'Exquisite necklaces to enhance your natural beauty',
    'https://ceytiwiuidapmlzghlzo.supabase.co/storage/v1/object/public/category-images/eric-fung-Z0GZrpwcc5Y-unsplash.jpg',
    NOW()
  ),
  (
    'Anklets',
    'Delicate anklets for a subtle statement of style',
    'https://ceytiwiuidapmlzghlzo.supabase.co/storage/v1/object/public/category-images/A063M_1.webp',
    NOW()
  ),
  (
    'Nose Pins',
    'Traditional and modern nose pins for timeless beauty',
    'https://ceytiwiuidapmlzghlzo.supabase.co/storage/v1/object/public/category-images/shopping.webp',
    NOW()
  ),
  (
    'Pendants',
    'Charming pendants to add personality to any outfit',
    'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=800&auto=format&fit=crop&q=80',
    NOW()
  ),
  (
    'Wedding Sets',
    'Complete bridal jewelry sets for your special day',
    'https://ceytiwiuidapmlzghlzo.supabase.co/storage/v1/object/public/category-images/images%20(2).jpeg',
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
