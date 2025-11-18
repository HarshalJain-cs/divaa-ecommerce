-- =============================================
-- Collection Images - Data Setup
-- Divaa E-Commerce Platform
-- =============================================
-- Description: Insert initial collection data with images
-- =============================================

-- =============================================
-- INSERT COLLECTIONS
-- =============================================

INSERT INTO collections (name, slug, display_name, description, category, is_featured, display_order, primary_color, secondary_color, gradient_from, gradient_to, meta_title, meta_description) VALUES

-- Style Collections
('everyday-wear', 'style-everyday', 'Everyday Wear', 'Perfect jewelry for daily wear and casual occasions. Lightweight, comfortable, and stylish pieces.', 'style', true, 1, '#B76E79', '#E0BFB8', '#E0BFB8', '#B76E79', 'Everyday Wear Jewelry - Divaa', 'Shop our collection of everyday jewelry perfect for daily wear. Lightweight, comfortable, and stylish pieces.'),

('traditional', 'style-traditional', 'Traditional', 'Classic Indian jewelry designs with timeless elegance. Perfect for traditional occasions and festivals.', 'style', true, 2, '#B76E79', '#E0BFB8', '#B76E79', '#DE5D83', 'Traditional Jewelry Collection - Divaa', 'Explore our traditional Indian jewelry collection. Classic designs perfect for festivals and traditional occasions.'),

('partywear', 'style-party', 'Party Wear', 'Glamorous and stunning pieces for parties and special occasions. Stand out with our party collection.', 'style', true, 3, '#DE5D83', '#E0BFB8', '#DE5D83', '#B76E79', 'Party Wear Jewelry - Divaa', 'Glamorous jewelry for parties and special occasions. Stunning pieces to make you stand out.'),

('twinning', 'gifts-for-friends', 'Twinning', 'Matching jewelry sets perfect for twinning with friends, sisters, or loved ones. Celebrate your bond.', 'style', true, 4, '#E0BFB8', '#B76E79', '#E0BFB8', '#DE5D83', 'Twinning Jewelry Sets - Divaa', 'Matching jewelry sets perfect for twinning with friends and loved ones. Celebrate your special bond.'),

('minimalistic', 'casual', 'Minimalistic', 'Simple, elegant, and understated jewelry. Perfect for minimalists who appreciate subtle beauty.', 'style', true, 5, '#E0BFB8', '#B76E79', '#FAF9F6', '#E0BFB8', 'Minimalistic Jewelry - Divaa', 'Simple and elegant minimalistic jewelry. Understated pieces for those who appreciate subtle beauty.'),

('gift-cards', 'gift-cards', 'Gift Cards', 'Digital gift cards for Divaa Jewels. The perfect gift for any occasion.', 'special', true, 6, '#B76E79', '#E0BFB8', '#E0BFB8', '#B76E79', 'Gift Cards - Divaa Jewels', 'Buy digital gift cards for Divaa Jewels. Perfect gifts for any occasion.'),

-- Office Wear
('office-wear', 'style-office', 'Office Wear', 'Professional and elegant jewelry perfect for office and work settings.', 'style', false, 7, '#B76E79', '#E0BFB8', '#E0BFB8', '#B76E79', 'Office Wear Jewelry - Divaa', 'Professional jewelry perfect for office and work. Elegant and workplace-appropriate designs.'),

-- Material Collections
('gold-collection', 'collections/gold', 'Gold Collection', 'Exquisite gold jewelry collection featuring traditional and modern designs.', 'material', false, 10, '#B76E79', '#E0BFB8', '#B76E79', '#E0BFB8', 'Gold Jewelry Collection - Divaa', 'Explore our exquisite gold jewelry collection. Traditional and modern gold designs.'),

('silver-collection', 'collections/silver', 'Silver Collection', 'Beautiful silver jewelry perfect for everyday and special occasions.', 'material', false, 11, '#E0BFB8', '#B76E79', '#E0BFB8', '#B76E79', 'Silver Jewelry Collection - Divaa', 'Beautiful silver jewelry for everyday wear and special occasions.'),

('diamond-collection', 'collections/diamond', 'Diamond Collection', 'Stunning diamond jewelry that sparkles with elegance and luxury.', 'material', false, 12, '#DE5D83', '#B76E79', '#DE5D83', '#E0BFB8', 'Diamond Jewelry Collection - Divaa', 'Stunning diamond jewelry collection. Elegant and luxurious designs.'),

-- Special Collections
('timeless-pearls', 'collections/timeless-pearls', 'Timeless Pearls', 'Elegant pearl jewelry collection with classic and contemporary designs.', 'collection', false, 20, '#E0BFB8', '#B76E79', '#E0BFB8', '#B76E79', 'Pearl Jewelry - Timeless Pearls - Divaa', 'Elegant pearl jewelry collection with classic and contemporary designs.'),

