import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CategoryState } from '../types';
import categoryService from '../services/categoryService';

// Async thunk to fetch all categories
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    return await categoryService.getCategories();
  }
);

// Async thunk to create category
export const createCategory = createAsyncThunk(
  'categories/createCategory',
  async (categoryData: FormData) => {
    return await categoryService.createCategory(categoryData);
  }
);

// Async thunk to update category
export const updateCategory = createAsyncThunk(
  'categories/updateCategory',
  async ({ id, categoryData }: { id: string; categoryData: FormData }) => {
    return await categoryService.updateCategory(id, categoryData);
  }
);

// Async thunk to delete category
export const deleteCategory = createAsyncThunk(
  'categories/deleteCategory',
  async (id: string) => {
    await categoryService.deleteCategory(id);
    return id;
  }
);

const initialState: CategoryState = {
  categories: [],
  selectedCategory: null,
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch categories';
      })
      // Create category
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      // Update category
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex(cat => cat._id === action.payload._id);
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      // Delete category
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(cat => cat._id !== action.payload);
      });
  },
});

export const { setSelectedCategory, clearError } = categorySlice.actions;
export default categorySlice.reducer;
