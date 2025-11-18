/**
 * @component GiftCardWallet
 * @description Display user's gift card collection in their wallet
 */

import React, { useState, useEffect } from 'react';
import { CreditCard, Download, Eye, RefreshCw, Calendar, AlertCircle, Filter } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import { maskCardNumber, isCardExpired, getDaysUntilExpiry } from '@/lib/giftcard/cardGenerator';
import { downloadGiftCardPDF } from '@/lib/giftcard/pdfGenerator';
import type { GiftCard } from '@/types/giftcard.types';
import { GIFT_CARD_THEMES } from '@/constants/giftcards';

type CardFilter = 'all' | 'active' | 'used' | 'expired';

export default function GiftCardWallet() {
  const [giftCards, setGiftCards] = useState<GiftCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<CardFilter>('active');
  const [selectedCard, setSelectedCard] = useState<GiftCard | null>(null);

  // Fetch gift cards for current user
  useEffect(() => {
    fetchGiftCards();
  }, []);

  const fetchGiftCards = async () => {
    setIsLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        toast.error('Please log in to view your gift cards');
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('gift_cards')
        .select('*')
        .eq('recipient_email', user.email)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching gift cards:', error);
        toast.error('Failed to load gift cards');
      } else {
        setGiftCards(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while loading gift cards');
    } finally {
      setIsLoading(false);
    }
  };

  // Filter cards based on status
  const filteredCards = giftCards.filter(card => {
    if (filter === 'all') return true;
    if (filter === 'active') return card.status === 'active' && !isCardExpired(card.expiry_date);
    if (filter === 'used') return card.current_balance === 0;
    if (filter === 'expired') return isCardExpired(card.expiry_date);
    return true;
  });

  // Get card status badge
  const getStatusBadge = (card: GiftCard) => {
    if (isCardExpired(card.expiry_date)) {
      return <span className="px-3 py-1 bg-gray-200 text-gray-700 text-xs font-bold rounded-full">Expired</span>;
    }
    if (card.current_balance === 0) {
      return <span className="px-3 py-1 bg-orange-200 text-orange-700 text-xs font-bold rounded-full">Fully Used</span>;
    }
    if (card.status === 'active') {
      return <span className="px-3 py-1 bg-green-200 text-green-700 text-xs font-bold rounded-full">Active</span>;
    }
    return <span className="px-3 py-1 bg-gray-200 text-gray-700 text-xs font-bold rounded-full">{card.status}</span>;
  };

  // Handle PDF download
  const handleDownloadPDF = async (card: GiftCard) => {
    try {
      await downloadGiftCardPDF({
        card_number: card.card_number,
        card_pin: card.card_pin,
        amount: card.original_amount,
        design_theme: card.design_theme,
        recipient_name: card.recipient_name,
        sender_name: card.sender_name || 'Divaa Jewels',
        personal_message: card.personal_message || '',
        qr_code_url: card.qr_code_url || '',
        expiry_date: new Date(card.expiry_date).toLocaleDateString('en-IN'),
      });
      toast.success('Gift card PDF downloaded');
    } catch (error) {
      console.error('Error downloading PDF:', error);
      toast.error('Failed to download PDF');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <RefreshCw className="w-8 h-8 text-[#B76E79] animate-spin" />
        <p className="ml-3 text-gray-600">Loading your gift cards...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">My Gift Cards</h2>
          <p className="text-gray-600">Manage and redeem your gift cards</p>
        </div>

        <button
          onClick={fetchGiftCards}
          className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-[#B76E79] transition-all"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        {(['all', 'active', 'used', 'expired'] as CardFilter[]).map(filterOption => (
          <button
            key={filterOption}
            onClick={() => setFilter(filterOption)}
            className={`px-4 py-2 font-semibold capitalize transition-all ${
              filter === filterOption
                ? 'text-[#B76E79] border-b-2 border-[#B76E79]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {filterOption}
            <span className="ml-2 text-sm">
              ({giftCards.filter(card => {
                if (filterOption === 'all') return true;
                if (filterOption === 'active') return card.status === 'active' && !isCardExpired(card.expiry_date);
                if (filterOption === 'used') return card.current_balance === 0;
                if (filterOption === 'expired') return isCardExpired(card.expiry_date);
                return true;
              }).length})
            </span>
          </button>
        ))}
      </div>

      {/* Gift Cards Grid */}
      {filteredCards.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
          <CreditCard className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-bold text-gray-700 mb-2">No Gift Cards Found</h3>
          <p className="text-gray-500 mb-4">
            {filter === 'all'
              ? "You don't have any gift cards yet"
              : `No ${filter} gift cards found`}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCards.map(card => {
            const themeConfig = GIFT_CARD_THEMES[card.design_theme];
            const daysUntilExpiry = getDaysUntilExpiry(card.expiry_date);
            const isExpiringSoon = daysUntilExpiry <= 30 && daysUntilExpiry > 0;

            return (
              <div
                key={card.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-gray-200 hover:shadow-xl transition-all"
              >
                {/* Card Header */}
                <div className={`bg-gradient-to-br ${themeConfig.gradient} p-6 relative`}>
                  <div className="absolute top-3 right-3">
                    {getStatusBadge(card)}
                  </div>

                  <div className="text-white">
                    <p className="text-sm font-semibold mb-2">{themeConfig.name} Gift Card</p>
                    <p className="text-3xl font-bold mb-4">
                      ₹{card.current_balance.toLocaleString('en-IN')}
                    </p>
                    <p className="text-xs opacity-90">
                      of ₹{card.original_amount.toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>

                {/* Card Details */}
                <div className="p-4 space-y-3">
                  {/* Card Number */}
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Card Number</p>
                    <p className="font-mono text-sm font-semibold text-gray-800">
                      {maskCardNumber(card.card_number)}
                    </p>
                  </div>

                  {/* Expiry Warning */}
                  {isExpiringSoon && (
                    <div className="flex items-start gap-2 bg-orange-50 border border-orange-200 rounded-lg p-2">
                      <AlertCircle className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-orange-700">
                        Expires in {daysUntilExpiry} days
                      </p>
                    </div>
                  )}

                  {/* Expiry Date */}
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>
                      Expires: {new Date(card.expiry_date).toLocaleDateString('en-IN')}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => setSelectedCard(card)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#B76E79] text-white font-semibold rounded-lg hover:bg-[#DE5D83] transition-colors text-sm"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                    <button
                      onClick={() => handleDownloadPDF(card)}
                      className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      title="Download PDF"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Card Details Modal (simplified, you can enhance this) */}
      {selectedCard && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedCard(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">Gift Card Details</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-500">Card Number</p>
                <p className="font-mono font-bold">{selectedCard.card_number}</p>
              </div>
              <div>
                <p className="text-gray-500">Current Balance</p>
                <p className="font-bold text-2xl text-[#B76E79]">
                  ₹{selectedCard.current_balance.toLocaleString('en-IN')}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Recipient</p>
                <p className="font-semibold">{selectedCard.recipient_name}</p>
              </div>
              {selectedCard.personal_message && (
                <div>
                  <p className="text-gray-500">Message</p>
                  <p className="italic">"{selectedCard.personal_message}"</p>
                </div>
              )}
            </div>
            <button
              onClick={() => setSelectedCard(null)}
              className="w-full mt-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
