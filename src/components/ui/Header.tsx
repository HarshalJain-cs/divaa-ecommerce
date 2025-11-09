/**
 * @component HeaderNew
 * @description Enhanced header with Collections dropdown and category sub-menus
 */
import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, Heart, User, Menu, X, LogOut, ChevronDown } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useAuth } from '@/hooks/useAuth';
import GoldPriceWidget from './GoldPriceWidget';

const categories = [
  'Rings',
  'Earrings',
  'Necklaces',
  'Bracelets',
  'Pendants',
  'Anklets',
  'Nosepins',
  'Sets',
  'Chains',
  'Bangles',
  'Mangalsutra',
  'Coins',
  'Toe Rings',
];

const menCategories = [
  'Rings',
  'Bracelets',
  'Chains',
  'Pendants',
  'Earrings',
  'Kadas',
];

// Karat-based categories
const karatCategories = [
  { name: '9 Karat', karat: '9K' },
  { name: '14 Karat', karat: '14K' },
  { name: '18 Karat', karat: '18K' },
  { name: '22 Karat', karat: '22K' },
  { name: '24 Karat', karat: '24K' },
];

// Special collections
const specialCollections = [
  { name: 'Diamond Jewellery', icon: '💎' },
  { name: 'Gemstone Jewellery', icon: '💠' },
];

