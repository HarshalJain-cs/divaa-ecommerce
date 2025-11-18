import React, { useState } from 'react';
import Header from '@/components/ui/Header';
import { GIFT_CARD_PRESET_AMOUNTS, GIFT_CARD_THEMES, GIFT_CARD_MIN_AMOUNT } from '@/constants/giftcards';
import type { GiftCardTheme, GiftCardFormData } from '@/types/giftcard.types';
import { useCreateGiftCard } from '@/hooks/useGiftCards';
import { toast } from 'sonner';

const GiftCardsPage = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedTheme, setSelectedTheme] = useState<GiftCardTheme>('general');
  const [formData, setFormData] = useState({
    recipient_email: '',
    recipient_name: '',
    sender_name: '',
    personal_message: '',
  });

  const createGiftCard = useCreateGiftCard();

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomAmount(value);
    setSelectedAmount(null);
  };

  const getFinalAmount = (): number => {
    if (selectedAmount) return selectedAmount;
    const custom = parseInt(customAmount);
    return isNaN(custom) ? 0 : custom;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const amount = getFinalAmount();

    // Validation
    if (amount < GIFT_CARD_MIN_AMOUNT) {
      toast.error(`Minimum amount is ₹${GIFT_CARD_MIN_AMOUNT}`);
      return;
    }

    if (!formData.recipient_email || !formData.recipient_name || !formData.sender_name) {
      toast.error('Please fill in all required fields');
      return;
    }

    const giftCardData: GiftCardFormData = {
      amount,
      recipient_email: formData.recipient_email,
      recipient_name: formData.recipient_name,
      sender_name: formData.sender_name,
      personal_message: formData.personal_message,
      design_theme: selectedTheme,
    };

    try {
      await createGiftCard.mutateAsync(giftCardData);
      // Reset form
      setSelectedAmount(null);
      setCustomAmount('');
      setFormData({
        recipient_email: '',
        recipient_name: '',
        sender_name: '',
        personal_message: '',
      });
      setSelectedTheme('general');
    } catch (error) {
      console.error('Error creating gift card:', error);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-rose-gold via-rose-gold-light to-blush py-20 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4">DIVA Gift Cards</h1>
            <p className="text-xl opacity-90">The Perfect Gift for Every Occasion</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Benefits Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                <div className="text-4xl mb-3">💎</div>
                <h3 className="font-bold text-lg mb-2">Premium Jewelry</h3>
                <p className="text-gray-600 text-sm">Choose from our exquisite collection</p>
              </div>
              <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                <div className="text-4xl mb-3">⚡</div>
                <h3 className="font-bold text-lg mb-2">Instant Delivery</h3>
                <p className="text-gray-600 text-sm">Email delivery in minutes</p>
              </div>
              <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                <div className="text-4xl mb-3">🎁</div>
                <h3 className="font-bold text-lg mb-2">6 Months Validity</h3>
                <p className="text-gray-600 text-sm">Plenty of time to shop</p>
              </div>
            </div>

            {/* Main Form Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <form onSubmit={handleSubmit}>
                {/* Theme Selection */}
                <div className="mb-8">
                  <label className="block text-lg font-semibold text-gray-800 mb-4">
                    Choose Design Theme
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {Object.entries(GIFT_CARD_THEMES).map(([themeKey, themeConfig]) => {
                      const isSelected = selectedTheme === themeKey;
                      return (
                        <button
                          key={themeKey}
                          type="button"
                          onClick={() => setSelectedTheme(themeKey as GiftCardTheme)}
                          className={`relative rounded-lg overflow-hidden transition-all ${
                            isSelected
                              ? 'ring-4 ring-rose-gold scale-105'
                              : 'hover:scale-105'
                          }`}
                        >
                          <div className={`h-24 bg-gradient-to-br ${themeConfig.gradient} p-3 flex items-center justify-center text-white font-semibold text-sm text-center`}>
                            {themeConfig.name}
                          </div>
                          {isSelected && (
                            <div className="absolute top-1 right-1 bg-white text-rose-gold rounded-full p-1">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Amount Selection */}
                <div className="mb-8">
                  <label className="block text-lg font-semibold text-gray-800 mb-4">
                    Select Amount
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    {GIFT_CARD_PRESET_AMOUNTS.map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => handleAmountSelect(amount)}
                        className={`py-4 px-6 rounded-lg font-semibold text-lg transition-all ${
                          selectedAmount === amount
                            ? 'bg-rose-gold text-white shadow-lg scale-105'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        ₹{amount.toLocaleString()}
                      </button>
                    ))}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Or Enter Custom Amount (Min: ₹{GIFT_CARD_MIN_AMOUNT})
                    </label>
                    <input
                      type="number"
                      min={GIFT_CARD_MIN_AMOUNT}
                      value={customAmount}
                      onChange={handleCustomAmountChange}
                      placeholder="Enter custom amount"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-gold focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Recipient Details */}
                <div className="mb-8 space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Recipient Details</h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Recipient Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.recipient_email}
                      onChange={(e) => setFormData({ ...formData, recipient_email: e.target.value })}
                      placeholder="recipient@example.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-gold focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Recipient Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.recipient_name}
                      onChange={(e) => setFormData({ ...formData, recipient_name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-gold focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.sender_name}
                      onChange={(e) => setFormData({ ...formData, sender_name: e.target.value })}
                      placeholder="Jane Smith"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-gold focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Personal Message (Optional)
                    </label>
                    <textarea
                      value={formData.personal_message}
                      onChange={(e) => setFormData({ ...formData, personal_message: e.target.value })}
                      placeholder="Add a personal message..."
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-gold focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Preview */}
                {getFinalAmount() >= GIFT_CARD_MIN_AMOUNT && (
                  <div className="mb-8 p-6 bg-gradient-to-br from-rose-100 to-pink-100 rounded-xl">
                    <h3 className="font-semibold text-gray-800 mb-2">Gift Card Preview</h3>
                    <div className="text-3xl font-bold text-rose-gold">
                      ₹{getFinalAmount().toLocaleString()}
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      {GIFT_CARD_THEMES[selectedTheme].name} Theme
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={createGiftCard.isPending || getFinalAmount() < GIFT_CARD_MIN_AMOUNT}
                  className="w-full bg-rose-gold hover:bg-rose-gold-dark text-white font-bold py-4 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                >
                  {createGiftCard.isPending ? 'Processing...' : 'Purchase Gift Card'}
                </button>
              </form>
            </div>

            {/* How It Works */}
            <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-center mb-8">How It Works</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-rose-gold text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                    1
                  </div>
                  <h3 className="font-semibold mb-2">Choose Amount</h3>
                  <p className="text-sm text-gray-600">Select from presets or enter custom amount</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-rose-gold text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                    2
                  </div>
                  <h3 className="font-semibold mb-2">Personalize</h3>
                  <p className="text-sm text-gray-600">Add recipient details and personal message</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-rose-gold text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                    3
                  </div>
                  <h3 className="font-semibold mb-2">Instant Delivery</h3>
                  <p className="text-sm text-gray-600">Gift card sent via email immediately</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-rose-gold text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                    4
                  </div>
                  <h3 className="font-semibold mb-2">Redeem</h3>
                  <p className="text-sm text-gray-600">Use at checkout or add to account balance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GiftCardsPage;
