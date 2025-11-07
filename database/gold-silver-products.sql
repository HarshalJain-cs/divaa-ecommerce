-- ============================================
-- GOLD & SILVER PRODUCTS SQL
-- DIVAA E-COMMERCE - Complete Product Catalog
-- ============================================
-- Instructions:
-- 1. First run gold-silver-categories.sql
-- 2. Then run this file in your Supabase SQL Editor
-- 3. Images are saved in /home/user/Downloads with naming: gold-rings-001.jpg, etc.
-- 4. Upload images to Supabase Storage bucket: 'product-images'
-- 5. Update image_url with your Supabase storage URL pattern
-- ============================================

-- ============================================
-- WOMEN'S GOLD RINGS (Category: Gold Rings)
-- ============================================

INSERT INTO products (name, description, price, category_id, metal_type, gender, stock_quantity, image_url)
SELECT
  name, description, price,
  (SELECT id FROM categories WHERE name = 'Gold Rings' AND metal_type = 'gold' LIMIT 1),
  'gold', 'women', 20, image_url
FROM (VALUES
  ('Eternal Solitaire Gold Ring', 'Classic 14K gold solitaire ring with a brilliant-cut lab-grown diamond. Perfect for engagements and special occasions.', 15999, 'gold-rings-001.jpg'),
  ('Royal Filigree Gold Ring', 'Intricate 18K gold filigree work with delicate patterns. A masterpiece of traditional craftsmanship.', 12499, 'gold-rings-002.jpg'),
  ('Diamond Cluster Gold Ring', 'Stunning cluster of lab-grown diamonds set in 14K yellow gold. Makes a bold statement.', 18999, 'gold-rings-003.jpg'),
  ('Twisted Band Gold Ring', 'Contemporary twisted band design in 18K gold. Elegant and modern for everyday wear.', 8999, 'gold-rings-004.jpg'),
  ('Floral Motif Gold Ring', 'Delicate floral design with CZ stones in 14K gold. Perfect for nature lovers.', 6999, 'gold-rings-005.jpg'),
  ('Infinity Symbol Gold Ring', 'Beautiful infinity symbol in polished 18K gold. Represents eternal love and friendship.', 7499, 'gold-rings-006.jpg'),
  ('Vintage Rose Gold Ring', 'Vintage-inspired design in rose gold with milgrain detailing. Timeless elegance.', 9999, 'gold-rings-007.jpg'),
  ('Geometric Gold Ring', 'Modern geometric design in 14K gold. Perfect for the contemporary woman.', 5999, 'gold-rings-008.jpg'),
  ('Pearl Drop Gold Ring', 'Elegant freshwater pearl set in yellow gold. Sophisticated and unique.', 8499, 'gold-rings-009.jpg'),
  ('Crown Design Gold Ring', 'Regal crown-inspired design in 18K gold with CZ stones. Feel like royalty.', 11999, 'gold-rings-010.jpg'),
  ('Minimalist Gold Band', 'Sleek and simple 14K gold band. Perfect for stacking or solo wear.', 4999, 'gold-rings-011.jpg'),
  ('Heart Shaped Gold Ring', 'Romantic heart design with tiny diamonds in 14K gold. Perfect gift for loved ones.', 7999, 'gold-rings-012.jpg')
) AS data(name, description, price, image_url);

-- ============================================
-- WOMEN'S GOLD EARRINGS (Category: Gold Earrings)
-- ============================================

INSERT INTO products (name, description, price, category_id, metal_type, gender, stock_quantity, image_url)
SELECT
  name, description, price,
  (SELECT id FROM categories WHERE name = 'Gold Earrings' AND metal_type = 'gold' LIMIT 1),
  'gold', 'women', 20, image_url
FROM (VALUES
  ('Diamond Stud Gold Earrings', 'Classic diamond studs in 14K gold. A wardrobe essential for every woman.', 12999, 'gold-earrings-001.jpg'),
  ('Gold Hoop Earrings', 'Elegant 18K gold hoops with a polished finish. Versatile for any occasion.', 8999, 'gold-earrings-002.jpg'),
  ('Chandelier Gold Earrings', 'Stunning chandelier design with CZ stones in yellow gold. Perfect for weddings.', 16999, 'gold-earrings-003.jpg'),
  ('Pearl Drop Gold Earrings', 'Freshwater pearls suspended from 14K gold hooks. Classic elegance.', 9999, 'gold-earrings-004.jpg'),
  ('Butterfly Gold Earrings', 'Whimsical butterfly design in rose gold with enamel detailing.', 6999, 'gold-earrings-005.jpg'),
  ('Geometric Drop Earrings', 'Contemporary geometric design in 18K gold. Modern sophistication.', 10999, 'gold-earrings-006.jpg'),
  ('Floral Cluster Earrings', 'Delicate floral clusters with CZ stones in yellow gold.', 8499, 'gold-earrings-007.jpg'),
  ('Teardrop Gold Earrings', 'Elegant teardrop shape with diamond accents in 14K gold.', 11999, 'gold-earrings-008.jpg'),
  ('Gold Ear Cuffs', 'Trendy ear cuffs in 18K gold. No piercing required for second cuff.', 5999, 'gold-earrings-009.jpg'),
  ('Dangle Heart Earrings', 'Romantic dangling hearts in rose gold with sparkling CZ.', 7999, 'gold-earrings-010.jpg'),
  ('Gold Ball Stud Earrings', 'Simple gold ball studs in 14K gold. Perfect for everyday wear.', 4999, 'gold-earrings-011.jpg'),
  ('Vintage Gold Jhumkas', 'Traditional jhumka design with modern twist in 18K gold.', 13999, 'gold-earrings-012.jpg')
) AS data(name, description, price, image_url);

