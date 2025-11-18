import Header from '@/components/ui/Header';
import ProductGrid from '@/components/product/ProductGrid';
import { useProducts } from '@/hooks/useProducts';
import { useCart } from '@/contexts/CartContext';

const EverydayStylePage = () => {
  const { data: products, isLoading } = useProducts({ style_type: 'everyday' });
  const { addToCart } = useCart();

  const hasProducts = products && products.length > 0;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-rose-gold-light via-cream to-rose-gold-dust py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold text-charcoal mb-4">Everyday Style Collection</h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Simple, minimalist designs perfect for daily wear. Comfortable, versatile pieces that complement your everyday look.
            </p>
          </div>
        </div>

        {/* Products Section */}
        <div className="container mx-auto px-4 py-12">
          {!isLoading && !hasProducts ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-6">✨</div>
              <h2 className="text-4xl font-bold text-rose-gold-dark mb-4">Coming Soon</h2>
              <p className="text-xl text-charcoal max-w-2xl mx-auto">
                We're curating the perfect everyday pieces for you! Check back soon for our collection of effortless, elegant jewelry.
              </p>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-charcoal mb-2">
                  {hasProducts ? `${products.length} Products` : 'Our Collection'}
                </h2>
                <p className="text-gray-600">Discover timeless pieces for your daily elegance</p>
              </div>
              <ProductGrid products={products || []} isLoading={isLoading} onAddToCart={addToCart} />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default EverydayStylePage;
