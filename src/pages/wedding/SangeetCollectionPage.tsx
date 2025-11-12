/**
 * @page SangeetCollectionPage
 * @description Sangeet Collection wedding jewelry page
 */
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';
import Header from '@/components/ui/Header';

const SangeetCollectionPage = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #1F2B8F 0%, #D5B038 100%)' }}>
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Hero Image */}
          <div className="relative h-[60vh] md:h-[70vh]">
            <img
              src="https://s7ap1.scene7.com/is/image/noveljewelsprod/Sangeetmain"
              alt="Sangeet Collection"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
              <div className="container mx-auto">
                <Link
                  to="/wedding"
                  className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors mb-6"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back to Wedding Collections
                </Link>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full shadow-md text-sm font-medium text-white mb-4">
                  <Sparkles className="w-4 h-4" />
                  Wedding Collection
                </div>
                <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-4 drop-shadow-2xl">
                  Sangeet Collection
                </h1>
                <p className="text-xl md:text-2xl text-white/95 max-w-3xl drop-shadow-lg">
                  A captivating blend of polki, diamond, and created Russian emerald stone
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Products Coming Soon Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto">
              <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-emerald-100 to-green-100 flex items-center justify-center">
                <Sparkles className="w-12 h-12 text-emerald-600" />
              </div>
              <h2 className="text-4xl font-serif font-bold mb-6" style={{ color: '#1F2B8F' }}>
                Products Coming Soon
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                We're designing a mesmerizing Sangeet collection that perfectly captures
                the joy and celebration of this special ceremony with stunning polki, diamonds,
                and Russian emeralds.
              </p>
              <p className="text-lg text-gray-500 mb-10">
                Stay tuned for the launch of our exclusive Sangeet Collection
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link
                  to="/wedding"
                  className="px-8 py-4 rounded-lg font-medium transition-all hover:opacity-90"
                  style={{
                    background: 'linear-gradient(135deg, #1F2B8F, #D5B038)',
                    color: 'white'
                  }}
                >
                  Explore Other Collections
                </Link>
                <Link
                  to="/products"
                  className="px-8 py-4 bg-white border-2 rounded-lg font-medium transition-all hover:bg-gray-50"
                  style={{
                    borderColor: '#1F2B8F',
                    color: '#1F2B8F'
                  }}
                >
                  Browse All Products
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Collection Description */}
        <section className="py-20" style={{ background: 'linear-gradient(135deg, #1F2B8F 0%, #D5B038 100%)' }}>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h3 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                About The Sangeet Collection
              </h3>
              <p className="text-lg md:text-xl leading-relaxed text-white/90 mb-8">
                The Sangeet ceremony calls for jewelry that sparkles and shines as you dance
                the night away. Our collection combines the brilliance of polki and diamonds
                with the rich green hues of Russian emeralds.
              </p>
              <p className="text-lg md:text-xl leading-relaxed text-white/90">
                Designed to move with you, each piece captures the energy and excitement
                of this joyous pre-wedding celebration.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SangeetCollectionPage;
