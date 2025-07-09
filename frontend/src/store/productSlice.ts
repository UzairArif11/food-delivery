import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ProductState } from '../types';
import productService from '../services/productService';

// Async thunk to fetch all products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    return await productService.getProducts();
  }
);

// Async thunk to fetch products by category
export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchProductsByCategory',
  async (categoryId: string) => {
    return await productService.getProductsByCategory(categoryId);
  }
);

// Async thunk to create product
export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (productData: FormData) => {
    return await productService.createProduct(productData);
  }
);

// Async thunk to update product
export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, productData }: { id: string; productData: FormData }) => {
    return await productService.updateProduct(id, productData);
  }
);

// Async thunk to delete product
export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id: string) => {
    await productService.deleteProduct(id);
    return id;
  }
);

const initialState: ProductState = {
  products: [],
  filteredProducts: [],
  selectedProduct: null,
  searchTerm: '',
  selectedCategoryId: null,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      // Filter products based on search term
      state.filteredProducts = state.products.filter(product =>
        product.name.toLowerCase().includes(action.payload.toLowerCase()) ||
        product.description.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategoryId = action.payload;
      if (action.payload) {
        state.filteredProducts = state.products.filter(
          product => product.category._id === action.payload
        );
      } else {
        state.filteredProducts = state.products;
      }
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.filteredProducts = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      })
      // Fetch products by category
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredProducts = action.payload;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products by category';
      })
      // Create product
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
        state.filteredProducts.push(action.payload);
      })
      // Update product
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(prod => prod._id === action.payload._id);
        if (index !== -1) {
          state.products[index] = action.payload;
          state.filteredProducts = state.products;
        }
      })
      // Delete product
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(prod => prod._id !== action.payload);
        state.filteredProducts = state.products;
      });
  },
});

export const { setSearchTerm, setSelectedCategory, setSelectedProduct, clearError } = productSlice.actions;
export default productSlice.reducer;
