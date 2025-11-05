/**
 * @component ProductGrid
 * @description Grid layout for displaying products
 *
 * @props
 * - products {Product[]} - Array of products
 * - isLoading {boolean} - Loading state
 * - onAddToCart {Function} - Callback when adding to cart
 *
 * @example
 * ```tsx
 * <ProductGrid
 *   products={products}
 *   isLoading={isLoading}
 *   onAddToCart={handleAddToCart}
 * />
 * ```
 */
import { memo } from 'react';
import { Product } from '@/types/database.types';
import ProductCard from './ProductCard';
import Loader from '@/components/ui/Loader';

interface ProductGridProps {
  products?: Product[];
  isLoading?: boolean;
  onAddToCart?: (product: Product) => void;
}

const ProductGrid = ({
  products,
  isLoading,
  onAddToCart,
}: ProductGridProps) => {
  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader />
        <p className="mt-4 text-gray-500">Loading products...</p>
      </div>
    );
  }

  // Empty state
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-20 px-4">
        <div className="text-gray-400 mb-4">
          <svg
            className="w-24 h-24 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          No products found
        </h3>
        <p className="text-gray-500 mb-4">
          No products are currently available in the database.
        </p>
        <p className="text-sm text-gray-400">
          Please add products through the Admin Panel or check your database connection.
        </p>
      </div>
    );
  }

  // Product grid
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};

export default memo(ProductGrid);
