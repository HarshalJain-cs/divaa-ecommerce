-- =============================================
-- Add Sample Products for Pendants and Sets Categories
-- 2 Products each (4 total)
-- =============================================

-- First, get the category IDs (you'll need to replace these with actual UUIDs from your database)
-- Run this first to get IDs: SELECT id, name FROM categories WHERE name IN ('Pendants', 'Wedding Sets');

-- Pendants Products (2 products)
INSERT INTO products (
  name,
  description,
  price,
  category_id,
  image_url,
  metal_type,
  stone_type,
  stock_quantity,
  is_featured,
  weight_grams,
  created_at
) VALUES
  (
    'Infinity Heart Pendant',
    'Sterling silver infinity heart pendant with lab-grown diamond accent. A symbol of eternal love and devotion. Perfect for gifting or daily wear.',
    4999,
    (SELECT id FROM categories WHERE name = 'Pendants' LIMIT 1),
    'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800&auto=format&fit=crop&q=80',
    'silver',
    'diamond',
    25,
    true,
    3.5,
    NOW()
  ),
  (
    'Rose Gold Teardrop Pendant',
    'Elegant rose gold plated teardrop pendant with pink sapphire center stone. Delicate chain included. Adds a touch of femininity to any outfit.',
    6499,
    (SELECT id FROM categories WHERE name = 'Pendants' LIMIT 1),
    'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&auto=format&fit=crop&q=80',
    'rose-gold',
    'sapphire',
    18,
    false,
    4.2,
    NOW()
  );

-- Wedding Sets Products (2 products)
INSERT INTO products (
  name,
  description,
  price,
  category_id,
  image_url,
  metal_type,
  stone_type,
  stock_quantity,
  is_featured,
  weight_grams,
  created_at
) VALUES
  (
    'Bridal Elegance Set',
    'Complete bridal jewelry set including necklace, earrings, and maang tikka. Crafted in gold-plated brass with pearl and crystal embellishments. Traditional yet timeless design.',
    24999,
    (SELECT id FROM categories WHERE name = 'Wedding Sets' LIMIT 1),
    'https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=800&auto=format&fit=crop&q=80',
    'gold-plated',
    'pearl',
    8,
    true,
    85.0,
    NOW()
  ),
  (
    'Royal Wedding Collection',
    'Luxurious 4-piece bridal set featuring necklace, earrings, bracelet, and ring. 22K gold plated with ruby and emerald stones. Perfect for your special day.',
    39999,
    (SELECT id FROM categories WHERE name = 'Wedding Sets' LIMIT 1),
    'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop&q=80',
    'gold-plated',
    'ruby',
    5,
    true,
    120.0,
    NOW()
  );

-- Verify the products were added
SELECT p.name, p.price, c.name as category_name
FROM products p
JOIN categories c ON p.category_id = c.id
WHERE c.name IN ('Pendants', 'Wedding Sets')
ORDER BY c.name, p.name;
