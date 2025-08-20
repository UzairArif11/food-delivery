// Image utility functions for Next.js
import { logger } from '@/utils/logger';

export const getImageUrl = (imagePath: string, fallback = '/assets/images/placeholder.jpg'): string => {
  if (!imagePath) {
    logger.debug('No image path provided, using fallback', { fallback }, 'ImageUtils');
    return fallback;
  }
  
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http')) {
    logger.debug('Full URL provided', { imagePath }, 'ImageUtils');
    return imagePath;
  }
  
  // If it's an uploaded image from backend
  if (imagePath.startsWith('/uploads')) {
    let imageUrl: string;
    
    // Detect environment more reliably
    const isProduction = process.env.NODE_ENV === 'production' || 
                        typeof window !== 'undefined' && window.location.hostname !== 'localhost';
    
    if (isProduction) {
      // In production, try multiple URL patterns based on NGINX configuration
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 
                     (typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.hostname}` : 'https:// shangrilaresturant.com');
      
      // The NGINX configuration serves images at /uploads/ path
      imageUrl = `${siteUrl}${imagePath}`;
      logger.debug('Production image URL generated', { siteUrl, imagePath, imageUrl, isProduction }, 'ImageUtils');
    } else {
      // In development, use localhost backend
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 
                        process.env.NEXT_PUBLIC_API_URL?.replace('/v1', '') || 
                        'http://localhost:5000';
      
      imageUrl = `${backendUrl}${imagePath}`;
      logger.debug('Development image URL generated', { backendUrl, imagePath, imageUrl, isProduction }, 'ImageUtils');
    }
    
    return imageUrl;
  }
  
  // If it's a public asset
  const publicUrl = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  logger.debug('Public asset URL generated', { imagePath, publicUrl }, 'ImageUtils');
  return publicUrl;
};

// Alternative image URL generator with multiple fallback attempts
export const getImageUrlWithFallbacks = (imagePath: string): string[] => {
  if (!imagePath || !imagePath.startsWith('/uploads')) {
    return ['/assets/images/placeholder.jpg'];
  }
  
  const isProduction = process.env.NODE_ENV === 'production' || 
                      typeof window !== 'undefined' && window.location.hostname !== 'localhost';
  
  if (isProduction) {
    const baseUrl = typeof window !== 'undefined' ? 
      `${window.location.protocol}//${window.location.hostname}` : 
      'https:// shangrilaresturant.com';
    
    return [
      `${baseUrl}${imagePath}`,                    // Direct NGINX proxy
      `${baseUrl}/api/v1${imagePath}`,             // API route proxy
      '/assets/images/placeholder.jpg'              // Final fallback
    ];
  } else {
    return [
      `http://localhost:5000${imagePath}`,          // Direct backend
      `http://localhost:5000/v1${imagePath}`,       // V1 route
      `http://localhost:5000/api${imagePath}`,      // API route
      '/assets/images/placeholder.jpg'              // Final fallback
    ];
  }
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
