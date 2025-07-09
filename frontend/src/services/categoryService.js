import { get, del, uploadFile } from './api';

// Get all categories
export const getCategories = async () => {
  return await get('/categories');
};

// Get category by ID
export const getCategoryById = async (id) => {
  return await get(`/categories/${id}`);
};

// Create new category
export const createCategory = async (categoryData) => {
  return await uploadFile('/categories', categoryData);
};

// Update category
export const updateCategory = async (id, categoryData) => {
  return await uploadFile(`/categories/${id}`, categoryData);
};

// Delete category
export const deleteCategory = async (id) => {
  return await del(`/categories/${id}`);
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
