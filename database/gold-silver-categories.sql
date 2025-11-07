-- ============================================
-- GOLD & SILVER CATEGORIES SQL
-- DIVAA E-COMMERCE - Material-Specific Categories
-- ============================================
-- Instructions: Run this SQL in your Supabase SQL Editor
-- This will create all material-specific categories for Gold and Silver jewelry
-- ============================================

-- STEP 1: Add new columns to categories table if they don't exist
-- ============================================
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name = 'categories' AND column_name = 'metal_type') THEN
        ALTER TABLE categories ADD COLUMN metal_type TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name = 'categories' AND column_name = 'gender') THEN
        ALTER TABLE categories ADD COLUMN gender TEXT CHECK (gender IN ('men', 'women', 'unisex'));
    END IF;
END $$;

-- STEP 2: Clean up existing categories if needed (OPTIONAL - comment out if you want to keep existing data)
-- DELETE FROM categories;

-- ============================================
-- WOMEN'S GOLD CATEGORIES
-- ============================================

INSERT INTO categories (name, description, display_order, metal_type, gender) VALUES
('Gold Rings', 'Elegant gold rings crafted in 14K and 18K gold with stunning designs', 1, 'gold', 'women'),
('Gold Earrings', 'Beautiful gold earrings from studs to drop earrings in 14K & 18K gold', 2, 'gold', 'women'),
('Gold Necklaces', 'Exquisite gold necklaces and chains in various lengths and designs', 3, 'gold', 'women'),
('Gold Pendants', 'Delicate gold pendants perfect for everyday wear and special occasions', 4, 'gold', 'women'),
('Gold Bracelets', 'Sophisticated gold bracelets and bangles for the modern woman', 5, 'gold', 'women'),
('Gold Anklets', 'Traditional and contemporary gold anklets with intricate designs', 6, 'gold', 'women'),
('Gold Nosepins', 'Elegant gold nose pins and nose rings in classic and modern styles', 7, 'gold', 'women'),
('Gold Sets', 'Complete gold jewelry sets including necklace, earrings, and more', 8, 'gold', 'women'),
('Gold Chains', 'Premium gold chains in various styles - rope, cable, box, and more', 9, 'gold', 'women'),
('Gold Bangles', 'Traditional gold bangles perfect for weddings and festivals', 10, 'gold', 'women'),
('Gold Mangalsutra', 'Sacred gold mangalsutra designs for married women', 11, 'gold', 'women');

-- ============================================
-- WOMEN'S SILVER CATEGORIES
-- ============================================

INSERT INTO categories (name, description, display_order, metal_type, gender) VALUES
('Silver Rings', 'Stunning 925 sterling silver rings with contemporary designs', 12, 'silver', 'women'),
('Silver Earrings', 'Versatile silver earrings from hoops to chandeliers in 925 silver', 13, 'silver', 'women'),
('Silver Necklaces', 'Beautiful silver necklaces with intricate detailing and modern appeal', 14, 'silver', 'women'),
('Silver Pendants', 'Charming silver pendants featuring hearts, symbols, and gemstones', 15, 'silver', 'women'),
('Silver Bracelets', 'Stylish 925 silver bracelets from delicate chains to statement pieces', 16, 'silver', 'women'),
('Silver Anklets', 'Traditional silver anklets with ghungroo bells and modern designs', 17, 'silver', 'women'),
('Silver Nosepins', 'Classic silver nose pins and studs in 925 sterling silver', 18, 'silver', 'women'),
('Silver Sets', 'Coordinated silver jewelry sets for a complete look', 19, 'silver', 'women'),
('Silver Chains', 'Fine silver chains in multiple styles and lengths', 20, 'silver', 'women'),
('Silver Bangles', 'Elegant silver bangles with oxidized and polished finishes', 21, 'silver', 'women');

-- ============================================
-- MEN'S GOLD CATEGORIES
-- ============================================

INSERT INTO categories (name, description, display_order, metal_type, gender) VALUES
('Men''s Gold Rings', 'Bold and sophisticated gold rings designed for men', 22, 'gold', 'men'),
('Men''s Gold Bracelets', 'Stylish gold bracelets and chains for modern men', 23, 'gold', 'men'),
('Men''s Gold Chains', 'Premium gold chains for men in various weights and designs', 24, 'gold', 'men'),
('Men''s Gold Pendants', 'Masculine gold pendants with contemporary and traditional motifs', 25, 'gold', 'men'),
('Men''s Gold Earrings', 'Sleek gold earrings and studs for fashion-forward men', 26, 'gold', 'men'),
('Men''s Gold Kadas', 'Traditional gold kadas with modern twist for men', 27, 'gold', 'men');

-- ============================================
-- MEN'S SILVER CATEGORIES
-- ============================================

INSERT INTO categories (name, description, display_order, metal_type, gender) VALUES
('Men''s Silver Rings', 'Contemporary silver rings with bold designs for men', 28, 'silver', 'men'),
('Men''s Silver Bracelets', 'Stylish 925 silver bracelets for everyday and special occasions', 29, 'silver', 'men'),
('Men''s Silver Chains', 'Heavy-duty silver chains in rope, curb, and figaro styles', 30, 'silver', 'men'),
('Men''s Silver Pendants', 'Unique silver pendants featuring symbols, crosses, and more', 31, 'silver', 'men'),
('Men''s Silver Earrings', 'Modern silver earrings and hoops for trendsetting men', 32, 'silver', 'men'),
('Men''s Silver Kadas', 'Traditional silver kadas with contemporary designs', 33, 'silver', 'men');

-- ============================================
-- VERIFICATION QUERY
-- ============================================
-- Run this to verify all categories were inserted successfully:
-- SELECT name, metal_type, gender, display_order FROM categories ORDER BY display_order;

-- ============================================
-- CATEGORY COUNT
-- ============================================
-- Total categories created: 33
-- Women's Gold: 11 categories
-- Women's Silver: 10 categories
-- Men's Gold: 6 categories
-- Men's Silver: 6 categories
-- ============================================
