/**
 * @component ProductCarousel
 * @description Horizontal scrolling product carousel with drag functionality - DIVA rose-gold theme
 */
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';

interface Product {
  id: string | number;
  name: string;
  price: number;
  imageUrl: string;
  category?: string;
}

interface ProductCarouselProps {
  products: Product[];
  title?: string;
  subtitle?: string;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({
  products,
  title = "Trending Now",
  subtitle = "Discover our most popular pieces"
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-off-white to-cream">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-rose-gold-dark font-semibold mb-2 tracking-wide uppercase text-sm">
            {subtitle}
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-semibold text-charcoal">
            {title}
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-rose-gold-dark hover:text-white transition-all duration-300 disabled:opacity-50"
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-rose-gold-dark hover:text-white transition-all duration-300 disabled:opacity-50"
            aria-label="Scroll right"
          >
            <ChevronRight size={24} />
          </button>

          {/* Product Cards */}
          <div
            ref={carouselRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            className={`flex gap-5 overflow-x-auto scrollbar-hide py-4 px-12 scroll-smooth ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {products.map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="flex-shrink-0 w-[200px] bg-white rounded-xl overflow-hidden shadow-md hover:-translate-y-3 hover:shadow-xl transition-all duration-300 group"
                draggable={false}
              >
                {/* Product Image */}
                <div className="relative overflow-hidden h-[200px]">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    draggable={false}
                  />
                  {/* Wishlist Button */}
                  <button
                    className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-rose-gold-dark hover:text-white"
                    onClick={(e) => {
                      e.preventDefault();
                      // Add to wishlist logic
                    }}
                    aria-label="Add to wishlist"
                  >
                    <Heart size={16} />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h4 className="font-semibold text-sm mb-1 text-charcoal truncate">
                    {product.name}
                  </h4>
                  <p className="text-rose-gold-dark font-bold">
                    ₹{product.price.toLocaleString('en-IN')}
                  </p>
                  {product.category && (
                    <p className="text-xs text-gray-500 mt-1 capitalize">
                      {product.category}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;
