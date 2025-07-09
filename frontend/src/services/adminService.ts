import { get, post, put } from './api';
import { Admin, ApiResponse } from '../types';

// Admin login
export const loginAdmin = async (credentials: { email: string; password: string }): Promise<ApiResponse<{ token: string; admin: Admin }>> => {
  return await post<ApiResponse<{ token: string; admin: Admin }>>('/admin/login', credentials);
};

// Create admin
export const createAdmin = async (adminData: { username: string; email: string; password: string }): Promise<ApiResponse<Admin>> => {
  return await post<ApiResponse<Admin>>('/admin/create', adminData);
};

// Get admin profile
export const getAdminProfile = async (): Promise<ApiResponse<Admin>> => {
  return await get<ApiResponse<Admin>>('/admin/profile');
};

// Update admin profile
export const updateAdminProfile = async (profileData: { username?: string; email?: string }): Promise<ApiResponse<Admin>> => {
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
