import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RootState, AppDispatch } from '../store';
import { fetchCategories } from '../store/categorySlice';
import { fetchProducts } from '../store/productSlice';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';

const HomePage: React.FC = () => {
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
    <div className="min-h-screen bg-white">
      <Header />
      
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
                Delicious Food
                <br />
                <span className="text-primary-200">Delivered Fast</span>
              </h1>
              <p className="text-xl mb-8 text-primary-100">
                Order your favorite dishes from our restaurant and get them delivered
                right to your doorstep in no time.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/menu"
                  className="btn-primary bg-white text-primary-600 hover:bg-primary-50 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105"
                >
                  Order Now
                </Link>
                <Link
                  to="/menu"
                  className="btn-secondary bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300"
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
              <div 
                className="w-full h-96 rounded-lg shadow-2xl overflow-hidden relative"
                style={{
                  backgroundImage: `url('/assets/images/fish-fillet-with-berry-sauce-cherry-tomatoes-chef-s-cuisine-created-with-ai 1.jpg')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                {/* Gradient overlay for better text readability and visual appeal */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex items-center justify-center">
                  <div className="text-white text-center p-6">
                    <h3 className="text-4xl lg:text-5xl font-bold mb-3 drop-shadow-2xl">Delicious Food</h3>
                    <p className="text-xl lg:text-2xl drop-shadow-lg font-medium">Made with Love</p>
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
                  Explore our diverse menu categories and find your perfect meal
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
                  Featured Dishes
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Try our most popular and delicious dishes, loved by customers
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
                  to="/menu"
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
                  Why Choose Us?
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
                  <p className="text-gray-600">Get your food delivered in 30 minutes or less</p>
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
                  <p className="text-gray-600">Fresh ingredients and carefully prepared dishes</p>
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
                  <h3 className="text-xl font-semibold mb-2">Made with Love</h3>
                  <p className="text-gray-600">Every dish is prepared with care and passion</p>
                </motion.div>
              </div>
            </div>
          </section>
    
          <Footer />
        </div>
      );
    };
    
    export default HomePage;