('fresh-drops', 'collections/fresh-drops', 'Fresh Drops', 'Modern and trendy jewelry designs for the fashion-forward.', 'collection', false, 21, '#DE5D83', '#E0BFB8', '#DE5D83', '#E0BFB8', 'Fresh Drops Collection - Divaa', 'Modern and trendy jewelry designs for the fashion-forward.'),

('stackable', 'collections/stackable', 'Stackable Collection', 'Mix and match stackable rings and bangles for a personalized look.', 'collection', false, 22, '#B76E79', '#E0BFB8', '#B76E79', '#E0BFB8', 'Stackable Jewelry - Divaa', 'Mix and match stackable jewelry for your personalized look.'),

-- Wedding Collections
('polki-bride', 'wedding/polki-bride', 'Polki Bride', 'Traditional polki jewelry for the bride. Stunning bridal sets.', 'wedding', true, 30, '#B76E79', '#E0BFB8', '#E0BFB8', '#DE5D83', 'Polki Bridal Jewelry - Divaa', 'Traditional polki jewelry for brides. Stunning bridal sets and accessories.'),

('gold-bride', 'wedding/gold-bride', 'Gold Bride', 'Exquisite gold bridal jewelry for your special day.', 'wedding', true, 31, '#B76E79', '#E0BFB8', '#B76E79', '#E0BFB8', 'Gold Bridal Jewelry - Divaa', 'Exquisite gold bridal jewelry for your special wedding day.')

ON CONFLICT (name) DO UPDATE SET
  slug = EXCLUDED.slug,
  display_name = EXCLUDED.display_name,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  is_featured = EXCLUDED.is_featured,
  display_order = EXCLUDED.display_order,
  primary_color = EXCLUDED.primary_color,
  secondary_color = EXCLUDED.secondary_color,
  gradient_from = EXCLUDED.gradient_from,
  gradient_to = EXCLUDED.gradient_to,
  meta_title = EXCLUDED.meta_title,
  meta_description = EXCLUDED.meta_description,
  updated_at = NOW();

-- =============================================
-- INSERT COLLECTION IMAGES
-- =============================================
-- Note: First delete existing images for these collections to avoid duplicates
DELETE FROM collection_images WHERE collection_id IN (
  SELECT id FROM collections WHERE slug IN (
    'style-everyday', 'style-traditional', 'style-party', 'gift-cards', 'style-office', 'gifts-for-friends'
  )
);

-- Everyday Wear Images
INSERT INTO collection_images (collection_id, image_url, image_type, alt_text, title, is_primary, display_order, width, height, file_format, is_external)
SELECT
  c.id,
  '//www.giva.co/cdn/shop/files/1_16_317a7922-6e8c-43f3-a106-4cebb0761a41.webp?v=1758903175&width=900',
  'grid',
  'Everyday Wear Jewelry Collection',
  'Everyday Style Collection',
  true,
  1,
  900,
  900,
  'webp',
  true
FROM collections c
WHERE c.slug = 'style-everyday';

-- Traditional Images
INSERT INTO collection_images (collection_id, image_url, image_type, alt_text, title, is_primary, display_order, width, height, file_format, is_external)
SELECT
  c.id,
  '//www.giva.co/cdn/shop/files/2_13_1.webp?v=1758903175&width=900',
  'grid',
  'Traditional Indian Jewelry Collection',
  'Traditional Style Collection',
  true,
  1,
  900,
  900,
  'webp',
  true
FROM collections c
WHERE c.slug = 'style-traditional';

-- Party Wear Images
INSERT INTO collection_images (collection_id, image_url, image_type, alt_text, title, is_primary, display_order, width, height, file_format, is_external)
SELECT
  c.id,
  '//www.giva.co/cdn/shop/files/3_7.webp?v=1758903176&width=900',
  'grid',
  'Party Wear Jewelry Collection',
  'Party Style Collection',
  true,
  1,
  900,
  900,
  'webp',
  true
FROM collections c
WHERE c.slug = 'style-party';

-- Gift Cards Images
INSERT INTO collection_images (collection_id, image_url, image_type, alt_text, title, is_primary, display_order, width, height, file_format, is_external)
SELECT
  c.id,
  '//www.giva.co/cdn/shop/files/5_7.webp?v=1758903272&width=900',
  'grid',
  'Gift Cards',
  'Divaa Gift Cards',
  true,
  1,
  900,
  900,
  'webp',
  true
FROM collections c
WHERE c.slug = 'gift-cards';

