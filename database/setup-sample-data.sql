-- Function to set up sample data if needed
CREATE OR REPLACE FUNCTION setup_sample_data()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Check if categories exist
  IF NOT EXISTS (SELECT 1 FROM categories LIMIT 1) THEN
    -- Insert categories
    INSERT INTO categories (name, description, display_order) VALUES
      ('Rings', 'Elegant rings for every occasion', 1),
      ('Necklaces', 'Beautiful necklaces and pendants', 2),
      ('Earrings', 'Stunning earrings collection', 3),
      ('Bracelets', 'Charming bracelets and bangles', 4),
      ('Sets', 'Complete jewelry sets', 5);
  END IF;

  -- Check if products exist
  IF NOT EXISTS (SELECT 1 FROM products LIMIT 1) THEN
    -- Insert sample products
    INSERT INTO products (
      name, description, price, category_id, gender,
      stock_quantity, metal_type, stone_type, is_featured,
      occasions, relations, image_url
    )
    SELECT
      'Diamond Engagement Ring',
      'Exquisite 1-carat diamond ring in 18K white gold setting',
      2999.99,
      id,
      'women',
      10,
      'white-gold',
      'diamond',
      true,
      ARRAY['engagement', 'wedding'],
      ARRAY['wife', 'girlfriend'],
      '/assets/images/products/placeholder.jpg'
    FROM categories WHERE name = 'Rings'
    UNION ALL
    SELECT
      'Pearl Necklace',
      'Classic freshwater pearl necklace with 18K gold clasp',
      899.99,
      id,
      'women',
      15,
      'gold',
      'pearl',
      true,
      ARRAY['wedding', 'formal'],
      ARRAY['wife', 'mother'],
      '/assets/images/products/placeholder.jpg'
    FROM categories WHERE name = 'Necklaces'
    UNION ALL
    SELECT
      'Sapphire Earrings',
      'Stunning sapphire and diamond drop earrings',
      1499.99,
      id,
      'women',
      8,
      'white-gold',
      'sapphire',
      true,
      ARRAY['wedding', 'formal'],
      ARRAY['wife', 'girlfriend'],
      '/assets/images/products/placeholder.jpg'
    FROM categories WHERE name = 'Earrings';
  END IF;
END;
$$;