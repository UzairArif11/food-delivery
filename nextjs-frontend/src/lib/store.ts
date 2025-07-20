import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './slices/categorySlice';
import productReducer from './slices/productSlice';
import cartReducer from './slices/cartSlice';
import authReducer from './slices/authSlice';
import contactReducer from './slices/contactSlice';
import { cartPersistenceMiddleware } from './middleware/cartMiddleware';

const store = configureStore({
  reducer: {
    categories: categoryReducer,
    products: productReducer,
    cart: cartReducer,
    auth: authReducer,
    contacts: contactReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(cartPersistenceMiddleware),
});

export { store };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
