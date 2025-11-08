/**
 * @page SilverCollectionPage
 * @description Silver jewelry collection page with hero section and filtered products
 */
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Gem, Shield, Heart, Volume2, VolumeX } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { useCart } from '@/contexts/CartContext';
import ProductGrid from '@/components/product/ProductGrid';
import Header from '@/components/ui/Header';
import GlassToggle from '@/components/ui/GlassToggle';
import BannerSlideshow from '@/components/ui/BannerSlideshow';

const SilverCollectionPage = () => {
  const { data: products, isLoading } = useProducts({ metal_type: 'silver' });
  const { addToCart } = useCart();
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Banner data for slideshow
  const silverBanners = [
    {
      id: 1,
      title: '0% Making Charge',
      description: 'On all silver jewelry',
      gradient: 'bg-gradient-to-r from-slate-600 via-gray-500 to-slate-600',
      icon: '✨'
    },
    {
      id: 2,
      title: 'New Arrivals',
      description: 'Fresh designs every week',
      gradient: 'bg-gradient-to-r from-gray-700 via-slate-600 to-gray-700',
      icon: '🆕'
    },
    {
      id: 3,
      title: 'Free Shipping',
      description: '& 30 Days Return',
      gradient: 'bg-gradient-to-r from-slate-700 via-gray-600 to-slate-700',
      icon: '🚚'
    }
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-gray-50/30">
        {/* Hero Section - Silver Theme */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-100 via-gray-50 to-slate-50">
          {/* Video Background */}
          <div className="absolute inset-0 z-0">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(1.1) contrast(1.05)' }}
            >
              <source src="https://ceytiwiuidapmlzghlzo.supabase.co/storage/v1/object/public/videos/WhatsApp%20Video%202025-11-08%20at%2012.36.14_0524b867.mp4" type="video/mp4" />
            </video>
            {/* Subtle overlay for text contrast without dimming video quality */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/15 via-transparent to-transparent"></div>
          </div>

          {/* Mute Button - Bottom Right */}
          <button
            onClick={toggleMute}
            className="absolute bottom-6 right-6 z-20 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all hover:scale-110"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 text-slate-700" />
            ) : (
              <Volume2 className="w-5 h-5 text-slate-700" />
            )}
          </button>

          <div className="container-custom py-16 md:py-24 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              {/* Toggle */}
              <div className="mb-8 animate-fade-in">
                <GlassToggle defaultSelection="silver" mode="navigation" />
              </div>

              {/* Badge */}
              <div className="mb-6 animate-fade-in">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md text-sm font-medium text-slate-900">
                  <Gem className="w-4 h-4 text-slate-600" />
                  925 Sterling Silver Collection
                </span>
              </div>

              {/* Heading */}
              <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 text-white animate-fade-in-up" style={{ textShadow: '0 4px 12px rgba(0,0,0,0.6), 0 2px 4px rgba(0,0,0,0.4), 0 0 20px rgba(0,0,0,0.3)' }}>
                Elegant
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-white to-slate-200" style={{ textShadow: '0 4px 12px rgba(0,0,0,0.7), 0 2px 6px rgba(0,0,0,0.5)' }}>
                  Silver Jewelry
                </span>
              </h1>

              {/* Description */}
              <p className="text-xl md:text-2xl text-white mb-10 leading-relaxed animate-fade-in-up max-w-3xl mx-auto font-medium" style={{ animationDelay: '0.2s', textShadow: '0 3px 8px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.4), 0 0 15px rgba(0,0,0,0.3)' }}>
                Explore our stunning collection of 925 sterling silver jewelry.
                Affordable luxury with timeless designs that complement your everyday style.
              </p>

              {/* CTA Buttons */}
              <div className="flex gap-4 justify-center flex-wrap animate-fade-in-up" style={{animationDelay: '0.3s'}}>
                <a
                  href="#products"
                  className="btn bg-gradient-to-r from-slate-600 to-gray-600 text-white hover:shadow-xl px-10 py-4 text-lg"
                >
                  Shop Silver Jewelry
                </a>
                <Link
                  to="/collections/gold"
                  className="btn bg-white text-slate-900 hover:bg-slate-50 px-10 py-4 text-lg border-2 border-slate-200"
                >
                  View Gold Collection
                </Link>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto mt-16">
              <div className="flex flex-col items-center text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl shadow-sm">
                <Shield className="w-8 h-8 text-slate-600 mb-2" />
                <p className="font-semibold text-sm text-slate-900">925 Sterling Silver</p>
                <p className="text-xs text-slate-700">100% Authentic</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl shadow-sm">
                <Heart className="w-8 h-8 text-slate-600 mb-2" />
                <p className="font-semibold text-sm text-slate-900">Hypoallergenic</p>
                <p className="text-xs text-slate-700">Skin-Friendly</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl shadow-sm col-span-2 md:col-span-1">
                <Gem className="w-8 h-8 text-slate-600 mb-2" />
                <p className="font-semibold text-sm text-slate-900">Premium Quality</p>
                <p className="text-xs text-slate-700">Expertly Crafted</p>
              </div>
            </div>
          </div>
        </section>

        {/* Category Quick Links */}
        <section className="py-12 bg-white/50">
          <div className="container-custom">
            <h2 className="text-2xl font-serif font-bold text-center mb-8 text-slate-900">
              Browse Silver Jewelry by Category
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                { name: 'Silver Rings', icon: '💍' },
                { name: 'Silver Earrings', icon: '💎' },
                { name: 'Silver Necklaces', icon: '📿' },
                { name: 'Silver Bracelets', icon: '⌚' },
                { name: 'Silver Pendants', icon: '🔸' },
                { name: 'Silver Sets', icon: '✨' },
              ].map((category) => (
                <Link
                  key={category.name}
                  to={`/categories/${category.name.toLowerCase().replace(/ /g, '-')}`}
                  className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 hover:border-slate-300"
                >
                  <span className="text-4xl mb-2">{category.icon}</span>
                  <span className="text-sm font-medium text-slate-900 text-center">{category.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Banner Slideshow */}
        <section className="py-12 bg-white">
          <div className="container-custom">
            <BannerSlideshow banners={silverBanners} autoPlayInterval={2000} theme="silver" />
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="py-20 bg-white">
          <div className="container-custom">
            <div className="text-center mb-16">
              <p className="text-slate-600 font-semibold mb-2 tracking-wide uppercase text-sm">Our Collection</p>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4">
                Silver Jewelry Collection
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                {products?.length || 0} beautiful silver pieces to choose from
              </p>
            </div>

            <ProductGrid
              products={products}
              isLoading={isLoading}
              onAddToCart={addToCart}
            />

            {!isLoading && (!products || products.length === 0) && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No silver jewelry available at the moment.</p>
                <Link
                  to="/collections/gold"
                  className="btn btn-rose-gold mt-4"
                >
                  Explore Gold Collection
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Why Choose Silver Section */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-gray-50/30">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif font-bold text-slate-900 mb-4">
                Why Choose Silver Jewelry?
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center p-8 rounded-2xl bg-white/60 backdrop-blur-sm border border-slate-200">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-slate-500 to-gray-500 flex items-center justify-center">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">Affordable Luxury</h3>
                <p className="text-gray-700 leading-relaxed">
                  Silver offers the perfect blend of elegance and affordability, making luxury accessible.
                </p>
              </div>

              <div className="text-center p-8 rounded-2xl bg-white/60 backdrop-blur-sm border border-slate-200">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-500 to-slate-500 flex items-center justify-center">
                  <Gem className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">Versatile Style</h3>
                <p className="text-gray-700 leading-relaxed">
                  Silver's cool, bright shine complements any outfit, from casual to formal wear.
                </p>
              </div>

              <div className="text-center p-8 rounded-2xl bg-white/60 backdrop-blur-sm border border-slate-200">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-slate-600 to-gray-600 flex items-center justify-center">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">925 Sterling Quality</h3>
                <p className="text-gray-700 leading-relaxed">
                  Our 925 sterling silver is 92.5% pure silver, ensuring lasting beauty and durability.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SilverCollectionPage;
