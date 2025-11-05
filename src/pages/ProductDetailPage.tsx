/**
 * @page ProductDetailPage
 * @description Product details page
 */
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProduct } from '@/hooks/useProducts';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { formatPrice } from '@/lib/utils';
import ImageGallery from '@/components/images/ImageGallery';
import Loader from '@/components/ui/Loader';
import Header from '@/components/ui/Header';
import { ShoppingCart, Heart } from 'lucide-react';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading } = useProduct(id || '');
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product not found</h2>
          <Link to="/products" className="text-rose-gold-dark hover:underline">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const images = [
    product.image_url || '/assets/images/products/placeholder.jpg',
    ...(product.additional_images || []),
  ];

  const inWishlist = isInWishlist(product.id);

  const handleWishlistClick = () => {
    toggleWishlist(product);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-rose-gold-dark">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-rose-gold-dark">Products</Link>
            <span>/</span>
            <span className="text-charcoal">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Images */}
            <div>
              <ImageGallery images={images} alt={product.name} />
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-4xl font-serif font-bold text-charcoal mb-4">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-bold text-charcoal">
                  {formatPrice(product.price)}
                </span>
                {product.is_featured && (
                  <span className="bg-gradient-to-r from-rose-gold to-rose-gold-dark text-white text-sm font-semibold px-3 py-1 rounded-full shadow-md">
                    Featured
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="mb-6">
                <p className="text-gray-600 leading-relaxed">
                  {product.description || 'No description available.'}
                </p>
              </div>

              {/* Details */}
              <div className="space-y-3 mb-8">
                {product.metal_type && (
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-700">Metal:</span>
                    <span className="text-gray-600 capitalize">{product.metal_type}</span>
                  </div>
                )}
                {product.stone_type && (
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-700">Stone:</span>
                    <span className="text-gray-600 capitalize">{product.stone_type}</span>
                  </div>
                )}
                {product.stock_quantity !== undefined && (
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-700">Availability:</span>
                    <span className={product.stock_quantity > 0 ? 'text-green-600' : 'text-red-600'}>
                      {product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <button
                  onClick={() => addToCart(product)}
                  disabled={product.stock_quantity === 0}
                  className="flex-1 bg-gradient-to-r from-rose-gold to-rose-gold-dark text-white py-4 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
                <button
                  onClick={handleWishlistClick}
                  className={`border-2 p-4 rounded-lg transition-all ${
                    inWishlist
                      ? 'bg-blush border-blush text-white hover:bg-opacity-90'
                      : 'bg-white border-rose-gold-dark text-rose-gold-dark hover:bg-rose-gold-dark hover:text-white'
                  }`}
                  aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <Heart className={`w-6 h-6 ${inWishlist ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default ProductDetailPage;
