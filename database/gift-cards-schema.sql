-- Gift Cards System Database Schema
-- This schema supports:
-- - Gift card purchases and management
-- - Dual redemption (checkout or account balance)
-- - Transaction tracking and audit trail
-- - 6-month expiry for cards and balances
-- - Multiple design themes

-- ============================================
-- MAIN GIFT CARDS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS gift_cards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code VARCHAR(19) UNIQUE NOT NULL, -- Format: DIVA-A1B2-C3D4-E5F6
  amount DECIMAL(10,2) NOT NULL CHECK (amount >= 500), -- Minimum ₹500
  balance DECIMAL(10,2) NOT NULL CHECK (balance >= 0),
  recipient_email TEXT,
  recipient_name TEXT,
  sender_name TEXT,
  personal_message TEXT,
  design_theme VARCHAR(50) NOT NULL DEFAULT 'general',
  -- Themes: 'birthday', 'wedding', 'anniversary', 'thankyou', 'general'
  status TEXT DEFAULT 'active' CHECK (
    status IN ('active', 'partially_used', 'fully_redeemed', 'expired', 'cancelled')
  ),
  purchased_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  purchased_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL, -- 6 months from purchase
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- USER BALANCE TABLE
-- ============================================
-- Stores balance from redeemed gift cards
CREATE TABLE IF NOT EXISTS user_balance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  balance DECIMAL(10,2) DEFAULT 0 NOT NULL CHECK (balance >= 0),
  last_updated TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- GIFT CARD TRANSACTIONS TABLE
-- ============================================
-- Tracks all gift card activities (audit log)
CREATE TABLE IF NOT EXISTS gift_card_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  gift_card_id UUID REFERENCES gift_cards(id) ON DELETE CASCADE NOT NULL,
  transaction_type TEXT NOT NULL CHECK (
    transaction_type IN ('purchase', 'redemption_to_balance', 'checkout_usage', 'refund', 'expiry', 'cancellation')
  ),
  amount DECIMAL(10,2) NOT NULL,
  balance_before DECIMAL(10,2),
  balance_after DECIMAL(10,2),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- GIFT CARD REDEMPTIONS TABLE
-- ============================================
-- Tracks which orders used which gift cards
CREATE TABLE IF NOT EXISTS gift_card_redemptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
  gift_card_id UUID REFERENCES gift_cards(id) ON DELETE CASCADE,
  amount_used DECIMAL(10,2) NOT NULL CHECK (amount_used > 0),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(order_id, gift_card_id) -- One gift card per order (no multiple cards)
);

-- ============================================
-- USER BALANCE TRANSACTIONS TABLE
-- ============================================
-- Tracks balance additions and usage
CREATE TABLE IF NOT EXISTS user_balance_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_balance_id UUID REFERENCES user_balance(id) ON DELETE CASCADE NOT NULL,
  transaction_type TEXT NOT NULL CHECK (
    transaction_type IN ('redemption', 'checkout_usage', 'expiry', 'adjustment')
  ),
  amount DECIMAL(10,2) NOT NULL,
  balance_before DECIMAL(10,2),
  balance_after DECIMAL(10,2),
  gift_card_id UUID REFERENCES gift_cards(id) ON DELETE SET NULL,
  order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
  expires_at TIMESTAMPTZ, -- 6 months from redemption
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX IF NOT EXISTS idx_gift_cards_code ON gift_cards(code);
CREATE INDEX IF NOT EXISTS idx_gift_cards_purchased_by ON gift_cards(purchased_by);
CREATE INDEX IF NOT EXISTS idx_gift_cards_recipient_email ON gift_cards(recipient_email);
CREATE INDEX IF NOT EXISTS idx_gift_cards_status ON gift_cards(status);
CREATE INDEX IF NOT EXISTS idx_gift_cards_expires_at ON gift_cards(expires_at);
CREATE INDEX IF NOT EXISTS idx_user_balance_user_id ON user_balance(user_id);
CREATE INDEX IF NOT EXISTS idx_gift_card_transactions_gift_card_id ON gift_card_transactions(gift_card_id);
CREATE INDEX IF NOT EXISTS idx_gift_card_transactions_user_id ON gift_card_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_gift_card_redemptions_order_id ON gift_card_redemptions(order_id);
CREATE INDEX IF NOT EXISTS idx_user_balance_transactions_user_balance_id ON user_balance_transactions(user_balance_id);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE gift_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_balance ENABLE ROW LEVEL SECURITY;
ALTER TABLE gift_card_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE gift_card_redemptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_balance_transactions ENABLE ROW LEVEL SECURITY;

-- ============================================
-- GIFT CARDS POLICIES
-- ============================================

-- Users can view their purchased gift cards
CREATE POLICY "Users can view their purchased gift cards"
  ON gift_cards FOR SELECT
  USING (auth.uid() = purchased_by);

-- Users can view gift cards sent to their email
CREATE POLICY "Users can view gift cards sent to their email"
  ON gift_cards FOR SELECT
  USING (
    recipient_email = (SELECT email FROM auth.users WHERE id = auth.uid())
  );

-- Users can create gift cards (purchase)
CREATE POLICY "Users can create gift cards"
  ON gift_cards FOR INSERT
  WITH CHECK (auth.uid() = purchased_by);

