/**
 * @component GiftCardRedemption
 * @description Gift card redemption component for checkout
 */

import React, { useState } from 'react';
import { CreditCard, Lock, Check, X, Loader2, AlertCircle, Gift } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import { validateCardNumber, validateCardPIN, maskCardNumber } from '@/lib/giftcard/cardGenerator';
import type { GiftCard } from '@/types/giftcard.types';

interface GiftCardRedemptionProps {
  orderAmount: number;
  onGiftCardApplied: (card: GiftCard, amountToUse: number) => void;
  onGiftCardRemoved: () => void;
  appliedCard: GiftCard | null;
  appliedAmount: number;
}

export default function GiftCardRedemption({
  orderAmount,
  onGiftCardApplied,
  onGiftCardRemoved,
  appliedCard,
  appliedAmount,
}: GiftCardRedemptionProps) {
  const [cardNumber, setCardNumber] = useState('');
  const [cardPin, setCardPin] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [showPinInput, setShowPinInput] = useState(false);

  // Format card number input (auto-add dashes)
  const handleCardNumberChange = (value: string) => {
    // Remove all non-alphanumeric characters
    const cleaned = value.replace(/[^A-Z0-9]/g, '');

    // Format as DIVAA-XXXX-XXXX-XXXX
    let formatted = '';
    if (cleaned.length > 0) {
      formatted = cleaned.substring(0, 5); // DIVAA
      if (cleaned.length > 5) {
        formatted += '-' + cleaned.substring(5, 9); // First segment
      }
      if (cleaned.length > 9) {
        formatted += '-' + cleaned.substring(9, 13); // Second segment
      }
      if (cleaned.length > 13) {
        formatted += '-' + cleaned.substring(13, 17); // Third segment
      }
    }

    setCardNumber(formatted);
  };

  // Validate and apply gift card
  const handleApplyGiftCard = async () => {
    // Validate card number format
    if (!validateCardNumber(cardNumber)) {
      toast.error('Invalid card number format. Expected format: DIVAA-XXXX-XXXX-XXXX');
      return;
    }

    // Validate PIN format
    if (!validateCardPIN(cardPin)) {
      toast.error('Invalid PIN. PIN must be 6 digits.');
      return;
    }

    setIsValidating(true);

    try {
      // Fetch card from database
      const { data: card, error } = await supabase
        .from('gift_cards')
        .select('*')
        .eq('card_number', cardNumber)
        .single();

      if (error || !card) {
        toast.error('Gift card not found. Please check the card number.');
        setIsValidating(false);
        return;
      }

      // Verify PIN
      if (card.card_pin !== cardPin) {
        toast.error('Invalid PIN. Please try again.');
        setIsValidating(false);
        return;
      }

      // Check if card is active
      if (card.status !== 'active') {
        toast.error(`This gift card is ${card.status}. Cannot be used.`);
        setIsValidating(false);
        return;
      }

      // Check if card is expired
      if (new Date(card.expiry_date) < new Date()) {
        toast.error('This gift card has expired.');
        setIsValidating(false);
        return;
      }

      // Check if card has balance
      if (card.current_balance <= 0) {
        toast.error('This gift card has no remaining balance.');
        setIsValidating(false);
        return;
      }

      // Calculate amount to use (minimum of card balance and order amount)
      const amountToUse = Math.min(card.current_balance, orderAmount);

      // Apply gift card
      onGiftCardApplied(card, amountToUse);

      toast.success(
        `Gift card applied! ₹${amountToUse.toLocaleString('en-IN')} will be deducted from your order.`
      );

      // Clear inputs
      setCardNumber('');
      setCardPin('');
      setShowPinInput(false);
    } catch (error) {
      console.error('Error validating gift card:', error);
      toast.error('Failed to validate gift card. Please try again.');
    } finally {
      setIsValidating(false);
    }
  };

  // Handle card number submission
  const handleCardNumberSubmit = () => {
    if (!validateCardNumber(cardNumber)) {
      toast.error('Please enter a valid card number');
      return;
    }
    setShowPinInput(true);
  };

  // Handle remove gift card
  const handleRemoveCard = () => {
    onGiftCardRemoved();
    toast.success('Gift card removed');
  };

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Gift className="w-5 h-5 text-[#B76E79]" />
        <h3 className="text-lg font-bold text-gray-800">Have a Gift Card?</h3>
      </div>

      {/* Applied Gift Card Display */}
      {appliedCard ? (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-[#B76E79] rounded-lg p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Check className="w-5 h-5 text-green-600" />
                <p className="font-bold text-gray-800">Gift Card Applied</p>
              </div>

              <div className="space-y-1 text-sm">
                <p className="text-gray-700">
                  <strong>Card:</strong> {maskCardNumber(appliedCard.card_number)}
                </p>
                <p className="text-gray-700">
                  <strong>Balance:</strong> ₹{appliedCard.current_balance.toLocaleString('en-IN')}
                </p>
                <p className="text-green-600 font-semibold">
                  Using: ₹{appliedAmount.toLocaleString('en-IN')}
                </p>

                {appliedAmount < appliedCard.current_balance && (
                  <p className="text-xs text-gray-600">
                    Remaining balance: ₹
                    {(appliedCard.current_balance - appliedAmount).toLocaleString('en-IN')} will stay on the card
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={handleRemoveCard}
              className="ml-4 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              title="Remove gift card"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Card Number Input */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Gift Card Number
              </label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => handleCardNumberChange(e.target.value.toUpperCase())}
                  placeholder="DIVAA-XXXX-XXXX-XXXX"
                  maxLength={22}
                  disabled={isValidating}
                  className="w-full pl-11 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#B76E79] focus:ring-2 focus:ring-[#E0BFB8] outline-none transition-all font-mono disabled:bg-gray-100 disabled:cursor-not-allowed uppercase"
                />
              </div>
            </div>

            {/* PIN Input (shown after card number is entered) */}
            {showPinInput && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  6-Digit PIN
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={cardPin}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      if (value.length <= 6) {
                        setCardPin(value);
                      }
                    }}
                    placeholder="Enter 6-digit PIN"
                    maxLength={6}
                    disabled={isValidating}
                    className="w-full pl-11 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#B76E79] focus:ring-2 focus:ring-[#E0BFB8] outline-none transition-all font-mono disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>
              </div>
            )}

            {/* Apply Button */}
            {!showPinInput ? (
              <button
                onClick={handleCardNumberSubmit}
                disabled={!cardNumber || isValidating}
                className="w-full py-3 bg-[#B76E79] text-white font-semibold rounded-lg hover:bg-[#DE5D83] disabled:bg-gray-300 disabled:cursor-not-allowed transition-all"
              >
                Continue
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setShowPinInput(false);
                    setCardPin('');
                  }}
                  disabled={isValidating}
                  className="px-4 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 disabled:opacity-50 transition-all"
                >
                  Back
                </button>
                <button
                  onClick={handleApplyGiftCard}
                  disabled={cardPin.length !== 6 || isValidating}
                  className="flex-1 py-3 bg-[#B76E79] text-white font-semibold rounded-lg hover:bg-[#DE5D83] disabled:bg-gray-300 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                >
                  {isValidating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Validating...
                    </>
                  ) : (
                    'Apply Gift Card'
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Info Box */}
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-blue-700">
                <p className="font-semibold mb-1">Gift Card Information:</p>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Enter your gift card number and PIN to redeem</li>
                  <li>You can use partial balance if order amount is less than card balance</li>
                  <li>Remaining balance stays on the card for future use</li>
                  <li>Cannot combine multiple gift cards in one order</li>
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
