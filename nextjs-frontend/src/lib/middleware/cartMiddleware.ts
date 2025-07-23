import { Middleware } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Middleware to persist cart state to localStorage
export const cartPersistenceMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  
  // Only persist cart actions on client side
  if (typeof window !== 'undefined' && (action as any).type?.startsWith('cart/')) {
    const state = store.getState() as RootState;
    try {
      localStorage.setItem('cart', JSON.stringify(state.cart));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }
  
  return result;
};
