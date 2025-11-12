/**
 * @component GoldPriceWidget
 * @description Live gold price widget with karat selection and animated price display
 */
import { useState, useEffect } from 'react';
import { TrendingUp, RefreshCw } from 'lucide-react';
import { useCurrency } from '../../contexts/CurrencyContext';

interface GoldPrice {
  karat?: number;
  type?: string;
  price: number;
}

const GoldPriceWidget = () => {
  const { currency, convertPrice } = useCurrency();
  const [currentKarat, setCurrentKarat] = useState(0); // Index for rotating display
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Gold and silver prices per gram in USD (these would come from an API in production)
  const goldPrices: GoldPrice[] = [
    { karat: 9, price: 48.30 },   // ~4250 INR / 88
    { karat: 14, price: 74.77 },  // ~6580 INR / 88
    { karat: 18, price: 96.02 },  // ~8450 INR / 88
    { karat: 22, price: 117.27 }, // ~10320 INR / 88
    { karat: 24, price: 127.84 }, // ~11250 INR / 88
    { type: 'S925', price: 1.85 }, // ~164 INR / 88 (Silver 925)
  ];

  // Auto-rotate through karats
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentKarat((prev) => (prev + 1) % goldPrices.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Simulate price refresh (in production, this would call an API)
  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  // Format price with animation-friendly digit separation
  const formatPrice = (priceInUSD: number) => {
    const convertedPrice = convertPrice(priceInUSD);
    const formatted = currency === 'INR'
      ? Math.round(convertedPrice).toLocaleString('en-IN')
      : convertedPrice.toFixed(2);
    return formatted.split('');
  };

  const currentPrice = goldPrices[currentKarat];
  const priceDigits = formatPrice(currentPrice.price);
  const currencySymbol = currency === 'INR' ? '₹' : '$';
  const isSilver = currentPrice.type === 'S925';

  return (
    <div className="gold-price-container relative inline-flex items-center gap-1.5 px-2 py-1.5 bg-gradient-to-r from-pink-50 to-pink-100 rounded-lg shadow-md border border-pink-200 hover:shadow-lg transition-all duration-300">
      {/* Gold/Silver Price Label with Animation */}
      <div className="relative w-8 h-3 overflow-hidden">
        <span
          className={`absolute text-[10px] font-bold text-amber-900 tracking-wide transition-all duration-500 ${
            isSilver ? 'opacity-0 -translate-y-3' : 'opacity-100 translate-y-0'
          }`}
        >
          GOLD
        </span>
        <span
          className={`absolute text-[10px] font-bold text-amber-900 tracking-wide transition-all duration-500 ${
            isSilver ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        >
          SILVER
        </span>
      </div>

      {/* Karat Display with Rotation Animation */}
      <div className="relative">
        <div className="gold-circle w-6 h-6 bg-gradient-to-br from-pink-200 to-pink-400 rounded-full flex items-center justify-center shadow-md relative">
          <div className="carat-wrapper overflow-hidden h-3 flex items-center justify-center w-full">
            <div
              className="carat-track flex flex-col items-center transition-transform duration-600 ease-in-out"
              style={{
                transform: `translateY(-${currentKarat * 12}px)`,
              }}
            >
              {goldPrices.map((item, index) => (
                <div
                  key={item.karat || item.type || index}
                  className="digit h-3 flex items-center justify-center text-white font-bold text-[10px]"
                >
                  {item.type || `${item.karat}K`}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Currency Symbol */}
      <span className="text-sm font-bold text-amber-900">{currencySymbol}</span>

      {/* Animated Price Display */}
      <div className="goldsoverflow relative h-4 flex items-center">
        <div className="gold-value flex items-center gap-0.5">
          {priceDigits.map((char, index) => {
            if (char === ',' || char === '.') {
              return (
                <span key={`separator-${index}`} className="comma text-sm font-bold text-amber-900">
                  {char}
                </span>
              );
            }
            return (
              <div key={index} className="digit-wrapper overflow-hidden h-4 w-2">
                <div
                  className="digit h-4 flex items-center justify-center text-sm font-bold text-amber-900 transition-transform duration-300"
                  style={{ transform: 'translateY(0px)' }}
                >
                  {char}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Per Gram Indicator */}
      <span className="text-[8px] text-amber-700 font-medium">/g</span>

      {/* Refresh Button */}
      <button
        onClick={handleRefresh}
        disabled={isRefreshing}
        className="p-0.5 bg-pink-100 hover:bg-pink-200 rounded-full transition-colors disabled:opacity-50"
        aria-label="Refresh prices"
        title="Refresh gold prices"
      >
        <RefreshCw
          className={`w-2.5 h-2.5 text-amber-700 ${isRefreshing ? 'animate-spin' : ''}`}
        />
      </button>

      {/* Trend Indicator */}
      <div className="flex items-center gap-0.5">
        <TrendingUp className="w-2.5 h-2.5 text-green-600" />
        <span className="text-[8px] text-green-600 font-semibold">+0.5%</span>
      </div>
    </div>
  );
};

export default GoldPriceWidget;
