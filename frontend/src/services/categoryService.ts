import { get, del, uploadFile } from './api';
import { Category } from '../types';

// Get all categories
export const getCategories = async (): Promise<Category[]> => {
  return await get<Category[]>('/categories');
};

// Get category by ID
export const getCategoryById = async (id: string): Promise<Category> => {
  return await get<Category>(`/categories/${id}`);
};

// Create new category
export const createCategory = async (categoryData: FormData): Promise<Category> => {
  return await uploadFile<Category>('/categories', categoryData);
};

// Update category
export const updateCategory = async (id: string, categoryData: FormData): Promise<Category> => {
  return await uploadFile<Category>(`/categories/${id}`, categoryData);
};

// Delete category
export const deleteCategory = async (id: string): Promise<void> => {
  return await del<void>(`/categories/${id}`);
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
