import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './categorySlice';
// Import other slices

const store = configureStore({
  reducer: {
    category: categoryReducer,
    // Add other reducers
  },
});

export default store;
