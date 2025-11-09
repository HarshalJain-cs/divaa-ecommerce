/**
 * @component GoldPriceWidget
 * @description Live gold price widget with karat selection and animated price display
 */
import { useState, useEffect } from 'react';
import { TrendingUp, RefreshCw } from 'lucide-react';

interface GoldPrice {
  karat: number;
  price: number;
}

const GoldPriceWidget = () => {
  const [currentKarat, setCurrentKarat] = useState(0); // Index for rotating display
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Gold prices per gram (these would come from an API in production)
  // Using realistic prices for India (in Rupees per gram)
  const goldPrices: GoldPrice[] = [
    { karat: 9, price: 4250 },
    { karat: 14, price: 6580 },
    { karat: 18, price: 8450 },
    { karat: 22, price: 10320 },
    { karat: 24, price: 11250 },
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
    setLastUpdated(new Date());
    setIsRefreshing(false);
  };

  // Format price with animation-friendly digit separation
  const formatPrice = (price: number) => {
    return price.toLocaleString('en-IN').split('');
  };

  const currentPrice = goldPrices[currentKarat];
  const priceDigits = formatPrice(currentPrice.price);

  return (
    <div className="gold-price-container relative inline-flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg shadow-md border border-amber-200 hover:shadow-lg transition-all duration-300">
      {/* Gold Price Label */}
      <span className="text-xs font-bold text-amber-900 tracking-wide">
        GOLD
      </span>

      {/* Karat Display with Rotation Animation */}
      <div className="relative">
        <div className="gold-circle w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-full flex items-center justify-center shadow-md relative">
          <div className="carat-wrapper overflow-hidden h-5 flex items-center justify-center">
            <div
              className="carat-track flex flex-col items-center transition-transform duration-600 ease-in-out"
              style={{
                transform: `translateY(-${currentKarat * 20}px)`,
              }}
            >
              {goldPrices.map((item) => (
                <div
                  key={item.karat}
                  className="digit h-5 flex items-center justify-center text-white font-bold text-sm"
                >
                  {item.karat}
                </div>
              ))}
            </div>
          </div>
          <span className="absolute bottom-0 right-0.5 text-white text-[10px] font-bold z-10 drop-shadow-md">
            K
          </span>
        </div>
      </div>

      {/* Rupee Symbol */}
      <span className="text-lg font-bold text-amber-900">₹</span>

      {/* Animated Price Display */}
      <div className="goldsoverflow relative h-5 flex items-center">
        <div className="gold-value flex items-center gap-0.5">
          {priceDigits.map((char, index) => {
            if (char === ',') {
              return (
                <span key={`comma-${index}`} className="comma text-lg font-bold text-amber-900">
                  ,
                </span>
              );
            }
            return (
              <div key={index} className="digit-wrapper overflow-hidden h-5 w-3">
                <div
                  className="digit h-5 flex items-center justify-center text-lg font-bold text-amber-900 transition-transform duration-300"
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
      <span className="text-[10px] text-amber-700 font-medium">/g</span>

      {/* Refresh Button */}
      <button
        onClick={handleRefresh}
        disabled={isRefreshing}
        className="p-1 bg-amber-100 hover:bg-amber-200 rounded-full transition-colors disabled:opacity-50"
        aria-label="Refresh prices"
        title="Refresh gold prices"
      >
        <RefreshCw
          className={`w-3 h-3 text-amber-700 ${isRefreshing ? 'animate-spin' : ''}`}
        />
      </button>

      {/* Trend Indicator */}
      <div className="flex items-center gap-0.5">
        <TrendingUp className="w-3 h-3 text-green-600" />
        <span className="text-[10px] text-green-600 font-semibold">+0.5%</span>
      </div>
    </div>
  );
};

export default GoldPriceWidget;
