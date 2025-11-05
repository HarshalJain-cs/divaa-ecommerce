-- =============================================
-- SAMPLE PRODUCTS - 25 Products (5 per category)
-- Description: Realistic jewelry products for development/testing
-- =============================================

-- ============= RINGS (5 Products) =============

INSERT INTO products (name, description, price, category_id, gender, stock_quantity, metal_type, stone_type, occasions, relations, is_featured, image_url)
SELECT
  'Classic Solitaire Diamond Ring',
  'Timeless elegance with a brilliant-cut 1.5-carat diamond set in platinum. Perfect for engagements and special occasions.',
  4999.99,
  id,
  'women',
  8,
  'platinum',
  'diamond',
  ARRAY['engagement', 'anniversary'],
  ARRAY['wife', 'girlfriend'],
  true,
  '/assets/images/products/placeholder.jpg'
FROM categories WHERE name = 'Rings' LIMIT 1;

INSERT INTO products (name, description, price, category_id, gender, stock_quantity, metal_type, stone_type, occasions, relations, is_featured, image_url)
SELECT
  'Rose Gold Eternity Band',
  'Stunning eternity band featuring continuous diamonds set in 14K rose gold. Symbol of endless love.',
  1899.99,
  id,
  'women',
  15,
  'rose-gold',
  'diamond',
  ARRAY['wedding', 'anniversary'],
  ARRAY['wife'],
  false,
  '/assets/images/products/placeholder.jpg'
FROM categories WHERE name = 'Rings' LIMIT 1;

INSERT INTO products (name, description, price, category_id, gender, stock_quantity, metal_type, stone_type, occasions, relations, is_featured, image_url)
SELECT
  'Sapphire Halo Engagement Ring',
  'Breathtaking blue sapphire surrounded by micro-pavé diamonds in white gold setting.',
  3499.99,
  id,
  'women',
  6,
  'white-gold',
  'sapphire',
  ARRAY['engagement', 'birthday'],
  ARRAY['girlfriend', 'wife'],
  true,
  '/assets/images/products/placeholder.jpg'
FROM categories WHERE name = 'Rings' LIMIT 1;

INSERT INTO products (name, description, price, category_id, gender, stock_quantity, metal_type, stone_type, occasions, relations, is_featured, image_url)
SELECT
  'Emerald Cut Ruby Ring',
  'Bold and sophisticated emerald-cut ruby in yellow gold with accent diamonds.',
  2299.99,
  id,
  'women',
  10,
  'gold',
  'ruby',
  ARRAY['birthday', 'christmas'],
  ARRAY['mother', 'sister'],
  false,
  '/assets/images/products/placeholder.jpg'
FROM categories WHERE name = 'Rings' LIMIT 1;

INSERT INTO products (name, description, price, category_id, gender, stock_quantity, metal_type, stone_type, occasions, relations, is_featured, image_url)
SELECT
  'Vintage Pearl Cocktail Ring',
  'Elegant freshwater pearl set in antique-style sterling silver with filigree details.',
  599.99,
  id,
  'women',
  20,
  'silver',
  'pearl',
  ARRAY['mothers-day', 'birthday'],
  ARRAY['mother', 'friend'],
  false,
  '/assets/images/products/placeholder.jpg'
FROM categories WHERE name = 'Rings' LIMIT 1;

-- ============= NECKLACES (5 Products) =============

INSERT INTO products (name, description, price, category_id, gender, stock_quantity, metal_type, stone_type, occasions, relations, is_featured, image_url)
SELECT
  'Diamond Tennis Necklace',
  'Luxurious 18-inch tennis necklace with 5 carats of brilliant diamonds in platinum.',
  8999.99,
  id,
  'women',
  5,
  'platinum',
  'diamond',
  ARRAY['anniversary', 'valentines'],
  ARRAY['wife'],
  true,
  '/assets/images/products/placeholder.jpg'
FROM categories WHERE name = 'Necklaces' LIMIT 1;

INSERT INTO products (name, description, price, category_id, gender, stock_quantity, metal_type, stone_type, occasions, relations, is_featured, image_url)
SELECT
  'Heart Pendant Necklace',
  'Delicate 14K rose gold heart pendant with diamond accents on 18-inch chain.',
  799.99,
  id,
  'women',
  25,
  'rose-gold',
  'diamond',
  ARRAY['valentines', 'birthday'],
  ARRAY['girlfriend', 'daughter'],
  false,
  '/assets/images/products/placeholder.jpg'
FROM categories WHERE name = 'Necklaces' LIMIT 1;

INSERT INTO products (name, description, price, category_id, gender, stock_quantity, metal_type, stone_type, occasions, relations, is_featured, image_url)
SELECT
  'Tahitian Pearl Strand',
  'Exotic black Tahitian pearls hand-knotted on silk with 14K gold clasp.',
  1599.99,
  id,
  'women',
  12,
  'gold',
  'pearl',
  ARRAY['wedding', 'mothers-day'],
  ARRAY['mother', 'wife'],
  true,
  '/assets/images/products/placeholder.jpg'