-- Office Wear Images
INSERT INTO collection_images (collection_id, image_url, image_type, alt_text, title, is_primary, display_order, width, height, file_format, is_external)
SELECT
  c.id,
  '//www.giva.co/cdn/shop/files/7_3.webp?v=1758903267&width=900',
  'grid',
  'Office Wear Jewelry Collection',
  'Office Style Collection',
  true,
  1,
  900,
  900,
  'webp',
  true
FROM collections c
WHERE c.slug = 'style-office';

-- Twinning Images
INSERT INTO collection_images (collection_id, image_url, image_type, alt_text, title, is_primary, display_order, width, height, file_format, is_external)
SELECT
  c.id,
  '//www.giva.co/cdn/shop/files/6_8.webp?v=1758903271&width=900',
  'grid',
  'Twinning Jewelry Sets',
  'Twinning Collection',
  true,
  1,
  900,
  900,
  'webp',
  true
FROM collections c
WHERE c.slug = 'gifts-for-friends';

-- =============================================
-- INSERT COLLECTION BANNERS (Hero Images)
-- =============================================
-- Note: First delete existing banners for these collections to avoid duplicates
DELETE FROM collection_banners WHERE collection_id IN (
  SELECT id FROM collections WHERE slug IN (
    'style-everyday', 'style-traditional', 'style-party', 'gift-cards'
  )
);

-- Everyday Wear Banner
INSERT INTO collection_banners (collection_id, banner_type, title, subtitle, cta_text, cta_link, desktop_image_url, desktop_width, desktop_height, is_active, display_order)
SELECT
  c.id,
  'hero',
  'Everyday Elegance',
  'Perfect jewelry for your daily style',
  'Shop Now',
  '/collections/style-everyday',
  '//www.giva.co/cdn/shop/files/1_16_317a7922-6e8c-43f3-a106-4cebb0761a41.webp?v=1758903175&width=1920',
  1920,
  1080,
  true,
  1
FROM collections c
WHERE c.slug = 'style-everyday';

-- Traditional Banner
INSERT INTO collection_banners (collection_id, banner_type, title, subtitle, cta_text, cta_link, desktop_image_url, desktop_width, desktop_height, is_active, display_order)
SELECT
  c.id,
  'hero',
  'Traditional Beauty',
  'Timeless Indian jewelry designs',
  'Explore Collection',
  '/collections/style-traditional',
  '//www.giva.co/cdn/shop/files/2_13_1.webp?v=1758903175&width=1920',
  1920,
  1080,
  true,
  1
FROM collections c
WHERE c.slug = 'style-traditional';

-- Party Wear Banner
INSERT INTO collection_banners (collection_id, banner_type, title, subtitle, cta_text, cta_link, desktop_image_url, desktop_width, desktop_height, is_active, display_order)
SELECT
  c.id,
  'hero',
  'Party Perfect',
  'Glamorous jewelry for special occasions',
  'Shop Party Collection',
  '/collections/style-party',
  '//www.giva.co/cdn/shop/files/3_7.webp?v=1758903176&width=1920',
  1920,
  1080,
  true,
  1
FROM collections c
WHERE c.slug = 'style-party';

-- Gift Cards Banner
INSERT INTO collection_banners (collection_id, banner_type, title, subtitle, cta_text, cta_link, desktop_image_url, desktop_width, desktop_height, is_active, display_order)
SELECT
  c.id,
  'hero',
  'Give the Gift of Choice',
  'Digital gift cards for every occasion',
  'Buy Gift Card',
  '/gift-cards',
  '//www.giva.co/cdn/shop/files/5_7.webp?v=1758903272&width=1920',
  1920,
  1080,
  true,
  1
FROM collections c
WHERE c.slug = 'gift-cards';

-- =============================================
-- UPDATE PRODUCT COUNTS (You'll need to run this periodically)
-- =============================================

-- Sample: Update product count for each collection
-- This would be connected to your actual products table
UPDATE collections SET product_count = 0; -- Reset

-- You would typically have a query like this:
-- UPDATE collections c
-- SET product_count = (
--   SELECT COUNT(*) FROM products p
--   WHERE p.collection_id = c.id AND p.is_active = true
-- );

-- =============================================
-- VERIFY DATA
-- =============================================

SELECT 'Data setup complete!' as status;
SELECT '==========================================';
SELECT 'Collections created: ' || COUNT(*) as total FROM collections;
SELECT 'Images added: ' || COUNT(*) as total FROM collection_images;
SELECT 'Banners created: ' || COUNT(*) as total FROM collection_banners;
SELECT '==========================================';

-- List all collections
SELECT
  display_name,
  slug,
  category,
  is_featured,
  (SELECT COUNT(*) FROM collection_images ci WHERE ci.collection_id = c.id) as image_count
FROM collections c
ORDER BY display_order;
