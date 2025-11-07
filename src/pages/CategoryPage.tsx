/**
 * @page CategoryPage
 * @description Universal category page for material-specific jewelry categories
 * Handles routes like: /categories/gold-rings, /categories/silver-earrings, etc.
 */
import { useParams, Link } from 'react-router-dom';
import { useProducts } from '@/hooks/useProducts';
import { useCategories } from '@/hooks/useCategories';
import { useCart } from '@/contexts/CartContext';
import ProductGrid from '@/components/product/ProductGrid';
import Header from '@/components/ui/Header';
import { Sparkles, Award } from 'lucide-react';

const CategoryPage = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const { addToCart } = useCart();

  // Parse the category slug to extract metal type and category
  // E.g., "gold-rings" → metal: "gold", category: "rings"
  // E.g., "men-gold-bracelets" → metal: "gold", category: "bracelets", gender: "men"

  const parseSlug = (slug: string) => {
    if (!slug) return { metal: null, category: null, gender: 'women' };

    const parts = slug.toLowerCase().split('-');

    // Check if it starts with "men"
    if (parts[0] === 'men' || parts[0] === "men's") {
      return {
        gender: 'men',
        metal: parts[1], // "gold" or "silver"
        category: parts.slice(2).join(' '), // "rings", "bracelets", etc.
      };
    }

    return {
      gender: 'women',
      metal: parts[0], // "gold" or "silver"
      category: parts.slice(1).join(' '), // "rings", "earrings", etc.
    };
  };

  const { metal, category, gender } = parseSlug(categorySlug || '');

  // Construct the category name as it appears in the database
  let categoryName = '';
  if (gender === 'men') {
    // "Men's Gold Rings", "Men's Silver Bracelets"
    categoryName = `Men's ${metal?.charAt(0).toUpperCase()}${metal?.slice(1)} ${category?.charAt(0).toUpperCase()}${category?.slice(1)}`;
  } else {
    // "Gold Rings", "Silver Earrings"
    categoryName = `${metal?.charAt(0).toUpperCase()}${metal?.slice(1)} ${category?.charAt(0).toUpperCase()}${category?.slice(1)}`;
  }

  const { data: categories } = useCategories();
  const matchedCategory = categories?.find(cat =>
    cat.name.toLowerCase() === categoryName.toLowerCase()
  );

  const { data: products, isLoading } = useProducts({
    category: matchedCategory?.id,
    metal_type: metal || undefined,
    gender: gender || undefined,
  });

  // Determine theme colors based on metal type
  const isGold = metal === 'gold';
  const themeColors = isGold ? {
    gradient: 'from-amber-100 via-yellow-50 to-amber-50',
    text: 'text-amber-900',
    accent: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    button: 'from-amber-600 to-yellow-600',
    icon: '✨',
    iconColor: 'text-amber-500',
  } : {
    gradient: 'from-slate-100 via-gray-50 to-slate-50',
    text: 'text-slate-900',
    accent: 'text-slate-600',
    bg: 'bg-slate-50',
    border: 'border-slate-200',
    button: 'from-slate-600 to-gray-600',
    icon: '💎',
    iconColor: 'text-slate-500',
  };

  return (
    <>
      <Header />
      <div className={`min-h-screen bg-gradient-to-b ${themeColors.gradient}`}>
        {/* Hero Section */}
        <section className={`relative overflow-hidden bg-gradient-to-br ${themeColors.gradient}`}>
          <div className="container-custom py-12 md:py-16">
            <div className="max-w-4xl mx-auto text-center">
              {/* Breadcrumb */}
              <div className="mb-6">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                  <Link to="/" className="hover:text-rose-gold-dark">Home</Link>
                  <span>/</span>
                  <Link to={`/collections/${metal}`} className="hover:text-rose-gold-dark capitalize">
                    {metal} Collection
                  </Link>
                  <span>/</span>
                  <span className={themeColors.text}>{categoryName}</span>
                </div>
              </div>

              {/* Category Title */}
              <h1 className={`text-4xl md:text-6xl font-serif font-bold mb-4 ${themeColors.text}`}>
                <span className="flex items-center justify-center gap-3">
                  <span className="text-5xl">{themeColors.icon}</span>
                  {categoryName}
                </span>
              </h1>

              {/* Description */}
              <p className={`text-lg md:text-xl ${themeColors.accent} mb-8 max-w-2xl mx-auto`}>
                Discover our exquisite collection of {categoryName.toLowerCase()}.
                {isGold ? ' Crafted in 14K & 18K gold with lab-grown diamonds.' : ' Made with 925 sterling silver.'}
              </p>

              {/* Product Count */}
              {!isLoading && (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full">
                  <Sparkles className={`w-4 h-4 ${themeColors.iconColor}`} />
                  <span className={`font-medium ${themeColors.text}`}>
                    {products?.length || 0} Products Available
                  </span>
                </div>
              )}
            </div>

            {/* Quick Links */}
            <div className="flex items-center justify-center gap-4 mt-8 flex-wrap">
              <Link
                to={`/collections/${metal}`}
                className={`px-6 py-2 bg-white ${themeColors.text} rounded-lg hover:shadow-md transition-shadow border ${themeColors.border}`}
              >
                ← Back to {metal?.charAt(0).toUpperCase()}{metal?.slice(1)} Collection
              </Link>
              <Link
                to={`/collections/${isGold ? 'silver' : 'gold'}`}
                className="px-6 py-2 bg-gradient-to-r from-rose-gold to-rose-gold-dark text-white rounded-lg hover:shadow-lg transition-shadow"
              >
                View {isGold ? 'Silver' : 'Gold'} Collection
              </Link>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            {/* Trust Badges */}
            <div className="flex items-center justify-center gap-8 mb-12 flex-wrap">
              <div className="flex items-center gap-2">
                <Award className={`w-5 h-5 ${themeColors.iconColor}`} />
                <span className="text-sm font-medium text-gray-700">
                  {isGold ? 'BIS Hallmarked' : '925 Sterling Silver'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className={`w-5 h-5 ${themeColors.iconColor}`} />
                <span className="text-sm font-medium text-gray-700">
                  Premium Quality
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-lg ${themeColors.iconColor}`}>🚚</span>
                <span className="text-sm font-medium text-gray-700">
                  Free Shipping
                </span>
              </div>
            </div>

            {/* Products Grid */}
            <ProductGrid
              products={products}
              isLoading={isLoading}
              onAddToCart={addToCart}
            />

            {/* Empty State */}
            {!isLoading && (!products || products.length === 0) && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg mb-4">
                  No products available in this category yet.
                </p>
                <div className="flex gap-4 justify-center">
                  <Link
                    to={`/collections/${metal}`}
                    className="btn btn-rose-gold"
                  >
                    Browse All {metal?.charAt(0).toUpperCase()}{metal?.slice(1)} Jewelry
                  </Link>
                  <Link
                    to="/products"
                    className="btn btn-outline-rose"
                  >
                    View All Products
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default CategoryPage;
