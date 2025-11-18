# Supabase Edge Functions - Gift Card System

## Overview

Supabase Edge Functions provide serverless backend logic for the gift card system. These functions will be implemented in **Phase 2**.

## Phase 2 Functions

### 1. send-gift-card-email

**Trigger:** After gift card purchase
**Method:** POST

```typescript
// Request
{
  "giftCardId": "uuid",
  "recipientEmail": "user@example.com"
}

// Response
{
  "success": true,
  "emailId": "email_id_from_resend"
}
```

**Implementation:**
- Fetch gift card details from database
- Generate QR code
- Populate email template
- Send via Resend API
- Update gift card status

---

### 2. verify-otp

**Trigger:** OTP verification requests
**Method:** POST

```typescript
// Request
{
  "otpId": "uuid",
  "otpCode": "123456"
}

// Response
{
  "valid": true,
  "verified": true
}
```

**Implementation:**
- Fetch OTP record
- Check expiry
- Verify code
- Mark as verified
- Return result

---

### 3. process-gift-card-order

**Trigger:** Checkout completion
**Method:** POST

```typescript
// Request
{
  "orderData": {
    "amount": 5000,
    "design_theme": "birthday",
    "sender_name": "John Doe",
    "recipient_email": "jane@example.com",
    // ... other fields
  },
  "paymentId": "payment_id",
  "promoCode": "GIFT5"
}

// Response
{
  "success": true,
  "giftCard": {
    "id": "uuid",
    "card_number": "DIVAA-1234-5678-9012",
    "card_pin": "123456"
  },
  "orderId": "GC-2025-12345"
}
```

**Implementation:**
- Validate payment
- Apply promo code discount
- Generate card number & PIN
- Generate QR code
- Create gift card record
- Trigger email sending
- Return card details

---

### 4. process-bulk-order

**Trigger:** Bulk CSV upload
**Method:** POST

```typescript
// Request
{
  "orders": [
    {
      "recipient_name": "John Doe",
      "recipient_email": "john@example.com",
      "amount": 5000,
      "design_theme": "birthday",
      // ... other fields
    }
    // ... up to 100 orders
  ],
  "paymentId": "payment_id",
  "promoCode": "GIFT5"
}

// Response
{
  "success": true,
  "totalProcessed": 100,
  "giftCards": [...],
  "bulkOrderId": "uuid"
}
```

**Implementation:**
- Validate payment for total amount
- Apply promo code if applicable
- Process each order:
  - Generate card number & PIN
  - Generate QR code
  - Create gift card record
  - Queue email sending
- Create bulk order record
- Return summary

---

### 5. validate-promo-code

**Trigger:** Promo code application
**Method:** POST

```typescript
// Request
{
  "code": "GIFT5",
  "totalAmount": 2000
}

// Response
{
  "valid": true,
  "discount_amount": 100,
  "promo_code": {
    "code": "GIFT5",
    "discount_type": "percentage",
    "discount_value": 5,
    "min_purchase_amount": 1000
  }
}
```

**Implementation:**
- Fetch promo code from database
- Check validity (expiry, usage limit)
- Verify minimum purchase
- Calculate discount
- Return validation result

---

### 6. redeem-gift-card

**Trigger:** Checkout with gift card
**Method:** POST

```typescript
// Request
{
  "card_number": "DIVAA-1234-5678-9012",
  "card_pin": "123456",
  "orderAmount": 3000,
  "orderId": "order_uuid"
}

// Response
{
  "success": true,
  "amountRedeemed": 3000,
  "remainingBalance": 2000,
  "transaction": {
    "id": "uuid",
    "transaction_type": "redemption",
    "amount": 3000
  }
}
```

**Implementation:**
- Validate card number & PIN
- Check balance
- Check expiry
- Check status (active)
- Calculate amount to redeem
- Update card balance
- Create transaction record
- Return redemption details

---

## Setup Instructions (Phase 2)

### Prerequisites

- Supabase CLI installed
- Deno runtime (for local testing)
- Service role key

### Installation

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref your-project-ref

# Initialize functions
supabase functions new send-gift-card-email
supabase functions new verify-otp
supabase functions new process-gift-card-order
supabase functions new process-bulk-order
supabase functions new validate-promo-code
supabase functions new redeem-gift-card
```

### Local Development

```bash
# Start Supabase locally
supabase start

# Run function locally
supabase functions serve send-gift-card-email

# Test function
curl -i --location --request POST 'http://localhost:54321/functions/v1/send-gift-card-email' \
  --header 'Authorization: Bearer YOUR_ANON_KEY' \
  --header 'Content-Type: application/json' \
  --data '{"giftCardId":"uuid"}'
```

### Deploy to Production

```bash
# Deploy all functions
supabase functions deploy

# Or deploy specific function
supabase functions deploy send-gift-card-email
```

### Environment Variables

Set these in Supabase Dashboard → Edge Functions → Settings:

```bash
RESEND_API_KEY=your_resend_key
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=your_twilio_phone
```

---

## Common Patterns

### Database Connection

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseKey);
```

### Error Handling

```typescript
try {
  // Function logic
  return new Response(
    JSON.stringify({ success: true, data }),
    { headers: { 'Content-Type': 'application/json' }, status: 200 }
  );
} catch (error) {
  return new Response(
    JSON.stringify({ success: false, error: error.message }),
    { headers: { 'Content-Type': 'application/json' }, status: 500 }
  );
}
```

### CORS Headers

```typescript
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};
```

---

## Testing

### Unit Tests

```typescript
// test/send-gift-card-email.test.ts
import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

Deno.test('should send gift card email', async () => {
  // Test implementation
});
```

### Integration Tests

```bash
# Test with actual Supabase instance
npm run test:integration
```

---

## Monitoring

- View logs in Supabase Dashboard → Edge Functions → Logs
- Set up error alerts
- Monitor function invocations
- Track response times

---

## Security

- Always use service role key for database operations
- Validate all input data
- Rate limit function calls
- Sanitize email content
- Encrypt sensitive data

---

## Phase 2 Timeline (Estimated)

1. **Week 1-2:** Set up Edge Functions infrastructure
2. **Week 3:** Implement email sending function
3. **Week 4:** Implement order processing functions
4. **Week 5:** Implement redemption functions
5. **Week 6:** Testing and deployment

---

For now, these functions are **placeholders**. Phase 1 uses client-side logic with direct Supabase calls.

**Phase 2 will move all critical operations to Edge Functions for:**
- Better security (hide API keys)
- Server-side validation
- Transaction management
- Email/SMS delivery
- Payment processing
