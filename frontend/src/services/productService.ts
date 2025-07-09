import { get, del, uploadFile } from './api';
import { Product } from '../types';

// Get all products
export const getProducts = async (): Promise<Product[]> => {
  return await get<Product[]>('/products');
};

// Get product by ID
export const getProductById = async (id: string): Promise<Product> => {
  return await get<Product>(`/products/${id}`);
};

// Get products by category
export const getProductsByCategory = async (categoryId: string): Promise<Product[]> => {
  return await get<Product[]>(`/products/category/${categoryId}`);
};

// Create new product
export const createProduct = async (productData: FormData): Promise<Product> => {
  return await uploadFile<Product>('/products', productData);
};

// Update product
export const updateProduct = async (id: string, productData: FormData): Promise<Product> => {
  return await uploadFile<Product>(`/products/${id}`, productData);
};

// Delete product
export const deleteProduct = async (id: string): Promise<void> => {
  return await del<void>(`/products/${id}`);
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
