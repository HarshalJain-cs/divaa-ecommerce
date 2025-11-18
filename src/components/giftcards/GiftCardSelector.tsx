/**
 * @component GiftCardSelector
 * @description Gift card design and amount selector
 */

import React, { useState } from 'react';
import GiftCardDesignOption from './GiftCardDesignOption';
import type { GiftCardTheme, GiftCardType } from '@/types/giftcard.types';
import {
  GIFT_CARD_PRESET_AMOUNTS,
  GIFT_CARD_MIN_AMOUNT,
  GIFT_CARD_MAX_AMOUNT,
  CARD_TYPE_CONFIG,
} from '@/constants/giftcards';
import { toast } from 'sonner';

interface GiftCardSelectorProps {
  selectedTheme: GiftCardTheme | null;
  onThemeSelect: (theme: GiftCardTheme) => void;
  selectedAmount: number | null;
  onAmountSelect: (amount: number) => void;
  selectedCardType: GiftCardType;
  onCardTypeSelect: (type: GiftCardType) => void;
}

export default function GiftCardSelector({
  selectedTheme,
  onThemeSelect,
  selectedAmount,
  onAmountSelect,
  selectedCardType,
  onCardTypeSelect,
}: GiftCardSelectorProps) {
  const [customAmount, setCustomAmount] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const themes: GiftCardTheme[] = ['birthday', 'diwali', 'general'];

  const handleCustomAmountChange = (value: string) => {
    // Only allow numbers
    const numericValue = value.replace(/[^0-9]/g, '');
    setCustomAmount(numericValue);
  };

  const handleCustomAmountSubmit = () => {
    const amount = parseInt(customAmount);

    if (isNaN(amount) || amount < GIFT_CARD_MIN_AMOUNT) {
      toast.error(`Minimum amount is ₹${GIFT_CARD_MIN_AMOUNT}`);
      return;
    }

    if (amount > GIFT_CARD_MAX_AMOUNT) {
      toast.error(`Maximum amount is ₹${GIFT_CARD_MAX_AMOUNT}`);
      return;
    }

    if (amount % 100 !== 0) {
      toast.error('Amount must be a multiple of 100');
      return;
    }

    onAmountSelect(amount);
    setShowCustomInput(false);
    toast.success(`₹${amount.toLocaleString('en-IN')} selected`);
  };

  return (
    <div className="space-y-8">
      {/* Step 1: Select Card Type */}
      <div>
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Step 1: Choose Card Type</h2>
          <p className="text-gray-600">Select between regular or reloadable gift card</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(Object.keys(CARD_TYPE_CONFIG) as GiftCardType[]).map(type => {
            const config = CARD_TYPE_CONFIG[type];
            const isSelected = selectedCardType === type;

            return (
              <div
                key={type}
                onClick={() => onCardTypeSelect(type)}
                className={`
                  relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-300
                  ${
                    isSelected
                      ? 'border-[#B76E79] bg-[#E0BFB8]/10 shadow-lg'
                      : 'border-gray-200 hover:border-[#E0BFB8] hover:shadow-md'
                  }
                `}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">{config.label}</h3>
                    <p className="text-sm text-gray-600">{config.description}</p>
                    {config.badge && (
                      <span className="inline-block mt-2 px-3 py-1 bg-[#E0BFB8] text-white text-xs font-semibold rounded-full">
                        {config.badge}
                      </span>
                    )}
                  </div>
                  {isSelected && (
                    <div className="w-6 h-6 bg-[#B76E79] rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step 2: Select Design Theme */}
      <div>
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Step 2: Choose Design</h2>
          <p className="text-gray-600">Select a beautiful design for your gift card</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {themes.map(theme => (
            <GiftCardDesignOption
              key={theme}
              theme={theme}
              isSelected={selectedTheme === theme}
              onSelect={onThemeSelect}
            />
          ))}
        </div>
      </div>

      {/* Step 3: Select Amount */}
      <div>
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Step 3: Choose Amount</h2>
          <p className="text-gray-600">Select a preset amount or enter a custom value</p>
        </div>

        {/* Preset Amounts */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
          {GIFT_CARD_PRESET_AMOUNTS.map(amount => (
            <button
              key={amount}
              onClick={() => {
                onAmountSelect(amount);
                setShowCustomInput(false);
                setCustomAmount('');
              }}
              className={`
                p-4 rounded-xl border-2 font-bold transition-all duration-300
                ${
                  selectedAmount === amount && !showCustomInput
                    ? 'border-[#B76E79] bg-[#E0BFB8]/20 text-[#B76E79] shadow-lg scale-105'
                    : 'border-gray-200 text-gray-700 hover:border-[#E0BFB8] hover:shadow-md'
                }
              `}
            >
              <div className="text-xl">₹{amount.toLocaleString('en-IN')}</div>
            </button>
          ))}
        </div>

        {/* Custom Amount */}
        <div className="bg-gray-50 rounded-xl p-6 border-2 border-dashed border-gray-300">
          {!showCustomInput ? (
            <button
              onClick={() => setShowCustomInput(true)}
              className="w-full py-3 text-[#B76E79] font-semibold hover:text-[#DE5D83] transition-colors"
            >
              + Enter Custom Amount
            </button>
          ) : (
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">
                Custom Amount (₹{GIFT_CARD_MIN_AMOUNT} - ₹{GIFT_CARD_MAX_AMOUNT.toLocaleString('en-IN')})
              </label>
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
                    ₹
                  </span>
                  <input
                    type="text"
                    value={customAmount}
                    onChange={e => handleCustomAmountChange(e.target.value)}
                    placeholder={`Min ₹${GIFT_CARD_MIN_AMOUNT}`}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#B76E79] focus:ring-2 focus:ring-[#E0BFB8] outline-none transition-all"
                  />
                </div>
                <button
                  onClick={handleCustomAmountSubmit}
                  disabled={!customAmount}
                  className="px-6 py-3 bg-[#B76E79] text-white font-semibold rounded-lg hover:bg-[#DE5D83] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Apply
                </button>
                <button
                  onClick={() => {
                    setShowCustomInput(false);
                    setCustomAmount('');
                  }}
                  className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
              <p className="text-xs text-gray-500">Amount must be a multiple of 100</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
