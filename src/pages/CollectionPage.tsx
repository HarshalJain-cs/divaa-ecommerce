/**
 * @page CollectionPage
 * @description Collection page for Shop by Relation and Shop by Occasion
 */
import { useParams } from 'react-router-dom';
import { useProducts } from '@/hooks/useProducts';
import { useCart } from '@/contexts/CartContext';
import ProductGrid from '@/components/product/ProductGrid';
import Header from '@/components/ui/Header';
import { RELATIONS, OCCASIONS, RELATION_FILTERS, OCCASION_FILTERS } from '@/constants/collections';

const CollectionPage = () => {
  const { collectionId } = useParams<{ collectionId: string }>();
  const { addToCart } = useCart();

  // Determine if this is a relation or occasion collection
  const isRelation = RELATIONS.some((r) => r.id === collectionId);

  // Get collection details
  const collection = isRelation
    ? RELATIONS.find((r) => r.id === collectionId)
    : OCCASIONS.find((o) => o.id === collectionId);

  // Get the filter values for this collection
  const filterValues = isRelation
    ? RELATION_FILTERS[collectionId || '']
    : OCCASION_FILTERS[collectionId || ''];

  // Build filters - search for products that have ANY of the filter values
  const filters = isRelation
    ? { relation: filterValues }
    : { occasion: filterValues };

  const { data: products, isLoading, error } = useProducts(filters);

  if (!collection) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Collection Not Found</h1>
            <p className="text-gray-600">The collection you're looking for doesn't exist.</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white">
        {/* Collection Header */}
        <div className="relative bg-gradient-to-br from-primary-pink-light via-white to-rose-pink/10 border-b border-gray-100">
          {/* Decorative background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle, #DE5D83 1px, transparent 1px)',
              backgroundSize: '30px 30px'
            }}></div>
          </div>

          <div className="container mx-auto px-4 py-16 md:py-20 relative">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center px-4 py-1.5 bg-gradient-to-r from-rose-pink to-rose-pink-light text-white text-sm font-semibold rounded-full mb-6 shadow-md">
                {isRelation ? 'Shop by Relation' : 'Shop by Occasion'}
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
                {collection.label}
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                {isRelation
                  ? `Discover the perfect jewelry pieces that celebrate your relationship with ${collection.label.toLowerCase()}`
                  : `Exquisite jewelry crafted to make your ${collection.label.toLowerCase()} moments unforgettable`}
              </p>
              {products && products.length > 0 && (
                <div className="mt-8 inline-flex items-center space-x-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200">
                  <span className="w-2 h-2 bg-rose-pink rounded-full animate-pulse"></span>
                  <p className="text-gray-700 font-medium">
                    {products.length} {products.length === 1 ? 'piece' : 'pieces'} available
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="container mx-auto px-4 py-6">
            <div className="bg-red-50 border-l-4 border-red-400 rounded-lg p-4 shadow-sm">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700 font-medium">
                    Error loading products: {error.message}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="container mx-auto px-4 py-16">
          {!isLoading && products && products.length > 0 && (
            <div className="mb-8 flex items-center justify-between border-b border-gray-200 pb-4">
              <h2 className="text-2xl font-bold text-gray-900">Our Collection</h2>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <button className="hover:text-rose-pink transition-colors font-medium">
                  Sort by: Featured
                </button>
              </div>
            </div>
          )}
          <ProductGrid
            products={products}
            isLoading={isLoading}
            onAddToCart={addToCart}
          />
        </div>
      </div>
    </>
  );
};

export default CollectionPage;
