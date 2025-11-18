/**
 * Supabase Edge Function: Send Gift Card Email
 *
 * This edge function sends gift card emails to recipients.
 * It uses Resend for email delivery (configure with RESEND_API_KEY secret).
 *
 * SETUP INSTRUCTIONS:
 * 1. Install Resend: Add to import_map.json or use Deno
 * 2. Set secret: supabase secrets set RESEND_API_KEY=your_resend_api_key
 * 3. Deploy: supabase functions deploy send-gift-card-email
 * 4. Test: supabase functions invoke send-gift-card-email --data '{"giftCard": {...}}'
 *
 * API Endpoint (once deployed):
 * POST https://<project-ref>.supabase.co/functions/v1/send-gift-card-email
 *
 * Request Body:
 * {
 *   "giftCard": {
 *     "code": "DIVA-A1B2-C3D4-E5F6",
 *     "amount": 5000,
 *     "recipient_email": "customer@example.com",
 *     "recipient_name": "John Doe",
 *     "sender_name": "Jane Smith",
 *     "personal_message": "Happy Birthday!",
 *     "design_theme": "birthday",
 *     "expires_at": "2025-07-18T00:00:00Z"
 *   }
 * }
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// CORS headers for browser requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// ============================================
// EMAIL TEMPLATES
// ============================================

const GIFT_CARD_THEMES: Record<string, { name: string; gradient: string }> = {
  birthday: { name: 'Birthday', gradient: 'from-pink-400 to-purple-500' },
  wedding: { name: 'Wedding', gradient: 'from-rose-300 to-pink-400' },
  anniversary: { name: 'Anniversary', gradient: 'from-red-400 to-pink-500' },
  thankyou: { name: 'Thank You', gradient: 'from-amber-300 to-orange-400' },
  general: { name: 'General', gradient: 'from-rose-300 to-rose-400' },
};

function formatCurrency(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function generateEmailHTML(giftCard: any): string {
  const theme = GIFT_CARD_THEMES[giftCard.design_theme] || GIFT_CARD_THEMES.general;
  const redemptionURL = `${Deno.env.get('APP_URL') || 'https://yourdomain.com'}/gift-cards?code=${giftCard.code}`;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>You've Received a DIVA Gift Card!</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9f9f9;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: white; border-radius: 12px; padding: 40px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <div style="font-size: 32px; font-weight: bold; color: #E0BFB8; margin-bottom: 10px;">DIVA JEWELS</div>
            <h1 style="color: #333; margin: 0;">🎁 You've Received a Gift Card!</h1>
          </div>

          <p style="color: #333; line-height: 1.6;">Dear ${giftCard.recipient_name || 'Valued Customer'},</p>
          <p style="color: #333; line-height: 1.6;"><strong>${giftCard.sender_name || 'Someone special'}</strong> has sent you a gift card!</p>

          ${
            giftCard.personal_message
              ? `
            <div style="background: #f5f5f5; border-left: 4px solid #E0BFB8; padding: 20px; margin: 20px 0; font-style: italic; color: #555;">
              "${giftCard.personal_message}"
              <br><br>
              <em>- ${giftCard.sender_name}</em>
            </div>
          `
              : ''
          }

          <div style="background: linear-gradient(135deg, #E0BFB8, #DCA1A1); border-radius: 16px; padding: 30px; text-align: center; color: white; margin: 30px 0;">
            <div style="font-size: 18px;">${theme.name} Gift Card</div>
            <div style="font-size: 48px; font-weight: bold; margin: 20px 0;">${formatCurrency(giftCard.amount)}</div>
            <p>Your gift card code:</p>
            <div style="background: white; color: #333; padding: 15px; border-radius: 8px; font-family: 'Courier New', monospace; font-size: 20px; letter-spacing: 2px; margin: 20px 0;">
              ${giftCard.code}
            </div>
            <p style="color: #ff6b6b; font-weight: bold; margin-top: 15px;">Expires: ${formatDate(giftCard.expires_at)}</p>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${redemptionURL}" style="display: inline-block; background: #E0BFB8; color: white; padding: 15px 40px; border-radius: 8px; text-decoration: none; font-weight: bold;">
              Redeem Gift Card
            </a>
          </div>

          <h3 style="color: #333;">How to Use Your Gift Card:</h3>
          <ol style="color: #555; line-height: 1.8;">
            <li>Visit our website and browse our beautiful jewelry collection</li>
            <li>Add items to your cart</li>
            <li>At checkout, enter your gift card code: <strong>${giftCard.code}</strong></li>
            <li>The discount will be applied automatically!</li>
          </ol>

          <p style="color: #333;"><strong>Or</strong> you can redeem this gift card to your account balance for future purchases.</p>

          <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; color: #999; font-size: 14px;">
            <p>This gift card expires on ${formatDate(giftCard.expires_at)}</p>
            <p>Questions? Contact us at support@divajewels.com</p>
            <p>&copy; ${new Date().getFullYear()} DIVA Jewels. All rights reserved.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

// ============================================
// MAIN HANDLER
// ============================================

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Get request body
    const { giftCard } = await req.json();

    // Validate input
    if (!giftCard || !giftCard.recipient_email || !giftCard.code) {
      return new Response(
        JSON.stringify({
          error: 'Missing required fields: giftCard.recipient_email, giftCard.code',
        }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Get Resend API key from environment
    const resendApiKey = Deno.env.get('RESEND_API_KEY');

    if (!resendApiKey) {
      console.error('RESEND_API_KEY not set');
      return new Response(
        JSON.stringify({
          error: 'Email service not configured. Please set RESEND_API_KEY.',
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Send email using Resend API
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: 'DIVA Jewels <noreply@divajewels.com>',
        to: giftCard.recipient_email,
        subject: `You've received a ${GIFT_CARD_THEMES[giftCard.design_theme]?.name || 'DIVA'} Gift Card!`,
        html: generateEmailHTML(giftCard),
      }),
    });

    const emailData = await emailResponse.json();

    if (!emailResponse.ok) {
      console.error('Resend API error:', emailData);
      return new Response(
        JSON.stringify({
          error: 'Failed to send email',
          details: emailData,
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    console.log('Email sent successfully:', emailData.id);

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Gift card email sent successfully',
        emailId: emailData.id,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in send-gift-card-email function:', error);

    return new Response(
      JSON.stringify({
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

/**
 * DEPLOYMENT INSTRUCTIONS:
 *
 * 1. Set environment variables:
 *    supabase secrets set RESEND_API_KEY=re_xxxxxxxxxx
 *    supabase secrets set APP_URL=https://yourdomain.com
 *
 * 2. Deploy function:
 *    supabase functions deploy send-gift-card-email
 *
 * 3. Test with curl:
 *    curl -i --location --request POST 'https://<project-ref>.supabase.co/functions/v1/send-gift-card-email' \
 *      --header 'Authorization: Bearer <anon-key>' \
 *      --header 'Content-Type: application/json' \
 *      --data '{"giftCard": {...}}'
 *
 * 4. Call from application:
 *    const { data, error } = await supabase.functions.invoke('send-gift-card-email', {
 *      body: { giftCard }
 *    });
 */
