/**
 * @page RakshaBandhanPage
 * @description Raksha Bandhan jewelry collection - Coming Soon
 */

import Header from '@/components/ui/Header';
import { Sparkles, Gift, Heart } from 'lucide-react';

export default function RakshaBandhanPage() {
  return (
    <>
      <Header />

      <div className="relative bg-gradient-to-br from-orange-50 via-white to-red-50 py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
              Raksha Bandhan Collection
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              Celebrate the bond of love and protection
            </p>
            <div className="inline-block">
              <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg">
                Coming Soon
              </div>
            </div>
            <p className="mt-8 text-gray-600 max-w-2xl mx-auto">
              Celebrate Raksha Bandhan with our exclusive jewelry collection for brothers and sisters.
              Show your love with timeless pieces.
            </p>
          </div>
        </div>
      </div>

      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">What to Expect</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center">
                  <Heart className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Sibling Jewelry</h3>
                <p className="text-gray-600">Perfect gifts for brothers and sisters</p>
              </div>
              <div className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Traditional Designs</h3>
                <p className="text-gray-600">Classic patterns celebrating bonds</p>
              </div>
              <div className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center">
                  <Gift className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Thoughtful Gifts</h3>
                <p className="text-gray-600">Express your love with jewelry</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
