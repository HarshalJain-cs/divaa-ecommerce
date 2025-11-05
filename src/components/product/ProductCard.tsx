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

  const handleQuickAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onAddToCart?.(product);
  };

  return (
    <div className="product-card group relative bg-white rounded-lg shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100">
      {/* Product Image */}
      <Link to={`/products/${product.id}`} className="block relative overflow-hidden bg-gray-50">
        <div className="aspect-square relative">
          <ProductImage
            src={product.image_url || '/assets/images/products/placeholder.jpg'}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          {product.is_featured && (
            <span className="product-badge bg-rose-pink text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
              Featured
            </span>
          )}
          {product.stock_quantity === 0 && (
            <span className="bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
              Out of Stock
            </span>
          )}
          {product.stock_quantity > 0 && product.stock_quantity < 5 && (
            <span className="bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
              Low Stock
            </span>
          )}
        </div>

        {/* Wishlist Button - Always visible on mobile, hover on desktop */}
        <div className="absolute top-3 right-3 z-10 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleWishlistClick}
            className={`bg-white p-2.5 rounded-full shadow-lg transition-all hover:scale-110 ${
              inWishlist
                ? 'text-rose-pink'
                : 'text-gray-600 hover:text-rose-pink'
            }`}
            aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Quick Add Button - Shows on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 translate-y-full group-hover:translate-y-0 transition-all duration-300">
          <button
            onClick={handleQuickAdd}
            disabled={product.stock_quantity === 0}
            className="w-full py-2.5 px-4 bg-rose-pink text-white font-medium rounded-lg hover:bg-rose-pink-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {product.stock_quantity === 0 ? 'Out of Stock' : 'Quick Add'}
          </button>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4 space-y-2">
        {/* Product Name */}
        <Link to={`/products/${product.id}`}>
          <h3 className="font-medium text-gray-900 hover:text-rose-pink transition-colors line-clamp-2 text-base leading-snug min-h-[2.5rem]">
            {product.name}
          </h3>
        </Link>

        {/* Metal & Stone */}
        {(product.metal_type || product.stone_type) && (
          <div className="flex gap-2 text-xs text-gray-500">
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
        <div className="flex items-baseline gap-2 pt-1">
          <span className="text-lg font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
          {/* Optional: Add sale price display */}
          {/* {product.sale_price && (
            <span className="text-sm text-gray-500 line-through">
              {formatPrice(product.sale_price)}
            </span>
          )} */}
        </div>

        {/* Mobile Add to Cart Button */}
        <button
          onClick={handleQuickAdd}
          disabled={product.stock_quantity === 0}
          className="md:hidden w-full mt-3 py-2 px-4 bg-rose-pink text-white text-sm font-medium rounded-lg hover:bg-rose-pink-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-4 h-4" />
          {product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default memo(ProductCard);
