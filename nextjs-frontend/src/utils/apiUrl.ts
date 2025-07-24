// Centralized API URL utilities

/**
 * Get the base API URL without the /v1 suffix
 * Used for serving static files like images
 */
export const getApiBaseUrl = (): string => {
  return process.env.NEXT_PUBLIC_API_URL?.replace('/v1', '') || 'http://localhost:5000';
};

/**
 * Get the full API URL with /v1 suffix
 * Used for API endpoints
 */
export const getApiUrl = (): string => {
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/v1';
};

/**
 * Get the site URL
 */
export const getSiteUrl = (): string => {
  return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
};

/**
 * Build image URL from image path
 * Handles both relative and absolute paths
 */
export const buildImageUrl = (imagePath: string | undefined | null): string => {
  if (!imagePath) return '/assets/images/placeholder.jpg';
  
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http')) return imagePath;
  
  // Remove leading slashes to normalize
  const cleanPath = imagePath.replace(/^\/+/, '');
  
  // Build the full URL
  return `${getApiBaseUrl()}/${cleanPath}`;
};