-- ============================================
-- WOMEN'S GOLD NECKLACES (Category: Gold Necklaces)
-- ============================================

INSERT INTO products (name, description, price, category_id, metal_type, gender, stock_quantity, image_url)
SELECT
  name, description, price,
  (SELECT id FROM categories WHERE name = 'Gold Necklaces' AND metal_type = 'gold' LIMIT 1),
  'gold', 'women', 20, image_url
FROM (VALUES
  ('Layered Gold Necklace', 'Trendy multi-layered necklace in 14K gold. Adjust layers for different looks.', 14999, 'gold-necklaces-001.jpg'),
  ('Choker Gold Necklace', 'Elegant choker design in 18K gold with CZ stones. Perfect for evening wear.', 18999, 'gold-necklaces-002.jpg'),
  ('Pearl Strand Gold Necklace', 'Classic pearl strand with gold clasp and accents. Timeless beauty.', 16999, 'gold-necklaces-003.jpg'),
  ('Gold Coin Necklace', 'Delicate chain with small gold coin pendants. Minimalist chic.', 11999, 'gold-necklaces-004.jpg'),
  ('Statement Gold Necklace', 'Bold statement piece with geometric design in yellow gold.', 22999, 'gold-necklaces-005.jpg'),
  ('Delicate Gold Chain', 'Simple and elegant 14K gold chain. Perfect for pendant addition.', 7999, 'gold-necklaces-006.jpg'),
  ('Bib Style Gold Necklace', 'Dramatic bib necklace with intricate filigree work in 18K gold.', 25999, 'gold-necklaces-007.jpg'),
  ('Y-Shape Gold Necklace', 'Modern Y-shaped lariat in rose gold. Adjustable length.', 12999, 'gold-necklaces-008.jpg')
) AS data(name, description, price, image_url);

-- ============================================
-- WOMEN'S GOLD PENDANTS (Category: Gold Pendants)
-- ============================================

INSERT INTO products (name, description, price, category_id, metal_type, gender, stock_quantity, image_url)
SELECT
  name, description, price,
  (SELECT id FROM categories WHERE name = 'Gold Pendants' AND metal_type = 'gold' LIMIT 1),
  'gold', 'women', 20, image_url
FROM (VALUES
  ('Heart Gold Pendant', 'Classic heart pendant in 14K gold with diamond accent.', 6999, 'gold-pendants-001.jpg'),
  ('Initial Gold Pendant', 'Personalized initial pendant in 18K gold. Choose your letter.', 5999, 'gold-pendants-002.jpg'),
  ('Evil Eye Gold Pendant', 'Protective evil eye design with blue enamel in yellow gold.', 4999, 'gold-pendants-003.jpg'),
  ('Hamsa Hand Gold Pendant', 'Spiritual hamsa hand with CZ stones in 14K gold.', 7999, 'gold-pendants-004.jpg'),
  ('Infinity Gold Pendant', 'Infinity symbol with diamonds in rose gold. Symbol of eternal love.', 8999, 'gold-pendants-005.jpg'),
  ('Tree of Life Pendant', 'Intricate tree of life design in 18K gold with green CZ.', 9999, 'gold-pendants-006.jpg'),
  ('Cross Gold Pendant', 'Delicate cross pendant in yellow gold. Faith and elegance.', 5499, 'gold-pendants-007.jpg'),
  ('Star Gold Pendant', 'Celestial star design with diamond accents in 14K gold.', 6499, 'gold-pendants-008.jpg')
) AS data(name, description, price, image_url);

-- ============================================
-- WOMEN'S GOLD BRACELETS (Category: Gold Bracelets)
-- ============================================

INSERT INTO products (name, description, price, category_id, metal_type, gender, stock_quantity, image_url)
SELECT
  name, description, price,
  (SELECT id FROM categories WHERE name = 'Gold Bracelets' AND metal_type = 'gold' LIMIT 1),
  'gold', 'women', 20, image_url
FROM (VALUES
  ('Tennis Gold Bracelet', 'Classic tennis bracelet with lab-grown diamonds in 14K gold.', 19999, 'gold-bracelets-001.jpg'),
  ('Charm Gold Bracelet', 'Delicate chain bracelet with hanging charms in 18K gold.', 11999, 'gold-bracelets-002.jpg'),
  ('Cuff Gold Bracelet', 'Bold cuff bracelet with engraved patterns in yellow gold.', 14999, 'gold-bracelets-003.jpg'),
  ('Link Gold Bracelet', 'Sophisticated link design in rose gold. Adjustable size.', 9999, 'gold-bracelets-004.jpg'),
  ('Beaded Gold Bracelet', 'Delicate gold beads on elastic cord. Stackable design.', 5999, 'gold-bracelets-005.jpg'),
  ('Bar Gold Bracelet', 'Minimalist bar bracelet in 14K gold. Perfect for engraving.', 6999, 'gold-bracelets-006.jpg'),
  ('Bangle Set Gold', 'Set of 4 gold bangles in mixed textures. Traditional elegance.', 16999, 'gold-bracelets-007.jpg'),
  ('Chain Gold Bracelet', 'Classic chain bracelet in 18K gold with secure clasp.', 8999, 'gold-bracelets-008.jpg')
) AS data(name, description, price, image_url);

