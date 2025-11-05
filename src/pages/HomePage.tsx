/**
 * @page HomePage
 * @description Landing page with featured products
 */
import { Link } from 'react-router-dom';
import { useFeaturedProducts } from '@/hooks/useProducts';
import { useCart } from '@/contexts/CartContext';
import ProductGrid from '@/components/product/ProductGrid';
import Header from '@/components/ui/Header';

const HomePage = () => {
  const { data: featuredProducts, isLoading } = useFeaturedProducts();
  const { addToCart } = useCart();

  return (
    <>
      <Header />
      <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brand-dark to-gray-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
              DIVA Jewel Cart
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Discover Timeless Elegance in Every Piece
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                to="/products"
                className="bg-brand-gold text-white px-8 py-4 rounded-lg font-semibold hover:bg-opacity-90 transition-all text-lg"
              >
                Shop Now
              </Link>
              <Link
                to="/products?gender=women"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-brand-dark transition-all text-lg"
              >
                Explore Collection
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-brand-dark mb-4">
              Featured Collection
            </h2>
            <p className="text-gray-600 text-lg">
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
              className="inline-block bg-brand-gold text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-brand-dark mb-4">
              Shop by Category
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Rings', 'Necklaces', 'Earrings', 'Bracelets'].map((category) => (
              <Link
                key={category}
                to={`/products?category=${category.toLowerCase()}`}
                className="group relative bg-white rounded-lg shadow-md hover:shadow-xl transition-all overflow-hidden aspect-square"
              >
                <div className="absolute inset-0 bg-brand-gold opacity-0 group-hover:opacity-10 transition-opacity" />
                <div className="flex items-center justify-center h-full">
                  <h3 className="text-2xl font-semibold text-brand-dark">
                    {category}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-gold text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-serif font-bold mb-4">
            Find the Perfect Gift
          </h2>
          <p className="text-xl mb-8">
            Browse our curated collections for every special person
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/products?relation=wife"
              className="bg-white text-brand-gold px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
            >
              For Wife
            </Link>
            <Link
              to="/products?relation=mother"
              className="bg-white text-brand-gold px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
            >
              For Mother
            </Link>
            <Link
              to="/products?relation=girlfriend"
              className="bg-white text-brand-gold px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
            >
              For Girlfriend
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-dark text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">DIVA Jewel Cart</h3>
              <p className="text-gray-400">
                Your destination for timeless elegance and luxury jewelry
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/products" className="text-gray-400 hover:text-white">Shop</Link></li>
                <li><Link to="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Customer Service</h4>
              <ul className="space-y-2">
                <li><Link to="/shipping" className="text-gray-400 hover:text-white">Shipping</Link></li>
                <li><Link to="/returns" className="text-gray-400 hover:text-white">Returns</Link></li>
                <li><Link to="/faq" className="text-gray-400 hover:text-white">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <p className="text-gray-400 mb-4">Follow us on social media</p>
              {/* Add SocialCard here if desired */}
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 DIVA Jewel Cart. All rights reserved.</p>
          </div>
        </div>
      </footer>
      </div>
    </>
  );
};

export default HomePage;
