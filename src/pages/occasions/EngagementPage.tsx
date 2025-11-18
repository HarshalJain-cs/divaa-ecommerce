/**
 * @page EngagementPage
 * @description Engagement gifts collection - Coming Soon
 */

import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';

export default function EngagementPage() {
  return (
    <>
      <Header />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-rose-gold/10 to-blush/10 py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            {/* Icon */}
            <div className="mb-6 text-8xl">💍</div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
              Engagement Jewelry
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              Perfect gifts to celebrate your special moment
            </p>

            {/* Coming Soon Badge */}
            <div className="inline-block">
              <div className="bg-gradient-to-r from-rose-gold to-rose-gold-dark text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg">
                Coming Soon
              </div>
            </div>

            {/* Description */}
            <p className="mt-8 text-gray-600 max-w-2xl mx-auto">
              We're curating an exquisite collection of engagement jewelry just for you.
              Stay tuned for stunning rings, necklaces, and more to make your engagement unforgettable.
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

      {/* Additional Info Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              What to Expect
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="p-6">
                <div className="text-4xl mb-4">💎</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Premium Quality</h3>
                <p className="text-gray-600">Handcrafted jewelry with the finest materials</p>
              </div>
              <div className="p-6">
                <div className="text-4xl mb-4">✨</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Unique Designs</h3>
                <p className="text-gray-600">Exclusive collections for your special day</p>
              </div>
              <div className="p-6">
                <div className="text-4xl mb-4">💝</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Perfect Gifts</h3>
                <p className="text-gray-600">Beautiful pieces to celebrate love</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
