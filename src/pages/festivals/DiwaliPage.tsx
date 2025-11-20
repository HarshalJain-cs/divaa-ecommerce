/**
 * @page DiwaliPage
 * @description Diwali jewelry collection - Coming Soon
 */

import Header from '@/components/ui/Header';
import { Sparkles, Gift, TrendingUp } from 'lucide-react';

export default function DiwaliPage() {
  return (
    <>
      <Header />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-amber-50 via-white to-yellow-50 py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
              Diwali Jewelry Collection
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              Celebrate the festival of lights with stunning jewelry
            </p>

            {/* Coming Soon Badge */}
            <div className="inline-block">
              <div className="bg-gradient-to-r from-amber-600 to-yellow-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg">
                Coming Soon
              </div>
            </div>

            {/* Description */}
            <p className="mt-8 text-gray-600 max-w-2xl mx-auto">
              Illuminate your Diwali celebrations with our exclusive jewelry collection.
              Discover pieces that shine as bright as the festival lights.
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-amber-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-yellow-500 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-amber-600 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                What to Expect
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="p-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-full flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Festive Designs</h3>
                  <p className="text-gray-600">Traditional and modern pieces for Diwali</p>
                </div>
                <div className="p-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-full flex items-center justify-center">
                    <Gift className="w-8 h-8 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Perfect Gifts</h3>
                  <p className="text-gray-600">Ideal for gifting during the festival</p>
                </div>
                <div className="p-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-8 h-8 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Trending Styles</h3>
                  <p className="text-gray-600">Latest festive jewelry trends</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
