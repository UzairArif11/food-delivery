import { get, post, put, del, uploadFile } from './api';
import { Product, ApiResponse } from '../types';

// Get all products
export const getProducts = async (categoryId?: string): Promise<ApiResponse<Product[]>> => {
  const url = categoryId ? `/products?category=${categoryId}` : '/products';
  return await get<ApiResponse<Product[]>>(url);
};

// Get products by category
export const getProductsByCategory = async (categoryId: string): Promise<ApiResponse<Product[]>> => {
  return await get<ApiResponse<Product[]>>(`/products/category/${categoryId}`);
};

// Get product by ID
export const getProductById = async (id: string): Promise<ApiResponse<Product>> => {
  return await get<ApiResponse<Product>>(`/products/${id}`);
};

// Create new product
export const createProduct = async (productData: FormData): Promise<ApiResponse<Product>> => {
  return await uploadFile<ApiResponse<Product>>('/products', productData);
};

// Update product
export const updateProduct = async (id: string, productData: FormData): Promise<ApiResponse<Product>> => {
  return await uploadFile<ApiResponse<Product>>(`/products/${id}`, productData);
};

// Delete product
export const deleteProduct = async (id: string): Promise<ApiResponse<void>> => {
  return await del<ApiResponse<void>>(`/products/${id}`);
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
