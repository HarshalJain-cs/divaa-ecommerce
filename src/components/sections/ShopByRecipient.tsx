/**
 * @component ShopByRecipient
 * @description Shop by recipient (Him/Her) section - DIVA rose-gold theme
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { User, Users } from 'lucide-react';

const ShopByRecipient: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-right mb-8">
          <h3 className="text-2xl md:text-3xl font-semibold text-charcoal">
            Shop by Recipient
          </h3>
        </div>

        {/* Split Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 bg-gradient-to-br from-light-gray to-cream rounded-3xl overflow-hidden min-h-[400px] shadow-xl">

          {/* Him Section */}
          <Link
            to="/products?recipient=him"
            className="group relative p-12 flex items-center justify-center bg-gradient-to-br from-rose-gold/10 to-cream/50 hover:from-rose-gold/20 hover:to-cream/70 transition-all duration-500"
          >
            {/* Background Image */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&h=800&fit=crop"
                alt="Gifts for Him"
                className="w-full h-full object-cover opacity-30 group-hover:opacity-40 group-hover:scale-105 transition-all duration-500"
              />
            </div>

            {/* Content */}
            <div className="relative z-10 flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-rose-gold to-rose-gold-dark rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                <User size={24} />
              </div>
              <h3 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-gold-dark to-charcoal group-hover:from-charcoal group-hover:to-rose-gold-dark transition-all duration-300">
                Him
              </h3>
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-rose-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>

          {/* Her Section */}
          <Link
            to="/products?recipient=her"
            className="group relative p-12 flex items-center justify-center bg-gradient-to-br from-blush-pink/10 to-rose-gold/20 hover:from-blush-pink/20 hover:to-rose-gold/30 transition-all duration-500"
          >
            {/* Background Image */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&h=800&fit=crop"
                alt="Gifts for Her"
                className="w-full h-full object-cover opacity-30 group-hover:opacity-40 group-hover:scale-105 transition-all duration-500"
              />
            </div>

            {/* Content */}
            <div className="relative z-10 flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blush-pink to-rose-gold-dark rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Users size={24} />
              </div>
              <h3 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blush-pink to-rose-gold-dark group-hover:from-rose-gold-dark group-hover:to-blush-pink transition-all duration-300">
                Her
              </h3>
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-l from-blush-pink/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ShopByRecipient;
