-- =============================================
-- SAMPLE PRODUCTS WITH RELATIONS & OCCASIONS
-- =============================================
-- This script adds sample jewelry products with proper tags
-- for Shop by Relation and Shop by Occasion features

-- Clear existing sample products (optional - remove if you want to keep existing data)
-- DELETE FROM products WHERE name LIKE '%Sample%';

-- =============================================
-- RINGS COLLECTION
-- =============================================

-- For Mother - Birthday
INSERT INTO products (
  name, description, price, stock_quantity, image_url,
  is_featured, gender, metal_type, stone_type,
  relations, occasions
) VALUES (
  'Eternal Love Diamond Ring',
  'A stunning diamond ring symbolizing eternal love, perfect gift for mother on her birthday',
  4999.00,
  15,
  'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80',
  true,
  'women',
  'white-gold',
  'diamond',
  ARRAY['mother', 'wife'],
  ARRAY['birthday', 'anniversary']
) ON CONFLICT DO NOTHING;

-- For Wife - Anniversary
INSERT INTO products (
  name, description, price, stock_quantity, image_url,
  is_featured, gender, metal_type, stone_type,
  relations, occasions
) VALUES (
  'Rose Gold Solitaire Ring',
  'Elegant rose gold solitaire ring with brilliant cut diamond, perfect for anniversaries',
  6999.00,
  10,
  'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80',
  true,
  'women',
  'rose-gold',
  'diamond',
  ARRAY['wife', 'girlfriend'],
  ARRAY['anniversary', 'wedding']
) ON CONFLICT DO NOTHING;

-- For Sister - Just Because
INSERT INTO products (
  name, description, price, stock_quantity, image_url,
  is_featured, gender, metal_type, stone_type,
  relations, occasions
) VALUES (
  'Delicate Silver Band Ring',
  'Minimalist silver band ring with subtle sparkle, perfect for everyday wear',
  1999.00,
  25,
  'https://images.unsplash.com/photo-1603561596112-0a132b757442?w=600&q=80',
  false,
  'women',
  'silver',
  'cubic-zirconia',
  ARRAY['sister', 'friend'],
  ARRAY['just-because', 'birthday']
) ON CONFLICT DO NOTHING;

-- =============================================
-- NECKLACES COLLECTION
-- =============================================

-- For Mother - Wedding
INSERT INTO products (
  name, description, price, stock_quantity, image_url,
  is_featured, gender, metal_type, stone_type,
  relations, occasions
) VALUES (
  'Pearl Strand Necklace',
  'Classic freshwater pearl necklace, timeless elegance for special occasions',
  5499.00,
  12,
  'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80',
  true,
  'women',
  'gold',
  'pearl',
  ARRAY['mother', 'wife'],
  ARRAY['wedding', 'anniversary']
) ON CONFLICT DO NOTHING;

-- For Girlfriend - Birthday
INSERT INTO products (
  name, description, price, stock_quantity, image_url,
  is_featured, gender, metal_type, stone_type,
  relations, occasions
) VALUES (
  'Heart Pendant Necklace',
  'Delicate heart-shaped pendant with rose gold chain, express your love',
  2999.00,
  20,
  'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80',
  true,
  'women',
  'rose-gold',
  'diamond',
  ARRAY['girlfriend', 'wife'],
  ARRAY['birthday', 'just-because']
) ON CONFLICT DO NOTHING;

-- For Sister - Say Thanks
INSERT INTO products (
  name, description, price, stock_quantity, image_url,
  is_featured, gender, metal_type, stone_type,
  relations, occasions
) VALUES (
  'Infinity Symbol Necklace',
  'Beautiful infinity symbol necklace representing endless bond',
  1799.00,
  30,
  'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=600&q=80',
  false,
  'women',
  'silver',
  'none',
  ARRAY['sister', 'friend'],
  ARRAY['say-thanks', 'just-because']
) ON CONFLICT DO NOTHING;

-- =============================================
-- EARRINGS COLLECTION
-- =============================================

-- For Mother - Anniversary
INSERT INTO products (
  name, description, price, stock_quantity, image_url,
  is_featured, gender, metal_type, stone_type,
  relations, occasions
) VALUES (
  'Classic Diamond Studs',
  'Timeless diamond stud earrings in white gold, perfect for any occasion',
  3999.00,
  18,
  'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80',
  true,
  'women',
  'white-gold',
  'diamond',
  ARRAY['mother', 'wife'],
  ARRAY['anniversary', 'birthday']
) ON CONFLICT DO NOTHING;

-- For Sister - Birthday
INSERT INTO products (
  name, description, price, stock_quantity, image_url,
  is_featured, gender, metal_type, stone_type,
  relations, occasions
) VALUES (
  'Rose Gold Hoop Earrings',
  'Trendy rose gold hoop earrings with delicate detailing',
  2499.00,
  22,
  'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=600&q=80',
  true,
  'women',
  'rose-gold',
  'none',
  ARRAY['sister', 'friend', 'girlfriend'],
  ARRAY['birthday', 'just-because']
) ON CONFLICT DO NOTHING;

-- For Friend - Say Thanks
INSERT INTO products (
  name, description, price, stock_quantity, image_url,
  is_featured, gender, metal_type, stone_type,
  relations, occasions
) VALUES (
  'Silver Drop Earrings',
  'Elegant silver drop earrings with crystal accents',
  1599.00,
  28,
  'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&q=80',
  false,
  'women',
  'silver',
  'crystal',
  ARRAY['friend', 'sister'],
  ARRAY['say-thanks', 'birthday']
) ON CONFLICT DO NOTHING;

