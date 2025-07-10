import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState, AppDispatch } from '../../store';
import { updateProduct, fetchProducts } from '../../store/productSlice';
import { fetchCategories } from '../../store/categorySlice';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ImageWithFallback from '../../components/ImageWithFallback';

interface ProductFormData {
  name: string;
  description: string;
  price: number;
  category: string;
  image: File | null;
}

const EditProduct: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { products, loading } = useSelector((state: RootState) => state.products);
  const { categories } = useSelector((state: RootState) => state.categories);

  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    price: 0,
    category: '',
    image: null,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const currentProduct = products.find(product => product._id === id);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, products.length, categories.length]);

  useEffect(() => {
    if (currentProduct) {
      setFormData({
        name: currentProduct.name,
        description: currentProduct.description || '',
        price: currentProduct.price,
        category: typeof currentProduct.category === 'string' ? currentProduct.category : currentProduct.category._id,
        image: null,
      });
      setCurrentImage(currentProduct.image);
    }
  }, [currentProduct]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }

      setFormData(prev => ({ ...prev, image: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, image: null }));
    setImagePreview(null);
    // Reset file input
    const fileInput = document.getElementById('image') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Product name must be at least 2 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    if (formData.price <= 0) {
      newErrors.price = 'Price must be greater than 0';
    } else if (formData.price > 10000) {
      newErrors.price = 'Price cannot exceed $10,000';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the form errors');
      return;
    }

    if (!id) {
      toast.error('Product ID is missing');
      return;
    }

    const submitData = new FormData();
    submitData.append('name', formData.name.trim());
    submitData.append('description', formData.description.trim());
    submitData.append('price', formData.price.toString());
    submitData.append('category', formData.category);
    
    if (formData.image) {
      submitData.append('image', formData.image);
    }

    try {
      await dispatch(updateProduct({ id, productData: submitData })).unwrap();
      toast.success('Product updated successfully!');
      navigate('/admin/dashboard');
    } catch (error: any) {
      toast.error(error?.message || 'Failed to update product');
    }
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat._id === categoryId);
    return category?.name || 'Unknown Category';
  };

  if (!currentProduct && products.length > 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Go Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/admin/dashboard')}
                className="text-gray-500 hover:text-gray-700 mr-4"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <h1 className="text-xl font-semibold text-gray-900">Edit Product</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm border"
        >
          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Product Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter product name (e.g., Margherita Pizza)"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              {/* Category Selection */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.category ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
                {categories.length === 0 && (
                  <p className="mt-1 text-sm text-amber-600">
                    No categories available. Please create a category first.
                  </p>
                )}
              </div>

              {/* Price */}
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                  Price ($) *
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.price ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="0.00"
                />
                {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter product description, ingredients, or special features..."
                />
                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Image
                </label>
                
                {/* Current Image */}
                {currentImage && !imagePreview && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Current Image:</p>
                    <ImageWithFallback
                      src={currentImage}
                      alt="Current product image"
                      className="w-32 h-32 object-cover rounded-lg border"
                    />
                  </div>
                )}

                {/* Image Preview */}
                {imagePreview && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">New Image Preview:</p>
                    <div className="relative inline-block">
                      <img
                        src={imagePreview}
                        alt="Product preview"
                        className="w-32 h-32 object-cover rounded-lg border"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                )}

                {/* Upload Button */}
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="image"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-8 h-8 mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 5MB)</p>
                    </div>
                    <input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  type="submit"
                  disabled={loading || categories.length === 0}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Updating Product...
                    </div>
                  ) : (
                    'Update Product'
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={() => navigate('/admin/dashboard')}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EditProduct;