-- ============================================
-- WOMEN'S SILVER RINGS (Category: Silver Rings)
-- ============================================

INSERT INTO products (name, description, price, category_id, metal_type, gender, stock_quantity, image_url)
SELECT
  name, description, price,
  (SELECT id FROM categories WHERE name = 'Silver Rings' AND metal_type = 'silver' LIMIT 1),
  'silver', 'women', 20, image_url
FROM (VALUES
  ('CZ Solitaire Silver Ring', '925 sterling silver ring with brilliant CZ stone. Affordable elegance.', 2999, 'silver-rings-001.jpg'),
  ('Oxidized Silver Ring', 'Traditional oxidized silver ring with intricate tribal patterns.', 1999, 'silver-rings-002.jpg'),
  ('Floral Silver Ring', 'Delicate flower design in polished 925 silver with pink CZ.', 2499, 'silver-rings-003.jpg'),
  ('Stackable Silver Rings', 'Set of 3 stackable silver rings. Mix and match for your style.', 3499, 'silver-rings-004.jpg'),
  ('Twisted Silver Band', 'Contemporary twisted band in 925 silver. Modern minimalism.', 1799, 'silver-rings-005.jpg'),
  ('Moonstone Silver Ring', 'Mystical moonstone set in sterling silver. Bohemian elegance.', 3999, 'silver-rings-006.jpg'),
  ('Infinity Silver Ring', 'Infinity symbol with sparkling CZ in 925 silver.', 2199, 'silver-rings-007.jpg'),
  ('Open Adjustable Ring', 'Adjustable open ring with leaf design. Fits all sizes.', 1599, 'silver-rings-008.jpg'),
  ('Crown Silver Ring', 'Cute crown design with CZ stones. Feel like a princess.', 2799, 'silver-rings-009.jpg'),
  ('Vintage Silver Ring', 'Antique-finish silver ring with marcasite stones.', 3299, 'silver-rings-010.jpg'),
  ('Geometric Silver Ring', 'Bold geometric design in polished sterling silver.', 2499, 'silver-rings-011.jpg'),
  ('Pearl Silver Ring', 'Freshwater pearl set in 925 silver. Classic beauty.', 2999, 'silver-rings-012.jpg')
) AS data(name, description, price, image_url);

-- ============================================
-- WOMEN'S SILVER EARRINGS (Category: Silver Earrings)
-- ============================================

INSERT INTO products (name, description, price, category_id, metal_type, gender, stock_quantity, image_url)
SELECT
  name, description, price,
  (SELECT id FROM categories WHERE name = 'Silver Earrings' AND metal_type = 'silver' LIMIT 1),
  'silver', 'women', 20, image_url
FROM (VALUES
  ('CZ Stud Silver Earrings', 'Classic CZ studs in 925 sterling silver. Everyday essential.', 1999, 'silver-earrings-001.jpg'),
  ('Silver Hoop Earrings', 'Medium-sized hoops in polished 925 silver. Versatile style.', 2499, 'silver-earrings-002.jpg'),
  ('Drop Silver Earrings', 'Elegant drop design with dangling CZ stones in silver.', 2999, 'silver-earrings-003.jpg'),
  ('Oxidized Jhumka Earrings', 'Traditional jhumka design with oxidized finish. Ethnic charm.', 3499, 'silver-earrings-004.jpg'),
  ('Pearl Silver Earrings', 'Lustrous pearls hanging from silver hooks. Timeless grace.', 2799, 'silver-earrings-005.jpg'),
  ('Butterfly Silver Earrings', 'Whimsical butterfly studs with enamel detailing.', 1799, 'silver-earrings-006.jpg'),
  ('Threader Silver Earrings', 'Modern threader design in 925 silver. Sleek and minimal.', 2199, 'silver-earrings-007.jpg'),
  ('Chandbali Silver Earrings', 'Crescent moon chandbali with intricate patterns.', 4999, 'silver-earrings-008.jpg'),
  ('Heart Stud Earrings', 'Cute heart-shaped studs in polished silver.', 1599, 'silver-earrings-009.jpg'),
  ('Cluster Silver Earrings', 'Clustered CZ stones in flower pattern. Sparkle and shine.', 3299, 'silver-earrings-010.jpg'),
  ('Huggie Silver Earrings', 'Small huggie hoops with pave CZ. Comfortable all-day wear.', 2599, 'silver-earrings-011.jpg'),
  ('Tassel Silver Earrings', 'Bohemian tassel design with silver chains. Statement piece.', 2999, 'silver-earrings-012.jpg')
) AS data(name, description, price, image_url);

-- ============================================
-- WOMEN'S SILVER NECKLACES (Category: Silver Necklaces)
-- ============================================

INSERT INTO products (name, description, price, category_id, metal_type, gender, stock_quantity, image_url)
SELECT
  name, description, price,
  (SELECT id FROM categories WHERE name = 'Silver Necklaces' AND metal_type = 'silver' LIMIT 1),
  'silver', 'women', 20, image_url
