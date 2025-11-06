-- =============================================
-- Update Category Images Migration
-- Updates category image URLs to use Supabase Storage
-- Created: 2025-11-06
-- =============================================

-- Update Anklets category image
UPDATE categories
SET image_url = 'https://ceytiwiuidapmlzghlzo.supabase.co/storage/v1/object/public/category-images/A063M_1.webp'
WHERE name = 'Anklets';

-- Update Rings category image
UPDATE categories
SET image_url = 'https://ceytiwiuidapmlzghlzo.supabase.co/storage/v1/object/public/category-images/andy-holmes-bRnzmMF7GCM-unsplash.jpg'
WHERE name = 'Rings';

-- Update Necklaces category image
UPDATE categories
SET image_url = 'https://ceytiwiuidapmlzghlzo.supabase.co/storage/v1/object/public/category-images/eric-fung-Z0GZrpwcc5Y-unsplash.jpg'
WHERE name = 'Necklaces';

-- Update Wedding Sets category image
UPDATE categories
SET image_url = 'https://ceytiwiuidapmlzghlzo.supabase.co/storage/v1/object/public/category-images/images%20(2).jpeg'
WHERE name = 'Wedding Sets';

-- Update Bracelets category image
UPDATE categories
SET image_url = 'https://ceytiwiuidapmlzghlzo.supabase.co/storage/v1/object/public/category-images/mansi-shah-C-XcZckjKQM-unsplash.jpg'
WHERE name = 'Bracelets';

-- Update Earrings category image
UPDATE categories
SET image_url = 'https://ceytiwiuidapmlzghlzo.supabase.co/storage/v1/object/public/category-images/parisa-safaei--_12be3InkQ-unsplash.jpg'
WHERE name = 'Earrings';

-- Update Nose Pins category image
UPDATE categories
SET image_url = 'https://ceytiwiuidapmlzghlzo.supabase.co/storage/v1/object/public/category-images/shopping.webp'
WHERE name = 'Nose Pins';

-- Update Pendants category image
UPDATE categories
SET image_url = 'https://ceytiwiuidapmlzghlzo.supabase.co/storage/v1/object/public/category-images/50D2P2NYYAA32_1.jpg'
WHERE name = 'Pendants';

-- Verify the updates
SELECT name, image_url FROM categories
WHERE name IN ('Anklets', 'Rings', 'Necklaces', 'Wedding Sets', 'Bracelets', 'Earrings', 'Nose Pins', 'Pendants')
ORDER BY name;

-- =============================================
-- Migration Complete
-- =============================================
