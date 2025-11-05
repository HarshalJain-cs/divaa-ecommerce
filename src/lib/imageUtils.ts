/**
 * @title Image Utility Functions
 * @description Helper functions for image handling and optimization
 * @author DIVA Team
 */

/**
 * @title getImageUrl
 * @description Get full image URL from relative path or Supabase storage
 *
 * @param {string} path - Image path (relative or full URL)
 * @returns {string} Full image URL
 *
 * @example
 * ```typescript
 * const url = getImageUrl('/assets/images/products/ring.jpg');
 * // Returns: 'http://localhost:5173/assets/images/products/ring.jpg'
 * ```
 */
export function getImageUrl(path: string): string {
  // If already a full URL, return as is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  // If relative path, prepend base URL
  return `${window.location.origin}${path}`;
}

/**
 * @title validateImageFile
 * @description Validate image file before upload
 *
 * @param {File} file - File to validate
 * @param {Object} options - Validation options
 * @returns {Object} Validation result
 */
interface ValidationOptions {
  maxSize?: number;
  allowedTypes?: string[];
  minWidth?: number;
  minHeight?: number;
}

interface ValidationResult {
  valid: boolean;
  error?: string;
}

export async function validateImageFile(
  file: File,
  options: ValidationOptions = {}
): Promise<ValidationResult> {
  const {
    maxSize = 5 * 1024 * 1024, // 5MB default
    allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
    minWidth = 0,
    minHeight = 0
  } = options;

  // Check file type
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file type. Allowed types: ${allowedTypes.join(', ')}`
    };
  }

  // Check file size
  if (file.size > maxSize) {
    return {
      valid: false,
      error: `File too large. Maximum size: ${maxSize / (1024 * 1024)}MB`
    };
  }

  // Check image dimensions
  if (minWidth > 0 || minHeight > 0) {
    try {
      const dimensions = await getImageDimensions(file);

      if (dimensions.width < minWidth || dimensions.height < minHeight) {
        return {
          valid: false,
          error: `Image too small. Minimum dimensions: ${minWidth}x${minHeight}px`
        };
      }
    } catch (error) {
      return {
        valid: false,
        error: 'Failed to read image dimensions'
      };
    }
  }

  return { valid: true };
}

/**
 * @title getImageDimensions
 * @description Get width and height of image file
 *
 * @param {File} file - Image file
 * @returns {Promise<Object>} Width and height
 */
interface ImageDimensions {
  width: number;
  height: number;
}

export function getImageDimensions(file: File): Promise<ImageDimensions> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({
        width: img.width,
        height: img.height
      });
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };

    img.src = url;
  });
}

/**
 * @title compressImage
 * @description Compress image file client-side
 *
 * @param {File} file - Image file to compress
 * @param {Object} options - Compression options
 * @returns {Promise<File>} Compressed image file
 */
interface CompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
}

export async function compressImage(
  file: File,
  options: CompressionOptions = {}
): Promise<File> {
  const {
    maxWidth = 1200,
    maxHeight = 1200,
    quality = 0.85
  } = options;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();

      img.onload = () => {
        // Calculate new dimensions
        let { width, height } = img;

        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = width * ratio;
          height = height * ratio;
        }

        // Create canvas and compress
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Failed to compress image'));
              return;
            }

            const compressedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now()
            });

            resolve(compressedFile);
          },
          file.type,
          quality
        );
      };

      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target?.result as string;
    };

    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

/**
 * @title generateThumbnail
 * @description Generate thumbnail from image file
 *
 * @param {File} file - Original image file
 * @param {number} size - Thumbnail size (square)
 * @returns {Promise<string>} Base64 data URL of thumbnail
 */
export async function generateThumbnail(
  file: File,
  size: number = 200
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();

      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }

        // Calculate crop dimensions for square thumbnail
        const minDim = Math.min(img.width, img.height);
        const sx = (img.width - minDim) / 2;
        const sy = (img.height - minDim) / 2;

        ctx.drawImage(img, sx, sy, minDim, minDim, 0, 0, size, size);

        resolve(canvas.toDataURL(file.type));
      };

      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target?.result as string;
    };

    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}
