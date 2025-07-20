'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return '/assets/images/placeholder.jpg';
    if (imagePath.startsWith('http')) return imagePath;
    if (imagePath.startsWith('/uploads')) return `http://localhost:5000${imagePath}`;
    return imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
    >
      <Link href={`/menu?category=${category._id}`}>
        <div className="relative h-48 w-full">
          <Image
            src={getImageUrl(category.image)}
            alt={category.name}
            fill
            className="object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/assets/images/placeholder.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="text-xl font-bold mb-1">{category.name}</h3>
            {category.description && (
              <p className="text-sm opacity-90 line-clamp-2">{category.description}</p>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;
