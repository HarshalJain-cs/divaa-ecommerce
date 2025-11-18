# Email Templates - Divaa E-Commerce

This folder contains HTML email templates for the Divaa platform.

## Gift Card Email Template

### Template: `gift-card-delivery.html`

Beautiful, responsive HTML email template for gift card delivery.

### Template Variables

Replace these placeholders with actual data when sending emails:

| Variable | Description | Example |
|----------|-------------|---------|
| `{{SENDER_NAME}}` | Name of the person who sent the gift card | "John Doe" |
| `{{RECIPIENT_NAME}}` | Name of the gift card recipient | "Jane Smith" |
| `{{RECIPIENT_EMAIL}}` | Email address of the recipient | "jane@example.com" |
| `{{AMOUNT}}` | Gift card amount (formatted) | "5,000" |
| `{{CARD_NUMBER}}` | Gift card number | "DIVAA-1234-5678-9012" |
| `{{CARD_PIN}}` | 6-digit PIN | "123456" |
| `{{EXPIRY_DATE}}` | Expiry date (formatted) | "July 15, 2025" |
| `{{THEME_NAME}}` | Gift card theme | "Birthday Celebration" |
| `{{PERSONAL_MESSAGE}}` | Optional personal message | "Happy Birthday!" |
| `{{QR_CODE_URL}}` | URL to QR code image | "https://..." |
| `{{GRADIENT_FROM}}` | CSS gradient start color | "#B76E79" |
| `{{GRADIENT_TO}}` | CSS gradient end color | "#DE5D83" |

### Usage with Resend

```typescript
import { Resend } from 'resend';
import fs from 'fs';

const resend = new Resend(process.env.RESEND_API_KEY);

// Read template
const template = fs.readFileSync('email-templates/gift-card-delivery.html', 'utf-8');

// Replace variables
const html = template
  .replace(/{{SENDER_NAME}}/g, giftCard.sender_name)
  .replace(/{{RECIPIENT_NAME}}/g, giftCard.recipient_name)
  .replace(/{{RECIPIENT_EMAIL}}/g, giftCard.recipient_email)
  .replace(/{{AMOUNT}}/g, giftCard.amount.toLocaleString('en-IN'))
  .replace(/{{CARD_NUMBER}}/g, giftCard.card_number)
  .replace(/{{CARD_PIN}}/g, giftCard.card_pin)
  .replace(/{{EXPIRY_DATE}}/g, new Date(giftCard.expiry_date).toLocaleDateString())
  .replace(/{{THEME_NAME}}/g, GIFT_CARD_THEMES[giftCard.design_theme].name)
  .replace(/{{PERSONAL_MESSAGE}}/g, giftCard.personal_message || '')
  .replace(/{{QR_CODE_URL}}/g, giftCard.qr_code_url)
  .replace(/{{GRADIENT_FROM}}/g, '#B76E79')
  .replace(/{{GRADIENT_TO}}/g, '#DE5D83');

// Send email
await resend.emails.send({
  from: 'Divaa Jewels <giftcards@divaa.com>',
  to: giftCard.recipient_email,
  subject: `You've received a ₹${giftCard.amount} gift card from ${giftCard.sender_name}!`,
  html: html,
});
```

### Gradient Colors by Theme

```javascript
const THEME_GRADIENTS = {
  birthday: {
    from: '#9333ea',  // purple-400
    to: '#ec4899',    // pink-500
  },
  diwali: {
    from: '#fb923c',  // orange-400
    to: '#ef4444',    // red-500
  },
  general: {
    from: '#fb7185',  // rose-400
    to: '#f472b6',    // pink-400
  },
};
```

### Features

- ✅ Responsive design (mobile & desktop)
- ✅ Beautiful gradient backgrounds matching card themes
- ✅ QR code integration
- ✅ Personal message display (conditional)
- ✅ Clear redemption instructions
- ✅ Expiry date warning
- ✅ CTA button to start shopping
- ✅ Professional footer with links
- ✅ Inline CSS for email client compatibility

### Testing

Test the email template:
1. Use a service like [Litmus](https://litmus.com) or [Email on Acid](https://www.emailonacid.com/)
2. Test in multiple email clients (Gmail, Outlook, Apple Mail, etc.)
3. Check mobile rendering
4. Verify all links work
5. Test with and without personal message

### Customization

To customize colors:
1. Update gradient colors in `THEME_GRADIENTS` above
2. Modify the `background: linear-gradient()` in `.gift-card-box`
3. Update brand colors in `.header` and `.cta-button`

### Phase 2 Templates (Planned)

- Order confirmation email
- Order shipped notification
- Bulk order confirmation
- Gift card balance reminder (30 days before expiry)
- Gift card reload confirmation
- Admin notification emails

---

**Email Best Practices:**

- Keep file size under 102KB
- Use inline CSS (done)
- Test in 20+ email clients
- Include plain text version
- Use web-safe fonts
- Optimize images
- Include unsubscribe link (if applicable)
- Test spam scores

---

For questions or support, contact the development team.
