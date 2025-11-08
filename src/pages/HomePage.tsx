/**
 * @page HomePage
 * @description Landing page with featured products and categories - DIVA rose-gold design
 */
import { Link } from 'react-router-dom';
import { Sparkles, Shield, TruckIcon, RotateCcw, Award, Heart } from 'lucide-react';
import { useFeaturedProducts } from '@/hooks/useProducts';
import { useCategories } from '@/hooks/useCategories';
import { useCart } from '@/contexts/CartContext';
import ProductGrid from '@/components/product/ProductGrid';
import CategoryCard from '@/components/product/CategoryCard';
import Header from '@/components/ui/Header';
import CustomerStories from '@/components/sections/CustomerStories';
import ShopByOccasion from '@/components/sections/ShopByOccasion';
import ShopByFestival from '@/components/sections/ShopByFestival';
import GiftingGuide from '@/components/sections/GiftingGuide';
import ProductCarousel from '@/components/sections/ProductCarousel';
import ShopByRecipient from '@/components/sections/ShopByRecipient';
import GlassToggle from '@/components/ui/GlassToggle';

const HomePage = () => {
  const { data: featuredProducts, isLoading } = useFeaturedProducts();
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { addToCart } = useCart();

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white">
      {/* Hero Section with Video Background */}
      <section className="relative overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="https://ceytiwiuidapmlzghlzo.supabase.co/storage/v1/object/public/videos/7308098-hd_1920_1080_24fps.mp4" type="video/mp4" />
          </video>
          {/* Overlay gradient for better text visibility */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-transparent"></div>
        </div>

        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-5 z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-rose-gold rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blush rounded-full blur-3xl"></div>
        </div>

        <div className="container-custom py-20 md:py-32 relative">
          <div className="max-w-3xl mx-auto text-center relative z-20">
            <div className="mb-6 animate-fade-in">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md text-sm font-medium text-rose-gold-dark">
                <Sparkles className="w-4 h-4" />
                Trusted Since 1998
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)] animate-fade-in-up">
              Timeless Elegance,
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-rose-gold-light via-white to-rose-gold drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                Crafted for You
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed animate-fade-in-up drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" style={{animationDelay: '0.2s'}}>
              Discover handcrafted jewelry in Silver, Gold & Lab-Grown Diamonds
            </p>

            {/* Glass Toggle for Gold/Silver */}
            <div className="mb-10 animate-fade-in-up" style={{animationDelay: '0.25s'}}>
              <GlassToggle defaultSelection="silver" mode="navigation" />
            </div>

            <div className="flex gap-4 justify-center flex-wrap animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              <Link
                to="/collections/gold"
                className="btn bg-gradient-to-r from-amber-600 to-yellow-600 text-white hover:shadow-xl text-lg px-10 py-4 shadow-lg"
              >
                ✨ Shop Gold Jewelry
              </Link>
              <Link
                to="/collections/silver"
                className="btn bg-gradient-to-r from-slate-600 to-gray-600 text-white hover:shadow-xl text-lg px-10 py-4 shadow-lg"
              >
                💎 Shop Silver Jewelry
              </Link>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="container-custom pb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl">
              <TruckIcon className="w-8 h-8 text-rose-gold-dark mb-2" />
              <p className="font-semibold text-sm text-charcoal">Free Shipping</p>
              <p className="text-xs text-gray-600">Pan India</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl">
              <RotateCcw className="w-8 h-8 text-rose-gold-dark mb-2" />
              <p className="font-semibold text-sm text-charcoal">30-Day Returns</p>
              <p className="text-xs text-gray-600">Hassle Free</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl">
              <Shield className="w-8 h-8 text-rose-gold-dark mb-2" />
              <p className="font-semibold text-sm text-charcoal">100% Certified</p>
              <p className="text-xs text-gray-600">BIS Hallmarked</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl">
              <Award className="w-8 h-8 text-rose-gold-dark mb-2" />
              <p className="font-semibold text-sm text-charcoal">25+ Years Legacy</p>
              <p className="text-xs text-gray-600">Since 1998</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section - Shop by Category */}
      <section className="section-sm bg-gradient-to-b from-off-white to-light-gray">
        <div className="container-custom">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mb-4">
              Shop by Category
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Explore our exquisite collection across various jewelry categories
            </p>
          </div>

          {/* Loading State */}
          {categoriesLoading && (
            <div className="categories-grid">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="skeleton h-80 rounded-2xl" />
              ))}
            </div>
          )}

          {/* Categories Grid */}
          {!categoriesLoading && categories && categories.length > 0 && (
            <div className="categories-grid animate-fade-in-up">
              {categories.slice(0, 8).map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          )}

          {/* View All Categories Link */}
          {!categoriesLoading && categories && categories.length > 8 && (
            <div className="text-center mt-12">
              <Link
                to="/categories"
                className="btn btn-rose-gold"
              >
                View All Categories
              </Link>
            </div>
          )}

          {/* Empty State */}
          {!categoriesLoading && (!categories || categories.length === 0) && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No categories available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Shop by Occasion */}
      <ShopByOccasion />

      {/* Shop by Festival */}
      <ShopByFestival />

      {/* Product Carousel - Bestseller Products */}
      {featuredProducts && featuredProducts.length > 0 && (
        <ProductCarousel
          products={featuredProducts.map(product => ({
            id: product.id,
            name: product.name,
            price: product.price,
            imageUrl: product.image_url || 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop',
            category: product.categories?.name
          }))}
          title="Bestseller Products"
          subtitle="Discover our most popular pieces"
        />
      )}

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <p className="text-rose-gold-dark font-semibold mb-2 tracking-wide uppercase text-sm">Bestsellers</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mb-4">
              Handpicked for You
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Explore our curated collection of timeless pieces loved by thousands
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
              className="btn btn-rose-gold px-10 py-4"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <p className="text-rose-gold-dark font-semibold mb-2 tracking-wide uppercase text-sm">Why DIVA</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mb-4">
              Jewelry That Speaks to Your Soul
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-cream/50 to-white border border-rose-gold/20">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-rose-gold to-rose-gold-dark flex items-center justify-center">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-charcoal">Handcrafted with Love</h3>
              <p className="text-gray-600 leading-relaxed">
                Each piece is meticulously crafted by skilled artisans with decades of expertise
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-cream/50 to-white border border-rose-gold/20">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-blush to-rose-gold-dark flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-charcoal">100% Certified</h3>
              <p className="text-gray-600 leading-relaxed">
                925 Sterling Silver, BIS Hallmarked Gold, and IGI Certified Lab-Grown Diamonds
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-cream/50 to-white border border-rose-gold/20">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-rose-gold-light to-rose-gold-dark flex items-center justify-center">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-charcoal">25+ Years Legacy</h3>
              <p className="text-gray-600 leading-relaxed">
                Trusted since 1998, serving thousands of happy customers across India
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gifting Guide */}
      <GiftingGuide />

      {/* Shop by Recipient */}
      <ShopByRecipient />

      {/* Customer Stories */}
      <CustomerStories />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-rose-gold-dark via-blush to-rose-gold text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-10 -left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="container-custom text-center relative">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Find the Perfect Gift
          </h2>
          <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-2xl mx-auto">
            Celebrate every special moment with jewelry that tells your story
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/products?relation=wife"
              className="btn bg-white text-rose-gold-dark hover:bg-cream px-8 py-4 font-semibold"
            >
              For Wife
            </Link>
            <Link
              to="/products?relation=mother"
              className="btn bg-white text-rose-gold-dark hover:bg-cream px-8 py-4 font-semibold"
            >
              For Mother
            </Link>
            <Link
              to="/products?relation=girlfriend"
              className="btn bg-white text-rose-gold-dark hover:bg-cream px-8 py-4 font-semibold"
            >
              For Girlfriend
            </Link>
          </div>
        </div>
      </section>

      {/* Footer - DIVA Style */}
      <footer className="bg-charcoal text-white py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div>
              <h3 className="text-2xl font-serif font-bold mb-4 text-rose-gold-light">DIVA</h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                Crafting timeless elegance since 1998. Your destination for certified jewelry in Silver, Gold & Lab-Grown Diamonds.
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-rose-gold transition-colors flex items-center justify-center">
                  <span className="sr-only">Facebook</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-rose-gold transition-colors flex items-center justify-center">
                  <span className="sr-only">Instagram</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-rose-gold transition-colors flex items-center justify-center">
                  <span className="sr-only">Twitter</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-white">Shop by Occasion</h4>
              <ul className="space-y-3">
                <li><Link to="/occasions/engagement" className="text-gray-400 hover:text-rose-gold-light transition-colors">Engagement</Link></li>
                <li><Link to="/occasions/birthday" className="text-gray-400 hover:text-rose-gold-light transition-colors">Birthday</Link></li>
                <li><Link to="/occasions/wedding" className="text-gray-400 hover:text-rose-gold-light transition-colors">Wedding</Link></li>
                <li><Link to="/occasions/anniversary" className="text-gray-400 hover:text-rose-gold-light transition-colors">Anniversary</Link></li>
                <li><Link to="/occasions/baby-shower" className="text-gray-400 hover:text-rose-gold-light transition-colors">Baby Shower</Link></li>
                <li><Link to="/occasions/baby-naming" className="text-gray-400 hover:text-rose-gold-light transition-colors">Baby Naming</Link></li>
                <li><Link to="/occasions/griha-pravesh" className="text-gray-400 hover:text-rose-gold-light transition-colors">Griha Pravesh</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-white">Shop by Festival</h4>
              <ul className="space-y-3">
                <li><Link to="/festivals/diwali" className="text-gray-400 hover:text-rose-gold-light transition-colors">Diwali</Link></li>
                <li><Link to="/festivals/akshaya-tritiya" className="text-gray-400 hover:text-rose-gold-light transition-colors">Akshaya Tritiya</Link></li>
                <li><Link to="/festivals/raksha-bandhan" className="text-gray-400 hover:text-rose-gold-light transition-colors">Raksha Bandhan</Link></li>
                <li><Link to="/festivals/valentine-day" className="text-gray-400 hover:text-rose-gold-light transition-colors">Valentine Day</Link></li>
                <li><Link to="/festivals/mothers-day" className="text-gray-400 hover:text-rose-gold-light transition-colors">Mothers Day</Link></li>
                <li><Link to="/festivals/fathers-day" className="text-gray-400 hover:text-rose-gold-light transition-colors">Fathers Day</Link></li>
                <li><Link to="/festivals/friendship-day" className="text-gray-400 hover:text-rose-gold-light transition-colors">Friendship Day</Link></li>
                <li><Link to="/festivals/karwa-chauth" className="text-gray-400 hover:text-rose-gold-light transition-colors">Karwa Chauth</Link></li>
                <li><Link to="/festivals/bhaidooj" className="text-gray-400 hover:text-rose-gold-light transition-colors">Bhaidooj</Link></li>
                <li><Link to="/festivals/eid" className="text-gray-400 hover:text-rose-gold-light transition-colors">Eid</Link></li>
                <li><Link to="/festivals/navratri" className="text-gray-400 hover:text-rose-gold-light transition-colors">Navratri</Link></li>
                <li><Link to="/festivals/durga-puja" className="text-gray-400 hover:text-rose-gold-light transition-colors">Durga Puja</Link></li>
                <li><Link to="/festivals/christmas" className="text-gray-400 hover:text-rose-gold-light transition-colors">Christmas</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-white">Get in Touch</h4>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  <a href="mailto:saj.query@gmail.com" className="hover:text-rose-gold-light transition-colors">saj.query@gmail.com</a>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  <a href="tel:9011068966" className="hover:text-rose-gold-light transition-colors">+91 9011068966</a>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  <span>Basavangudi, Bangalore - 560050</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm">
              <p>&copy; 2025 DIVA Jewel Cart. All rights reserved.</p>
              <div className="flex gap-6">
                <Link to="/privacy" className="hover:text-rose-gold-light transition-colors">Privacy Policy</Link>
                <Link to="/terms" className="hover:text-rose-gold-light transition-colors">Terms & Conditions</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </>
  );
};

export default HomePage;
