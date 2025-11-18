/**
 * Email Service (Placeholder)
 * Will be configured later with Supabase Edge Functions or external service (Resend/SendGrid)
 *
 * TODO: Configure one of the following:
 * 1. Supabase Edge Function with email provider
 * 2. Resend API (https://resend.com)
 * 3. SendGrid API (https://sendgrid.com)
 * 4. Supabase Auth built-in email templates
 */

import type { GiftCard } from '@/types/giftcard.types';
import { GIFT_CARD_THEMES } from '@/constants/giftcards';
import { formatCurrency, formatExpiryDate } from '@/utils/giftCardUtils';

// ============================================
// TYPES
// ============================================

interface EmailResult {
  success: boolean;
  message: string;
  error?: string;
}

// ============================================
// PLACEHOLDER FUNCTIONS
// ============================================

/**
 * Sends gift card email to recipient
 * @param {GiftCard} giftCard - Gift card data
 * @returns {Promise<EmailResult>} Result of email send operation
 *
 * @example
 * const result = await sendGiftCardEmail(giftCard);
 * if (result.success) {
 *   console.log('Email sent successfully');
 * }
 */
export async function sendGiftCardEmail(giftCard: GiftCard): Promise<EmailResult> {
  try {
    // Log email details for development/testing
    console.log('📧 Gift Card Email (Placeholder)');
    console.log('================================');
    console.log('To:', giftCard.recipient_email);
    console.log('From:', giftCard.sender_name);
    console.log('Code:', giftCard.code);
    console.log('Amount:', formatCurrency(giftCard.amount));
    console.log('Expires:', formatExpiryDate(giftCard.expires_at));
    console.log('Theme:', giftCard.design_theme);
    console.log('Message:', giftCard.personal_message);
    console.log('================================');

    // TODO: Implement actual email sending
    // Option 1: Supabase Edge Function
    // const { data, error } = await supabase.functions.invoke('send-gift-card-email', {
    //   body: { giftCard }
    // });

    // Option 2: Resend API
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'DIVA Jewels <noreply@divajewels.com>',
    //   to: giftCard.recipient_email,
    //   subject: `You've received a gift card from ${giftCard.sender_name}!`,
    //   html: generateGiftCardEmailHTML(giftCard)
    // });

    // Option 3: SendGrid API
    // const sgMail = require('@sendgrid/mail');
    // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    // await sgMail.send({
    //   to: giftCard.recipient_email,
    //   from: 'noreply@divajewels.com',
    //   templateId: EMAIL_CONFIG.TEMPLATE_ID[giftCard.design_theme],
    //   dynamicTemplateData: {
    //     ...giftCard,
    //     formattedAmount: formatCurrency(giftCard.amount),
    //     formattedExpiry: formatExpiryDate(giftCard.expires_at)
    //   }
    // });

    // Simulate email sending delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      success: true,
      message: 'Gift card email queued for delivery (placeholder mode)',
    };
  } catch (error) {
    console.error('Error sending gift card email:', error);
    return {
      success: false,
      message: 'Failed to send gift card email',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Sends gift card balance reminder email
 * @param {string} email - Recipient email
 * @param {number} balance - Remaining balance
 * @param {string} expiryDate - Expiry date
 * @returns {Promise<EmailResult>} Result
 */
export async function sendBalanceReminderEmail(
  email: string,
  balance: number,
  expiryDate: string
): Promise<EmailResult> {
  try {
    console.log('📧 Balance Reminder Email (Placeholder)');
    console.log('To:', email);
    console.log('Balance:', formatCurrency(balance));
    console.log('Expires:', formatExpiryDate(expiryDate));

    // TODO: Implement actual email sending

    return {
      success: true,
      message: 'Balance reminder email queued (placeholder mode)',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to send balance reminder',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Sends gift card redemption confirmation email
 * @param {string} email - User email
 * @param {string} code - Gift card code
 * @param {number} amount - Amount redeemed
 * @returns {Promise<EmailResult>} Result
 */
export async function sendRedemptionConfirmationEmail(
  email: string,
  code: string,
  amount: number
): Promise<EmailResult> {
  try {
    console.log('📧 Redemption Confirmation Email (Placeholder)');
    console.log('To:', email);
    console.log('Code:', code);
    console.log('Amount:', formatCurrency(amount));

    // TODO: Implement actual email sending

    return {
      success: true,
      message: 'Redemption confirmation email queued (placeholder mode)',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to send redemption confirmation',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// ============================================
// EMAIL TEMPLATE GENERATORS (HTML)
// ============================================

/**
 * Generates HTML email template for gift card
 * @param {GiftCard} giftCard - Gift card data
 * @returns {string} HTML email content
 */
export function generateGiftCardEmailHTML(giftCard: GiftCard): string {
  const theme = GIFT_CARD_THEMES[giftCard.design_theme];
  const redemptionURL = `${window.location.origin}/gift-cards?code=${giftCard.code}`;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>You've Received a Gift Card!</title>
      <style>
        body {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f9f9f9;
        }
        .container {
          background: white;
          border-radius: 12px;
          padding: 40px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .logo {
          font-size: 32px;
          font-weight: bold;
          color: #E0BFB8;
          margin-bottom: 10px;
        }
        .gift-card {
          background: linear-gradient(135deg, #E0BFB8, #DCA1A1);
          border-radius: 16px;
          padding: 30px;
          text-align: center;
          color: white;
          margin: 30px 0;
        }
        .amount {
          font-size: 48px;
          font-weight: bold;
          margin: 20px 0;
        }
        .code {
          background: white;
          color: #333;
          padding: 15px;
          border-radius: 8px;
          font-family: 'Courier New', monospace;
          font-size: 20px;
          letter-spacing: 2px;
          margin: 20px 0;
        }
        .message {
          background: #f5f5f5;
          border-left: 4px solid #E0BFB8;
          padding: 20px;
          margin: 20px 0;
          font-style: italic;
        }
        .button {
          display: inline-block;
          background: #E0BFB8;
          color: white;
          padding: 15px 40px;
          border-radius: 8px;
          text-decoration: none;
          margin: 20px 0;
          font-weight: bold;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          color: #999;
          font-size: 14px;
        }
        .expiry {
          color: #ff6b6b;
          font-weight: bold;
          margin-top: 15px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">DIVA JEWELS</div>
          <h1>🎁 You've Received a Gift Card!</h1>
        </div>

        <p>Dear ${giftCard.recipient_name || 'Valued Customer'},</p>

        <p><strong>${giftCard.sender_name || 'Someone special'}</strong> has sent you a gift card!</p>

        ${
          giftCard.personal_message
            ? `
          <div class="message">
            "${giftCard.personal_message}"
            <br><br>
            <em>- ${giftCard.sender_name}</em>
          </div>
        `
            : ''
        }

        <div class="gift-card">
          <div>${theme.name} Gift Card</div>
          <div class="amount">${formatCurrency(giftCard.amount)}</div>
          <p>Your gift card code:</p>
          <div class="code">${giftCard.code}</div>
          <p class="expiry">Expires: ${formatExpiryDate(giftCard.expires_at)}</p>
        </div>

        <p style="text-align: center;">
          <a href="${redemptionURL}" class="button">Redeem Gift Card</a>
        </p>

        <h3>How to Use Your Gift Card:</h3>
        <ol>
          <li>Visit our website and browse our beautiful jewelry collection</li>
          <li>Add items to your cart</li>
          <li>At checkout, enter your gift card code: <strong>${giftCard.code}</strong></li>
          <li>The discount will be applied automatically!</li>
        </ol>

        <p><strong>Or</strong> you can redeem this gift card to your account balance for future purchases.</p>

        <div class="footer">
          <p>This gift card expires on ${formatExpiryDate(giftCard.expires_at)}</p>
          <p>Questions? Contact us at support@divajewels.com</p>
          <p>&copy; ${new Date().getFullYear()} DIVA Jewels. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// ============================================
// CONFIGURATION INSTRUCTIONS
// ============================================

/**
 * Instructions for setting up email service
 *
 * OPTION 1: SUPABASE EDGE FUNCTION
 * --------------------------------
 * 1. Create edge function:
 *    supabase functions new send-gift-card-email
 *
 * 2. Install dependencies in function:
 *    - @supabase/supabase-js
 *    - resend or @sendgrid/mail
 *
 * 3. Set environment variables:
 *    supabase secrets set RESEND_API_KEY=your_key
 *    supabase secrets set SENDGRID_API_KEY=your_key
 *
 * 4. Deploy function:
 *    supabase functions deploy send-gift-card-email
 *
 * OPTION 2: RESEND (Recommended)
 * -------------------------------
 * 1. Sign up at https://resend.com
 * 2. Get API key
 * 3. npm install resend
 * 4. Add VITE_RESEND_API_KEY to .env.local
 * 5. Uncomment Resend code in sendGiftCardEmail()
 *
 * OPTION 3: SENDGRID
 * ------------------
 * 1. Sign up at https://sendgrid.com
 * 2. Get API key
 * 3. Create email templates
 * 4. npm install @sendgrid/mail
 * 5. Add VITE_SENDGRID_API_KEY to .env.local
 * 6. Uncomment SendGrid code in sendGiftCardEmail()
 */

// Export configuration instructions
export const EMAIL_SETUP_INSTRUCTIONS = `
Gift Card Email Service Setup Instructions
==========================================

Current Status: PLACEHOLDER MODE
Emails are logged to console but not actually sent.

To enable email delivery, choose one of these options:

1. SUPABASE EDGE FUNCTION (Recommended for Supabase users)
   - Create edge function: supabase functions new send-gift-card-email
   - Use Resend or SendGrid within the function
   - Deploy: supabase functions deploy send-gift-card-email

2. RESEND (Easiest setup)
   - Sign up: https://resend.com
   - npm install resend
   - Add API key to .env.local
   - Uncomment Resend code in emailService.ts

3. SENDGRID (Enterprise option)
   - Sign up: https://sendgrid.com
   - Create email templates
   - npm install @sendgrid/mail
   - Add API key to .env.local
   - Uncomment SendGrid code in emailService.ts

File Location: src/services/emailService.ts
`;