-- =============================================
-- BRACELETS COLLECTION
-- =============================================

-- For Wife - Anniversary
INSERT INTO products (
  name, description, price, stock_quantity, image_url,
  is_featured, gender, metal_type, stone_type,
  relations, occasions
) VALUES (
  'Diamond Tennis Bracelet',
  'Luxurious tennis bracelet with brilliant diamonds, ultimate elegance',
  8999.00,
  8,
  'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80',
  true,
  'women',
  'white-gold',
  'diamond',
  ARRAY['wife', 'girlfriend'],
  ARRAY['anniversary', 'wedding']
) ON CONFLICT DO NOTHING;

-- For Sister - Just Because
INSERT INTO products (
  name, description, price, stock_quantity, image_url,
  is_featured, gender, metal_type, stone_type,
  relations, occasions
) VALUES (
  'Charm Bracelet',
  'Personalized charm bracelet with meaningful symbols',
  2199.00,
  20,
  'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80',
  false,
  'women',
  'silver',
  'none',
  ARRAY['sister', 'friend'],
  ARRAY['just-because', 'birthday']
) ON CONFLICT DO NOTHING;

-- For Mother - Say Thanks
INSERT INTO products (
  name, description, price, stock_quantity, image_url,
  is_featured, gender, metal_type, stone_type,
  relations, occasions
) VALUES (
  'Gold Bangle Set',
  'Traditional gold bangle set, expressing gratitude and love',
  7499.00,
  10,
  'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80',
  false,
  'women',
  'gold',
  'none',
  ARRAY['mother', 'wife'],
  ARRAY['say-thanks', 'anniversary']
) ON CONFLICT DO NOTHING;

-- =============================================
-- MEN'S JEWELRY
-- =============================================

-- For Him - Birthday
INSERT INTO products (
  name, description, price, stock_quantity, image_url,
  is_featured, gender, metal_type, stone_type,
  relations, occasions
) VALUES (
  'Men''s Silver Chain',
  'Bold silver chain necklace for the modern man',
  3499.00,
  15,
  'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80',
  false,
  'men',
  'silver',
  'none',
  ARRAY['husband', 'boyfriend', 'father', 'brother'],
  ARRAY['birthday', 'just-because']
) ON CONFLICT DO NOTHING;

-- For Him - Wedding
INSERT INTO products (
  name, description, price, stock_quantity, image_url,
  is_featured, gender, metal_type, stone_type,
  relations, occasions
) VALUES (
  'Men''s Tungsten Wedding Band',
  'Sleek tungsten wedding band with brushed finish',
  2999.00,
  12,
  'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80',
  false,
  'men',
  'tungsten',
  'none',
  ARRAY['husband', 'boyfriend'],
  ARRAY['wedding', 'anniversary']
) ON CONFLICT DO NOTHING;

-- =============================================
-- COUPLE SETS
-- =============================================

-- For Couple - Wedding
INSERT INTO products (
  name, description, price, stock_quantity, image_url,
  is_featured, gender, metal_type, stone_type,
  relations, occasions
) VALUES (
  'Matching Wedding Bands Set',
  'Beautiful matching wedding band set for couples',
  9999.00,
  6,
  'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80',
  true,
  'unisex',
  'white-gold',
  'diamond',
  ARRAY['couple', 'wife', 'husband'],
  ARRAY['wedding', 'anniversary']
) ON CONFLICT DO NOTHING;

-- For Couple - Anniversary
INSERT INTO products (
  name, description, price, stock_quantity, image_url,
  is_featured, gender, metal_type, stone_type,
  relations, occasions
) VALUES (
  'His & Hers Bracelet Set',
  'Coordinated bracelet set symbolizing unity and love',
  4999.00,
  10,
  'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80',
  false,
  'unisex',
  'silver',
  'none',
  ARRAY['couple'],
  ARRAY['anniversary', 'just-because']
) ON CONFLICT DO NOTHING;

-- =============================================
-- KIDS JEWELRY
-- =============================================

-- For Kids - Birthday
INSERT INTO products (
  name, description, price, stock_quantity, image_url,
  is_featured, gender, metal_type, stone_type,
  relations, occasions
) VALUES (
  'Children''s Gold Earrings',
  'Adorable small gold earrings safe for kids',
  999.00,
  25,
  'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80',
  false,
  'unisex',
  'gold',
  'none',
  ARRAY['kids', 'daughter', 'son'],
  ARRAY['birthday', 'just-because']
) ON CONFLICT DO NOTHING;

-- For Kids - Say Thanks
INSERT INTO products (
  name, description, price, stock_quantity, image_url,
  is_featured, gender, metal_type, stone_type,
  relations, occasions
) VALUES (
  'Kids Charm Bracelet',
  'Fun and colorful charm bracelet for children',
  799.00,
  30,
  'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80',
  false,
  'unisex',
  'silver',
  'none',
  ARRAY['kids', 'daughter', 'son'],
  ARRAY['say-thanks', 'birthday']
) ON CONFLICT DO NOTHING;

-- =============================================
-- VERIFICATION QUERY
-- =============================================
-- Run this to see all products with their tags:
-- SELECT
--   name,
--   price,
--   relations,
--   occasions,
--   is_featured
-- FROM products
-- ORDER BY created_at DESC;
