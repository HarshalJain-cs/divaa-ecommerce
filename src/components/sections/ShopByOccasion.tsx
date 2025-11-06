/**
 * @component ShopByOccasion
 * @description Shop by occasion section with split layout - DIVA rose-gold theme
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';

const ShopByOccasion: React.FC = () => {
  const categories = [
    {
      id: 1,
      title: "Anniversary Gifts",
      imageUrl: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=500&h=400&fit=crop"
    },
    {
      id: 2,
      title: "Most Gifted",
      imageUrl: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=400&fit=crop"
    },
    {
      id: 3,
      title: "Birthday Gifts",
      imageUrl: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=400&fit=crop"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-off-white to-cream">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* View More Button at Top */}
        <button className="block mx-auto mb-10 px-10 py-3 bg-white border-2 border-rose-gold-dark rounded-full text-base font-medium text-rose-gold-dark hover:bg-rose-gold-dark hover:text-white transition-all duration-300 shadow-md hover:shadow-lg">
          View All Collections
        </button>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] bg-gradient-to-br from-cream to-rose-gold/20 rounded-3xl overflow-hidden shadow-xl">
          {/* Left: Lifestyle Image */}
          <div className="relative h-[400px] lg:h-auto overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&h=800&fit=crop"
              alt="Woman with jewelry"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-rose-gold-dark/20 to-transparent"></div>
          </div>

          {/* Right: Content Panel */}
          <div className="p-12 flex flex-col justify-center bg-white/50 backdrop-blur-sm">
            <h2 className="text-5xl font-serif font-semibold mb-2 text-charcoal">
              Shop by
            </h2>
            <h2 className="text-5xl font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-rose-gold-dark to-blush-pink mb-3">
              Occasion
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Thoughtful gifts for all occasions!
            </p>

            {/* Explore Button */}
            <Link
              to="/products"
              className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-rose-gold to-rose-gold-dark text-white rounded-full text-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-300 w-fit mb-10"
            >
              Explore
              <ArrowRight size={20} />
            </Link>

            {/* Category Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/products?occasion=${category.title.toLowerCase().replace(' ', '-')}`}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:-translate-y-2 hover:shadow-xl transition-all duration-300 cursor-pointer group"
                >
                  <div className="overflow-hidden">
                    <img
                      src={category.imageUrl}
                      alt={category.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 flex items-center justify-center gap-2 font-semibold text-charcoal">
                    {category.title}
                    <ChevronRight size={18} className="text-rose-gold-dark" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopByOccasion;
