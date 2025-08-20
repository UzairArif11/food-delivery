import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, LoginForm, Admin, ApiResponse } from '@/types';
import apiService from '@/lib/api';
import { logger } from '@/utils/logger';

// Async thunk for admin login
export const loginAdmin = createAsyncThunk(
  'auth/loginAdmin',
  async (loginData: LoginForm) => {
    const response = await apiService.post('/admin/login', loginData);
    return response;
  }
);

// Load initial auth state from localStorage
const loadAuthFromStorage = (): { admin: Admin | null; isAuthenticated: boolean } => {
  if (typeof window !== 'undefined') {
    try {
      const admin = localStorage.getItem('admin');
      const token = localStorage.getItem('adminToken');
      if (admin && token) {
        return {
          admin: JSON.parse(admin),
          isAuthenticated: true,
        };
      }
    } catch (error) {
      logger.error('Failed to load auth from localStorage', error, 'AuthSlice');
    }
  }
  return {
    admin: null,
    isAuthenticated: false,
  };
};

const { admin, isAuthenticated } = loadAuthFromStorage();

const initialState: AuthState = {
  admin,
  isAuthenticated,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.admin = null;
      state.isAuthenticated = false;
      state.error = null;
      // Clear localStorage on client side
      if (typeof window !== 'undefined') {
        localStorage.removeItem('admin');
        localStorage.removeItem('adminToken');
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        const response = action.payload as ApiResponse<{ admin: Admin; token: string }>;
        if (response && response.success) {
          state.admin = response.data!.admin;
          state.isAuthenticated = true;
          
          // Store in localStorage on client side
          if (typeof window !== 'undefined') {
            localStorage.setItem('admin', JSON.stringify(response.data!.admin));
            localStorage.setItem('adminToken', response.data!.token);
          }
        }
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed';
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
