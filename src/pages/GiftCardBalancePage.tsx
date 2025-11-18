/**
 * @page GiftCardBalancePage
 * @description Check gift card balance and transaction history
 */

import React, { useState } from 'react';
import { Search, CreditCard, Calendar, AlertCircle, Download, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import Header from '@/components/ui/Header';
import { supabase } from '@/lib/supabase';
import { validateCardNumber, maskCardNumber, isCardExpired, getDaysUntilExpiry } from '@/lib/giftcard/cardGenerator';
import { downloadGiftCardPDF } from '@/lib/giftcard/pdfGenerator';
import type { GiftCard } from '@/types/giftcard.types';
import { GIFT_CARD_THEMES } from '@/constants/giftcards';

export default function GiftCardBalancePage() {
  const [cardNumber, setCardNumber] = useState('');
  const [cardPin, setCardPin] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [cardData, setCardData] = useState<GiftCard | null>(null);
  const [showTransactions, setShowTransactions] = useState(false);

  // Format card number input
  const handleCardNumberChange = (value: string) => {
    const cleaned = value.replace(/[^A-Z0-9]/g, '');
    let formatted = '';
    if (cleaned.length > 0) {
      formatted = cleaned.substring(0, 5);
      if (cleaned.length > 5) formatted += '-' + cleaned.substring(5, 9);
      if (cleaned.length > 9) formatted += '-' + cleaned.substring(9, 13);
      if (cleaned.length > 13) formatted += '-' + cleaned.substring(13, 17);
    }
    setCardNumber(formatted);
  };

  // Check balance
  const handleCheckBalance = async () => {
    if (!validateCardNumber(cardNumber)) {
      toast.error('Invalid card number format. Expected: DIVAA-XXXX-XXXX-XXXX');
      return;
    }

    if (!cardPin || cardPin.length !== 6) {
      toast.error('PIN must be 6 digits');
      return;
    }

    setIsSearching(true);

    try {
      const { data, error } = await supabase
        .from('gift_cards')
        .select('*')
        .eq('card_number', cardNumber)
        .single();

      if (error || !data) {
        toast.error('Gift card not found. Please check the card number.');
        setIsSearching(false);
        return;
      }

      if (data.card_pin !== cardPin) {
        toast.error('Invalid PIN. Please try again.');
        setIsSearching(false);
        return;
      }

      setCardData(data);
      toast.success('Gift card found!');
    } catch (error) {
      console.error('Error checking balance:', error);
      toast.error('Failed to check balance. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  // Handle PDF download
  const handleDownloadPDF = async () => {
    if (!cardData) return;

    try {
      await downloadGiftCardPDF({
        card_number: cardData.card_number,
        card_pin: cardData.card_pin,
        amount: cardData.original_amount,
        design_theme: cardData.design_theme,
        recipient_name: cardData.recipient_name,
        sender_name: cardData.sender_name || 'Divaa Jewels',
        personal_message: cardData.personal_message || '',
        qr_code_url: cardData.qr_code_url || '',
        expiry_date: new Date(cardData.expiry_date).toLocaleDateString('en-IN'),
      });
      toast.success('Gift card PDF downloaded');
    } catch (error) {
      console.error('Error downloading PDF:', error);
      toast.error('Failed to download PDF');
    }
  };

  // Reset search
  const handleReset = () => {
    setCardNumber('');
    setCardPin('');
    setCardData(null);
    setShowTransactions(false);
  };

  const themeConfig = cardData ? GIFT_CARD_THEMES[cardData.design_theme] : null;
  const isExpired = cardData ? isCardExpired(cardData.expiry_date) : false;
  const daysUntilExpiry = cardData ? getDaysUntilExpiry(cardData.expiry_date) : 0;
  const isExpiringSoon = daysUntilExpiry <= 30 && daysUntilExpiry > 0;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-[#FAF9F6] via-white to-[#FAF9F6] py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#E0BFB8]/20 rounded-full mb-4">
              <Search className="w-8 h-8 text-[#B76E79]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Check Gift Card Balance
            </h1>
            <p className="text-lg text-gray-600">
              Enter your gift card details to check balance and status
            </p>
          </div>

          {/* Search Form */}
          {!cardData ? (
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="space-y-6">
                {/* Card Number */}
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
                      className="w-full pl-11 pr-4 py-4 border-2 border-gray-300 rounded-lg focus:border-[#B76E79] focus:ring-2 focus:ring-[#E0BFB8] outline-none transition-all font-mono uppercase text-lg"
                    />
                  </div>
                </div>

                {/* PIN */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    6-Digit PIN
                  </label>
                  <input
                    type="password"
                    value={cardPin}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      if (value.length <= 6) setCardPin(value);
                    }}
                    placeholder="Enter 6-digit PIN"
                    maxLength={6}
                    className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg focus:border-[#B76E79] focus:ring-2 focus:ring-[#E0BFB8] outline-none transition-all font-mono text-lg"
                  />
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleCheckBalance}
                  disabled={isSearching || !cardNumber || cardPin.length !== 6}
                  className="w-full py-4 bg-gradient-to-r from-[#B76E79] to-[#DE5D83] text-white font-bold text-lg rounded-xl hover:shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                >
                  {isSearching ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Checking...
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5" />
                      Check Balance
                    </>
                  )}
                </button>
              </div>

              {/* Info Box */}
              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-700">
                    <p className="font-semibold mb-1">Need help?</p>
                    <ul className="space-y-1 list-disc list-inside">
                      <li>Find your card number on the gift card email or PDF</li>
                      <li>The PIN is also included in your gift card email</li>
                      <li>Contact support if you can't find your card details</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Card Display */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Card Visual */}
                <div className={`bg-gradient-to-br ${themeConfig?.gradient} p-8 relative`}>
                  <div className="absolute top-4 right-4">
                    {isExpired ? (
                      <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                        Expired
                      </span>
                    ) : cardData.status === 'active' ? (
                      <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                        Active
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-gray-500 text-white text-xs font-bold rounded-full capitalize">
                        {cardData.status}
                      </span>
                    )}
                  </div>

                  <div className="text-white">
                    <p className="text-sm font-semibold mb-2">{themeConfig?.name} Gift Card</p>
                    <p className="text-sm opacity-90 mb-6">DIVAA JEWELS</p>

                    <div className="mb-6">
                      <p className="text-xs opacity-75 mb-1">Current Balance</p>
                      <p className="text-5xl font-bold">
                        ₹{cardData.current_balance.toLocaleString('en-IN')}
                      </p>
                      <p className="text-xs opacity-90 mt-1">
                        of ₹{cardData.original_amount.toLocaleString('en-IN')} original amount
                      </p>
                    </div>

                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-xs opacity-75 mb-1">Card Number</p>
                        <p className="font-mono">{maskCardNumber(cardData.card_number)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs opacity-75 mb-1">Expires</p>
                        <p className="text-sm">
                          {new Date(cardData.expiry_date).toLocaleDateString('en-IN')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Details */}
                <div className="p-6 space-y-4">
                  {/* Expiry Warning */}
                  {isExpiringSoon && (
                    <div className="flex items-start gap-2 bg-orange-50 border border-orange-200 rounded-lg p-3">
                      <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-orange-800">Expiring Soon!</p>
                        <p className="text-sm text-orange-700">
                          This gift card will expire in {daysUntilExpiry} days. Use it before it's too late!
                        </p>
                      </div>
                    </div>
                  )}

                  {isExpired && (
                    <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg p-3">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-red-800">Card Expired</p>
                        <p className="text-sm text-red-700">
                          This gift card expired on {new Date(cardData.expiry_date).toLocaleDateString('en-IN')} and can no longer be used.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Recipient Info */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600 mb-1">Recipient</p>
                      <p className="font-semibold text-gray-800">{cardData.recipient_name}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">Card Type</p>
                      <p className="font-semibold text-gray-800 capitalize">{cardData.card_type}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">Issued On</p>
                      <p className="font-semibold text-gray-800">
                        {new Date(cardData.created_at).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">Status</p>
                      <p className="font-semibold text-gray-800 capitalize">{cardData.status}</p>
                    </div>
                  </div>

                  {/* Personal Message */}
                  {cardData.personal_message && (
                    <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-[#B76E79]">
                      <p className="text-xs text-gray-600 mb-1">Personal Message</p>
                      <p className="text-sm italic text-gray-700">"{cardData.personal_message}"</p>
                      {cardData.sender_name && (
                        <p className="text-xs text-gray-600 mt-2">- {cardData.sender_name}</p>
                      )}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-3 pt-4 border-t">
                    <button
                      onClick={handleDownloadPDF}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#B76E79] text-white font-semibold rounded-lg hover:bg-[#DE5D83] transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Download PDF
                    </button>
                    <button
                      onClick={handleReset}
                      className="px-4 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Check Another Card
                    </button>
                  </div>
                </div>
              </div>

              {/* Transaction History (placeholder for Phase 1) */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Transaction History</h3>
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">Transaction history coming in Phase 2</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
