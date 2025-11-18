/**
 * @component GiftCardPreview
 * @description Live preview of gift card with selected design and personalization
 */

import React from 'react';
import { Gift, QrCode, Sparkles } from 'lucide-react';
import type { GiftCardTheme } from '@/types/giftcard.types';
import { GIFT_CARD_THEMES } from '@/constants/giftcards';

interface GiftCardPreviewProps {
  theme: GiftCardTheme | null;
  amount: number | null;
  recipientName: string;
  senderName: string;
  personalMessage: string;
  uploadedImage: File | null;
  imagePreviewUrl?: string;
}

export default function GiftCardPreview({
  theme,
  amount,
  recipientName,
  senderName,
  personalMessage,
  uploadedImage,
  imagePreviewUrl,
}: GiftCardPreviewProps) {
  // Get theme config
  const themeConfig = theme ? GIFT_CARD_THEMES[theme] : null;

  // Default gradient if no theme selected
  const gradient = themeConfig?.gradient || 'from-gray-300 to-gray-400';

  return (
    <div className="sticky top-8">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Gift Card Preview</h2>
        <p className="text-gray-600">See how your gift card will look</p>
      </div>

      {/* Card Preview Container */}
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
        {/* Gift Card */}
        <div className={`relative bg-gradient-to-br ${gradient} p-8 aspect-[16/10]`}>
          {/* Decorative Pattern Overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="grid grid-cols-6 gap-2 h-full w-full p-4">
              {[...Array(24)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg"></div>
              ))}
            </div>
          </div>

          {/* Uploaded Image (Top Right Corner) */}
          {imagePreviewUrl && (
            <div className="absolute top-4 right-4 w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img src={imagePreviewUrl} alt="Personal" className="w-full h-full object-cover" />
            </div>
          )}

          {/* Card Content */}
          <div className="relative h-full flex flex-col justify-between">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Gift className="w-6 h-6 text-white drop-shadow-lg" />
                <h3 className="text-2xl font-bold text-white drop-shadow-lg">DIVAA JEWELS</h3>
              </div>
              {themeConfig && (
                <p className="text-white/90 text-sm font-semibold drop-shadow">
                  {themeConfig.name} Gift Card
                </p>
              )}
            </div>

            {/* Amount */}
            {amount ? (
              <div className="text-center my-4">
                <div className="inline-block bg-white/20 backdrop-blur-sm px-8 py-4 rounded-2xl border-2 border-white/40">
                  <p className="text-white/90 text-sm font-semibold mb-1">Gift Card Value</p>
                  <p className="text-5xl font-bold text-white drop-shadow-lg">
                    ₹{amount.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center my-4">
                <div className="inline-block bg-white/20 backdrop-blur-sm px-8 py-4 rounded-2xl border-2 border-white/40">
                  <p className="text-white/80 text-sm font-semibold">Select an amount</p>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="flex items-end justify-between">
              {/* Card Number Placeholder */}
              <div>
                <p className="text-white/70 text-xs mb-1">Card Number</p>
                <p className="text-white font-mono text-sm drop-shadow">DIVAA-****-****-****</p>
              </div>

              {/* QR Code Placeholder */}
              <div className="bg-white p-2 rounded-lg">
                <QrCode className="w-12 h-12 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Message Section */}
        <div className="bg-gradient-to-br from-[#FAF9F6] to-white p-6 border-t-2 border-dashed border-gray-200">
          {/* Recipient */}
          {recipientName && (
            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-1">To:</p>
              <p className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#B76E79]" />
                {recipientName}
              </p>
            </div>
          )}

          {/* Personal Message */}
          {personalMessage && (
            <div className="mb-4">
              <p className="text-sm text-gray-700 italic leading-relaxed border-l-4 border-[#E0BFB8] pl-3">
                "{personalMessage}"
              </p>
            </div>
          )}

          {/* Sender */}
          {senderName && (
            <div>
              <p className="text-xs text-gray-500 mb-1">From:</p>
              <p className="text-base font-semibold text-gray-700">{senderName}</p>
            </div>
          )}

          {/* Empty State */}
          {!recipientName && !personalMessage && !senderName && (
            <div className="text-center py-4">
              <p className="text-gray-400 text-sm">Your personalized message will appear here</p>
            </div>
          )}
        </div>

        {/* Bottom Info */}
        <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Valid for 6 months from purchase • Redeemable at divaa.com
          </p>
        </div>
      </div>

      {/* Preview Note */}
      <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-xs text-blue-700">
          <strong>Note:</strong> This is a preview. The actual gift card will include a unique card number, PIN, and QR code.
        </p>
      </div>
    </div>
  );
}
