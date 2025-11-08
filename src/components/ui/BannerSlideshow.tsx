/**
 * @component BannerSlideshow
 * @description Auto-rotating banner slideshow with promotional content
 */
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Banner {
  id: number;
  title: string;
  description?: string;
  gradient: string;
  icon?: string;
}

interface BannerSlideshowProps {
  banners: Banner[];
  autoPlayInterval?: number; // milliseconds
  theme?: 'gold' | 'silver';
}

export default function BannerSlideshow({
  banners,
  autoPlayInterval = 2000,
  theme = 'gold'
}: BannerSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [banners.length, autoPlayInterval]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const themeColors = theme === 'gold'
    ? {
        button: 'bg-amber-600 hover:bg-amber-700',
        dot: 'bg-amber-600',
        dotInactive: 'bg-amber-200'
      }
    : {
        button: 'bg-slate-600 hover:bg-slate-700',
        dot: 'bg-slate-600',
        dotInactive: 'bg-slate-200'
      };

  return (
    <div className="relative w-full h-64 md:h-80 overflow-hidden rounded-2xl shadow-xl group">
      {/* Slides */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {banners.map((banner) => (
          <div
            key={banner.id}
            className={`min-w-full h-full flex items-center justify-center ${banner.gradient} relative`}
          >
            {/* Banner Content */}
            <div className="text-center px-8 z-10">
              {banner.icon && (
                <div className="text-6xl mb-4">{banner.icon}</div>
              )}
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-3 drop-shadow-lg">
                {banner.title}
              </h2>
              {banner.description && (
                <p className="text-xl md:text-2xl text-white/90 drop-shadow-md">
                  {banner.description}
                </p>
              )}
            </div>

            {/* Decorative overlay */}
            <div className="absolute inset-0 bg-black/10"></div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className={`absolute left-4 top-1/2 -translate-y-1/2 p-3 ${themeColors.button} text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20`}
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={goToNext}
        className={`absolute right-4 top-1/2 -translate-y-1/2 p-3 ${themeColors.button} text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20`}
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? `${themeColors.dot} w-8`
                : `${themeColors.dotInactive}`
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
