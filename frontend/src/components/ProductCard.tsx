import React from 'react';
import { Product } from '../types';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../store/cartSlice';
import type { AppDispatch } from '../store';
import ImageWithFallback from './ImageWithFallback';
import { getImageUrl } from '../utils/imageUtils';
import { toast } from 'react-toastify';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click navigation
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart!`);
  };

  const handleCardClick = () => {
    navigate(`/food/${product._id}`);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      onClick={handleCardClick}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
    >
        <div className="relative">
          <ImageWithFallback
            src={getImageUrl(product.image)}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
        {!product.isActive && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold bg-red-600 px-3 py-1 rounded">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary-600">
            ${product.price.toFixed(2)}
          </span>
          
          <button
            onClick={handleAddToCart}
            disabled={!product.isActive}
            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
              product.isActive
                ? 'bg-primary-600 text-white hover:bg-primary-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {product.isActive ? 'Add to Cart' : 'Unavailable'}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
