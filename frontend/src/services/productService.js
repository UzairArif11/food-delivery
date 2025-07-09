import { get, del, uploadFile } from './api';

// Get all products
export const getProducts = async (categoryId) => {
  const url = categoryId ? `/products?category=${categoryId}` : '/products';
  return await get(url);
};

// Get products by category
export const getProductsByCategory = async (categoryId) => {
  return await get(`/products/category/${categoryId}`);
};

// Get product by ID
export const getProductById = async (id) => {
  return await get(`/products/${id}`);
};

// Create new product
export const createProduct = async (productData) => {
  return await uploadFile('/products', productData);
};

// Update product
export const updateProduct = async (id, productData) => {
  return await uploadFile(`/products/${id}`, productData);
};

// Delete product
export const deleteProduct = async (id) => {
  return await del(`/products/${id}`);
};

// Export as default object
const productService = {
  getProducts,
  getProductsByCategory,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};

export default productService;
