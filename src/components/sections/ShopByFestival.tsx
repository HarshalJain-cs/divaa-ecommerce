/**
 * @component ShopByFestival
 * @description Shop by festival section with split layout - DIVA rose-gold theme
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';

const ShopByFestival: React.FC = () => {
  const categories = [
    {
      id: 1,
      title: "Diwali",
      imageUrl: "https://images.unsplash.com/photo-1605979399068-33e219df5d5f?w=500&h=400&fit=crop",
      path: "/festivals/diwali"
    },
    {
      id: 2,
      title: "Akshaya Tritiya",
      imageUrl: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=500&h=400&fit=crop",
      path: "/festivals/akshaya-tritiya"
    },
    {
      id: 3,
      title: "Raksha Bandhan",
      imageUrl: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=400&fit=crop",
      path: "/festivals/raksha-bandhan"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-cream to-off-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] bg-gradient-to-br from-rose-gold/20 to-cream rounded-3xl overflow-hidden shadow-xl">
          {/* Left: Lifestyle Image */}
          <div className="relative h-[400px] lg:h-auto overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1605979399068-33e219df5d5f?w=800&h=800&fit=crop"
              alt="Festival jewelry"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 to-transparent"></div>
          </div>

          {/* Right: Content Panel */}
          <div className="p-12 flex flex-col justify-center bg-white/50 backdrop-blur-sm">
            <h2 className="text-5xl font-serif font-semibold mb-2 text-charcoal">
              Shop by
            </h2>
            <h2 className="text-5xl font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-yellow-600 mb-3">
              Festival
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Celebrate every festival with perfect jewelry!
            </p>

            {/* Explore Button */}
            <Link
              to="/festivals"
              className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-amber-600 to-yellow-600 text-white rounded-full text-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-300 w-fit mb-10"
            >
              Explore All Festivals
              <ArrowRight size={20} />
            </Link>

            {/* Category Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={category.path}
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
                    <ChevronRight size={18} className="text-amber-600" />
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

export default ShopByFestival;
