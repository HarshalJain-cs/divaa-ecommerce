/**
 * @page GrihaPraveshPage
 * @description Griha Pravesh (Housewarming) gifts collection - Coming Soon
 */

import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';

export default function GrihaPraveshPage() {
  return (
    <>
      <Header />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-amber-50 to-orange-50 py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            {/* Icon */}
            <div className="mb-6 text-8xl">🏠</div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
              Griha Pravesh Gifts
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              Auspicious jewelry for new beginnings
            </p>

            {/* Coming Soon Badge */}
            <div className="inline-block">
              <div className="bg-gradient-to-r from-rose-gold to-rose-gold-dark text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg">
                Coming Soon
              </div>
            </div>

            {/* Description */}
            <p className="mt-8 text-gray-600 max-w-2xl mx-auto">
              We're curating a special collection of traditional jewelry perfect for housewarming ceremonies.
              Celebrate the joy of a new home with meaningful gifts.
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-amber-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-orange-400 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-yellow-400 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
      </div>

      {/* Additional Info Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              What to Expect
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="p-6">
                <div className="text-4xl mb-4">🪔</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Traditional</h3>
                <p className="text-gray-600">Authentic Indian jewelry designs</p>
              </div>
              <div className="p-6">
                <div className="text-4xl mb-4">🌟</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Auspicious</h3>
                <p className="text-gray-600">Blessed pieces for prosperity</p>
              </div>
              <div className="p-6">
                <div className="text-4xl mb-4">🎁</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Meaningful Gifts</h3>
                <p className="text-gray-600">Perfect for housewarming ceremonies</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
