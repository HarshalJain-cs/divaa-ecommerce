/**
 * @component Header
 * @description Main navigation header with cart icon and user menu
 */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, User, Menu, X, LogOut } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useAuth } from '@/hooks/useAuth';

export default function Header() {
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, profile, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    setUserMenuOpen(false);
    navigate('/');
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-rose-gold/5 shadow-lg shadow-rose-gold/20 backdrop-blur-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo with Background Circle */}
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
              to="/admin"
              className="px-3 py-1 bg-charcoal text-white rounded-md hover:bg-rose-gold-dark transition-all font-medium text-sm"
            >
              Admin Panel
            </Link>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
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
