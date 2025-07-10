import { Middleware } from '@reduxjs/toolkit';

// Middleware to save cart to localStorage
export const cartPersistenceMiddleware: Middleware = (store) => (next) => (action: any) => {
  const result = next(action);
  
  // Save cart to localStorage after any cart action
  if (action.type?.startsWith('cart/')) {
    try {
      const state = store.getState();
      localStorage.setItem('cart', JSON.stringify(state.cart));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }
  
  return result;
};
