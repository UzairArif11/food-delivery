'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { RootState, AppDispatch } from '@/lib/store';
import { fetchCategories } from '@/lib/slices/categorySlice';
import { fetchProducts } from '@/lib/slices/productSlice';
import CategoryCard from '@/components/CategoryCard';
import ProductCard from '@/components/ProductCard';
import LoadingSpinner from '@/components/LoadingSpinner';

const HomePageContent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories = [], loading: categoriesLoading } = useSelector((state: RootState) => state.categories || {});
  const { products = [], loading: productsLoading } = useSelector((state: RootState) => state.products || {});

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }, [dispatch]);

  // Get featured products (first 6 products)
  const featuredProducts = Array.isArray(products) ? products.slice(0, 6) : [];

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-5xl lg:text-6xl font-heading font-bold mb-6">
                Elevating Desi Cuisine
                <br />
                <span className="text-primary-200">Since 1989</span>
              </h1>
              <p className="text-xl mb-8 text-primary-100">
                Since 1989, Shangrila has been Lahore's go-to destination for rich, authentic Pakistani cuisine — now just a tap away.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/menu"
                  className="btn-primary bg-white text-primary-600 hover:bg-primary-50 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105 inline-block"
                >
                  Order Now
                </Link>
                <Link
                  href="/menu"
                  className="btn-secondary bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 inline-block"
                >
                  View Menu
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="w-full h-96 rounded-lg shadow-2xl overflow-hidden relative">
                <Image
                  src="/assets/images/fish-fillet-with-berry-sauce-cherry-tomatoes-chef-s-cuisine-created-with-ai 1.jpg"
                  alt="Delicious Food"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Gradient overlay for better text readability and visual appeal */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex items-center justify-center">
                  <div className="text-white text-center p-6">
                    <h3 className="text-4xl lg:text-5xl font-bold mb-3 drop-shadow-2xl">Authentic Desi Taste</h3>
                    <p className="text-xl lg:text-2xl drop-shadow-lg font-medium">Heritage Recipes</p>
                    <div className="mt-4 w-20 h-1 bg-white mx-auto rounded-full opacity-80"></div>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-12 h-12 border-2 border-white/30 rounded-full"></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 border-2 border-white/20 rounded-full"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-heading font-bold text-gray-900 mb-4">
              Browse Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover authentic Pakistani cuisine crafted from generations of heritage recipes
            </p>
          </motion.div>

          {categoriesLoading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.isArray(categories) && categories.length > 0 ? categories.map((category, index) => (
                <motion.div
                  key={category._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <CategoryCard category={category} />
                </motion.div>
              )) : (
                <div className="col-span-full text-center py-8">
                  <p className="text-gray-500">No categories available</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-heading font-bold text-gray-900 mb-4">
              Signature Dishes
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From Shahi Daal to Kalagi and Mutton Joint, every dish is made from timeless recipes with modern-day precision
            </p>
          </motion.div>

          {productsLoading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.isArray(featuredProducts) && featuredProducts.length > 0 ? featuredProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              )) : (
                <div className="col-span-full text-center py-8">
                  <p className="text-gray-500">No products available</p>
                </div>
              )}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Link
              href="/menu"
              className="btn-primary inline-block px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105"
            >
              View Full Menu
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-primary-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-heading font-bold text-gray-900 mb-4">
              Why Choose Shangrila?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center p-6 bg-white rounded-lg shadow-md"
            >
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Hot, fresh, and on time — enjoy quick and reliable delivery straight from our kitchen in Mozang Anarkali to your doorstep</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center p-6 bg-white rounded-lg shadow-md"
            >
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Food</h3>
              <p className="text-gray-600">Our recipes are rooted in tradition, prepared with fresh ingredients and care. From Shahi Daal to Mutton Joint, every bite is packed with authentic desi taste</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center p-6 bg-white rounded-lg shadow-md"
            >
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Great Service</h3>
              <p className="text-gray-600">We treat every guest like family. Whether you're dining in or ordering online, we're committed to warm hospitality and customer satisfaction — every single time</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Order Today Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-heading font-bold text-gray-900 mb-4">
              Order Today
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Whether you're a student, a busy office-goer, or just hungry for the real taste of home — Shangrila brings the soul of desi food right to you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center p-8 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Dine In</h3>
              <p className="text-gray-600">Experience the authentic ambiance of Shangrila at our Mozang Anarkali location</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center p-8 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Takeaway</h3>
              <p className="text-gray-600">Quick pickup service for when you're on the go but still want quality desi food</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center p-8 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Fast Delivery</h3>
              <p className="text-gray-600">Hot, fresh, and on time — enjoy Shangrila's authentic taste delivered to your doorstep</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link
              href="/menu"
              className="btn-primary inline-block px-10 py-4 text-xl font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Order Now
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HomePageContent;
