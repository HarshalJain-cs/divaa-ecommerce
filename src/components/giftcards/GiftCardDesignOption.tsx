/**
 * @component GiftCardDesignOption
 * @description Individual gift card design theme option card
 */

import React from 'react';
import { Check } from 'lucide-react';
import type { GiftCardTheme } from '@/types/giftcard.types';
import { GIFT_CARD_THEMES } from '@/constants/giftcards';

interface GiftCardDesignOptionProps {
  theme: GiftCardTheme;
  isSelected: boolean;
  onSelect: (theme: GiftCardTheme) => void;
}

export default function GiftCardDesignOption({ theme, isSelected, onSelect }: GiftCardDesignOptionProps) {
  const config = GIFT_CARD_THEMES[theme];

  return (
    <div
      onClick={() => onSelect(theme)}
      className={`
        relative cursor-pointer rounded-xl overflow-hidden transition-all duration-300
        ${isSelected ? 'ring-4 ring-[#B76E79] scale-105 shadow-xl' : 'hover:scale-102 hover:shadow-lg'}
      `}
    >
      {/* Design Preview */}
      <div className={`h-48 bg-gradient-to-br ${config.gradient} p-6 flex items-center justify-center relative`}>
        {/* Placeholder pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-4 gap-2 h-full w-full p-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg"></div>
            ))}
          </div>
        </div>

        {/* Theme Name */}
        <div className="relative text-center">
          <h3 className="text-2xl font-bold text-white drop-shadow-lg">{config.name}</h3>
          <p className="text-white/90 text-sm mt-1">Gift Card</p>
        </div>

        {/* Selected Indicator */}
        {isSelected && (
          <div className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-lg animate-scale-in">
            <Check className="w-5 h-5 text-[#B76E79]" strokeWidth={3} />
          </div>
        )}
      </div>

      {/* Description */}
      <div className="p-4 bg-white border-t border-gray-100">
        <p className="text-sm text-gray-600 text-center">{config.description}</p>
      </div>
    </div>
  );
}
