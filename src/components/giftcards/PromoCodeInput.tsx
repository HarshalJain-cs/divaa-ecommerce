/**
 * @component PromoCodeInput
 * @description Promo code input field with validation and discount display
 */

import React, { useState } from 'react';
import { Tag, Check, X, Loader2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { validatePromoCode } from '@/lib/giftcard/promoCodeCalculator';
import type { PromoCodeValidation } from '@/types/giftcard.types';

interface PromoCodeInputProps {
  totalAmount: number;
  onPromoApplied: (validation: PromoCodeValidation) => void;
  onPromoRemoved: () => void;
  appliedPromo: PromoCodeValidation | null;
}

export default function PromoCodeInput({
  totalAmount,
  onPromoApplied,
  onPromoRemoved,
  appliedPromo,
}: PromoCodeInputProps) {
  const [promoCode, setPromoCode] = useState('');
  const [isValidating, setIsValidating] = useState(false);

  // Handle promo code application
  const handleApplyPromo = async () => {
    if (!promoCode.trim()) {
      toast.error('Please enter a promo code');
      return;
    }

    if (totalAmount <= 0) {
      toast.error('Add items to cart before applying promo code');
      return;
    }

    setIsValidating(true);

    try {
      const validation = await validatePromoCode(promoCode.trim().toUpperCase(), totalAmount);

      if (validation.valid && validation.discount_amount) {
        onPromoApplied(validation);
        toast.success(
          `Promo code applied! You saved ₹${validation.discount_amount.toLocaleString('en-IN')}`
        );
        setPromoCode('');
      } else {
        toast.error(validation.error || 'Invalid promo code');
      }
    } catch (error) {
      console.error('Error validating promo code:', error);
      toast.error('Failed to validate promo code. Please try again.');
    } finally {
      setIsValidating(false);
    }
  };

  // Handle promo code removal
  const handleRemovePromo = () => {
    onPromoRemoved();
    toast.success('Promo code removed');
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleApplyPromo();
    }
  };

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Tag className="w-5 h-5 text-[#B76E79]" />
        <h3 className="text-lg font-bold text-gray-800">Have a Promo Code?</h3>
      </div>

      {/* Applied Promo Display */}
      {appliedPromo ? (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-lg p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Check className="w-5 h-5 text-green-600" />
                <p className="font-bold text-green-800 uppercase">{appliedPromo.code}</p>
              </div>

              <p className="text-sm text-green-700 mb-2">
                {appliedPromo.promo_code?.description || 'Promo code applied successfully'}
              </p>

              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold text-green-600">
                  -₹{appliedPromo.discount_amount?.toLocaleString('en-IN')}
                </p>
                <p className="text-sm text-green-600">discount applied</p>
              </div>
            </div>

            <button
              onClick={handleRemovePromo}
              className="ml-4 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              title="Remove promo code"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Promo Code Input */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                onKeyPress={handleKeyPress}
                placeholder="Enter promo code (e.g., GIFT5)"
                disabled={isValidating}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#B76E79] focus:ring-2 focus:ring-[#E0BFB8] outline-none transition-all uppercase disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            <button
              onClick={handleApplyPromo}
              disabled={!promoCode.trim() || isValidating}
              className="px-6 py-3 bg-[#B76E79] text-white font-semibold rounded-lg hover:bg-[#DE5D83] disabled:bg-gray-300 disabled:cursor-not-allowed transition-all flex items-center gap-2 min-w-[120px] justify-center"
            >
              {isValidating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Checking...
                </>
              ) : (
                'Apply'
              )}
            </button>
          </div>

          {/* Promo Code Info */}
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-blue-700">
                <p className="font-semibold mb-1">Available Promo Codes:</p>
                <ul className="space-y-1 list-disc list-inside">
                  <li>
                    <strong>GIFT5</strong> - Get 5% off on orders above ₹1,000
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