FROM (VALUES
  ('Layered Silver Necklace', 'Multi-strand necklace in 925 silver. Trendy layered look.', 4999, 'silver-necklaces-001.jpg'),
  ('Choker Silver Necklace', 'Elegant choker with CZ stones. Perfect for parties.', 3999, 'silver-necklaces-002.jpg'),
  ('Oxidized Silver Necklace', 'Traditional oxidized silver with tribal motifs. Ethnic elegance.', 5999, 'silver-necklaces-003.jpg'),
  ('Pearl Silver Necklace', 'Freshwater pearls with silver clasp. Bridal beauty.', 6999, 'silver-necklaces-004.jpg'),
  ('Coin Silver Necklace', 'Delicate chain with coin pendants. Boho chic.', 3499, 'silver-necklaces-005.jpg'),
  ('Y-Necklace Silver', 'Modern Y-shape lariat in sterling silver. Adjustable.', 4499, 'silver-necklaces-006.jpg'),
  ('Statement Silver Necklace', 'Bold collar-style necklace with geometric design.', 7999, 'silver-necklaces-007.jpg'),
  ('Simple Silver Chain', 'Classic 925 silver chain. Perfect for pendant addition.', 2499, 'silver-necklaces-008.jpg')
) AS data(name, description, price, image_url);

-- ============================================
-- WOMEN'S SILVER PENDANTS (Category: Silver Pendants)
-- ============================================

INSERT INTO products (name, description, price, category_id, metal_type, gender, stock_quantity, image_url)
SELECT
  name, description, price,
  (SELECT id FROM categories WHERE name = 'Silver Pendants' AND metal_type = 'silver' LIMIT 1),
  'silver', 'women', 20, image_url
FROM (VALUES
  ('Heart Silver Pendant', 'Classic heart pendant in 925 silver with CZ.', 1999, 'silver-pendants-001.jpg'),
  ('Om Symbol Pendant', 'Sacred Om symbol in oxidized silver. Spiritual jewelry.', 1799, 'silver-pendants-002.jpg'),
  ('Moon Phase Pendant', 'Celestial moon phases design in sterling silver.', 2499, 'silver-pendants-003.jpg'),
  ('Tree of Life Pendant', 'Intricate tree design with green CZ stones.', 2999, 'silver-pendants-004.jpg'),
  ('Hamsa Silver Pendant', 'Protective hamsa hand with blue enamel.', 2199, 'silver-pendants-005.jpg'),
  ('Initial Silver Pendant', 'Personalized initial charm in polished silver.', 1599, 'silver-pendants-006.jpg'),
  ('Angel Wing Pendant', 'Delicate angel wings in 925 silver. Guardian angel.', 2299, 'silver-pendants-007.jpg'),
  ('Lotus Flower Pendant', 'Beautiful lotus design in oxidized silver.', 2799, 'silver-pendants-008.jpg')
) AS data(name, description, price, image_url);

-- ============================================
-- WOMEN'S SILVER BRACELETS (Category: Silver Bracelets)
-- ============================================

INSERT INTO products (name, description, price, category_id, metal_type, gender, stock_quantity, image_url)
SELECT
  name, description, price,
  (SELECT id FROM categories WHERE name = 'Silver Bracelets' AND metal_type = 'silver' LIMIT 1),
  'silver', 'women', 20, image_url
FROM (VALUES
  ('Charm Silver Bracelet', '925 silver chain with dangling charms. Customizable.', 3999, 'silver-bracelets-001.jpg'),
  ('Cuff Silver Bracelet', 'Wide cuff with engraved patterns. Bold statement.', 4999, 'silver-bracelets-002.jpg'),
  ('Link Silver Bracelet', 'Classic link design in polished sterling silver.', 3299, 'silver-bracelets-003.jpg'),
  ('Bangle Silver Bracelet', 'Set of 4 thin silver bangles. Stack them up.', 3999, 'silver-bracelets-004.jpg'),
  ('Beaded Silver Bracelet', 'Silver beads on elastic cord. Comfortable fit.', 2499, 'silver-bracelets-005.jpg'),
  ('Chain Silver Bracelet', 'Delicate chain with adjustable clasp.', 2799, 'silver-bracelets-006.jpg'),
  ('Tennis Silver Bracelet', 'CZ tennis bracelet in 925 silver. Sparkle and shine.', 5999, 'silver-bracelets-007.jpg'),
  ('Oxidized Silver Kada', 'Traditional kada with tribal patterns. Ethnic style.', 4499, 'silver-bracelets-008.jpg')
) AS data(name, description, price, image_url);

-- ============================================
-- MEN'S GOLD RINGS (Category: Men's Gold Rings)
-- ============================================

INSERT INTO products (name, description, price, category_id, metal_type, gender, stock_quantity, image_url)
SELECT
  name, description, price,
  (SELECT id FROM categories WHERE name = 'Men''s Gold Rings' AND metal_type = 'gold' LIMIT 1),
  'gold', 'men', 20, image_url
FROM (VALUES
  ('Men''s Signet Gold Ring', 'Classic signet ring in 18K gold. Perfect for engraving.', 16999, 'men-gold-rings-001.jpg'),
  ('Men''s Band Gold Ring', 'Wide band with brushed finish in 14K gold. Masculine elegance.', 12999, 'men-gold-rings-002.jpg'),
  ('Men''s Diamond Ring', 'Bold ring with solitaire diamond in yellow gold.', 24999, 'men-gold-rings-003.jpg'),
  ('Men''s Tiger Design Ring', 'Fierce tiger face design in 18K gold. Power statement.', 18999, 'men-gold-rings-004.jpg'),
  ('Men''s Minimalist Ring', 'Sleek minimalist band in rose gold. Modern sophistication.', 9999, 'men-gold-rings-005.jpg')
) AS data(name, description, price, image_url);

-- ============================================
-- MEN'S GOLD BRACELETS (Category: Men's Gold Bracelets)
-- ============================================

