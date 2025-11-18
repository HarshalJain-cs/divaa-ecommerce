-- Style Collections Schema
-- Adds style_type field to products table for filtering by style collections
-- Supports 6 style categories: Everyday, Traditional, Party, Office, Casual, Twinning

-- ============================================
-- ADD STYLE_TYPE COLUMN TO PRODUCTS
-- ============================================

-- Add style_type column (nullable to support existing products)
ALTER TABLE products
ADD COLUMN IF NOT EXISTS style_type TEXT;

-- Add check constraint for valid style types
ALTER TABLE products
DROP CONSTRAINT IF EXISTS products_style_type_check;

ALTER TABLE products
ADD CONSTRAINT products_style_type_check CHECK (
  style_type IS NULL OR
  style_type IN ('everyday', 'traditional', 'party', 'office', 'casual', 'twinning')
);

-- Add index for better query performance
CREATE INDEX IF NOT EXISTS idx_products_style_type ON products(style_type);

-- Add comment to column for documentation
COMMENT ON COLUMN products.style_type IS 'Product style category for style-based collections (everyday, traditional, party, office, casual, twinning)';

-- ============================================
-- SAMPLE DATA (Optional - for testing)
-- ============================================

-- Uncomment to update existing products with style types
-- This is just an example - you would assign these based on actual product characteristics

/*
-- Example: Tag some products as 'everyday' style
UPDATE products
SET style_type = 'everyday'
WHERE metal_type = 'silver'
  AND price BETWEEN 1000 AND 5000
  AND style_type IS NULL
LIMIT 10;

-- Example: Tag some products as 'traditional' style
UPDATE products
SET style_type = 'traditional'
WHERE metal_type = 'gold'
  AND 'wedding' = ANY(occasions)
  AND style_type IS NULL
LIMIT 10;

-- Example: Tag some products as 'party' style
UPDATE products
SET style_type = 'party'
WHERE 'party' = ANY(occasions)
  OR 'anniversary' = ANY(occasions)
  AND style_type IS NULL
LIMIT 10;

-- Example: Tag some products as 'office' style
UPDATE products
SET style_type = 'office'
WHERE metal_type IN ('silver', 'platinum')
  AND price BETWEEN 2000 AND 10000
  AND style_type IS NULL
LIMIT 10;

-- Example: Tag some products as 'casual' style
UPDATE products
SET style_type = 'casual'
WHERE metal_type = 'silver'
  AND price < 3000
  AND style_type IS NULL
LIMIT 10;

-- Example: Tag some products as 'twinning' style (matching sets)
UPDATE products
SET style_type = 'twinning'
WHERE 'friend' = ANY(relations)
  OR 'sister' = ANY(relations)
  AND style_type IS NULL
LIMIT 10;
*/

-- ============================================
-- NOTES FOR IMPLEMENTATION
-- ============================================

/*
Style Type Definitions:

1. 'everyday' - Simple, minimalist designs for daily wear
   - Price range: ₹1,000 - ₹5,000
   - Materials: Silver, lightweight gold
   - Characteristics: Subtle, comfortable, versatile

2. 'traditional' - Classic Indian jewelry designs
   - Price range: ₹5,000 - ₹50,000+
   - Materials: Gold, temple jewelry, kundan
   - Occasions: Weddings, festivals, cultural events
   - Characteristics: Ornate, heritage designs

3. 'party' - Statement pieces for special occasions
   - Price range: ₹3,000 - ₹30,000
   - Materials: Diamond, colored stones, cocktail rings
   - Occasions: Parties, anniversaries, celebrations
   - Characteristics: Bold, eye-catching, glamorous

4. 'office' - Professional, minimalist jewelry
   - Price range: ₹2,000 - ₹10,000
   - Materials: Silver, white gold, platinum
   - Characteristics: Understated, elegant, sophisticated

5. 'casual' - Trendy, everyday casual wear
   - Price range: ₹500 - ₹3,000
   - Materials: Silver, fashion jewelry
   - Characteristics: Fun, trendy, affordable

6. 'twinning' - Matching sets for gifting (Gifts for Friends)
   - Price range: ₹1,500 - ₹15,000
   - Materials: Any
   - Relations: Friends, sisters, couples
   - Characteristics: Coordinated designs, gifting-focused

Query Examples:

-- Get all everyday style products
SELECT * FROM products WHERE style_type = 'everyday' AND stock_quantity > 0;

-- Get traditional style products under ₹20,000
SELECT * FROM products
WHERE style_type = 'traditional'
  AND price <= 20000
  AND stock_quantity > 0
ORDER BY price ASC;

-- Get party style products with diamonds
SELECT * FROM products
WHERE style_type = 'party'
  AND stone_type LIKE '%diamond%'
  AND stock_quantity > 0;

-- Get products without a style type assigned
SELECT * FROM products WHERE style_type IS NULL;

-- Count products by style type
SELECT style_type, COUNT(*) as count
FROM products
GROUP BY style_type
ORDER BY count DESC;
*/
