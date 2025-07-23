// Image utility functions for Next.js

export const getImageUrl = (imagePath: string, fallback = '/assets/images/placeholder.jpg'): string => {
  if (!imagePath) return fallback;
  
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http')) return imagePath;
  
  // If it's an uploaded image from backend
  if (imagePath.startsWith('/uploads')) {

    // In production, use the site URL; in development, use localhost
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? process.env.NEXT_PUBLIC_API_URL || 'https://foodpanda.site'
      : 'http://localhost:5000';
          console.log(`${baseUrl}${imagePath}`,"`${baseUrl}${imagePath}`")
    return `${baseUrl}${imagePath}`;
  }
  
  // If it's a public asset
  return imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
};

export const createPlaceholderImage = (width: number, height: number, text = 'Image'): string => {
  return `data:image/svg+xml;base64,${btoa(
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#9ca3af" font-family="Arial, sans-serif" font-size="14">
        ${text}
      </text>
    </svg>`
  )}`;
};
