/**
 * @component GiftingGuide
 * @description Shop by recipient guide - DIVA rose-gold theme
 */
import React from 'react';
import { Link } from 'react-router-dom';

const GiftingGuide: React.FC = () => {
  const recipients = [
    {
      id: 1,
      name: "Wife",
      imageUrl: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&h=700&fit=crop",
      link: "/products?recipient=wife"
    },
    {
      id: 2,
      name: "Husband",
      imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=700&fit=crop",
      link: "/products?recipient=husband"
    },
    {
      id: 3,
      name: "Mother",
      imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=700&fit=crop",
      link: "/products?recipient=mother"
    },
    {
      id: 4,
      name: "Brother",
      imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=700&fit=crop",
      link: "/products?recipient=brother"
    },
    {
      id: 5,
      name: "Sister",
      imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=700&fit=crop",
      link: "/products?recipient=sister"
    },
    {
      id: 6,
      name: "Friends",
      imageUrl: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&h=700&fit=crop",
      link: "/products?recipient=friends"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-rose-gold-dark font-semibold mb-2 tracking-wide uppercase text-sm">
            Perfect Gifts
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-semibold text-charcoal mb-4">
            Gifting Guide
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find the perfect gift for your loved ones
          </p>
        </div>

        {/* Recipients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipients.map((recipient) => (
            <Link
              key={recipient.id}
              to={recipient.link}
              className="group bg-gradient-to-br from-light-gray to-cream rounded-3xl overflow-hidden text-center hover:-translate-y-3 hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden h-[350px]">
                <img
                  src={recipient.imageUrl}
                  alt={`Gifts for ${recipient.name}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Recipient Label */}
              <div className="p-6 bg-white">
                <h3 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-rose-gold-dark to-blush-pink">
                  {recipient.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GiftingGuide;