FROM categories WHERE name = 'Necklaces' LIMIT 1;

INSERT INTO products (name, description, price, category_id, gender, stock_quantity, metal_type, stone_type, occasions, relations, is_featured, image_url)
SELECT
  'Emerald Drop Necklace',
  'Statement piece featuring a 2-carat emerald drop pendant in white gold.',
  2899.99,
  id,
  'women',
  8,
  'white-gold',
  'emerald',
  ARRAY['anniversary', 'christmas'],
  ARRAY['wife', 'mother'],
  false,
  '/assets/images/products/placeholder.jpg'
FROM categories WHERE name = 'Necklaces' LIMIT 1;

INSERT INTO products (name, description, price, category_id, gender, stock_quantity, metal_type, stone_type, occasions, relations, is_featured, image_url)
SELECT
  'Infinity Symbol Necklace',
  'Modern sterling silver infinity pendant symbolizing eternal love and friendship.',
  299.99,
  id,
  'women',
  40,
  'silver',
  NULL,
  ARRAY['birthday', 'valentines'],
  ARRAY['friend', 'sister'],
  false,
  '/assets/images/products/placeholder.jpg'
FROM categories WHERE name = 'Necklaces' LIMIT 1;

-- ============= EARRINGS (5 Products) =============

INSERT INTO products (name, description, price, category_id, gender, stock_quantity, metal_type, stone_type, occasions, relations, is_featured, image_url)
SELECT
  'Diamond Hoop Earrings',
  'Classic 1-inch hoops adorned with brilliant-cut diamonds in 14K white gold.',
  1299.99,
  id,
  'women',
  18,
  'white-gold',
  'diamond',
  ARRAY['birthday', 'christmas'],
  ARRAY['wife', 'girlfriend'],
  true,
  '/assets/images/products/placeholder.jpg'
FROM categories WHERE name = 'Earrings' LIMIT 1;

INSERT INTO products (name, description, price, category_id, gender, stock_quantity, metal_type, stone_type, occasions, relations, is_featured, image_url)
SELECT
  'Ruby Teardrop Earrings',
  'Elegant teardrop-shaped rubies with diamond accents in yellow gold settings.',
  1799.99,
  id,
  'women',
  14,
  'gold',
  'ruby',
  ARRAY['anniversary', 'valentines'],
  ARRAY['wife', 'mother'],
  false,
  '/assets/images/products/placeholder.jpg'
FROM categories WHERE name = 'Earrings' LIMIT 1;

INSERT INTO products (name, description, price, category_id, gender, stock_quantity, metal_type, stone_type, occasions, relations, is_featured, image_url)
SELECT
  'Pearl Stud Earrings',
  'Timeless 7mm freshwater pearl studs in 14K gold settings. Perfect for everyday wear.',
  449.99,
  id,
  'women',
  30,
  'gold',
  'pearl',
  ARRAY['mothers-day', 'birthday'],
  ARRAY['mother', 'daughter'],
  false,
  '/assets/images/products/placeholder.jpg'
FROM categories WHERE name = 'Earrings' LIMIT 1;

INSERT INTO products (name, description, price, category_id, gender, stock_quantity, metal_type, stone_type, occasions, relations, is_featured, image_url)
SELECT
  'Sapphire Chandelier Earrings',
  'Dramatic chandelier earrings with cascading sapphires and diamonds in white gold.',
  3299.99,
  id,
  'women',
  7,
  'white-gold',
  'sapphire',
  ARRAY['wedding', 'anniversary'],
  ARRAY['wife'],
  true,
  '/assets/images/products/placeholder.jpg'
FROM categories WHERE name = 'Earrings' LIMIT 1;

INSERT INTO products (name, description, price, category_id, gender, stock_quantity, metal_type, stone_type, occasions, relations, is_featured, image_url)
SELECT
  'Rose Gold Geometric Earrings',
  'Contemporary geometric design in polished rose gold, perfect for modern style.',
  399.99,
  id,
  'women',
  22,
  'rose-gold',
  NULL,
  ARRAY['birthday'],
  ARRAY['sister', 'friend'],
  false,
  '/assets/images/products/placeholder.jpg'
FROM categories WHERE name = 'Earrings' LIMIT 1;

-- ============= BRACELETS (5 Products) =============

INSERT INTO products (name, description, price, category_id, gender, stock_quantity, metal_type, stone_type, occasions, relations, is_featured, image_url)
SELECT
  'Diamond Tennis Bracelet',
  '7-inch tennis bracelet featuring 3 carats of round diamonds in platinum.',
  5499.99,
  id,
  'women',
  10,
  'platinum',
  'diamond',
  ARRAY['anniversary', 'valentines'],
  ARRAY['wife'],
  true,
  '/assets/images/products/placeholder.jpg'
FROM categories WHERE name = 'Bracelets' LIMIT 1;