INSERT INTO products (name, description, price, category_id, metal_type, gender, stock_quantity, image_url)
SELECT
  name, description, price,
  (SELECT id FROM categories WHERE name = 'Men''s Gold Bracelets' AND metal_type = 'gold' LIMIT 1),
  'gold', 'men', 20, image_url
FROM (VALUES
  ('Men''s Cuban Link Bracelet', 'Heavy Cuban link bracelet in 18K gold. Bold and luxurious.', 34999, 'men-gold-bracelets-001.jpg'),
  ('Men''s ID Bracelet', 'Classic ID bracelet in 14K gold. Engrave your name.', 19999, 'men-gold-bracelets-002.jpg'),
  ('Men''s Rope Bracelet', 'Twisted rope design in yellow gold. Nautical style.', 16999, 'men-gold-bracelets-003.jpg'),
  ('Men''s Leather Gold Bracelet', 'Brown leather with gold clasp and accents.', 8999, 'men-gold-bracelets-004.jpg')
) AS data(name, description, price, image_url);

-- ============================================
-- MEN'S GOLD CHAINS (Category: Men's Gold Chains)
-- ============================================

INSERT INTO products (name, description, price, category_id, metal_type, gender, stock_quantity, image_url)
SELECT
  name, description, price,
  (SELECT id FROM categories WHERE name = 'Men''s Gold Chains' AND metal_type = 'gold' LIMIT 1),
  'gold', 'men', 20, image_url
FROM (VALUES
  ('Men''s Rope Chain Gold', 'Heavy rope chain in 18K gold, 22 inches. Classic style.', 45999, 'men-gold-chains-001.jpg'),
  ('Men''s Cuban Chain Gold', 'Thick Cuban link chain in yellow gold. Hip-hop inspired.', 52999, 'men-gold-chains-002.jpg'),
  ('Men''s Box Chain Gold', 'Sleek box chain in 14K gold. Versatile for pendants.', 24999, 'men-gold-chains-003.jpg'),
  ('Men''s Figaro Chain Gold', 'Traditional figaro pattern in 18K gold, 24 inches.', 38999, 'men-gold-chains-004.jpg')
) AS data(name, description, price, image_url);

-- ============================================
-- MEN'S SILVER RINGS (Category: Men's Silver Rings)
-- ============================================

INSERT INTO products (name, description, price, category_id, metal_type, gender, stock_quantity, image_url)
SELECT
  name, description, price,
  (SELECT id FROM categories WHERE name = 'Men''s Silver Rings' AND metal_type = 'silver' LIMIT 1),
  'silver', 'men', 20, image_url
FROM (VALUES
  ('Men''s Signet Silver Ring', 'Classic signet in 925 silver with oxidized finish.', 3999, 'men-silver-rings-001.jpg'),
  ('Men''s Band Silver Ring', 'Wide band with textured surface. Masculine design.', 2999, 'men-silver-rings-002.jpg'),
  ('Men''s Stone Ring Silver', 'Bold ring with black onyx stone in sterling silver.', 4999, 'men-silver-rings-003.jpg'),
  ('Men''s Skull Ring', 'Edgy skull design in oxidized silver. Rock style.', 3499, 'men-silver-rings-004.jpg'),
  ('Men''s Spinner Ring', 'Stress-relief spinner ring in polished silver.', 2799, 'men-silver-rings-005.jpg')
) AS data(name, description, price, image_url);

-- ============================================
-- MEN'S SILVER BRACELETS (Category: Men's Silver Bracelets)
-- ============================================

INSERT INTO products (name, description, price, category_id, metal_type, gender, stock_quantity, image_url)
SELECT
  name, description, price,
  (SELECT id FROM categories WHERE name = 'Men''s Silver Bracelets' AND metal_type = 'silver' LIMIT 1),
  'silver', 'men', 20, image_url
FROM (VALUES
  ('Men''s Cuban Link Silver', 'Heavy Cuban link in 925 silver. Bold statement.', 6999, 'men-silver-bracelets-001.jpg'),
  ('Men''s ID Bracelet Silver', 'Classic ID bracelet in sterling silver. Engravable.', 4999, 'men-silver-bracelets-002.jpg'),
  ('Men''s Chain Bracelet', 'Thick chain bracelet in polished silver.', 5499, 'men-silver-bracelets-003.jpg'),
  ('Men''s Leather Silver', 'Black braided leather with silver clasp.', 2999, 'men-silver-bracelets-004.jpg')
) AS data(name, description, price, image_url);

-- ============================================
-- MEN'S SILVER CHAINS (Category: Men's Silver Chains)
-- ============================================

INSERT INTO products (name, description, price, category_id, metal_type, gender, stock_quantity, image_url)
SELECT
  name, description, price,
  (SELECT id FROM categories WHERE name = 'Men''s Silver Chains' AND metal_type = 'silver' LIMIT 1),
  'silver', 'men', 20, image_url
FROM (VALUES
  ('Men''s Rope Chain Silver', 'Heavy rope chain in 925 silver, 22 inches.', 7999, 'men-silver-chains-001.jpg'),
  ('Men''s Cuban Chain Silver', 'Thick Cuban link in sterling silver, 24 inches.', 8999, 'men-silver-chains-002.jpg'),
  ('Men''s Box Chain Silver', 'Sleek box chain, perfect for pendants.', 4999, 'men-silver-chains-003.jpg'),
  ('Men''s Curb Chain Silver', 'Classic curb pattern in oxidized silver.', 5999, 'men-silver-chains-004.jpg')
) AS data(name, description, price, image_url);

