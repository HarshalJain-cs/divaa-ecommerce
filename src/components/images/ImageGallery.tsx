/**
 * @component ImageGallery
 * @description Product image gallery with thumbnails
 *
 * @props
 * - images {string[]} - Array of image URLs
 * - alt {string} - Alt text prefix
 *
 * @example
 * ```tsx
 * <ImageGallery
 *   images={product.additional_images}
 *   alt={product.name}
 * />
 * ```
 */
import React, { useState } from 'react';

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, alt }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
        <img
          src={images[selectedImage]}
          alt={`${alt} - View ${selectedImage + 1}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`
                aspect-square overflow-hidden rounded-md cursor-pointer
                transition-all duration-200
                ${selectedImage === index
                  ? 'ring-2 ring-brand-gold scale-95'
                  : 'ring-1 ring-gray-200 hover:ring-gray-300'
                }
              `}
            >
              <img
                src={image}
                alt={`${alt} - Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
