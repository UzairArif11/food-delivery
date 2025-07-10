import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';

// Create axios instance
const createApiInstance = (): AxiosInstance => {
  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor to add auth token
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('adminToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor to handle errors
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      const { response } = error;
      
      if (response?.status === 401 && window.location.href !== '/admin/login') {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('admin');
        window.location.href = '/admin/login';
        
        const errorMessage = response?.data?.message || 'Session expired. Please login again.';
        toast.error(errorMessage);
      }
      
      // Let other errors be handled by the calling service
      return Promise.reject(error);
    }
  );

  return api;
};

// Create the API instance
const api = createApiInstance();

// Generic request function
const request = async <T>(config: AxiosRequestConfig): Promise<T> => {
  try {
    const response = await api.request(config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// HTTP method functions
export const get = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  return request<T>({ ...config, method: 'GET', url });
};

export const post = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  return request<T>({ ...config, method: 'POST', url, data });
};

export const put = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  return request<T>({ ...config, method: 'PUT', url, data });
};

export const del = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  return request<T>({ ...config, method: 'DELETE', url });
};

export const uploadFile = async <T>(url: string, formData: FormData, config?: AxiosRequestConfig): Promise<T> => {
  return request<T>({
    ...config,
    method: 'POST',
    url,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const uploadFilePut = async <T>(url: string, formData: FormData, config?: AxiosRequestConfig): Promise<T> => {
  return request<T>({
    ...config,
    method: 'PUT',
    url,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// Export all methods as default object for backward compatibility
const apiService = {
  get,
  post,
  put,
  delete: del,
  uploadFile,
};

export default apiService;
