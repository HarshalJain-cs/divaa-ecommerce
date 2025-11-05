/**
 * @page CategoriesPage
 * @description Standalone page displaying all jewelry categories
 */
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useCategories } from '@/hooks/useCategories';
import CategoryCard from '@/components/product/CategoryCard';
import Header from '@/components/ui/Header';

const CategoriesPage = () => {
  const { data: categories, isLoading } = useCategories();

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-off-white to-light-gray">
        {/* Hero Section */}
        <section className="hero-gradient py-16 md:py-20">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center text-white">
              {/* Back Button */}
              <div className="mb-6">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-white hover:text-cream transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span className="font-medium">Back to Home</span>
                </Link>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 animate-fade-in">
                Shop by Category
              </h1>
              <p className="text-xl md:text-2xl text-cream mb-4 animate-fade-in-up">
                Explore our exquisite jewelry collection across all categories
              </p>
              <p className="text-gray-200 text-lg animate-fade-in-up">
                From timeless classics to contemporary designs, find the perfect piece for every occasion
              </p>
            </div>
          </div>
        </section>

        {/* Categories Grid Section */}
        <section className="section">
          <div className="container-custom">
            {/* Loading State */}
            {isLoading && (
              <div className="categories-grid">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="skeleton h-80 rounded-2xl" />
                ))}
              </div>
            )}

            {/* Categories Grid */}
            {!isLoading && categories && categories.length > 0 && (
              <>
                <div className="categories-grid animate-fade-in-up">
                  {categories.map((category) => (
                    <CategoryCard key={category.id} category={category} />
                  ))}
                </div>

                {/* Category Count */}
                <div className="text-center mt-12 text-gray-600">
                  <p className="text-lg">
                    Showing <span className="font-semibold text-charcoal">{categories.length}</span>{' '}
                    {categories.length === 1 ? 'category' : 'categories'}
                  </p>
                </div>
              </>
            )}

            {/* Empty State */}
            {!isLoading && (!categories || categories.length === 0) && (
              <div className="text-center py-20 animate-fade-in">
                <div className="card max-w-lg mx-auto">
                  <div className="text-6xl mb-4">📦</div>
                  <h3 className="text-2xl font-semibold text-charcoal mb-2">
                    No Categories Available
                  </h3>
                  <p className="text-gray-600 mb-6">
                    We're currently setting up our categories. Please check back soon!
                  </p>
                  <Link to="/products" className="btn btn-rose-gold">
                    Browse All Products
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-rose-gold-dark to-blush text-white">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-xl mb-8 text-cream">
              Browse our complete product collection or get in touch with our team
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                to="/products"
                className="btn bg-white text-rose-gold-dark hover:bg-cream"
              >
                View All Products
              </Link>
              <Link
                to="/contact"
                className="btn btn-outline-rose border-white text-white hover:bg-white hover:text-rose-gold-dark"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-charcoal text-white py-12">
          <div className="container-custom">
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
                  <li><Link to="/products" className="text-gray-400 hover:text-white transition-colors">Shop</Link></li>
                  <li><Link to="/categories" className="text-gray-400 hover:text-white transition-colors">Categories</Link></li>
                  <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                  <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Customer Service</h4>
                <ul className="space-y-2">
                  <li><Link to="/shipping" className="text-gray-400 hover:text-white transition-colors">Shipping</Link></li>
                  <li><Link to="/returns" className="text-gray-400 hover:text-white transition-colors">Returns</Link></li>
                  <li><Link to="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Connect</h4>
                <p className="text-gray-400 mb-4">Follow us on social media for the latest updates</p>
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

export default CategoriesPage;
