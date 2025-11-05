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
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
}

const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  className,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Use online placeholder service as fallback
  const placeholderImage = 'https://placehold.co/400x400/D4AF37/FFFFFF?text=DIVA+Jewel';

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
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setHasError(true);
          setIsLoading(false);
        }}
      />
    </div>
  );
};

export default ProductImage;
