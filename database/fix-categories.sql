-- =============================================
-- FIX: Insert Categories First
-- Description: Ensure categories exist before inserting products
-- =============================================

-- Insert the 5 main categories
INSERT INTO categories (name, description, display_order) VALUES
  ('Rings', 'Elegant rings for every occasion', 1),
  ('Necklaces', 'Beautiful necklaces and pendants', 2),
  ('Earrings', 'Stunning earrings collection', 3),
  ('Bracelets', 'Charming bracelets and bangles', 4),
  ('Sets', 'Complete jewelry sets', 5)
ON CONFLICT (name) DO NOTHING;
