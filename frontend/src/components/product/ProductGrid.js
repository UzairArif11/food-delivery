import React from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const ProductGrid = ({ products }) => {
  const handleAddToCart = (product) => {
    // Add to cart logic here
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <motion.div
          key={product._id}
          className="card p-4"
          whileHover={{ scale: 1.02 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover rounded-md mb-3"
          />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
          <p className="text-gray-600 text-sm mb-3">{product.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-primary-600">${product.price}</span>
            <button
              onClick={() => handleAddToCart(product)}
              className="btn-primary"
            >
              Add to Cart
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ProductGrid;
