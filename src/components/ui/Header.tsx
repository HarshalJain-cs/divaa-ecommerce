/**
 * @component Header
 * @description Main navigation header with cart icon and user menu
 */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, User, Menu, X, LogOut, ChevronDown } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useAuth } from '@/hooks/useAuth';
import { RELATIONS, OCCASIONS } from '@/constants/collections';

export default function Header() {
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, profile, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [relationMenuOpen, setRelationMenuOpen] = useState(false);
  const [occasionMenuOpen, setOccasionMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    setUserMenuOpen(false);
    navigate('/');
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 shadow-md bg-[#FFB6C1]">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-white hover:text-white/90 transition-colors tracking-wide"
            onClick={closeMobileMenu}
          >
            DIVA Jewels
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-white hover:text-white/80 transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-white hover:text-white/80 transition-colors font-medium"
            >
              Products
            </Link>

            {/* Shop by Relation Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setRelationMenuOpen(!relationMenuOpen);
                  setOccasionMenuOpen(false);
                }}
                className="flex items-center space-x-1 text-white hover:text-white/80 transition-colors font-medium"
              >
                <span>Shop by Relation</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {relationMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setRelationMenuOpen(false)}
                  />
                  <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 z-20 border border-gray-100">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Shop by Relation
                      </span>
                    </div>
                    {RELATIONS.map((relation) => (
                      <Link
                        key={relation.id}
                        to={relation.path}
                        className="block px-4 py-2.5 text-gray-700 hover:bg-gradient-to-r hover:from-pink-50 hover:to-rose-50 hover:text-rose-pink transition-all font-medium"
                        onClick={() => setRelationMenuOpen(false)}
                      >
                        {relation.label}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Shop by Occasion Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setOccasionMenuOpen(!occasionMenuOpen);
                  setRelationMenuOpen(false);
                }}
                className="flex items-center space-x-1 text-white hover:text-white/80 transition-colors font-medium"
              >
                <span>Shop by Occasion</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {occasionMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setOccasionMenuOpen(false)}
                  />
                  <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 z-20 border border-gray-100">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Shop by Occasion
                      </span>
                    </div>
                    {OCCASIONS.map((occasion) => (
                      <Link
                        key={occasion.id}
                        to={occasion.path}
                        className="block px-4 py-2.5 text-gray-700 hover:bg-gradient-to-r hover:from-pink-50 hover:to-rose-50 hover:text-rose-pink transition-all font-medium"
                        onClick={() => setOccasionMenuOpen(false)}
                      >
                        {occasion.label}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>

            <Link
              to="/admin"
              className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-md hover:bg-white/30 transition-all font-medium text-sm border border-white/30"
            >
              Admin Panel
            </Link>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Wishlist Icon */}
            <Link
              to="/wishlist"
              className="relative p-2 text-white hover:text-white/80 transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-6 h-6" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#DE5D83] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistCount > 99 ? '99+' : wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative p-2 text-white hover:text-white/80 transition-colors"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#DE5D83] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
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
                    className="flex items-center space-x-2 p-2 text-white hover:text-white/80 transition-colors"
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
                    className="px-4 py-2 text-white hover:text-white/80 transition-colors font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 bg-white text-[#FFB6C1] rounded-lg hover:bg-white/90 transition-all font-medium shadow-md"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white hover:text-white/80 transition-colors"
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
          <div className="md:hidden mt-4 pb-4 border-t border-white/30 pt-4">
            <div className="flex flex-col space-y-3">
              <Link
                to="/"
                className="text-white hover:text-white/80 transition-colors font-medium py-2"
                onClick={closeMobileMenu}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-white hover:text-white/80 transition-colors font-medium py-2"
                onClick={closeMobileMenu}
              >
                Products
              </Link>

              {/* Shop by Relation - Mobile */}
              <div className="py-2">
                <div className="text-white font-semibold mb-2 text-sm">Shop by Relation</div>
                <div className="flex flex-col space-y-2 ml-3">
                  {RELATIONS.map((relation) => (
                    <Link
                      key={relation.id}
                      to={relation.path}
                      className="text-white/90 hover:text-white transition-colors text-sm py-1"
                      onClick={closeMobileMenu}
                    >
                      {relation.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Shop by Occasion - Mobile */}
              <div className="py-2">
                <div className="text-white font-semibold mb-2 text-sm">Shop by Occasion</div>
                <div className="flex flex-col space-y-2 ml-3">
                  {OCCASIONS.map((occasion) => (
                    <Link
                      key={occasion.id}
                      to={occasion.path}
                      className="text-white/90 hover:text-white transition-colors text-sm py-1"
                      onClick={closeMobileMenu}
                    >
                      {occasion.label}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                to="/admin"
                className="px-3 py-2 bg-white/20 backdrop-blur-sm text-white rounded-md hover:bg-white/30 transition-all font-medium text-center border border-white/30"
                onClick={closeMobileMenu}
              >
                Admin Panel
              </Link>
              <Link
                to="/wishlist"
                className="text-white hover:text-white/80 transition-colors font-medium py-2 flex items-center space-x-2"
                onClick={closeMobileMenu}
              >
                <Heart className="w-5 h-5" />
                <span>Wishlist {wishlistCount > 0 && `(${wishlistCount})`}</span>
              </Link>
              <hr className="border-white/30" />
              {user ? (
                <>
                  <Link
                    to="/profile"
                    className="text-white hover:text-white/80 transition-colors font-medium py-2"
                    onClick={closeMobileMenu}
                  >
                    My Profile
                  </Link>
                  {profile?.role === 'admin' && (
                    <Link
                      to="/admin"
                      className="text-white hover:text-white/80 transition-colors font-medium py-2"
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
                    className="text-left text-red-200 hover:text-red-100 transition-colors font-medium py-2 flex items-center space-x-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-white hover:text-white/80 transition-colors font-medium py-2"
                    onClick={closeMobileMenu}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="inline-block px-4 py-2 bg-white text-[#FFB6C1] rounded-lg hover:bg-white/90 transition-all font-medium text-center shadow-md"
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
