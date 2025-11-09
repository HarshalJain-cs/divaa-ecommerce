import React from 'react';
import { useCurrency } from '../../contexts/CurrencyContext';

export function CurrencyToggle() {
  const { currency, toggleCurrency } = useCurrency();

  return (
    <button
      onClick={toggleCurrency}
      className="flex items-center gap-1 px-2 py-1 bg-white border border-gray-200 rounded-md hover:border-rose-gold-dark transition-colors text-xs font-semibold"
      aria-label="Toggle currency"
      title={`Switch to ${currency === 'INR' ? 'USD' : 'INR'}`}
    >
      <span className={`transition-opacity ${currency === 'INR' ? 'opacity-100 text-rose-gold-dark' : 'opacity-40 text-gray-400'}`}>
        ₹
      </span>
      <span className="text-gray-300">|</span>
      <span className={`transition-opacity ${currency === 'USD' ? 'opacity-100 text-rose-gold-dark' : 'opacity-40 text-gray-400'}`}>
        $
      </span>
    </button>
  );
}
