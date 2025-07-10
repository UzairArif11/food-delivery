import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthState, LoginForm } from '../types';
import adminService from '../services/adminService';

// Async thunk for admin login
export const loginAdmin = createAsyncThunk(
  'auth/loginAdmin',
  async (credentials: LoginForm) => {
    const response = await adminService.loginAdmin(credentials);
    // Handle ApiResponse wrapper
    const authData = response.data || response;
    
    // Type assertion for the expected structure
    const loginData = authData as { token: string; admin: any };
    
    // Store token in localStorage
    localStorage.setItem('adminToken', loginData.token);
    localStorage.setItem('admin', JSON.stringify(loginData.admin));
    return loginData;
  }
);

// Check if user is already authenticated
const getInitialAuthState = (): AuthState => {
  const token = localStorage.getItem('adminToken');
  const adminData = localStorage.getItem('admin');
  
  if (token && adminData) {
    try {
      const admin = JSON.parse(adminData);
      return {
        admin,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    } catch (error) {
      // If parsing fails, clear localStorage
      localStorage.removeItem('adminToken');
      localStorage.removeItem('admin');
    }
  }
  
  return {
    admin: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  };
};

const initialState: AuthState = getInitialAuthState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.admin = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('adminToken');
      localStorage.removeItem('admin');
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
        state.admin = action.payload.admin;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed';
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