-- ============================================
-- ADDITIONAL CATEGORIES - WOMEN'S GOLD
-- (Chains, Bangles, Mangalsutra, Anklets, Nosepins, Sets)
-- ============================================
-- Note: These are additional products for comprehensive catalog
-- Run these separately if needed or include in main import
-- ============================================

-- Gold Anklets
INSERT INTO products (name, description, price, category_id, metal_type, gender, stock_quantity, image_url)
SELECT
  name, description, price,
  (SELECT id FROM categories WHERE name = 'Gold Anklets' AND metal_type = 'gold' LIMIT 1),
  'gold', 'women', 20, image_url
FROM (VALUES
  ('Delicate Gold Anklet', 'Simple chain anklet in 14K gold. Perfect for beach wear.', 5999, 'gold-anklets-001.jpg'),
  ('Charm Gold Anklet', 'Anklet with tiny hanging charms in yellow gold.', 7999, 'gold-anklets-002.jpg'),
  ('Beaded Gold Anklet', 'Gold beads with traditional ghungroo bells.', 9999, 'gold-anklets-003.jpg'),
  ('Double Chain Anklet', 'Elegant double-strand anklet in 18K gold.', 11999, 'gold-anklets-004.jpg')
) AS data(name, description, price, image_url);

-- Gold Nosepins
INSERT INTO products (name, description, price, category_id, metal_type, gender, stock_quantity, image_url)
SELECT
  name, description, price,
  (SELECT id FROM categories WHERE name = 'Gold Nosepins' AND metal_type = 'gold' LIMIT 1),
  'gold', 'women', 20, image_url
FROM (VALUES
  ('Diamond Gold Nosepin', 'Tiny diamond stud in 14K gold. Classic elegance.', 3999, 'gold-nosepins-001.jpg'),
  ('Floral Gold Nosepin', 'Delicate flower design with CZ in yellow gold.', 2999, 'gold-nosepins-002.jpg'),
  ('Screw Pattern Nosepin', 'Traditional screw-type nosepin in 18K gold.', 3499, 'gold-nosepins-003.jpg'),
  ('L-Shape Gold Nosepin', 'Modern L-shape pin with small pearl.', 2799, 'gold-nosepins-004.jpg')
) AS data(name, description, price, image_url);

-- Women's Gold Chains
INSERT INTO products (name, description, price, category_id, metal_type, gender, stock_quantity, image_url)
SELECT
  name, description, price,
  (SELECT id FROM categories WHERE name = 'Gold Chains' AND metal_type = 'gold' LIMIT 1),
  'gold', 'women', 20, image_url
FROM (VALUES
  ('Box Chain Gold', 'Delicate box chain in 14K gold, 18 inches.', 8999, 'gold-chains-001.jpg'),
  ('Cable Chain Gold', 'Classic cable chain in yellow gold, 20 inches.', 9999, 'gold-chains-002.jpg'),
  ('Rope Chain Gold', 'Elegant rope chain in 18K gold, 16 inches.', 12999, 'gold-chains-003.jpg'),
  ('Snake Chain Gold', 'Sleek snake chain in rose gold, 22 inches.', 11999, 'gold-chains-004.jpg'),
  ('Figaro Chain Gold', 'Traditional figaro pattern, 20 inches.', 10999, 'gold-chains-005.jpg')
) AS data(name, description, price, image_url);

-- Gold Bangles
INSERT INTO products (name, description, price, category_id, metal_type, gender, stock_quantity, image_url)
SELECT
  name, description, price,
  (SELECT id FROM categories WHERE name = 'Gold Bangles' AND metal_type = 'gold' LIMIT 1),
  'gold', 'women', 20, image_url
FROM (VALUES
  ('Traditional Gold Bangles', 'Set of 2 classic gold bangles in 18K. Wedding essential.', 24999, 'gold-bangles-001.jpg'),
  ('Carved Gold Bangles', 'Intricately carved bangles with floral motifs.', 28999, 'gold-bangles-002.jpg'),
  ('Diamond Bangles Gold', 'Stunning bangles studded with lab-grown diamonds.', 45999, 'gold-bangles-003.jpg'),
  ('Open End Gold Bangle', 'Adjustable open-end bangle with gemstone terminals.', 19999, 'gold-bangles-004.jpg'),
  ('Filigree Gold Bangles', 'Delicate filigree work on 14K gold bangles.', 22999, 'gold-bangles-005.jpg')
) AS data(name, description, price, image_url);

-- Gold Mangalsutra
INSERT INTO products (name, description, price, category_id, metal_type, gender, stock_quantity, image_url)
SELECT
  name, description, price,
  (SELECT id FROM categories WHERE name = 'Gold Mangalsutra' AND metal_type = 'gold' LIMIT 1),
  'gold', 'women', 20, image_url
FROM (VALUES
  ('Classic Gold Mangalsutra', 'Traditional black bead mangalsutra with gold pendant.', 16999, 'gold-mangalsutra-001.jpg'),
  ('Modern Gold Mangalsutra', 'Contemporary design with diamond pendant in 18K gold.', 24999, 'gold-mangalsutra-002.jpg'),
  ('Dual-Tone Mangalsutra', 'Rose and yellow gold combination. Modern elegance.', 19999, 'gold-mangalsutra-003.jpg'),
  ('Short Mangalsutra', 'Short length with minimalist gold pendant. Daily wear.', 14999, 'gold-mangalsutra-004.jpg')
) AS data(name, description, price, image_url);

