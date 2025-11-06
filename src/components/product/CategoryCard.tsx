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
import { ArrowRight } from 'lucide-react';

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

  return (
    <Link
      to={`/products?category=${category.id}`}
      onClick={handleClick}
      className="category-card-container group"
    >
      {/* Category Image */}
      <div className="absolute inset-0">
        <img
          src={category.image_url || 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=600&fit=crop&q=80'}
          alt={category.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="category-overlay group-hover:opacity-80" />

      {/* Category Content */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 text-white">
        <div className="transform transition-transform duration-300 group-hover:translate-y-[-8px]">
          <h3 className="text-2xl font-bold mb-2 font-serif">
            {category.name}
          </h3>

          {category.description && (
            <p className="text-sm text-gray-200 mb-4 line-clamp-2 opacity-90">
              {category.description}
            </p>
          )}

          {/* Shop Now Button */}
          <div className="flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all">
            <span>Shop Now</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>

      {/* Shine Effect on Hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -translate-x-full group-hover:translate-x-full z-10" />
    </Link>
  );
};

export default memo(CategoryCard);
