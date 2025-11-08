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
      backgroundImage: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&h=400&fit=crop'
    },
    {
      id: 2,
      title: 'New Arrivals',
      description: 'Fresh designs every week',
      gradient: 'bg-gradient-to-r from-gray-700 via-slate-600 to-gray-700',
      backgroundImage: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1200&h=400&fit=crop'
    },
    {
      id: 3,
      title: 'Free Shipping',
      description: '& 30 Days Return',
      gradient: 'bg-gradient-to-r from-slate-700 via-gray-600 to-slate-700',
      backgroundImage: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1200&h=400&fit=crop'
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
              <source src="https://ceytiwiuidapmlzghlzo.supabase.co/storage/v1/object/public/videos/4974758-uhd_4096_2160_25fps.mp4" type="video/mp4" />
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
                { name: 'Silver Rings', image: 'https://ceytiwiuidapmlzghlzo.supabase.co/storage/v1/object/public/product-images/rings%20/Itzamna%20Ring%20by%20Coronet%20Solitaire.jpeg' },
                { name: 'Silver Earrings', image: 'https://ceytiwiuidapmlzghlzo.supabase.co/storage/v1/object/public/product-images/earrings%20/ANAPNOE%20JEWELS%20-%20Eva%20Zania.jpeg' },
                { name: 'Silver Necklaces', image: 'https://ceytiwiuidapmlzghlzo.supabase.co/storage/v1/object/public/product-images/necklace/download%20(2).jpeg' },
                { name: 'Silver Bracelets', image: 'https://ceytiwiuidapmlzghlzo.supabase.co/storage/v1/object/public/product-images/bracelets/Heart%20Shaped%20Diamonds.jpeg' },
                { name: 'Silver Pendants', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop' },
                { name: 'Silver Sets', image: 'https://ceytiwiuidapmlzghlzo.supabase.co/storage/v1/object/public/product-images/sets/download%20(5).jpeg' },
              ].map((category) => (
                <Link
                  key={category.name}
                  to={`/categories/${category.name.toLowerCase().replace(/ /g, '-')}`}
                  className="group flex flex-col items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-100 hover:border-slate-300 overflow-hidden"
                >
                  <div className="w-16 h-16 mb-3 rounded-full overflow-hidden ring-2 ring-slate-200 group-hover:ring-slate-400 transition-all">
                    <img src={category.image} alt={category.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <span className="text-sm font-medium text-slate-900 text-center">{category.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Collections Grid Section */}
        <section className="py-16 bg-gradient-to-b from-white to-slate-50/30">
          <div className="container-custom">
            <h2 className="text-3xl font-serif font-bold text-center mb-12 text-slate-900">
              Explore Our Collections
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                { name: 'Timeless Pearls', image: 'https://www.giva.co/cdn/shop/files/Timeless_Pearls.webp?v=1759933094&width=750', route: '/collections/timeless-pearls' },
                { name: 'Fresh Drops', image: 'https://www.giva.co/cdn/shop/files/FreshDrop1.webp?v=1759933094&width=750', route: '/collections/fresh-drops' },
                { name: 'Stackable Collection', image: 'https://www.giva.co/cdn/shop/files/Stackable_Collection.webp?v=1759933105&width=750', route: '/collections/stackable' },
              ].map((collection) => (
                <Link
                  key={collection.name}
                  to={collection.route}
                  className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <div className="aspect-[4/5] overflow-hidden">
                    <img
                      src={collection.image}
                      alt={collection.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl font-bold mb-2">{collection.name}</h3>
                    <p className="text-sm text-slate-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                      Explore Collection →
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Gifting Guide Section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="text-3xl font-serif font-bold text-center mb-12 text-slate-900">
              Perfect Gifts for Everyone
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-7xl mx-auto">
              {[
                { name: 'Wife', image: 'https://www.giva.co/cdn/shop/files/Wife.webp?v=1761650231&width=750', route: '/gifting/wife' },
                { name: 'Husband', image: 'https://www.giva.co/cdn/shop/files/Husband_3_187cd795-8819-4d77-b53a-1e368f233d35.webp?v=1762947363&width=750', route: '/gifting/husband' },
                { name: 'Mother', image: 'https://www.giva.co/cdn/shop/files/Ma.webp?v=1758887354&width=750', route: '/gifting/mother' },
                { name: 'Brother', image: 'https://www.giva.co/cdn/shop/files/Brother_1.webp?v=1762947362&width=750', route: '/gifting/brother' },
                { name: 'Sister', image: 'https://www.giva.co/cdn/shop/files/Sister_2e1f458e-b7fc-4954-84a1-a18cd22158d7.webp?v=1761650412&width=750', route: '/gifting/sister' },
                { name: 'Friends', image: 'https://www.giva.co/cdn/shop/files/Friends.webp?v=1761650231&width=750', route: '/gifting/friends' },
              ].map((gift) => (
                <Link
                  key={gift.name}
                  to={gift.route}
                  className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={gift.image}
                      alt={`Gifts for ${gift.name}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/80 to-transparent p-4">
                    <h3 className="text-white font-semibold text-center">{gift.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Men's Jewelry Section */}
        <section className="py-16 bg-gradient-to-b from-slate-50/30 to-white">
          <div className="container-custom">
            <h2 className="text-3xl font-serif font-bold text-center mb-4 text-slate-900">
              Men's Jewelry
            </h2>
            <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
              Discover sophisticated silver jewelry designed for the modern man
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-7xl mx-auto">
              {[
                { name: 'Rings', image: 'https://www.giva.co/cdn/shop/files/2_14_1.webp?v=1762950054&width=900', route: '/mens/rings' },
                { name: 'Pendants', image: 'https://www.giva.co/cdn/shop/files/3_8.webp?v=1762950054&width=900', route: '/mens/pendants' },
                { name: 'Earrings', image: 'https://www.giva.co/cdn/shop/files/4_8.webp?v=1762950054&width=900', route: '/mens/earrings' },
                { name: 'Bracelets', image: 'https://www.giva.co/cdn/shop/files/6_9_1.webp?v=1762950054&width=900', route: '/mens/bracelets' },
                { name: 'Chains', image: 'https://www.giva.co/cdn/shop/files/7_4_1.webp?v=1762950054&width=900', route: '/mens/chains' },
                { name: 'Sets', image: 'https://www.giva.co/cdn/shop/files/8_3_1.webp?v=1762950054&width=900', route: '/mens/sets' },
              ].map((item) => (
                <Link
                  key={item.name}
                  to={item.route}
                  className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 bg-white"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={item.image}
                      alt={`Men's ${item.name}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 text-center bg-white">
                    <h3 className="text-slate-900 font-semibold">{item.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Occasions Section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="text-3xl font-serif font-bold text-center mb-12 text-slate-900">
              Shop by Occasion
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                { name: 'Anniversary Gifts', image: 'https://www.giva.co/cdn/shop/files/Anniversary_Gifts_1.webp?v=1761650230&width=750', route: '/occasions/anniversary' },
                { name: 'Most Gifted', image: 'https://www.giva.co/cdn/shop/files/Most_Gifted_1.webp?v=1761650230&width=750', route: '/occasions/most-gifted' },
                { name: 'Birthday Gifts', image: 'https://www.giva.co/cdn/shop/files/Birthday_Gifts_1.webp?v=1761650231&width=750', route: '/occasions/birthday' },
              ].map((occasion) => (
                <Link
                  key={occasion.name}
                  to={occasion.route}
                  className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <div className="aspect-[4/5] overflow-hidden">
                    <img
                      src={occasion.image}
                      alt={occasion.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl font-bold mb-2">{occasion.name}</h3>
                    <p className="text-sm text-slate-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                      Explore Gifts →
                    </p>
                  </div>
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