-- Gold Sets
INSERT INTO products (name, description, price, category_id, metal_type, gender, stock_quantity, image_url)
SELECT
  name, description, price,
  (SELECT id FROM categories WHERE name = 'Gold Sets' AND metal_type = 'gold' LIMIT 1),
  'gold', 'women', 20, image_url
FROM (VALUES
  ('Bridal Gold Set', 'Complete bridal set with necklace, earrings, and tikka in 18K gold.', 65999, 'gold-sets-001.jpg'),
  ('Daily Wear Gold Set', 'Simple necklace and earring set for everyday elegance.', 24999, 'gold-sets-002.jpg'),
  ('Party Wear Gold Set', 'Stunning choker set with matching earrings. Perfect for parties.', 42999, 'gold-sets-003.jpg'),
  ('Diamond Set Gold', 'Luxurious set with lab-grown diamonds. Wedding collection.', 89999, 'gold-sets-004.jpg')
) AS data(name, description, price, image_url);

-- ============================================
-- ADDITIONAL CATEGORIES - WOMEN'S SILVER
-- (Anklets, Nosepins, Chains, Bangles, Sets)
-- ============================================

-- Silver Anklets
INSERT INTO products (name, description, price, category_id, metal_type, gender, stock_quantity, image_url)
SELECT
  name, description, price,
  (SELECT id FROM categories WHERE name = 'Silver Anklets' AND metal_type = 'silver' LIMIT 1),
  'silver', 'women', 20, image_url
FROM (VALUES
  ('Ghungroo Silver Anklet', 'Traditional anklet with tiny ghungroo bells. Melodious charm.', 2999, 'silver-anklets-001.jpg'),
  ('Chain Silver Anklet', 'Simple chain anklet in 925 silver. Minimalist beauty.', 1999, 'silver-anklets-002.jpg'),
  ('Oxidized Silver Anklet', 'Ethnic oxidized anklet with tribal patterns.', 2499, 'silver-anklets-003.jpg'),
  ('Charm Silver Anklet', 'Delicate anklet with dangling charms. Beach ready.', 3299, 'silver-anklets-004.jpg')
) AS data(name, description, price, image_url);

-- Silver Nosepins
INSERT INTO products (name, description, price, category_id, metal_type, gender, stock_quantity, image_url)
SELECT
  name, description, price,
  (SELECT id FROM categories WHERE name = 'Silver Nosepins' AND metal_type = 'silver' LIMIT 1),
  'silver', 'women', 20, image_url
FROM (VALUES
  ('CZ Silver Nosepin', 'Tiny CZ stud in 925 silver. Sparkling accent.', 999, 'silver-nosepins-001.jpg'),
  ('Oxidized Silver Nosepin', 'Traditional oxidized nosepin with intricate design.', 799, 'silver-nosepins-002.jpg'),
  ('Floral Silver Nosepin', 'Delicate flower design in polished silver.', 1199, 'silver-nosepins-003.jpg'),
  ('L-Shape Silver Nosepin', 'Modern L-shape pin with pearl accent.', 899, 'silver-nosepins-004.jpg')
) AS data(name, description, price, image_url);

-- Silver Chains
INSERT INTO products (name, description, price, category_id, metal_type, gender, stock_quantity, image_url)
SELECT
  name, description, price,
  (SELECT id FROM categories WHERE name = 'Silver Chains' AND metal_type = 'silver' LIMIT 1),
  'silver', 'women', 20, image_url
FROM (VALUES
  ('Box Chain Silver', 'Delicate box chain in 925 silver, 18 inches.', 2499, 'silver-chains-001.jpg'),
  ('Cable Chain Silver', 'Classic cable chain, 20 inches. Perfect for pendants.', 2199, 'silver-chains-002.jpg'),
  ('Snake Chain Silver', 'Sleek snake chain in sterling silver, 16 inches.', 2799, 'silver-chains-003.jpg'),
  ('Rope Chain Silver', 'Elegant rope design, 22 inches.', 2999, 'silver-chains-004.jpg')
) AS data(name, description, price, image_url);

-- Silver Bangles
INSERT INTO products (name, description, price, category_id, metal_type, gender, stock_quantity, image_url)
SELECT
  name, description, price,
  (SELECT id FROM categories WHERE name = 'Silver Bangles' AND metal_type = 'silver' LIMIT 1),
  'silver', 'women', 20, image_url
FROM (VALUES
  ('Oxidized Silver Bangles', 'Set of 4 oxidized bangles with tribal patterns.', 3999, 'silver-bangles-001.jpg'),
  ('Polished Silver Bangles', 'Shiny polished bangles in 925 silver. Set of 6.', 4999, 'silver-bangles-002.jpg'),
  ('Carved Silver Bangles', 'Intricately carved floral design. Set of 2.', 3499, 'silver-bangles-003.jpg'),
  ('Open End Silver Bangle', 'Adjustable bangle with stone terminals.', 2999, 'silver-bangles-004.jpg')
) AS data(name, description, price, image_url);

-- Silver Sets
INSERT INTO products (name, description, price, category_id, metal_type, gender, stock_quantity, image_url)
SELECT
  name, description, price,
  (SELECT id FROM categories WHERE name = 'Silver Sets' AND metal_type = 'silver' LIMIT 1),
  'silver', 'women', 20, image_url
