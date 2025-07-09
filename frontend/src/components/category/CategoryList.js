import React from 'react';
import { motion } from 'framer-motion';

const CategoryList = ({ categories, selectedCategory, onCategorySelect }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {categories.map((category) => (
        <motion.div
          key={category._id}
          onClick={() => onCategorySelect(category)}
          className={`cursor-pointer rounded-lg shadow-md p-4 bg-white hover:bg-primary-50 transition-all duration-200 ease-in-out ${
            selectedCategory?._id === category._id ? 'ring-2 ring-primary-500' : ''
          }`}
          whileHover={{ scale: 1.02 }}
        >
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-24 object-cover rounded-md mb-2"
          />
          <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
        </motion.div>
      ))}
    </div>
  );
};

export default CategoryList;