export default function HeaderNew() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, profile, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const collectionsRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Check if we're on a collection page
  const isOnGoldPage = location.pathname.includes('/gold');
  const isOnSilverPage = location.pathname.includes('/silver');
  const isOnCollectionPage = isOnGoldPage || isOnSilverPage;

  const handleSignOut = async () => {
    await signOut();
    setUserMenuOpen(false);
    navigate('/');
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Handle mouse enter/leave for dropdown
  const handleCollectionsEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setCollectionsOpen(true);
  };

  const handleCollectionsLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setCollectionsOpen(false);
      setHoveredCategory(null);
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-rose-gold/5 shadow-lg shadow-rose-gold/20 backdrop-blur-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity group"
            onClick={closeMobileMenu}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-gold/30 to-rose-gold-dark/30 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <span className="text-xl font-black font-serif text-rose-gold-dark">D</span>
            </div>
            <span className="text-2xl font-black font-serif text-rose-gold-dark tracking-tight">DIVA</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-rose-gold-dark transition-colors font-medium"
            >
              Home
            </Link>

            <Link
              to="/products"
              className="text-gray-700 hover:text-rose-gold-dark transition-colors font-medium"
            >
              Products
            </Link>

            <Link
              to="/wedding"
              className="text-gray-700 hover:text-rose-gold-dark transition-colors font-medium flex items-center gap-1"
            >
              💍 Wedding
            </Link>

            <Link
              to="/digital-gold"
              className="text-gray-700 hover:text-rose-gold-dark transition-colors font-medium flex items-center gap-1"
            >
              🪙 Digital Gold
            </Link>

            {/* Collections Dropdown */}
            {!isOnCollectionPage && (
              <div
                className="relative"
                ref={collectionsRef}
                onMouseEnter={handleCollectionsEnter}
                onMouseLeave={handleCollectionsLeave}
              >
                <button
                  className="flex items-center gap-1 text-gray-700 hover:text-rose-gold-dark transition-colors font-medium"
                >
                  Collections
                  <ChevronDown className={`w-4 h-4 transition-transform ${collectionsOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {collectionsOpen && (
                  <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-100">
                    {/* Gold & Silver Collections */}
                    <Link
                      to="/collections/gold"
                      className="block px-4 py-2 text-gray-700 hover:bg-amber-50 hover:text-amber-900 transition-colors font-medium"
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-amber-500">✨</span>
                        Gold Collection
                      </span>
                    </Link>

                    <Link
                      to="/collections/silver"
                      className="block px-4 py-2 text-gray-700 hover:bg-slate-50 hover:text-slate-900 transition-colors font-medium"
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-slate-500">💎</span>
                        Silver Collection
                      </span>
                    </Link>

                    <Link
                      to="/collections/diamond"
                      className="block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-900 transition-colors font-medium"
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-purple-500">💠</span>
                        Diamond Collection
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">Soon</span>
                      </span>
                    </Link>

                    <hr className="my-2" />

                    {/* Categories with Hover Sub-menu */}
                    <div className="relative">
                      <div
                        className="px-4 py-2 text-gray-600 text-sm font-semibold cursor-default hover:bg-gray-50"
                        onMouseEnter={() => setHoveredCategory('women')}
                      >
                        <span className="flex items-center justify-between">
                          Browse by Category
                          <ChevronDown className="w-4 h-4 -rotate-90" />
                        </span>
                      </div>

                      {/* Category Sub-menu */}
                      {hoveredCategory === 'women' && (
                        <div
                          className="absolute left-full top-0 ml-1 w-64 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-100 max-h-96 overflow-y-auto"
                          onMouseEnter={() => setHoveredCategory('women')}
                          onMouseLeave={() => setHoveredCategory(null)}
                        >
                          <div className="px-3 py-2 text-xs font-bold text-gray-500 uppercase tracking-wide">
                            Women's Jewelry
                          </div>
                          {categories.map((category) => (
                            <div key={category} className="group relative">
                              <div className="px-4 py-2 text-gray-700 hover:bg-gray-50 font-medium flex items-center justify-between cursor-pointer">
                                {category}
                                <ChevronDown className="w-4 h-4 -rotate-90 opacity-50" />
                              </div>

                              {/* Metal Type Sub-sub-menu */}
                              <div className="hidden group-hover:block absolute left-full top-0 ml-1 w-40 bg-white rounded-lg shadow-xl py-1 z-50 border border-gray-100">
                                <Link
                                  to={`/categories/gold-${category.toLowerCase()}`}
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-900 transition-colors"
                                >
                                  <span className="flex items-center gap-2">
                                    <span className="text-amber-500">✨</span>
                                    Gold {category}
                                  </span>
                                </Link>
                                <Link
                                  to={`/categories/silver-${category.toLowerCase()}`}
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                                >
                                  <span className="flex items-center gap-2">
                                    <span className="text-slate-500">💎</span>
                                    Silver {category}
                                  </span>
                                </Link>
                              </div>
                            </div>
                          ))}

                          <hr className="my-2" />

                          <div className="px-3 py-2 text-xs font-bold text-gray-500 uppercase tracking-wide">
                            Men's Jewelry
                          </div>
                          {menCategories.map((category) => (
                            <div key={`men-${category}`} className="group relative">
                              <div className="px-4 py-2 text-gray-700 hover:bg-gray-50 font-medium flex items-center justify-between cursor-pointer">
                                Men's {category}
                                <ChevronDown className="w-4 h-4 -rotate-90 opacity-50" />
                              </div>

                              {/* Metal Type Sub-sub-menu */}
                              <div className="hidden group-hover:block absolute left-full top-0 ml-1 w-48 bg-white rounded-lg shadow-xl py-1 z-50 border border-gray-100">
                                <Link
                                  to={`/categories/men-gold-${category.toLowerCase()}`}
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-900 transition-colors"
                                >
                                  <span className="flex items-center gap-2">
                                    <span className="text-amber-500">✨</span>
                                    Men's Gold {category}
                                  </span>
                                </Link>
                                <Link
                                  to={`/categories/men-silver-${category.toLowerCase()}`}
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                                >
                                  <span className="flex items-center gap-2">
                                    <span className="text-slate-500">💎</span>
                                    Men's Silver {category}
                                  </span>
                                </Link>
                              </div>
                            </div>
                          ))}

                          <hr className="my-2" />

                          {/* Shop by Karat */}
                          <div className="px-3 py-2 text-xs font-bold text-gray-500 uppercase tracking-wide">
                            Shop by Karat
                          </div>
                          {karatCategories.map((karat) => (
                            <Link
                              key={karat.karat}
                              to={`/collections/${karat.karat.toLowerCase()}`}
                              className="block px-4 py-2 text-gray-700 hover:bg-amber-50 font-medium transition-colors"
                            >
                              <span className="flex items-center gap-2">
                                <span className="text-amber-500">✨</span>
                                {karat.name} Gold
                              </span>
                            </Link>
                          ))}

                          <hr className="my-2" />

                          {/* Special Collections */}
                          <div className="px-3 py-2 text-xs font-bold text-gray-500 uppercase tracking-wide">
                            Special Collections
                          </div>
                          {specialCollections.map((collection) => (
                            <Link
                              key={collection.name}
                              to={`/collections/${collection.name.toLowerCase().replace(/ /g, '-')}`}
                              className="block px-4 py-2 text-gray-700 hover:bg-purple-50 font-medium transition-colors"
                            >
                              <span className="flex items-center gap-2">
                                <span>{collection.icon}</span>
                                {collection.name}
                              </span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Context-Aware Navigation when on Collection Pages */}
            {isOnCollectionPage && (
              <div className="flex items-center gap-6">
                {categories.slice(0, 6).map((category) => (
                  <Link
                    key={category}
                    to={`/categories/${isOnGoldPage ? 'gold' : 'silver'}-${category.toLowerCase()}`}
                    className="text-gray-700 hover:text-rose-gold-dark transition-colors font-medium text-sm"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            )}

            <Link
              to="/admin"
              className="px-3 py-1 bg-charcoal text-white rounded-md hover:bg-rose-gold-dark transition-all font-medium text-sm"
            >
              Admin Panel
            </Link>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Gold Price Widget */}
            <div className="hidden lg:block">
              <GoldPriceWidget />
            </div>

            {/* Wishlist Icon */}
            <Link
              to="/wishlist"
              className="relative p-2 text-gray-700 hover:text-blush transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-6 h-6" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blush text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistCount > 99 ? '99+' : wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-700 hover:text-rose-gold-dark transition-colors"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-gold-dark text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            <div className="relative hidden md:block">
              {user ? (
                <>
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center space-x-2 p-2 text-gray-700 hover:text-rose-gold-dark transition-colors"
                    aria-label="User Menu"
                  >
                    <User className="w-6 h-6" />
                    {profile?.full_name && (
                      <span className="text-sm font-medium">
                        {profile.full_name.split(' ')[0]}
                      </span>
                    )}
                  </button>

                  {/* User Dropdown */}
                  {userMenuOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setUserMenuOpen(false)}
                      />
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-20">
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          My Profile
                        </Link>
                        {profile?.role === 'admin' && (
                          <Link
                            to="/admin"
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            Admin Dashboard
                          </Link>
                        )}
                        <hr className="my-2" />
                        <button
                          onClick={handleSignOut}
                          className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 transition-colors flex items-center space-x-2"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-gray-700 hover:text-rose-gold-dark transition-colors font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 bg-gradient-to-r from-rose-gold to-rose-gold-dark text-white rounded-lg hover:shadow-lg transition-all font-medium"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-rose-gold-dark transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex flex-col space-y-3">
              <Link
                to="/"
                className="text-gray-700 hover:text-rose-gold-dark transition-colors font-medium py-2"
                onClick={closeMobileMenu}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-gray-700 hover:text-rose-gold-dark transition-colors font-medium py-2"
                onClick={closeMobileMenu}
              >
                Products
              </Link>
              <Link
                to="/wedding"
                className="text-gray-700 hover:text-rose-gold-dark transition-colors font-medium py-2"
                onClick={closeMobileMenu}
              >
                💍 Wedding
              </Link>
              <Link
                to="/digital-gold"
                className="text-gray-700 hover:text-rose-gold-dark transition-colors font-medium py-2"
                onClick={closeMobileMenu}
              >
                🪙 Digital Gold
              </Link>
              <Link
                to="/collections/gold"
                className="text-gray-700 hover:text-rose-gold-dark transition-colors font-medium py-2"
                onClick={closeMobileMenu}
              >
                ✨ Gold Collection
              </Link>
              <Link
                to="/collections/silver"
                className="text-gray-700 hover:text-rose-gold-dark transition-colors font-medium py-2"
                onClick={closeMobileMenu}
              >
                💎 Silver Collection
              </Link>
              <Link
                to="/admin"
                className="px-3 py-2 bg-charcoal text-white rounded-md hover:bg-rose-gold-dark transition-all font-medium text-center"
                onClick={closeMobileMenu}
              >
                Admin Panel
              </Link>
              <Link
                to="/wishlist"
                className="text-gray-700 hover:text-blush transition-colors font-medium py-2 flex items-center space-x-2"
                onClick={closeMobileMenu}
              >
                <Heart className="w-5 h-5" />
                <span>Wishlist {wishlistCount > 0 && `(${wishlistCount})`}</span>
              </Link>
              <hr />
              {user ? (
                <>
                  <Link
                    to="/profile"
                    className="text-gray-700 hover:text-rose-gold-dark transition-colors font-medium py-2"
                    onClick={closeMobileMenu}
                  >
                    My Profile
                  </Link>
                  {profile?.role === 'admin' && (
                    <Link
                      to="/admin"
                      className="text-gray-700 hover:text-rose-gold-dark transition-colors font-medium py-2"
                      onClick={closeMobileMenu}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleSignOut();
                      closeMobileMenu();
                    }}
                    className="text-left text-red-600 hover:text-red-700 transition-colors font-medium py-2 flex items-center space-x-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-rose-gold-dark transition-colors font-medium py-2"
                    onClick={closeMobileMenu}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="inline-block px-4 py-2 bg-gradient-to-r from-rose-gold to-rose-gold-dark text-white rounded-lg hover:shadow-lg transition-all font-medium text-center"
                    onClick={closeMobileMenu}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