FROM (VALUES
  ('Oxidized Silver Set', 'Complete oxidized set with necklace and earrings. Ethnic charm.', 5999, 'silver-sets-001.jpg'),
  ('CZ Silver Set', 'Stunning CZ set for weddings and parties.', 6999, 'silver-sets-002.jpg'),
  ('Daily Wear Silver Set', 'Simple and elegant set for everyday wear.', 3999, 'silver-sets-003.jpg'),
  ('Temple Silver Set', 'Traditional temple jewelry set in sterling silver.', 8999, 'silver-sets-004.jpg')
) AS data(name, description, price, image_url);

-- ============================================
-- MEN'S ADDITIONAL CATEGORIES
-- (Pendants, Earrings, Kadas)
-- ============================================

-- Men's Gold Pendants
INSERT INTO products (name, description, price, category_id, metal_type, gender, stock_quantity, image_url)
SELECT
  name, description, price,
  (SELECT id FROM categories WHERE name = 'Men''s Gold Pendants' AND metal_type = 'gold' LIMIT 1),
  'gold', 'men', 20, image_url
FROM (VALUES
  ('Men''s Om Pendant Gold', 'Sacred Om symbol in 18K gold. Spiritual jewelry.', 8999, 'men-gold-pendants-001.jpg'),
  ('Men''s Dog Tag Pendant', 'Military-style dog tag in yellow gold. Engravable.', 7999, 'men-gold-pendants-002.jpg'),
  ('Men''s Cross Pendant', 'Bold cross pendant in 14K gold with diamond.', 12999, 'men-gold-pendants-003.jpg')
) AS data(name, description, price, image_url);

-- Men's Silver Pendants
INSERT INTO products (name, description, price, category_id, metal_type, gender, stock_quantity, image_url)
SELECT
  name, description, price,
  (SELECT id FROM categories WHERE name = 'Men''s Silver Pendants' AND metal_type = 'silver' LIMIT 1),
  'silver', 'men', 20, image_url
FROM (VALUES
  ('Men''s Om Pendant Silver', 'Sacred Om in oxidized silver. Spiritual protection.', 2999, 'men-silver-pendants-001.jpg'),
  ('Men''s Dog Tag Silver', 'Military dog tag in 925 silver. Personalize it.', 2499, 'men-silver-pendants-002.jpg'),
  ('Men''s Skull Pendant', 'Edgy skull design in sterling silver. Rock style.', 3499, 'men-silver-pendants-003.jpg')
) AS data(name, description, price, image_url);

-- Men's Gold Kadas
INSERT INTO products (name, description, price, category_id, metal_type, gender, stock_quantity, image_url)
SELECT
  name, description, price,
  (SELECT id FROM categories WHERE name = 'Men''s Gold Kadas' AND metal_type = 'gold' LIMIT 1),
  'gold', 'men', 20, image_url
FROM (VALUES
  ('Traditional Gold Kada', 'Heavy traditional kada in 18K gold. Royal elegance.', 42999, 'men-gold-kadas-001.jpg'),
  ('Modern Gold Kada', 'Contemporary design with brushed finish.', 35999, 'men-gold-kadas-002.jpg')
) AS data(name, description, price, image_url);

-- Men's Silver Kadas
INSERT INTO products (name, description, price, category_id, metal_type, gender, stock_quantity, image_url)
SELECT
  name, description, price,
  (SELECT id FROM categories WHERE name = 'Men''s Silver Kadas' AND metal_type = 'silver' LIMIT 1),
  'silver', 'men', 20, image_url
FROM (VALUES
  ('Traditional Silver Kada', 'Heavy silver kada with tribal patterns.', 6999, 'men-silver-kadas-001.jpg'),
  ('Modern Silver Kada', 'Sleek contemporary design in 925 silver.', 5999, 'men-silver-kadas-002.jpg')
) AS data(name, description, price, image_url);

-- ============================================
-- PRODUCT SUMMARY
-- ============================================
-- Total Products Created: ~170 products
--
-- Women's Gold: ~55 products
-- - Rings: 12
-- - Earrings: 12
-- - Necklaces: 8
-- - Pendants: 8
-- - Bracelets: 8
-- - Anklets: 4
-- - Nosepins: 4
-- - Chains: 5
-- - Bangles: 5
-- - Mangalsutra: 4
-- - Sets: 4
--
-- Women's Silver: ~55 products
-- - Rings: 12
-- - Earrings: 12
-- - Necklaces: 8
-- - Pendants: 8
-- - Bracelets: 8
-- - Anklets: 4
-- - Nosepins: 4
-- - Chains: 4
-- - Bangles: 4
-- - Sets: 4
--
-- Men's Gold: ~16 products
-- - Rings: 5
-- - Bracelets: 4
-- - Chains: 4
-- - Pendants: 3
-- - Kadas: 2
--
-- Men's Silver: ~17 products
-- - Rings: 5
-- - Bracelets: 4
-- - Chains: 4
-- - Pendants: 3
-- - Kadas: 2
--
-- TOTAL: ~143 products ready for import!
-- ============================================

-- ============================================
-- NEXT STEPS:
-- 1. Download images from provided URLs (stored in /home/user/Downloads)
-- 2. Upload images to Supabase Storage bucket: 'product-images'
-- 3. Update image_url in this file with your Supabase storage URLs
-- 4. Run this SQL file in Supabase SQL Editor
-- 5. Verify products with: SELECT COUNT(*) FROM products;
-- ============================================