-- Users can update their own gift cards (limited updates)
CREATE POLICY "Users can update gift card status"
  ON gift_cards FOR UPDATE
  USING (auth.uid() = purchased_by OR recipient_email = (SELECT email FROM auth.users WHERE id = auth.uid()));

-- ============================================
-- USER BALANCE POLICIES
-- ============================================

-- Users can view their own balance
CREATE POLICY "Users can view their own balance"
  ON user_balance FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own balance record
CREATE POLICY "Users can create their own balance"
  ON user_balance FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own balance
CREATE POLICY "Users can update their own balance"
  ON user_balance FOR UPDATE
  USING (auth.uid() = user_id);

-- ============================================
-- TRANSACTION POLICIES
-- ============================================

-- Users can view their own gift card transactions
CREATE POLICY "Users can view their gift card transactions"
  ON gift_card_transactions FOR SELECT
  USING (
    auth.uid() = user_id OR
    EXISTS (SELECT 1 FROM gift_cards WHERE id = gift_card_id AND (purchased_by = auth.uid() OR recipient_email = (SELECT email FROM auth.users WHERE id = auth.uid())))
  );

-- System can insert transactions
CREATE POLICY "Authenticated users can create transactions"
  ON gift_card_transactions FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- Users can view redemptions for their orders
CREATE POLICY "Users can view their order redemptions"
  ON gift_card_redemptions FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM orders WHERE id = order_id AND user_id = auth.uid())
  );

-- System can create redemption records
CREATE POLICY "Authenticated users can create redemptions"
  ON gift_card_redemptions FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- Users can view their balance transactions
CREATE POLICY "Users can view their balance transactions"
  ON user_balance_transactions FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM user_balance WHERE id = user_balance_id AND user_id = auth.uid())
  );

-- System can create balance transactions
CREATE POLICY "Authenticated users can create balance transactions"
  ON user_balance_transactions FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- ============================================
-- ADMIN POLICIES
-- ============================================

-- Admins can do everything on all tables
CREATE POLICY "Admins have full access to gift cards"
  ON gift_cards FOR ALL
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins have full access to user balance"
  ON user_balance FOR ALL
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins have full access to gift card transactions"
  ON gift_card_transactions FOR ALL
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins have full access to redemptions"
  ON gift_card_redemptions FOR ALL
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins have full access to balance transactions"
  ON user_balance_transactions FOR ALL
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Function to update gift card updated_at timestamp
CREATE OR REPLACE FUNCTION update_gift_card_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for gift_cards updated_at
DROP TRIGGER IF EXISTS gift_cards_updated_at ON gift_cards;
CREATE TRIGGER gift_cards_updated_at
  BEFORE UPDATE ON gift_cards
  FOR EACH ROW
  EXECUTE FUNCTION update_gift_card_updated_at();

-- Function to update user_balance last_updated timestamp
CREATE OR REPLACE FUNCTION update_user_balance_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.last_updated = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for user_balance last_updated
DROP TRIGGER IF EXISTS user_balance_updated_at ON user_balance;
CREATE TRIGGER user_balance_updated_at
  BEFORE UPDATE ON user_balance
  FOR EACH ROW
  EXECUTE FUNCTION update_user_balance_updated_at();

-- ============================================
-- SAMPLE DATA (Optional - for testing)
-- ============================================

-- Uncomment to insert sample gift card themes
-- Note: Actual gift cards should be created through the application

-- Sample admin-created promotional gift card (requires admin user)
-- INSERT INTO gift_cards (code, amount, balance, design_theme, status, expires_at)
-- VALUES ('DIVA-PROMO-2024-GIFT', 1000, 1000, 'general', 'active', NOW() + INTERVAL '6 months');

-- ============================================
-- NOTES FOR IMPLEMENTATION
-- ============================================

/*
1. Gift Card Purchase Flow:
   - User fills form (amount, recipient, theme, message)
   - System generates unique code (DIVA-XXXX-XXXX-XXXX)
   - Creates gift_cards record
   - Creates gift_card_transactions record (type: 'purchase')
   - Sends email to recipient (placeholder for now)
   - Processes payment (simulated)

2. Redemption to Balance Flow:
   - User enters code on gift cards page
   - System validates code (active, not expired)
   - Creates user_balance record if doesn't exist
   - Adds gift card balance to user_balance
   - Updates gift_card status to 'fully_redeemed'
   - Creates gift_card_transactions record (type: 'redemption_to_balance')
   - Creates user_balance_transactions record (type: 'redemption', expires_at: +6 months)

3. Checkout Usage Flow:
   - User enters code at checkout OR uses account balance
   - System validates and calculates discount
   - Creates order with gift_card_discount or balance_used
   - Updates gift_card balance (partial use supported)
   - Updates gift_card status (partially_used or fully_redeemed)
   - Creates gift_card_transactions record (type: 'checkout_usage')
   - Creates gift_card_redemptions record

4. Expiry Handling:
   - Cron job or scheduled function checks expired cards daily
   - Updates status to 'expired'
   - Creates transaction record (type: 'expiry')
   - For user_balance, check user_balance_transactions.expires_at
   - Deduct expired amounts from user_balance

5. Only ONE gift card code allowed per order (no stacking)
6. User can use EITHER gift card code OR account balance at checkout (or both in future)
7. Partial balance usage is supported (remaining balance stays for future use)
*/
