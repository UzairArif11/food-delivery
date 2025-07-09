import { get, post, put, del, uploadFile } from './api';
import { Category, ApiResponse } from '../types';

// Get all categories
export const getCategories = async (): Promise<ApiResponse<Category[]>> => {
  return await get<ApiResponse<Category[]>>('/categories');
};

// Get category by ID
export const getCategoryById = async (id: string): Promise<ApiResponse<Category>> => {
  return await get<ApiResponse<Category>>(`/categories/${id}`);
};

// Create new category
export const createCategory = async (categoryData: FormData): Promise<ApiResponse<Category>> => {
  return await uploadFile<ApiResponse<Category>>('/categories', categoryData);
};

// Update category
export const updateCategory = async (id: string, categoryData: FormData): Promise<ApiResponse<Category>> => {
  return await uploadFile<ApiResponse<Category>>(`/categories/${id}`, categoryData);
};

// Delete category
export const deleteCategory = async (id: string): Promise<ApiResponse<void>> => {
  return await del<ApiResponse<void>>(`/categories/${id}`);
};

// Export as default object
const categoryService = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};

export default categoryService;
