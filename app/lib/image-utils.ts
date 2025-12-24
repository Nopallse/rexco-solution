/**
 * Utility functions for handling image URLs from backend
 */

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3000';

/**
 * Convert relative image path from backend to full URL
 * @param path - Relative path from backend (e.g., "/uploads/product/...")
 * @returns Full URL or placeholder
 */
export function getImageUrl(path?: string | null): string {
  if (!path) return '/placeholder.png';
  
  // If already absolute URL, return as is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  // If path starts with /, remove it to avoid double slash
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  return `${API_BASE}/${cleanPath}`;
}

/**
 * Convert file path from backend to full URL (for documents, etc)
 * @param path - Relative path from backend
 * @returns Full URL or empty string
 */
export function getFileUrl(path?: string | null): string {
  if (!path) return '';
  
  // If already absolute URL, return as is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  // If path starts with /, remove it to avoid double slash
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  return `${API_BASE}/${cleanPath}`;
}

/**
 * Get first available image from product
 * @param primaryImage - Primary image path
 * @param productImages - Array of product images
 * @returns Full URL of first available image or placeholder
 */
export function getProductImageUrl(
  primaryImage?: string | null,
  productImages?: { url: string }[]
): string {
  if (primaryImage) {
    return getImageUrl(primaryImage);
  }
  
  if (productImages && productImages.length > 0) {
    return getImageUrl(productImages[0].url);
  }
  
  return '/placeholder.png';
}