INSERT INTO products (name, description, price, category_id, gender, stock_quantity, metal_type, stone_type, occasions, relations, is_featured, image_url)
SELECT
  'Charm Bracelet Collection',
  'Sterling silver bracelet with 5 meaningful charms including heart, key, and infinity symbols.',
  599.99,
  id,
  'women',
  20,
  'silver',
  NULL,
  ARRAY['birthday', 'christmas'],
  ARRAY['daughter', 'sister'],
  false,
  '/assets/images/products/placeholder.jpg'
FROM categories WHERE name = 'Bracelets' LIMIT 1;

INSERT INTO products (name, description, price, category_id, gender, stock_quantity, metal_type, stone_type, occasions, relations, is_featured, image_url)
SELECT
  'Emerald Bangle Set',
  'Set of 3 stackable bangles with emerald accents in 18K yellow gold.',
  2199.99,
  id,
  'women',
  12,
  'gold',
  'emerald',
  ARRAY['wedding', 'anniversary'],
  ARRAY['wife', 'mother'],
  false,
  '/assets/images/products/placeholder.jpg'
FROM categories WHERE name = 'Bracelets' LIMIT 1;

INSERT INTO products (name, description, price, category_id, gender, stock_quantity, metal_type, stone_type, occasions, relations, is_featured, image_url)
SELECT
  'Pearl Strand Bracelet',
  'Double-strand freshwater pearl bracelet with ornate gold clasp.',
  899.99,
  id,
  'women',
  16,
  'gold',
  'pearl',
  ARRAY['mothers-day', 'wedding'],
  ARRAY['mother'],
  false,
  '/assets/images/products/placeholder.jpg'
FROM categories WHERE name = 'Bracelets' LIMIT 1;

INSERT INTO products (name, description, price, category_id, gender, stock_quantity, metal_type, stone_type, occasions, relations, is_featured, image_url)
SELECT
  'Rose Gold Link Bracelet',
  'Modern interlocking link design in polished 14K rose gold.',
  1099.99,
  id,
  'women',
  18,
  'rose-gold',
  NULL,
  ARRAY['birthday', 'valentines'],
  ARRAY['girlfriend', 'wife'],
  false,
  '/assets/images/products/placeholder.jpg'
FROM categories WHERE name = 'Bracelets' LIMIT 1;

-- ============= SETS (5 Products) =============

INSERT INTO products (name, description, price, category_id, gender, stock_quantity, metal_type, stone_type, occasions, relations, is_featured, image_url)
SELECT
  'Bridal Diamond Set',
  'Complete bridal set: diamond necklace, earrings, and bracelet in white gold.',
  12999.99,
  id,
  'women',
  4,
  'white-gold',
  'diamond',
  ARRAY['wedding', 'engagement'],
  ARRAY['wife'],
  true,
  '/assets/images/products/placeholder.jpg'
FROM categories WHERE name = 'Sets' LIMIT 1;

INSERT INTO products (name, description, price, category_id, gender, stock_quantity, metal_type, stone_type, occasions, relations, is_featured, image_url)
SELECT
  'Pearl Ensemble Set',
  'Matching pearl necklace and earrings set in 14K gold, perfect for formal occasions.',
  1999.99,
  id,
  'women',
  10,
  'gold',
  'pearl',
  ARRAY['mothers-day', 'wedding'],
  ARRAY['mother', 'wife'],
  false,
  '/assets/images/products/placeholder.jpg'
FROM categories WHERE name = 'Sets' LIMIT 1;

INSERT INTO products (name, description, price, category_id, gender, stock_quantity, metal_type, stone_type, occasions, relations, is_featured, image_url)
SELECT
  'Ruby Deluxe Set',
  'Luxurious set featuring ruby necklace, ring, and earrings in yellow gold.',
  8499.99,
  id,
  'women',
  5,
  'gold',
  'ruby',
  ARRAY['anniversary', 'valentines'],
  ARRAY['wife'],
  true,
  '/assets/images/products/placeholder.jpg'
FROM categories WHERE name = 'Sets' LIMIT 1;

INSERT INTO products (name, description, price, category_id, gender, stock_quantity, metal_type, stone_type, occasions, relations, is_featured, image_url)
SELECT
  'Everyday Elegance Set',
  'Simple yet elegant: silver necklace, bracelet, and stud earrings for daily wear.',
  699.99,
  id,
  'women',
  25,
  'silver',
  NULL,
  ARRAY['birthday', 'christmas'],
  ARRAY['daughter', 'sister'],
  false,
  '/assets/images/products/placeholder.jpg'
FROM categories WHERE name = 'Sets' LIMIT 1;

INSERT INTO products (name, description, price, category_id, gender, stock_quantity, metal_type, stone_type, occasions, relations, is_featured, image_url)
SELECT
  'Sapphire Collection Set',
  'Stunning sapphire set: pendant necklace, drop earrings, and tennis bracelet.',
  6999.99,
  id,
  'women',
  6,
  'white-gold',
  'sapphire',
  ARRAY['anniversary', 'engagement'],
  ARRAY['wife', 'girlfriend'],
  true,
  '/assets/images/products/placeholder.jpg'
FROM categories WHERE name = 'Sets' LIMIT 1;
