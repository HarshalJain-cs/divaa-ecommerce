/**
 * @component ProductCard
 * @description Product card component for grid display
 *
 * @props
 * - product {Product} - Product data
 * - onAddToCart {Function} - Optional callback when adding to cart
 *
 * @example
 * ```tsx
 * <ProductCard product={product} onAddToCart={handleAddToCart} />
 * ```
 */
import * as React from 'react';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { Product } from '@/types/database.types';
import ProductImage from '@/components/images/ProductImage';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useCallback } from 'react';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { formatPrice } = useCurrency();
  const inWishlist = isInWishlist(product.id);

  const handleWishlistClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toggleWishlist(product);
  }, [product, toggleWishlist]);

  const handleAddToCart = useCallback(() => {
    onAddToCart?.(product);
  }, [product, onAddToCart]);

  return (
    <div className="group relative bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Product Image */}
      <Link to={`/products/${product.id}`} className="block relative overflow-hidden">
        <div className="aspect-square">
          <ProductImage
            src={product.image_url || 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop&q=80'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
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
          {product.stock_quantity > 0 && product.stock_quantity < 5 && (
            <span className="bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
              Low Stock
            </span>
          )}
        </div>

        {/* Quick Actions - Show on hover */}
        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleWishlistClick}
            className={`bg-white p-2 rounded-full shadow-lg transition-colors ${
              inWishlist
                ? 'text-blush hover:bg-blush hover:text-white'
                : 'hover:bg-blush hover:text-white'
            }`}
            aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
          </button>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        {/* Category */}
        {product.categories && (
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
            {product.categories.name}
          </p>
        )}

        {/* Product Name */}
        <Link to={`/products/${product.id}`}>
          <h3 className="font-semibold text-gray-800 hover:text-rose-gold-dark transition-colors line-clamp-2 mb-2">
            {product.name}
          </h3>
        </Link>

        {/* Metal Badge & Stone */}
        <div className="flex gap-2 items-center mb-3">
          {product.metal_type && (
            <span className={`
              inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold
              ${product.metal_type === 'gold' ? 'bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-900 border border-amber-300' : ''}
              ${product.metal_type === 'silver' ? 'bg-gradient-to-r from-slate-100 to-gray-100 text-slate-900 border border-slate-300' : ''}
              ${product.metal_type === 'rose-gold' ? 'bg-gradient-to-r from-rose-100 to-pink-100 text-rose-900 border border-rose-300' : ''}
              ${product.metal_type === 'white-gold' ? 'bg-gradient-to-r from-gray-50 to-slate-50 text-gray-900 border border-gray-300' : ''}
              ${product.metal_type === 'platinum' ? 'bg-gradient-to-r from-blue-50 to-gray-50 text-blue-900 border border-blue-200' : ''}
            `}>
              {product.metal_type === 'gold' && '✨ '}
              {product.metal_type === 'silver' && '💎 '}
              <span className="capitalize">{product.metal_type.replace('-', ' ')}</span>
            </span>
          )}
          {product.stone_type && (
            <span className="text-xs text-gray-600 capitalize">{product.stone_type}</span>
          )}
        </div>

        {/* Price & Add to Cart */}
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-charcoal">
            {formatPrice(product.price)}
          </span>

          <button
            onClick={handleAddToCart}
            disabled={product.stock_quantity === 0}
            className="bg-gradient-to-r from-rose-gold to-rose-gold-dark text-white p-2 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Add to cart"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(ProductCard);
