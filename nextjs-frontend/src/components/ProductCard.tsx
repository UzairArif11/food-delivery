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
import { getImageUrl } from '@/utils/imageUtils';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { name, description, price, image, category } = product;
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();


  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click navigation
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart!`);
  };

  const handleCardClick = () => {
    router.push(`/menu`);
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
          src={getImageUrl(image)}
          alt={name}
          fill
          className="object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/assets/images/placeholder.jpg';
          }}
        />
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

