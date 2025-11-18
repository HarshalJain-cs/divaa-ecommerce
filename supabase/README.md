# Divaa E-Commerce - Supabase Database Setup

This folder contains all database schema and setup scripts for the Divaa e-commerce platform.

## Gift Card System - Phase 1

The gift card system is a comprehensive feature allowing customers to purchase, send, and redeem gift cards.

### Setup Instructions

#### 1. Create Supabase Project

If you haven't already:
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Note down your project URL and API keys

#### 2. Run Database Schema

First, run the main schema creation script to create all tables, functions, and RLS policies:

```sql
-- Run this in Supabase SQL Editor
-- File: gift-cards-schema.sql
-- This creates all tables, indexes, RLS policies, and functions
```

Navigate to your Supabase project → SQL Editor → New Query, then copy and paste the contents of `gift-cards-schema.sql` and run it.

#### 3. Setup Initial Data

After the schema is created, run the data setup script:

```sql
-- Run this in Supabase SQL Editor
-- File: setup-gift-cards-data.sql
-- This inserts promo codes, design themes, admin user, and sample data
```

This script will:
- Insert the **GIFT5** promo code (5% off, min ₹1,000)
- Insert 3 gift card design themes (Birthday, Diwali, General)
- Create admin user (username: `harry`, password: `diva.saj`)
- Insert 3 sample gift cards for testing (optional)

#### 4. Verify Setup

Run the verification queries at the end of `setup-gift-cards-data.sql` to ensure everything is set up correctly:

```sql
-- Check promo codes
SELECT * FROM promo_codes WHERE code = 'GIFT5';

-- Check gift card designs
SELECT * FROM gift_card_designs WHERE is_active = true;

-- Check admin users
SELECT username, email, role, is_active FROM admin_users;
```

### Database Tables

The gift card system uses these tables:

1. **gift_cards** - Main gift card records
2. **gift_card_designs** - Design themes (birthday, diwali, general)
3. **gift_card_orders** - Order records
4. **promo_codes** - Promotional codes
5. **otp_verifications** - OTP verification records
6. **admin_users** - Admin authentication
7. **gift_card_transactions** - Transaction history (Phase 2)
8. **bulk_orders** - Bulk CSV orders (Phase 2)

### Environment Variables

Add these to your `.env` file:

```bash
# Supabase
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key

# For Edge Functions (coming in Phase 2)
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Email Service (Resend)
RESEND_API_KEY=your_resend_api_key
```

### Test Credentials

#### Admin Dashboard
- URL: `/admin`
- Username: `harry`
- Password: `diva.saj`

#### Sample Gift Cards (for testing)
1. **Card 1**: `DIVAA-1234-5678-9001` / PIN: `123456` (₹5,000 balance)
2. **Card 2**: `DIVAA-1234-5678-9002` / PIN: `654321` (₹3,500 balance)
3. **Card 3**: `DIVAA-1234-5678-9003` / PIN: `789012` (₹2,500 balance)

### Security Notes

⚠️ **Important for Production:**

1. Change admin password immediately after first login
2. Remove or regenerate sample gift cards
3. Update promo code validity dates
4. Enable Row Level Security (RLS) - already configured in schema
5. Use strong password hashing (bcryptjs with 10+ rounds)
6. Never commit `.env` file to version control

### Phase 1 Features

✅ **Implemented:**
- Gift card purchase (single & bulk)
- Design themes (Birthday, Diwali, General)
- Promo code support (GIFT5)
- Gift card redemption at checkout
- Balance checking
- Admin dashboard
- PDF generation
- QR codes
- 6-month expiry
- Card types (regular & reloadable)

🚧 **Phase 2 (Planned):**
- Supabase Edge Functions
- Email delivery (Resend integration)
- SMS delivery (Twilio integration)
- Transaction history
- Advanced analytics
- Gift card reload functionality
- Bulk order processing
- Export features

### Troubleshooting

#### Error: "relation does not exist"
- Make sure you ran `gift-cards-schema.sql` first
- Check that all tables were created successfully

#### Error: "RLS policy violation"
- RLS policies are enabled by default
- Use service role key for backend operations
- Or temporarily disable RLS for testing (not recommended)

#### Sample data not inserting
- Check for constraint violations
- Ensure schema is created first
- Sample cards use `ON CONFLICT DO NOTHING` so won't overwrite existing data

### Support

For issues or questions:
- Check the main README.md
- Review the gift card types in `src/types/giftcard.types.ts`
- Examine constants in `src/constants/giftcards.ts`

---

**Phase 1 Complete! 🎉**

Your gift card system is ready for testing. Start by visiting `/gift-cards` to purchase your first gift card!
