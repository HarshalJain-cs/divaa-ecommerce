/**
 * @page MostGiftedPage
 * @description Most gifted jewelry collection - Coming Soon
 */

import Header from '@/components/ui/Header';
import { Gift, TrendingUp, Heart } from 'lucide-react';

export default function MostGiftedPage() {
  return (
    <>
      <Header />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-rose-gold/10 via-white to-blush/10 py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
              Most Gifted Jewelry
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              Top gifted pieces loved by our customers
            </p>

            {/* Coming Soon Badge */}
            <div className="inline-block">
              <div className="bg-gradient-to-r from-rose-gold to-rose-gold-dark text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg">
                Coming Soon
              </div>
            </div>

            {/* Description */}
            <p className="mt-8 text-gray-600 max-w-2xl mx-auto">
              Discover our curated collection of the most popular and trending jewelry pieces.
              These are the gifts that spread the most joy and create lasting memories.
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-rose-gold rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-blush rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-rose-gold-dark rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
      </div>

      {/* Gift Images Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Image Grid Placeholder */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="aspect-square bg-gradient-to-br from-rose-gold/20 to-blush/20 rounded-xl flex items-center justify-center">
                <Gift className="w-12 h-12 text-rose-gold-dark" />
              </div>
              <div className="aspect-square bg-gradient-to-br from-blush/20 to-rose-gold/20 rounded-xl flex items-center justify-center">
                <Heart className="w-12 h-12 text-rose-gold-dark" />
              </div>
              <div className="aspect-square bg-gradient-to-br from-rose-gold/20 to-blush/20 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-12 h-12 text-rose-gold-dark" />
              </div>
              <div className="aspect-square bg-gradient-to-br from-blush/20 to-rose-gold/20 rounded-xl flex items-center justify-center">
                <Gift className="w-12 h-12 text-rose-gold-dark" />
              </div>
            </div>

            {/* Features */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                What to Expect
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="p-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-rose-gold/20 to-blush/20 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-8 h-8 text-rose-gold-dark" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Trending Pieces</h3>
                  <p className="text-gray-600">Most popular jewelry chosen by thousands</p>
                </div>
                <div className="p-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-rose-gold/20 to-blush/20 rounded-full flex items-center justify-center">
                    <Heart className="w-8 h-8 text-rose-gold-dark" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Customer Favorites</h3>
                  <p className="text-gray-600">Highest rated and most loved designs</p>
                </div>
                <div className="p-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-rose-gold/20 to-blush/20 rounded-full flex items-center justify-center">
                    <Gift className="w-8 h-8 text-rose-gold-dark" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Perfect Gifts</h3>
                  <p className="text-gray-600">The best choices for any occasion</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
