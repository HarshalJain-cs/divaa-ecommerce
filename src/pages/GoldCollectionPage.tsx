/**
 * @page GoldCollectionPage
 * @description Gold jewelry collection page with hero section and filtered products
 */
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Crown, Sparkles, Award, Volume2, VolumeX } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { useCart } from '@/contexts/CartContext';
import ProductGrid from '@/components/product/ProductGrid';
import Header from '@/components/ui/Header';
import GlassToggle from '@/components/ui/GlassToggle';
import BannerSlideshow from '@/components/ui/BannerSlideshow';

const GoldCollectionPage = () => {
  const { data: products, isLoading } = useProducts({ metal_type: 'gold' });
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
  const goldBanners = [
    {
      id: 1,
      title: '0% Making Charge',
      description: 'On all gold jewelry',
      gradient: 'bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600',
      backgroundImage: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1200&h=400&fit=crop'
    },
    {
      id: 2,
      title: 'New Arrivals',
      description: 'Exclusive gold collections',
      gradient: 'bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-600',
      backgroundImage: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1200&h=400&fit=crop'
    },
    {
      id: 3,
      title: 'Free Shipping',
      description: '& 30 Days Return',
      gradient: 'bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-700',
      backgroundImage: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1200&h=400&fit=crop'
    }
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-amber-50/30">
        {/* Hero Section - Gold Theme */}
        <section className="relative overflow-hidden bg-gradient-to-br from-amber-100 via-yellow-50 to-amber-50">
          {/* Video Background */}
          <div className="absolute inset-0 z-0">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="https://ceytiwiuidapmlzghlzo.supabase.co/storage/v1/object/public/videos/9328448-uhd_4096_2160_25fps.mp4" type="video/mp4" />
            </video>
            {/* Light overlay for better text visibility without blurring video */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-black/10 to-transparent"></div>
          </div>

          {/* Mute Button - Bottom Right */}
          <button
            onClick={toggleMute}
            className="absolute bottom-6 right-6 z-20 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all hover:scale-110"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 text-amber-700" />
            ) : (
              <Volume2 className="w-5 h-5 text-amber-700" />
            )}
          </button>

          <div className="container-custom py-16 md:py-24 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              {/* Toggle */}
              <div className="mb-8 animate-fade-in">
                <GlassToggle defaultSelection="gold" mode="navigation" />
              </div>

              {/* Badge */}
              <div className="mb-6 animate-fade-in">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md text-sm font-medium text-amber-900">
                  <Crown className="w-4 h-4 text-amber-600" />
                  Premium Gold Collection
                </span>
              </div>

              {/* Heading */}
              <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)] animate-fade-in-up">
                Radiant
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                  Gold Jewelry
                </span>
              </h1>

              {/* Description */}
              <p className="text-xl md:text-2xl text-white/95 mb-10 leading-relaxed animate-fade-in-up max-w-3xl mx-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" style={{animationDelay: '0.2s'}}>
                Discover our exquisite collection of 14K & 18K gold jewelry.
                From timeless classics to contemporary designs, find pieces that celebrate life's precious moments.
              </p>

              {/* CTA Buttons */}
              <div className="flex gap-4 justify-center flex-wrap animate-fade-in-up" style={{animationDelay: '0.3s'}}>
                <a
                  href="#products"
                  className="btn bg-gradient-to-r from-amber-600 to-yellow-600 text-white hover:shadow-xl px-10 py-4 text-lg"
                >
                  Shop Gold Jewelry
                </a>
                <Link
                  to="/collections/silver"
                  className="btn bg-white text-amber-900 hover:bg-amber-50 px-10 py-4 text-lg border-2 border-amber-200"
                >
                  View Silver Collection
                </Link>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto mt-16">
              <div className="flex flex-col items-center text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl shadow-sm">
                <Award className="w-8 h-8 text-amber-600 mb-2" />
                <p className="font-semibold text-sm text-amber-900">BIS Hallmarked</p>
                <p className="text-xs text-amber-700">100% Certified</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl shadow-sm">
                <Sparkles className="w-8 h-8 text-amber-600 mb-2" />
                <p className="font-semibold text-sm text-amber-900">Lab-Grown Diamonds</p>
                <p className="text-xs text-amber-700">Ethical & Beautiful</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl shadow-sm col-span-2 md:col-span-1">
                <Crown className="w-8 h-8 text-amber-600 mb-2" />
                <p className="font-semibold text-sm text-amber-900">Premium Quality</p>
                <p className="text-xs text-amber-700">14K & 18K Gold</p>
              </div>
            </div>
          </div>
        </section>

        {/* Category Quick Links */}
        <section className="py-12 bg-white/50">
          <div className="container-custom">
            <h2 className="text-2xl font-serif font-bold text-center mb-8 text-amber-900">
              Browse Gold Jewelry by Category
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                { name: 'Gold Rings', image: 'https://ceytiwiuidapmlzghlzo.supabase.co/storage/v1/object/public/product-images/rings%20/diamond%20ring,%20dazzling%20and%20charming_.jpeg' },
                { name: 'Gold Earrings', image: 'https://ceytiwiuidapmlzghlzo.supabase.co/storage/v1/object/public/product-images/earrings%20/Jewelry%20Photo%20Editing%20and%20Retouching%20Services.jpeg' },
                { name: 'Gold Necklaces', image: 'https://ceytiwiuidapmlzghlzo.supabase.co/storage/v1/object/public/product-images/necklace/Necklace%20Ai.jpeg' },
                { name: 'Gold Bracelets', image: 'https://ceytiwiuidapmlzghlzo.supabase.co/storage/v1/object/public/product-images/bracelets/download%20(11).jpeg' },
                { name: 'Gold Pendants', image: 'https://ceytiwiuidapmlzghlzo.supabase.co/storage/v1/object/public/product-images/pendants/download%20(12).jpeg' },
                { name: 'Gold Sets', image: 'https://ceytiwiuidapmlzghlzo.supabase.co/storage/v1/object/public/product-images/sets/Radiant%20Bridal%20Halo%20Jewelry%20Set.jpeg' },
              ].map((category) => (
                <Link
                  key={category.name}
                  to={`/categories/${category.name.toLowerCase().replace(/ /g, '-')}`}
                  className="group flex flex-col items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-amber-100 hover:border-amber-300 overflow-hidden"
                >
                  <div className="w-16 h-16 mb-3 rounded-full overflow-hidden ring-2 ring-amber-200 group-hover:ring-amber-400 transition-all">
                    <img src={category.image} alt={category.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <span className="text-sm font-medium text-amber-900 text-center">{category.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Banner Slideshow */}
        <section className="py-12" style={{ backgroundColor: '#d1bb9a' }}>
          <div className="container-custom">
            <BannerSlideshow banners={goldBanners} autoPlayInterval={2000} theme="gold" />
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="py-20 bg-white">
          <div className="container-custom">
            <div className="text-center mb-16">
              <p className="text-amber-600 font-semibold mb-2 tracking-wide uppercase text-sm">Our Collection</p>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-amber-900 mb-4">
                Gold Jewelry Collection
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                {products?.length || 0} exquisite gold pieces to choose from
              </p>
            </div>

            <ProductGrid
              products={products}
              isLoading={isLoading}
              onAddToCart={addToCart}
            />

            {!isLoading && (!products || products.length === 0) && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No gold jewelry available at the moment.</p>
                <Link
                  to="/collections/silver"
                  className="btn btn-rose-gold mt-4"
                >
                  Explore Silver Collection
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Why Choose Gold Section */}
        <section className="py-20 bg-gradient-to-br from-amber-50 to-yellow-50/30">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif font-bold text-amber-900 mb-4">
                Why Choose Gold Jewelry?
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center p-8 rounded-2xl bg-white/60 backdrop-blur-sm border border-amber-200">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-amber-900">Timeless Value</h3>
                <p className="text-gray-700 leading-relaxed">
                  Gold retains its value over time, making it both a beautiful accessory and a wise investment.
                </p>
              </div>

              <div className="text-center p-8 rounded-2xl bg-white/60 backdrop-blur-sm border border-amber-200">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-yellow-500 to-amber-500 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-amber-900">Luxurious Appeal</h3>
                <p className="text-gray-700 leading-relaxed">
                  The warm, radiant glow of gold complements every skin tone and adds elegance to any outfit.
                </p>
              </div>

              <div className="text-center p-8 rounded-2xl bg-white/60 backdrop-blur-sm border border-amber-200">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-600 to-yellow-600 flex items-center justify-center">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-amber-900">BIS Certified</h3>
                <p className="text-gray-700 leading-relaxed">
                  All our gold jewelry is BIS hallmarked, ensuring purity and quality you can trust.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default GoldCollectionPage;
