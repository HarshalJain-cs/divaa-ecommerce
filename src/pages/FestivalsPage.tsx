/**
 * @page FestivalsPage
 * @description Browse all festivals for jewelry gifting
 */
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import Header from '@/components/ui/Header';
import { FESTIVALS } from '@/constants/collections';

const FestivalsPage = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-amber-50/30 via-white to-yellow-50/20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-amber-100/50 to-yellow-50/50">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto">
              <div className="mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 backdrop-blur-sm rounded-full shadow-md text-sm font-medium text-amber-900">
                  <Sparkles className="w-4 h-4" />
                  Celebrate Every Festival
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-charcoal">
                Shop by
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-yellow-600">
                  Festival
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Make every festival memorable with our specially curated jewelry collections
              </p>
            </div>
          </div>
        </section>

        {/* Festivals Grid */}
        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {FESTIVALS.map((festival) => (
                <Link
                  key={festival.id}
                  to={festival.path}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="aspect-square bg-gradient-to-br from-amber-100/50 to-yellow-100/50 flex items-center justify-center relative overflow-hidden">
                    {/* Icon/Emoji based on festival */}
                    <div className="text-7xl z-10">
                      {festival.id === 'diwali' && '🪔'}
                      {festival.id === 'akshaya-tritiya' && '✨'}
                      {festival.id === 'raksha-bandhan' && '🎁'}
                      {festival.id === 'valentine-day' && '💝'}
                      {festival.id === 'mothers-day' && '🌹'}
                      {festival.id === 'fathers-day' && '👔'}
                      {festival.id === 'friendship-day' && '🤝'}
                      {festival.id === 'karwa-chauth' && '🌙'}
                      {festival.id === 'bhaidooj' && '🎉'}
                      {festival.id === 'eid' && '🌙'}
                      {festival.id === 'navratri' && '💃'}
                      {festival.id === 'durga-puja' && '🙏'}
                      {festival.id === 'christmas' && '🎄'}
                    </div>
                    {/* Decorative gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-amber-500/10 group-hover:to-amber-500/20 transition-colors"></div>
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold text-charcoal mb-2 group-hover:text-amber-600 transition-colors">
                      {festival.label}
                    </h3>
                    <p className="text-sm text-gray-600">Special collection</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-amber-100/50 to-yellow-100/50">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-charcoal mb-4">
              Explore Our Entire Collection
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Discover timeless jewelry perfect for any celebration
            </p>
            <Link
              to="/products"
              className="btn bg-gradient-to-r from-amber-600 to-yellow-600 text-white px-10 py-4 text-lg hover:shadow-xl"
            >
              View All Products
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default FestivalsPage;
