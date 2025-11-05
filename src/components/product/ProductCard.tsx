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
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { Product } from '@/types/database.types';
import { formatPrice } from '@/lib/utils';
import ProductImage from '@/components/images/ProductImage';
import { useWishlist } from '@/contexts/WishlistContext';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  const handleWishlistClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toggleWishlist(product);
  };

  return (
    <div className="group relative bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Product Image */}
      <Link to={`/products/${product.id}`} className="block relative overflow-hidden">
        <div className="aspect-square">
          <ProductImage
            src={product.image_url || '/assets/images/products/placeholder.jpg'}
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
        <div className="flex gap-2 text-xs text-gray-600 mb-3">
          {product.metal_type && (
            <span className="capitalize">{product.metal_type}</span>
          )}
          {product.metal_type && product.stone_type && <span>•</span>}
          {product.stone_type && (
            <span className="capitalize">{product.stone_type}</span>
          )}
        </div>

        {/* Price & Add to Cart */}
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-charcoal">
            {formatPrice(product.price)}
          </span>

          <button
            onClick={() => onAddToCart?.(product)}
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
