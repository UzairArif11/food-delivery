'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { addToCart } from '@/lib/slices/cartSlice';
import type { AppDispatch } from '@/lib/store';
import { Product } from '@/types';
import { getImageUrl, createPlaceholderImage } from '@/utils/imageUtils';
import { logger } from '@/utils/logger';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { name, description, price, image, category } = product;
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [imageError, setImageError] = React.useState(false);
  const [imageSrc, setImageSrc] = React.useState<string>(getImageUrl(image));


  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click navigation
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart!`);
  };

  const handleCardClick = () => {
    router.push(`/menu`);
  };
  
  const handleImageError = () => {
    logger.warn('Image failed to load', { 
      productName: name, 
      originalImage: image, 
      attemptedUrl: imageSrc 
    }, 'ProductCard');
    
    setImageError(true);
    // Try alternative paths in sequence
    if (!imageError) {
      const alternatives = [
        `/api${image}`, // Try /api/uploads/
        `/v1${image}`,  // Try /v1/uploads/
        '/assets/images/placeholder.jpg' // Final fallback
      ];
      
      const nextUrl = alternatives[0];
      if (nextUrl !== imageSrc) {
        setImageSrc(nextUrl);
        setImageError(false);
      }
    }
  };
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleCardClick}
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
    >
      <div className="relative h-52 w-full overflow-hidden rounded-t-xl">
        <Image
          src={imageSrc}
          alt={name}
          fill
          className="object-cover"
          onError={handleImageError}
          onLoad={() => {
            logger.debug('Image loaded successfully', { 
              productName: name, 
              imageUrl: imageSrc 
            }, 'ProductCard');
          }}
        />
        {imageError && (
          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
            <div className="text-gray-500 text-center">
              <div className="text-sm">Image unavailable</div>
              <div className="text-xs mt-1">{name}</div>
            </div>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{name}</h3>
        <p className="text-gray-600 text-sm line-clamp-2 mb-2">
          {description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-primary-600 font-bold">
            ${price.toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg transition-colors hover:bg-primary-700 text-sm font-medium"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;

