-- ============================================================================
-- Gift Card System - Phase 1 Database Setup & Sample Data
-- ============================================================================
-- This script sets up initial data for the gift card system
-- Run this AFTER running the main schema creation script
-- ============================================================================

-- Insert GIFT5 Promo Code
-- ======================
INSERT INTO promo_codes (
  code,
  description,
  discount_type,
  discount_value,
  min_purchase_amount,
  max_uses,
  uses_count,
  valid_from,
  valid_until,
  is_active
) VALUES (
  'GIFT5',
  '5% off on gift card purchases above ₹1,000',
  'percentage',
  5.00,
  1000.00,
  100,
  0,
  NOW(),
  NOW() + INTERVAL '30 days',
  true
) ON CONFLICT (code) DO UPDATE SET
  description = EXCLUDED.description,
  discount_value = EXCLUDED.discount_value,
  min_purchase_amount = EXCLUDED.min_purchase_amount,
  max_uses = EXCLUDED.max_uses,
  valid_until = EXCLUDED.valid_until,
  is_active = EXCLUDED.is_active;

-- Insert Gift Card Design Themes
-- ==============================
INSERT INTO gift_card_designs (theme_key, name, description, gradient_class, is_active)
VALUES
  ('birthday', 'Birthday Celebration', 'Perfect for birthday wishes', 'from-purple-400 to-pink-500', true),
  ('diwali', 'Diwali Special', 'Festival of lights celebration', 'from-orange-400 to-red-500', true),
  ('general', 'General', 'For any occasion', 'from-rose-400 to-pink-400', true)
ON CONFLICT (theme_key) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  gradient_class = EXCLUDED.gradient_class,
  is_active = EXCLUDED.is_active;

-- Insert Admin User (harry/diva.saj)
-- ==================================
-- Note: Password is hashed using bcryptjs with 10 rounds
-- Plaintext: diva.saj
-- Hash: $2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy
INSERT INTO admin_users (
  username,
  password_hash,
  email,
  full_name,
  role,
  is_active
) VALUES (
  'harry',
  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
  'harry@divaa.com',
  'Harry Admin',
  'admin',
  true
) ON CONFLICT (username) DO UPDATE SET
  password_hash = EXCLUDED.password_hash,
  email = EXCLUDED.email,
  is_active = EXCLUDED.is_active;

-- ============================================================================
-- Sample Gift Cards for Testing (Optional - Comment out for production)
-- ============================================================================

-- Sample Gift Card 1: Birthday Card
INSERT INTO gift_cards (
  card_number,
  card_pin,
  design_theme,
  card_type,
  original_amount,
  current_balance,
  sender_name,
  sender_email,
  recipient_name,
  recipient_email,
  recipient_phone,
  personal_message,
  delivery_method,
  expiry_date,
  status
) VALUES (
  'DIVAA-1234-5678-9001',
  '123456',
  'birthday',
  'regular',
  5000.00,
  5000.00,
  'Test Sender',
  'sender@example.com',
  'Test Recipient',
  'recipient@example.com',
  '+919876543210',
  'Happy Birthday! Enjoy shopping at Divaa Jewels.',
  'email',
  CURRENT_DATE + INTERVAL '6 months',
  'active'
) ON CONFLICT (card_number) DO NOTHING;

-- Sample Gift Card 2: Diwali Card (Partially Used)
INSERT INTO gift_cards (
  card_number,
  card_pin,
  design_theme,
  card_type,
  original_amount,
  current_balance,
  sender_name,
  sender_email,
  recipient_name,
  recipient_email,
  recipient_phone,
  personal_message,
  delivery_method,
  expiry_date,
  status
) VALUES (
  'DIVAA-1234-5678-9002',
  '654321',
  'diwali',
  'regular',
  10000.00,
  3500.00,
  'Diwali Sender',
  'diwali@example.com',
  'Happy Customer',
  'happy@example.com',
  '+919876543211',
  'Happy Diwali! May your life shine bright.',
  'both',
  CURRENT_DATE + INTERVAL '6 months',
  'active'
) ON CONFLICT (card_number) DO NOTHING;

-- Sample Gift Card 3: General Card (Reloadable)
INSERT INTO gift_cards (
  card_number,
  card_pin,
  design_theme,
  card_type,
  original_amount,
  current_balance,
  sender_name,
  sender_email,
  recipient_name,
  recipient_email,
  recipient_phone,
  personal_message,
  delivery_method,
  expiry_date,
  status
) VALUES (
  'DIVAA-1234-5678-9003',
  '789012',
  'general',
  'reloadable',
  2500.00,
  2500.00,
  'Generous Friend',
  'friend@example.com',
  'Lucky Person',
  'lucky@example.com',
  '+919876543212',
  'A little something for you. Enjoy!',
  'email',
  CURRENT_DATE + INTERVAL '6 months',
  'active'
) ON CONFLICT (card_number) DO NOTHING;

-- ============================================================================
-- Verification Queries (Run these to verify setup)
-- ============================================================================

-- Check promo codes
SELECT * FROM promo_codes WHERE code = 'GIFT5';

-- Check gift card designs
SELECT * FROM gift_card_designs WHERE is_active = true;

-- Check admin users
SELECT username, email, role, is_active FROM admin_users;

-- Check sample gift cards (optional)
SELECT
  card_number,
  design_theme,
  card_type,
  original_amount,
  current_balance,
  status,
  recipient_name
FROM gift_cards
ORDER BY created_at DESC
LIMIT 5;

-- Check database functions exist
SELECT routine_name
FROM information_schema.routines
WHERE routine_schema = 'public'
AND routine_name IN ('update_gift_card_status', 'check_velocity_limit');

-- ============================================================================
-- Phase 1 Complete! 🎉
-- ============================================================================
-- Your gift card system database is now ready for Phase 1 testing.
--
-- Next steps:
-- 1. Test gift card purchase flow
-- 2. Test gift card redemption at checkout
-- 3. Test admin dashboard
-- 4. Set up Supabase Edge Functions for backend logic
-- 5. Configure email delivery with Resend
-- ============================================================================
