/**
 * @component GiftCardCheckout
 * @description Checkout summary and payment processing for gift cards
 */

import React, { useState } from 'react';
import { ShoppingCart, CreditCard, Lock, AlertCircle, Loader2, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import type { GiftCardFormData, PromoCodeValidation } from '@/types/giftcard.types';

interface GiftCardCheckoutProps {
  giftCardData: GiftCardFormData;
  appliedPromo: PromoCodeValidation | null;
  onCheckoutComplete: (orderId: string) => void;
  onCheckoutError: (error: string) => void;
}

export default function GiftCardCheckout({
  giftCardData,
  appliedPromo,
  onCheckoutComplete,
  onCheckoutError,
}: GiftCardCheckoutProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'netbanking'>('card');

  // Calculate amounts
  const subtotal = giftCardData.amount;
  const discount = appliedPromo?.discount_amount || 0;
  const total = subtotal - discount;

  // Handle payment processing
  const handleProceedToPayment = async () => {
    // Validate form data
    if (!giftCardData.sender_name || giftCardData.sender_name.length < 2) {
      toast.error('Please enter sender name');
      return;
    }

    if (!giftCardData.recipient_name || giftCardData.recipient_name.length < 2) {
      toast.error('Please enter recipient name');
      return;
    }

    if (!giftCardData.recipient_email) {
      toast.error('Please enter recipient email');
      return;
    }

    if (!giftCardData.recipient_phone) {
      toast.error('Please enter recipient phone');
      return;
    }

    setIsProcessing(true);

    try {
      // TODO: Integrate with actual payment gateway
      // For Phase 1, this is a placeholder

      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock successful payment
      const mockOrderId = `GC-2025-${Math.floor(Math.random() * 99999).toString().padStart(5, '0')}`;

      toast.success('Payment successful! Generating your gift card...');
      onCheckoutComplete(mockOrderId);
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment failed. Please try again.');
      onCheckoutError('Payment processing failed');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Checkout</h2>
        <p className="text-gray-600">Review your order and complete payment</p>
      </div>

      {/* Order Summary */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <ShoppingCart className="w-5 h-5" />
          Order Summary
        </h3>

        <div className="space-y-3">
          {/* Gift Card Details */}
          <div className="pb-3 border-b border-gray-200">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-semibold text-gray-800">
                  {giftCardData.design_theme.charAt(0).toUpperCase() + giftCardData.design_theme.slice(1)} Gift Card
                </p>
                <p className="text-sm text-gray-600">
                  {giftCardData.card_type === 'reloadable' ? 'Reloadable' : 'Regular'} Card
                </p>
              </div>
              <p className="font-bold text-gray-800">
                ₹{giftCardData.amount.toLocaleString('en-IN')}
              </p>
            </div>

            {/* Recipient Info */}
            <div className="mt-3 bg-gray-50 rounded-lg p-3 text-sm">
              <p className="text-gray-600">
                <strong>To:</strong> {giftCardData.recipient_name} ({giftCardData.recipient_email})
              </p>
              <p className="text-gray-600">
                <strong>From:</strong> {giftCardData.sender_name}
              </p>
            </div>
          </div>

          {/* Pricing Breakdown */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold text-gray-800">
                ₹{subtotal.toLocaleString('en-IN')}
              </span>
            </div>

            {appliedPromo && (
              <div className="flex justify-between text-green-600">
                <span>
                  Discount ({appliedPromo.code})
                </span>
                <span className="font-semibold">
                  -₹{discount.toLocaleString('en-IN')}
                </span>
              </div>
            )}

            <div className="pt-2 border-t-2 border-gray-300 flex justify-between items-baseline">
              <span className="text-lg font-bold text-gray-800">Total</span>
              <span className="text-2xl font-bold text-[#B76E79]">
                ₹{total.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Method Selection */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          Payment Method
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setPaymentMethod('card')}
            disabled={isProcessing}
            className={`p-4 rounded-lg border-2 font-semibold transition-all ${
              paymentMethod === 'card'
                ? 'border-[#B76E79] bg-[#E0BFB8]/20 text-[#B76E79]'
                : 'border-gray-200 text-gray-700 hover:border-[#E0BFB8]'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <CreditCard className="w-6 h-6 mx-auto mb-2" />
            Credit/Debit Card
          </button>

          <button
            onClick={() => setPaymentMethod('upi')}
            disabled={isProcessing}
            className={`p-4 rounded-lg border-2 font-semibold transition-all ${
              paymentMethod === 'upi'
                ? 'border-[#B76E79] bg-[#E0BFB8]/20 text-[#B76E79]'
                : 'border-gray-200 text-gray-700 hover:border-[#E0BFB8]'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <div className="text-2xl mb-2">₹</div>
            UPI
          </button>

          <button
            onClick={() => setPaymentMethod('netbanking')}
            disabled={isProcessing}
            className={`p-4 rounded-lg border-2 font-semibold transition-all ${
              paymentMethod === 'netbanking'
                ? 'border-[#B76E79] bg-[#E0BFB8]/20 text-[#B76E79]'
                : 'border-gray-200 text-gray-700 hover:border-[#E0BFB8]'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <div className="text-xl mb-2">🏦</div>
            Net Banking
          </button>
        </div>

        {/* Payment Gateway Placeholder */}
        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-700">
            <strong>Phase 1 Note:</strong> Payment gateway integration is pending.
            This is a placeholder for the actual payment processing.
          </p>
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 flex items-start gap-3">
        <Lock className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-green-700">
          <p className="font-semibold mb-1">Secure Payment</p>
          <p>Your payment information is encrypted and secure. We never store your card details.</p>
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            id="terms"
            className="mt-1"
            disabled={isProcessing}
          />
          <label htmlFor="terms" className="text-sm text-gray-700">
            I agree to the{' '}
            <a href="/terms" className="text-[#B76E79] font-semibold hover:underline">
              Terms & Conditions
            </a>{' '}
            and understand that gift cards are non-refundable and valid for 6 months from purchase.
          </label>
        </div>
      </div>

      {/* Proceed to Payment Button */}
      <button
        onClick={handleProceedToPayment}
        disabled={isProcessing}
        className="w-full py-4 bg-gradient-to-r from-[#B76E79] to-[#DE5D83] text-white font-bold text-lg rounded-xl hover:shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3"
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-6 h-6 animate-spin" />
            Processing Payment...
          </>
        ) : (
          <>
            <Lock className="w-6 h-6" />
            Pay ₹{total.toLocaleString('en-IN')} Securely
          </>
        )}
      </button>

      {/* Trust Badges */}
      <div className="flex items-center justify-center gap-6 pt-4 border-t border-gray-200">
        <div className="text-center">
          <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-1" />
          <p className="text-xs text-gray-600">Instant Delivery</p>
        </div>
        <div className="text-center">
          <Lock className="w-6 h-6 text-green-600 mx-auto mb-1" />
          <p className="text-xs text-gray-600">Secure Payment</p>
        </div>
        <div className="text-center">
          <CreditCard className="w-6 h-6 text-green-600 mx-auto mb-1" />
          <p className="text-xs text-gray-600">All Payment Methods</p>
        </div>
      </div>
    </div>
  );
}
