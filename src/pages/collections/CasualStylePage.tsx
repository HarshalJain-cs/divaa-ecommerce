import Header from '@/components/ui/Header';
import ProductGrid from '@/components/product/ProductGrid';
import { useProducts } from '@/hooks/useProducts';
import { useCart } from '@/contexts/CartContext';

const CasualStylePage = () => {
  const { data: products, isLoading } = useProducts({ style_type: 'casual' });
  const { addToCart } = useCart();

  const hasProducts = products && products.length > 0;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-sky-100 via-blue-50 to-cyan-100 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold text-charcoal mb-4">Casual Style Collection</h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Trendy, everyday casual wear that's fun and affordable. Perfect for expressing your personal style effortlessly.
            </p>
          </div>
        </div>

        {/* Products Section */}
        <div className="container mx-auto px-4 py-12">
          {!isLoading && !hasProducts ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-6">🌟</div>
              <h2 className="text-4xl font-bold text-rose-gold-dark mb-4">Coming Soon</h2>
              <p className="text-xl text-charcoal max-w-2xl mx-auto">
                Fresh, trendy styles on the way! Our casual collection will offer playful pieces that fit your everyday vibe.
              </p>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-charcoal mb-2">
                  {hasProducts ? `${products.length} Products` : 'Our Collection'}
                </h2>
                <p className="text-gray-600">Express yourself with effortless style</p>
              </div>
              <ProductGrid products={products || []} isLoading={isLoading} onAddToCart={addToCart} />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CasualStylePage;
