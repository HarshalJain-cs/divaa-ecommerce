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
      title: "Engagement",
      imageUrl: "https://ceytiwiuidapmlzghlzo.supabase.co/storage/v1/object/public/banner-images/Alishbah%20Anjum.jpg",
      path: "/occasions/engagement"
    },
    {
      id: 2,
      title: "Birthday",
      imageUrl: "https://ceytiwiuidapmlzghlzo.supabase.co/storage/v1/object/public/banner-images/woman%20birthday%20girl%20cake%2021%20stylish%20faceless%20aesthetic%20fashion%20influencer%20story%20luxury.jpg",
      path: "/occasions/birthday"
    },
    {
      id: 3,
      title: "Wedding",
      imageUrl: "https://ceytiwiuidapmlzghlzo.supabase.co/storage/v1/object/public/banner-images/download%20(3).jpg",
      path: "/wedding"
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
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] rounded-3xl overflow-hidden shadow-xl" style={{ backgroundColor: '#D4C5B9' }}>
          {/* Left: Lifestyle Image */}
          <div className="relative h-[400px] lg:h-auto overflow-hidden">
            <img
              src="https://ceytiwiuidapmlzghlzo.supabase.co/storage/v1/object/public/banner-images/download%20(2).jpg"
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
              to="/occasions"
              className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-rose-gold to-rose-gold-dark text-white rounded-full text-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-300 w-fit mb-10"
            >
              Explore All Occasions
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
