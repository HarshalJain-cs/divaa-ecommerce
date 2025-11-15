/**
 * @component CategoryCard
 * @description Category card component with hover effects for shop by category section
 *
 * @props
 * - category {Category} - Category data
 * - onClick {Function} - Optional callback when category is clicked
 *
 * @example
 * ```tsx
 * <CategoryCard category={category} onClick={handleCategoryClick} />
 * ```
 */
import { memo } from 'react';
import { Link } from 'react-router-dom';
import ProductImage from '@/components/images/ProductImage';

interface Category {
  id: string;
  name: string;
  description?: string;
  image_url?: string;
}

interface CategoryCardProps {
  category: Category;
  onClick?: (category: Category) => void;
}

const CategoryCard = ({ category, onClick }: CategoryCardProps) => {
  const handleClick = () => {
    onClick?.(category);
  };

  // Debug logging for image URLs
  console.log(`📷 Category "${category.name}" image URL:`, category.image_url || 'Using fallback');

  return (
    <Link
      to={`/products?category=${category.id}`}
      onClick={handleClick}
      className="category-card-container group gap-0.5"
    >
      {/* Category Image Container - 300px */}
      <div className="relative h-[300px] overflow-hidden rounded-t-2xl">
        <ProductImage
          src={category.image_url || 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=600&fit=crop&q=80'}
          alt={category.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Shine Effect on Hover - Only on Image */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -translate-x-full group-hover:translate-x-full z-10" />
      </div>

      {/* Category Name Box - 40px */}
      <div className="h-[40px] bg-[#E5D4B5] flex items-center justify-center rounded-b-2xl">
        <h3 className="text-lg font-bold font-serif text-white">
          {category.name}
        </h3>
      </div>
    </Link>
  );
};

export default memo(CategoryCard);
