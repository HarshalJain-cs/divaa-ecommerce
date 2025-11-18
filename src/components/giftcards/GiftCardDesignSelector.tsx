import React from 'react';
import { GIFT_CARD_THEMES } from '@/constants/giftcards';
import type { GiftCardTheme } from '@/types/giftcard.types';

interface GiftCardDesignSelectorProps {
  selectedTheme: GiftCardTheme;
  onSelectTheme: (theme: GiftCardTheme) => void;
}

const GiftCardDesignSelector: React.FC<GiftCardDesignSelectorProps> = ({
  selectedTheme,
  onSelectTheme,
}) => {
  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Choose Gift Card Design
      </label>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(GIFT_CARD_THEMES).map(([themeKey, themeConfig]) => {
          const isSelected = selectedTheme === themeKey;

          return (
            <button
              key={themeKey}
              type="button"
              onClick={() => onSelectTheme(themeKey as GiftCardTheme)}
              className={`relative group rounded-xl overflow-hidden transition-all duration-300 ${
                isSelected
                  ? 'ring-4 ring-rose-gold scale-105 shadow-xl'
                  : 'hover:scale-105 hover:shadow-lg'
              }`}
            >
              <div
                className={`h-40 bg-gradient-to-br ${themeConfig.gradient} p-6 flex flex-col items-center justify-center text-white`}
              >
                <div className="text-2xl font-bold mb-2">{themeConfig.name}</div>
                <div className="text-sm opacity-90">{themeConfig.description}</div>
              </div>

              {isSelected && (
                <div className="absolute top-2 right-2 bg-white text-rose-gold rounded-full p-2">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default GiftCardDesignSelector;
