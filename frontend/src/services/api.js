import axios from 'axios';
import { toast } from 'react-toastify';

// Create axios instance
const createApiInstance = () => {
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
      const token = localStorage.getItem('token');
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
      
      if (response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('admin');
        window.location.href = '/admin/login';
      }
      
      const errorMessage = response?.data?.message || 'Something went wrong';
      toast.error(errorMessage);
      
      return Promise.reject(error);
    }
  );

  return api;
};

// Create the API instance
const api = createApiInstance();

// Generic request function
const request = async (config) => {
  try {
    const response = await api.request(config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// HTTP method functions
export const get = async (url, config) => {
  return request({ ...config, method: 'GET', url });
};

export const post = async (url, data, config) => {
  return request({ ...config, method: 'POST', url, data });
};

export const put = async (url, data, config) => {
  return request({ ...config, method: 'PUT', url, data });
};

export const del = async (url, config) => {
  return request({ ...config, method: 'DELETE', url });
};

export const uploadFile = async (url, formData, config) => {
  return request({
    ...config,
    method: 'POST',
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
