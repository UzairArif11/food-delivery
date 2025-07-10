// Get the API base URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Remove '/api' from the end if it exists
const BASE_URL = API_BASE_URL.replace('/api', '');

/**
 * Converts relative image URLs to absolute URLs
 * @param imagePath - The relative image path from the backend
 * @returns The absolute URL for the image
 */
export const getImageUrl = (imagePath: string | null | undefined): string => {
  // Return empty string if no image path provided
  if (!imagePath) {
    return '';
  }

  // If it's already an absolute URL, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  // If it starts with '/', it's a relative path from the server root
  if (imagePath.startsWith('/')) {
    return `${BASE_URL}${imagePath}`;
  }

  // If it doesn't start with '/', add '/uploads/' prefix
  return `${BASE_URL}/uploads/${imagePath}`;
};

/**
 * Validates if an image URL is accessible
 * @param imageUrl - The image URL to validate
 * @returns Promise that resolves to true if image is accessible
 */
export const validateImageUrl = (imageUrl: string): Promise<boolean> => {
  return new Promise((resolve) => {
    if (!imageUrl) {
      resolve(false);
      return;
    }

    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = imageUrl;
  });
};

/**
 * Gets a placeholder image URL
 * @returns A placeholder image URL
 */
export const getPlaceholderImage = (): string => {
  return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y3ZjdmNyIvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5OTk5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD4KPC9zdmc+';
};

export default {
  getImageUrl,
  validateImageUrl,
  getPlaceholderImage
};
