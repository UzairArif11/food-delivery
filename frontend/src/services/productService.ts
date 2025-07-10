import { get, del, uploadFile, uploadFilePut } from './api';
import { Product, ApiResponse } from '../types';

// Get all products
export const getProducts = async (): Promise<ApiResponse<Product[]>> => {
  return await get<ApiResponse<Product[]>>('/products');
};

// Get product by ID
export const getProductById = async (id: string): Promise<ApiResponse<Product>> => {
  return await get<ApiResponse<Product>>(`/products/${id}`);
};

// Get products by category
export const getProductsByCategory = async (categoryId: string): Promise<ApiResponse<Product[]>> => {
  return await get<ApiResponse<Product[]>>(`/products/category/${categoryId}`);
};

// Create new product
export const createProduct = async (productData: FormData): Promise<ApiResponse<Product>> => {
  return await uploadFile<ApiResponse<Product>>('/products', productData);
};

// Update product
export const updateProduct = async (id: string, productData: FormData): Promise<ApiResponse<Product>> => {
  return await uploadFilePut<ApiResponse<Product>>(`/products/${id}`, productData);
};

// Delete product
export const deleteProduct = async (id: string): Promise<ApiResponse<void>> => {
  return await del<ApiResponse<void>>(`/products/${id}`);
};

// Export as default object
const productService = {
  getProducts,
  getProductById,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
};

export default productService;
