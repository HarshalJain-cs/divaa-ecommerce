/**
 * @component WishlistPage
 * @description User's wishlist/favorites page
 */
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2, ArrowLeft } from 'lucide-react';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/lib/utils';
import Header from '@/components/ui/Header';
import Loader from '@/components/ui/Loader';
import { Product } from '@/types/database.types';

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist, isLoading } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <Loader />
        </div>
      </>
    );
  }

  // Empty wishlist state
  if (wishlistItems.length === 0) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-2xl mx-auto text-center">
              <Heart className="w-24 h-24 mx-auto text-gray-300 mb-6" />
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                Your Wishlist is Empty
              </h1>
              <p className="text-gray-600 mb-8">
                Start adding products you love to your wishlist!
                <br />
                They'll be saved here for easy access later.
              </p>
              <Link
                to="/products"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-rose-gold to-rose-gold-dark text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all font-medium"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Browse Products</span>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                My Wishlist
              </h1>
              <p className="text-gray-600">
                {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved
              </p>
            </div>
            <Link
              to="/products"
              className="flex items-center space-x-2 text-gray-600 hover:text-rose-gold-dark transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Continue Shopping</span>
            </Link>
          </div>

          {/* Wishlist Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
              >
                {/* Product Image */}
                <Link to={`/products/${product.id}`} className="block relative">
                  <div className="aspect-square overflow-hidden bg-gray-100">
                    <img
                      src={product.image_url || '/placeholder-product.jpg'}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex flex-col gap-2">
                    {product.is_featured && (
                      <span className="bg-gradient-to-r from-rose-gold to-rose-gold-dark text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                        Featured
                      </span>
                    )}
                    {product.stock_quantity === 0 && (
                      <span className="bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        Out of Stock
                      </span>
                    )}
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      removeFromWishlist(product.id);
                    }}
                    className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-lg hover:bg-red-50 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </Link>

                {/* Product Info */}
                <div className="p-4">
                  {/* Category - temporarily hidden */}
                  {/* {product.categories && (
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                      {product.categories.name}
                    </p>
                  )} */}

                  {/* Product Name */}
                  <Link to={`/products/${product.id}`}>
                    <h3 className="font-semibold text-gray-800 hover:text-rose-gold-dark transition-colors line-clamp-2 mb-2">
                      {product.name}
                    </h3>
                  </Link>

                  {/* Metal & Stone */}
                  {(product.metal_type || product.stone_type) && (
                    <div className="flex gap-2 text-xs text-gray-600 mb-3">
                      {product.metal_type && (
                        <span className="capitalize">{product.metal_type}</span>
                      )}
                      {product.metal_type && product.stone_type && <span>•</span>}
                      {product.stone_type && (
                        <span className="capitalize">{product.stone_type}</span>
                      )}
                    </div>
                  )}

                  {/* Price */}
                  <p className="text-xl font-bold text-charcoal mb-3">
                    {formatPrice(product.price)}
                  </p>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stock_quantity === 0}
                      className="flex-1 bg-gradient-to-r from-rose-gold to-rose-gold-dark text-white py-2 px-4 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm font-medium"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => removeFromWishlist(product.id)}
                      className="bg-gray-100 text-gray-600 p-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Info Section */}
          <div className="mt-12 bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              About Your Wishlist
            </h2>
            <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-600">
              <div>
                <Heart className="w-8 h-8 text-rose-gold-dark mb-2" />
                <h3 className="font-semibold text-gray-800 mb-1">Save Favorites</h3>
                <p>Keep track of items you love for future purchase</p>
              </div>
              <div>
                <ShoppingCart className="w-8 h-8 text-rose-gold-dark mb-2" />
                <h3 className="font-semibold text-gray-800 mb-1">Easy Shopping</h3>
                <p>Quickly add wishlist items to your cart when ready</p>
              </div>
              <div>
                <svg className="w-8 h-8 text-rose-gold-dark mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <h3 className="font-semibold text-gray-800 mb-1">Always Available</h3>
                <p>Your wishlist is saved and accessible anytime</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
