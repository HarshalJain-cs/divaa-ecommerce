/**
 * @page HomePage
 * @description Landing page with featured products and categories
 */
import { Link } from 'react-router-dom';
import { useFeaturedProducts } from '@/hooks/useProducts';
import { useCart } from '@/contexts/CartContext';
import ProductGrid from '@/components/product/ProductGrid';
import Header from '@/components/ui/Header';
import HeroVideo from '@/components/ui/HeroVideo';
import CategoryGrid from '@/components/ui/CategoryGrid';

const HomePage = () => {
  const { data: featuredProducts, isLoading, error } = useFeaturedProducts();
  const { addToCart } = useCart();

  // Log for debugging
  console.log('Featured Products:', featuredProducts);
  console.log('Is Loading:', isLoading);
  console.log('Error:', error);

  return (
    <>
      <Header />
      <div className="min-h-screen">
      {/* Hero Video Section */}
      <HeroVideo />

      {/* Category Grid */}
      <CategoryGrid />

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Collection
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Handpicked pieces that define luxury and elegance
            </p>
          </div>

          <ProductGrid
            products={featuredProducts}
            isLoading={isLoading}
            onAddToCart={addToCart}
          />

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-block bg-rose-pink text-white px-8 py-3 rounded-lg font-semibold hover:bg-rose-pink-light transition-all shadow-md"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-pink-light to-primary-pink text-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Find the Perfect Gift
          </h2>
          <p className="text-lg md:text-xl mb-8 text-gray-700">
            Browse our curated collections for every special person
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/products?relation=wife"
              className="bg-rose-pink text-white px-6 py-3 rounded-lg font-semibold hover:bg-rose-pink-light transition-all shadow-md"
            >
              For Wife
            </Link>
            <Link
              to="/products?relation=mother"
              className="bg-rose-pink text-white px-6 py-3 rounded-lg font-semibold hover:bg-rose-pink-light transition-all shadow-md"
            >
              For Mother
            </Link>
            <Link
              to="/products?relation=girlfriend"
              className="bg-rose-pink text-white px-6 py-3 rounded-lg font-semibold hover:bg-rose-pink-light transition-all shadow-md"
            >
              For Girlfriend
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-rose-pink">DIVA Jewels</h3>
              <p className="text-gray-400">
                Your destination for timeless elegance and luxury jewelry
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/products" className="text-gray-400 hover:text-rose-pink transition-colors">Shop</Link></li>
                <li><Link to="/about" className="text-gray-400 hover:text-rose-pink transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-rose-pink transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Customer Service</h4>
              <ul className="space-y-2">
                <li><Link to="/shipping" className="text-gray-400 hover:text-rose-pink transition-colors">Shipping</Link></li>
                <li><Link to="/returns" className="text-gray-400 hover:text-rose-pink transition-colors">Returns</Link></li>
                <li><Link to="/faq" className="text-gray-400 hover:text-rose-pink transition-colors">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <p className="text-gray-400 mb-4">Follow us on social media</p>
              {/* Add SocialCard here if desired */}
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 DIVA Jewels. All rights reserved.</p>
          </div>
        </div>
      </footer>
      </div>
    </>
  );
};

export default HomePage;
