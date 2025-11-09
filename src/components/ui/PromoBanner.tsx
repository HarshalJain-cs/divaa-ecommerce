import { useState, useEffect } from 'react';

const PROMO_MESSAGES = [
  'Flat 5% Cashback',
  '0% Making Charges',
];

export function PromoBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % PROMO_MESSAGES.length);
    }, 3000); // Rotate every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-gradient-to-r from-pink-50 to-pink-100 overflow-hidden">
      <div className="relative h-8 flex items-center justify-center">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {PROMO_MESSAGES.map((message, index) => (
            <div
              key={index}
              className="min-w-full flex items-center justify-center"
            >
              <p className="text-sm font-semibold text-rose-gold-dark tracking-wide">
                {message}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
