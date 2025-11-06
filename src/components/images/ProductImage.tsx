/**
 * @component ProductImage
 * @description Optimized product image with lazy loading and fallback
 *
 * @props
 * - src {string} - Image URL
 * - alt {string} - Alt text for accessibility
 * - className {string} - Additional CSS classes
 * - sizes {string} - Responsive image sizes
 *
 * @example
 * ```tsx
 * <ProductImage
 *   src={product.image_url}
 *   alt={product.name}
 *   className="rounded-lg"
 * />
 * ```
 */
import { useState, memo } from 'react';
import { cn } from '@/lib/utils';

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
}

const ProductImage = memo<ProductImageProps>(({
  src,
  alt,
  className,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Use local placeholder to avoid network requests
  const placeholderImage = '/assets/images/products/placeholder.jpg';

  return (
    <div className="relative overflow-hidden">
      {/* Loading skeleton */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}

      {/* Actual image */}
      <img
        src={hasError ? placeholderImage : src}
        alt={alt}
        className={cn(
          'transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
          className
        )}
        sizes={sizes}
        loading="lazy"
        decoding="async"
        fetchPriority="high"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setHasError(true);
          setIsLoading(false);
        }}
      />
    </div>
  );
});

ProductImage.displayName = 'ProductImage';

export default ProductImage;
