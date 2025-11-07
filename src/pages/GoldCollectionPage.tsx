/**
 * @page GoldCollectionPage
 * @description Gold jewelry collection page with hero section and filtered products
 */
import { Link } from 'react-router-dom';
import { Crown, Sparkles, Award } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { useCart } from '@/contexts/CartContext';
import ProductGrid from '@/components/product/ProductGrid';
import Header from '@/components/ui/Header';
import GlassToggle from '@/components/ui/GlassToggle';

const GoldCollectionPage = () => {
  const { data: products, isLoading } = useProducts({ metal_type: 'gold' });
  const { addToCart } = useCart();

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-amber-50/30">
        {/* Hero Section - Gold Theme */}
        <section className="relative overflow-hidden bg-gradient-to-br from-amber-100 via-yellow-50 to-amber-50">
          {/* Decorative Elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-96 h-96 bg-amber-400 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-80 h-80 bg-yellow-300 rounded-full blur-3xl"></div>
          </div>

          <div className="container-custom py-16 md:py-24 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              {/* Toggle */}
              <div className="mb-8 animate-fade-in">
                <GlassToggle defaultSelection="gold" mode="navigation" />
              </div>

              {/* Badge */}
              <div className="mb-6 animate-fade-in">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 backdrop-blur-sm rounded-full shadow-md text-sm font-medium text-amber-900">
                  <Crown className="w-4 h-4 text-amber-600" />
                  Premium Gold Collection
                </span>
              </div>

              {/* Heading */}
              <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 text-amber-900 animate-fade-in-up">
                Radiant
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600">
                  Gold Jewelry
                </span>
              </h1>

              {/* Description */}
              <p className="text-xl md:text-2xl text-amber-800/80 mb-10 leading-relaxed animate-fade-in-up max-w-3xl mx-auto" style={{animationDelay: '0.2s'}}>
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
                { name: 'Gold Rings', icon: '💍' },
                { name: 'Gold Earrings', icon: '💎' },
                { name: 'Gold Necklaces', icon: '📿' },
                { name: 'Gold Bracelets', icon: '⌚' },
                { name: 'Gold Pendants', icon: '🔸' },
                { name: 'Gold Sets', icon: '✨' },
              ].map((category) => (
                <Link
                  key={category.name}
                  to={`/categories/${category.name.toLowerCase().replace(/ /g, '-')}`}
                  className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-amber-100 hover:border-amber-300"
                >
                  <span className="text-4xl mb-2">{category.icon}</span>
                  <span className="text-sm font-medium text-amber-900 text-center">{category.name}</span>
                </Link>
              ))}
            </div>
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
