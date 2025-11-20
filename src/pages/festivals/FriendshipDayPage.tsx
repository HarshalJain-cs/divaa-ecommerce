/**
 * @page FriendshipDayPage
 * @description Friendship Day jewelry collection - Coming Soon
 */

import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import { Heart, Sparkles, Gift } from 'lucide-react';

export default function FriendshipDayPage() {
  return (
    <>
      <Header />

      <div className="relative bg-gradient-to-br from-yellow-50 via-white to-green-50 py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
              Friendship Day Collection
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              Celebrate friendship with meaningful jewelry
            </p>
            <div className="inline-block">
              <div className="bg-gradient-to-r from-yellow-600 to-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg">
                Coming Soon
              </div>
            </div>
            <p className="mt-8 text-gray-600 max-w-2xl mx-auto">
              Celebrate your special bond with our exclusive friendship jewelry collection.
              Perfect gifts to cherish lifelong friendships.
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
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-yellow-100 to-green-100 rounded-full flex items-center justify-center">
                  <Heart className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Friendship Bands</h3>
                <p className="text-gray-600">Matching jewelry for best friends</p>
              </div>
              <div className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-yellow-100 to-green-100 rounded-full flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Trendy Designs</h3>
                <p className="text-gray-600">Modern styles for friends</p>
              </div>
              <div className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-yellow-100 to-green-100 rounded-full flex items-center justify-center">
                  <Gift className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Perfect Tokens</h3>
                <p className="text-gray-600">Gifts that celebrate friendship</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
