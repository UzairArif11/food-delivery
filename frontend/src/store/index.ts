import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './categorySlice';
// Import other slices

const store = configureStore({
  reducer: {
    category: categoryReducer,
    // Add other reducers
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
