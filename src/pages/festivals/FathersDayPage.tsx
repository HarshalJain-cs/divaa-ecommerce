/**
 * @page FathersDayPage
 * @description Father's Day jewelry collection - Coming Soon
 */

import Header from '@/components/ui/Header';
import { Award, Sparkles, Gift } from 'lucide-react';

export default function FathersDayPage() {
  return (
    <>
      <Header />

      <div className="relative bg-gradient-to-br from-blue-50 via-white to-gray-50 py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
              Father's Day Collection
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              Celebrate dad with distinguished jewelry
            </p>
            <div className="inline-block">
              <div className="bg-gradient-to-r from-blue-600 to-gray-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg">
                Coming Soon
              </div>
            </div>
            <p className="mt-8 text-gray-600 max-w-2xl mx-auto">
              Honor the special father in your life with our exclusive jewelry collection.
              Refined pieces that celebrate his strength and wisdom.
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
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-gray-100 rounded-full flex items-center justify-center">
                  <Award className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Masculine Designs</h3>
                <p className="text-gray-600">Strong and refined jewelry for dad</p>
              </div>
              <div className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-gray-100 rounded-full flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Premium Quality</h3>
                <p className="text-gray-600">Crafted with excellence</p>
              </div>
              <div className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-gray-100 rounded-full flex items-center justify-center">
                  <Gift className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Thoughtful Gifts</h3>
                <p className="text-gray-600">Express your gratitude with style</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
