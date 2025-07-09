import { get, post, put } from './api';
import { Admin, LoginForm } from '../types';

// Admin login
export const loginAdmin = async (credentials: LoginForm): Promise<{ admin: Admin; token: string }> => {
  return await post<{ admin: Admin; token: string }>('/admin/login', credentials);
};

// Create admin (for initial setup)
export const createAdmin = async (adminData: { username: string; email: string; password: string }): Promise<Admin> => {
  return await post<Admin>('/admin/create', adminData);
};

// Get admin profile
export const getAdminProfile = async (): Promise<Admin> => {
  return await get<Admin>('/admin/profile');
};

// Update admin profile
export const updateAdminProfile = async (profileData: { username: string; email: string }): Promise<Admin> => {
  return await put<Admin>('/admin/profile', profileData);
};

// Change password
export const changePassword = async (passwordData: { currentPassword: string; newPassword: string }): Promise<void> => {
  return await post<void>('/admin/change-password', passwordData);
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
