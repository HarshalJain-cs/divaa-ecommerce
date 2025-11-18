-- Orders Table Update for Gift Card Support
-- Adds fields to track gift card discounts and balance usage in orders

-- ============================================
-- ADD GIFT CARD FIELDS TO ORDERS TABLE
-- ============================================

-- Add gift card discount field
ALTER TABLE orders
ADD COLUMN IF NOT EXISTS gift_card_discount DECIMAL(10,2) DEFAULT 0 CHECK (gift_card_discount >= 0);

-- Add balance used field
ALTER TABLE orders
ADD COLUMN IF NOT EXISTS balance_used DECIMAL(10,2) DEFAULT 0 CHECK (balance_used >= 0);

-- Add final amount field (calculated after discounts)
ALTER TABLE orders
ADD COLUMN IF NOT EXISTS final_amount DECIMAL(10,2);

-- Add gift card code reference (for tracking which card was used)
ALTER TABLE orders
ADD COLUMN IF NOT EXISTS gift_card_code VARCHAR(19);

-- ============================================
-- ADD COMMENTS FOR DOCUMENTATION
-- ============================================

COMMENT ON COLUMN orders.gift_card_discount IS 'Discount applied from gift card code at checkout';
COMMENT ON COLUMN orders.balance_used IS 'Amount deducted from user account balance';
COMMENT ON COLUMN orders.final_amount IS 'Final amount after gift card discount and balance usage (total_amount - gift_card_discount - balance_used)';
COMMENT ON COLUMN orders.gift_card_code IS 'Gift card code used for this order (if any)';

-- ============================================
-- CREATE FUNCTION TO CALCULATE FINAL AMOUNT
-- ============================================

-- Function to automatically calculate final_amount before insert/update
CREATE OR REPLACE FUNCTION calculate_order_final_amount()
RETURNS TRIGGER AS $$
BEGIN
  -- Calculate final amount
  NEW.final_amount = NEW.total_amount - COALESCE(NEW.gift_card_discount, 0) - COALESCE(NEW.balance_used, 0);

  -- Ensure final amount is not negative
  IF NEW.final_amount < 0 THEN
    NEW.final_amount = 0;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- CREATE TRIGGER
-- ============================================

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS calculate_final_amount_trigger ON orders;

-- Create trigger to calculate final_amount on insert/update
CREATE TRIGGER calculate_final_amount_trigger
  BEFORE INSERT OR UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION calculate_order_final_amount();

-- ============================================
-- CREATE INDEX FOR PERFORMANCE
-- ============================================

CREATE INDEX IF NOT EXISTS idx_orders_gift_card_code ON orders(gift_card_code);
CREATE INDEX IF NOT EXISTS idx_orders_final_amount ON orders(final_amount);

-- ============================================
-- SAMPLE QUERIES
-- ============================================

/*
-- Get orders that used gift cards
SELECT id, total_amount, gift_card_discount, balance_used, final_amount, gift_card_code
FROM orders
WHERE gift_card_discount > 0 OR balance_used > 0
ORDER BY created_at DESC;

-- Calculate total gift card usage
SELECT
  COUNT(*) as orders_with_gift_cards,
  SUM(gift_card_discount) as total_gift_card_discount,
  SUM(balance_used) as total_balance_used,
  SUM(gift_card_discount + balance_used) as total_discount_amount
FROM orders
WHERE gift_card_discount > 0 OR balance_used > 0;

-- Get user's orders with gift card usage
SELECT
  o.id,
  o.created_at,
  o.total_amount,
  o.gift_card_discount,
  o.balance_used,
  o.final_amount,
  o.gift_card_code,
  o.status
FROM orders o
WHERE o.user_id = 'user-uuid-here'
  AND (o.gift_card_discount > 0 OR o.balance_used > 0)
ORDER BY o.created_at DESC;
*/

-- ============================================
-- NOTES FOR IMPLEMENTATION
-- ============================================

/*
Order Calculation Flow:

1. Cart Total Calculation:
   - Calculate subtotal from cart items
   - Add shipping fees (if any)
   - Add taxes (if any)
   - Result = total_amount

2. Apply Gift Card (if code provided):
   - Validate gift card code
   - Check balance and expiry
   - Calculate discount (min of card balance and order total)
   - Update gift_card_discount field
   - Update gift card balance in gift_cards table

3. Apply Account Balance (if selected):
   - Get user's current balance
   - Calculate balance to use (min of user balance and remaining order amount)
   - Update balance_used field
   - Update user balance in user_balance table

4. Calculate Final Amount:
   - final_amount = total_amount - gift_card_discount - balance_used
   - This is triggered automatically by the database trigger

5. Process Payment:
   - Charge only the final_amount (not total_amount)
   - If final_amount = 0, mark as paid without payment gateway

Example Scenarios:

Scenario 1: Gift Card Covers Full Order
- Cart Total: ₹3,000
- Gift Card Balance: ₹5,000
- Discount Applied: ₹3,000
- Balance Used: ₹0
- Final Amount: ₹0
- Result: No payment needed, gift card balance reduced to ₹2,000

Scenario 2: Partial Gift Card + Payment
- Cart Total: ₹10,000
- Gift Card Balance: ₹3,000
- Discount Applied: ₹3,000
- Balance Used: ₹0
- Final Amount: ₹7,000
- Result: Pay ₹7,000, gift card fully redeemed

Scenario 3: Account Balance + Gift Card
- Cart Total: ₹8,000
- Gift Card Balance: ₹3,000
- Account Balance: ₹2,000
- Discount Applied: ₹3,000
- Balance Used: ₹2,000
- Final Amount: ₹3,000
- Result: Pay ₹3,000, both discounts applied

Scenario 4: Account Balance Only
- Cart Total: ₹5,000
- Account Balance: ₹7,000
- Discount Applied: ₹0
- Balance Used: ₹5,000
- Final Amount: ₹0
- Result: No payment needed, account balance reduced to ₹2,000
*/
