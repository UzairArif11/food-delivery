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
    
    // In production, images are served directly from the domain root via NGINX proxy
    if (process.env.NODE_ENV === 'production') {
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://foodpanda.site';
      imageUrl = `${siteUrl}${imagePath}`;
      logger.debug('Production image URL generated', { siteUrl, imagePath, imageUrl }, 'ImageUtils');
    } else {
      // In development, use localhost backend with multiple fallback paths
      const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/v1', '') || 'http://localhost:5000';
      imageUrl = `${apiUrl}${imagePath}`;
      logger.debug('Development image URL generated', { apiUrl, imagePath, imageUrl }, 'ImageUtils');
    }
    
    return imageUrl;
  }
  
  // If it's a public asset
  const publicUrl = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  logger.debug('Public asset URL generated', { imagePath, publicUrl }, 'ImageUtils');
  return publicUrl;
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
