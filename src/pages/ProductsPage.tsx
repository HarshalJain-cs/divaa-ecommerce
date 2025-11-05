/**
 * @page ProductsPage
 * @description Products listing page with filters
 */
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '@/hooks/useProducts';
import { useCart } from '@/contexts/CartContext';
import ProductGrid from '@/components/product/ProductGrid';
import SearchInput from '@/components/ui/SearchInput';
import Header from '@/components/ui/Header';

const ProductsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useCart();

  // Get filters from URL params
  const filters = {
    category: searchParams.get('category') || undefined,
    gender: searchParams.get('gender') as 'men' | 'women' | 'unisex' | undefined,
    relation: searchParams.get('relation') || undefined,
    occasion: searchParams.get('occasion') || undefined,
    search: searchQuery || undefined,
  };

  const { data: products, isLoading, error } = useProducts(filters);

  // Debug: log the products data
  console.log('Products data:', products);
  console.log('Is loading:', isLoading);
  console.log('Error:', error);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-brand-dark">Products</h1>
              <p className="text-gray-600 mt-1">
                {products?.length || 0} products found
              </p>
              {error && (
                <p className="text-red-600 text-sm mt-1">
                  Error loading products: {error.message}
                </p>
              )}
            </div>
            <div>
              <SearchInput
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-8">
        <ProductGrid products={products} isLoading={isLoading} onAddToCart={addToCart} />
      </div>
      </div>
    </>
  );
};

export default ProductsPage;
