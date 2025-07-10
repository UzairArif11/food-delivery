import { get, post, put } from './api';
import { Admin, LoginForm, ApiResponse } from '../types';

// Admin login
export const loginAdmin = async (credentials: LoginForm): Promise<ApiResponse<{ admin: Admin; token: string }>> => {
  return await post<ApiResponse<{ admin: Admin; token: string }>>('/admin/login', credentials);
};

// Create admin (for initial setup)
export const createAdmin = async (adminData: { username: string; email: string; password: string }): Promise<ApiResponse<Admin>> => {
  return await post<ApiResponse<Admin>>('/admin/create', adminData);
};

// Get admin profile
export const getAdminProfile = async (): Promise<ApiResponse<Admin>> => {
  return await get<ApiResponse<Admin>>('/admin/profile');
};

// Update admin profile
export const updateAdminProfile = async (profileData: { username: string; email: string }): Promise<ApiResponse<Admin>> => {
  return await put<ApiResponse<Admin>>('/admin/profile', profileData);
};

// Change password
export const changePassword = async (passwordData: { currentPassword: string; newPassword: string }): Promise<ApiResponse<void>> => {
  return await post<ApiResponse<void>>('/admin/change-password', passwordData);
};

// Export as default object
const adminService = {
  loginAdmin,
  createAdmin,
  getAdminProfile,
  updateAdminProfile,
  changePassword,
};

export default adminService;
