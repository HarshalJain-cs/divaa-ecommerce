/**
 * @page OccasionsPage
 * @description Browse all occasions for jewelry gifting
 */
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import Header from '@/components/ui/Header';
import { OCCASIONS } from '@/constants/collections';

const OccasionsPage = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-rose-gold/5 via-white to-cream/20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-rose-gold/10 to-cream">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto">
              <div className="mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-rose-gold/20 backdrop-blur-sm rounded-full shadow-md text-sm font-medium text-rose-gold-dark">
                  <Heart className="w-4 h-4" />
                  Perfect Gifts for Every Occasion
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-charcoal">
                Shop by
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-rose-gold-dark to-blush">
                  Occasion
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Celebrate life's precious moments with our handpicked jewelry collections for every special occasion
              </p>
            </div>
          </div>
        </section>

        {/* Occasions Grid */}
        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {OCCASIONS.map((occasion) => (
                <Link
                  key={occasion.id}
                  to={occasion.path}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="aspect-square bg-gradient-to-br from-rose-gold/20 to-blush/20 flex items-center justify-center relative overflow-hidden">
                    {/* Icon/Emoji based on occasion */}
                    <div className="text-7xl z-10">
                      {occasion.id === 'engagement' && '💍'}
                      {occasion.id === 'birthday' && '🎂'}
                      {occasion.id === 'wedding' && '💐'}
                      {occasion.id === 'anniversary' && '💕'}
                      {occasion.id === 'baby-shower' && '👶'}
                      {occasion.id === 'baby-naming' && '🍼'}
                      {occasion.id === 'griha-pravesh' && '🏠'}
                    </div>
                    {/* Decorative gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-rose-gold/10 group-hover:to-rose-gold/20 transition-colors"></div>
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold text-charcoal mb-2 group-hover:text-rose-gold-dark transition-colors">
                      {occasion.label}
                    </h3>
                    <p className="text-sm text-gray-600">Perfect gifts await</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-rose-gold/10 to-blush/10">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-charcoal mb-4">
              Can't Find the Perfect Occasion?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Browse our entire collection of beautiful jewelry
            </p>
            <Link
              to="/products"
              className="btn bg-gradient-to-r from-rose-gold to-rose-gold-dark text-white px-10 py-4 text-lg hover:shadow-xl"
            >
              View All Products
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default OccasionsPage;
