import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from '../../store';
import { fetchCategories, deleteCategory } from '../../store/categorySlice';
import { fetchProducts, deleteProduct } from '../../store/productSlice';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ImageWithFallback from '../../components/ImageWithFallback';

const AdminDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { categories, loading: categoriesLoading } = useSelector((state: RootState) => state.categories);
  const { products, loading: productsLoading } = useSelector((state: RootState) => state.products);
  const [activeTab, setActiveTab] = useState<'categories' | 'products'>('categories');

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDeleteCategory = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete the category "${name}"?`)) {
      try {
        await dispatch(deleteCategory(id)).unwrap();
        toast.success('Category deleted successfully!');
      } catch (error: any) {
        toast.error(error?.message || 'Failed to delete category');
      }
    }
  };

  const handleDeleteProduct = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete the product "${name}"?`)) {
      try {
        await dispatch(deleteProduct(id)).unwrap();
        toast.success('Product deleted successfully!');
      } catch (error: any) {
        toast.error(error?.message || 'Failed to delete product');
      }
    }
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat._id === categoryId);
    return category?.name || 'Unknown Category';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
            <div className="flex space-x-4">
              <button
                onClick={() => navigate('/admin/add-category')}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                Add Category
              </button>
              <button
                onClick={() => navigate('/admin/add-product')}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('categories')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'categories'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Categories ({categories.length})
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'products'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Products ({products.length})
            </button>
          </nav>
        </div>

        {/* Categories Tab */}
        {activeTab === 'categories' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">Categories</h2>
              <button
                onClick={() => navigate('/admin/add-category')}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                Add New Category
              </button>
            </div>

            {categoriesLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : categories.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No categories found. Create your first category!</p>
              </div>
            ) : (
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <ul className="divide-y divide-gray-200">
                  {categories.map((category) => (
                    <motion.li
                      key={category._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="px-6 py-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <ImageWithFallback
                            src={category.image}
                            alt={category.name}
                            className="h-12 w-12 rounded-lg object-cover"
                          />
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
                            <p className="text-sm text-gray-500">{category.description}</p>
                            <p className="text-xs text-gray-400">Sort Order: {category.sortOrder}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => navigate(`/admin/edit-category/${category._id}`)}
                            className="text-blue-600 hover:text-blue-800 font-medium"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteCategory(category._id, category.name)}
                            className="text-red-600 hover:text-red-800 font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">Products</h2>
              <button
                onClick={() => navigate('/admin/add-product')}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
              >
                Add New Product
              </button>
            </div>

            {productsLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No products found. Create your first product!</p>
              </div>
            ) : (
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <ul className="divide-y divide-gray-200">
                  {products.map((product) => (
                    <motion.li
                      key={product._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="px-6 py-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <ImageWithFallback
                            src={product.image}
                            alt={product.name}
                            className="h-12 w-12 rounded-lg object-cover"
                          />
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                            <p className="text-sm text-gray-500">{product.description}</p>
                            <div className="flex items-center space-x-4 mt-1">
                              <span className="text-sm font-medium text-green-600">${product.price}</span>
                              <span className="text-xs text-gray-400">Category: {getCategoryName(product.category._id)}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => navigate(`/admin/edit-product/${product._id}`)}
                            className="text-blue-600 hover:text-blue-800 font-medium"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product._id, product.name)}
                            className="text-red-600 hover:text-red-800 font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

