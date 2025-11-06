/**
 * @component CustomerStories
 * @description Customer testimonials section with DIVA rose-gold theme
 */
import React from 'react';
import TestimonialCard from '../ui/TestimonialCard';

const CustomerStories: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      text: "A big shout out to DIVA for improving my husband's gifting tastes. Completely in love with my ring!",
      imageUrl: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop",
      rating: 5
    },
    {
      id: 2,
      name: "Anjali Verma",
      text: "Never thought buying jewellery would be this easy, thanks for helping make my mom's birthday special.",
      imageUrl: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
      rating: 5
    },
    {
      id: 3,
      name: "Sneha Patel",
      text: "Gifted these earrings to my sister on her wedding and she loved them! I am obsessed with buying gifts from DIVA.",
      imageUrl: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-rose-gold-dark font-semibold mb-2 tracking-wide uppercase text-sm">
            Testimonials
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-semibold text-charcoal mb-4">
            Customer Stories
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear what our customers have to say about their DIVA experience
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} {...testimonial} />
          ))}
        </div>

        {/* Know More CTA */}
        <div className="bg-gradient-to-r from-rose-gold/20 via-cream to-rose-gold/20 py-6 text-center rounded-lg border border-rose-gold/30">
          <p className="text-lg font-medium text-charcoal">
            Know More about{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-gold-dark to-blush-pink font-semibold">
              DIVA Jewelry
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default CustomerStories;
