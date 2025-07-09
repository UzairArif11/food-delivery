// This file defines all the TypeScript types used throughout the application
// TypeScript provides type safety, better IDE support, and catches errors at compile time

// Category interface - defines the structure of a food category
export interface Category {
  _id: string;              // Unique identifier from MongoDB
  name: string;             // Category name (e.g., "Pizza", "Burgers")
  description: string;      // Category description
  image: string;            // Category image URL
  isActive: boolean;        // Whether category is active/visible
  sortOrder: number;        // Sort order for display
  createdAt: string;        // Creation timestamp
  updatedAt: string;        // Last update timestamp
}

// Product interface - defines the structure of a food product
export interface Product {
  _id: string;              // Unique identifier from MongoDB
  name: string;             // Product name
  description: string;      // Product description
  price: number;            // Product price
  image: string;            // Product image URL
  category: Category;       // Associated category object
  isActive: boolean;        // Whether product is available for order
  createdAt: string;        // Creation timestamp
  updatedAt: string;        // Last update timestamp
}

// CartItem interface - defines items in the shopping cart
export interface CartItem {
  product: Product;         // The product being added to cart
  quantity: number;         // How many of this product
  totalPrice: number;       // Total price for this item (price * quantity)
}

// Cart interface - defines the shopping cart structure
export interface Cart {
  items: CartItem[];        // Array of cart items
  totalItems: number;       // Total number of items
  totalPrice: number;       // Total price of all items
}

// Admin interface - defines admin user structure
export interface Admin {
  _id: string;              // Unique identifier
  username: string;         // Admin username
  email: string;            // Admin email
  isActive: boolean;        // Whether admin is active
  createdAt: string;        // Creation timestamp
  updatedAt: string;        // Last update timestamp
}

// API Response interface - standard API response structure
export interface ApiResponse<T> {
  success: boolean;         // Whether request was successful
  data?: T;                 // Response data (generic type)
  message?: string;         // Success/error message
  error?: string;           // Error message if any
}

// Loading state interface - for managing loading states
export interface LoadingState {
  loading: boolean;         // Whether operation is in progress
  error: string | null;     // Error message if any
}

// Form interfaces for admin operations
export interface CreateCategoryForm {
  name: string;
  description: string;
  image: File | null;       // File object for image upload
}

export interface CreateProductForm {
  name: string;
  description: string;
  price: number;
  category: string;         // ID of the category this product belongs to
  image: File | null;       // File object for image upload
}

// Authentication interfaces
export interface LoginForm {
  email: string;
  password: string;
}

export interface AuthState {
  admin: Admin | null;      // Currently logged in admin
  isAuthenticated: boolean; // Whether user is authenticated
  loading: boolean;         // Loading state for auth operations
  error: string | null;     // Auth error message
}

// Redux state interfaces
export interface CategoryState extends LoadingState {
  categories: Category[];   // List of all categories
  selectedCategory: Category | null;  // Currently selected category
}

export interface ProductState extends LoadingState {
  products: Product[];      // List of all products
  filteredProducts: Product[];  // Filtered products based on search/category
  selectedProduct: Product | null;  // Currently selected product
  searchTerm: string;       // Current search term
  selectedCategoryId: string | null;  // Currently selected category filter
}

export interface CartState {
  items: CartItem[];        // Cart items
  totalItems: number;       // Total number of items
  totalPrice: number;       // Total price
  isOpen: boolean;          // Whether cart sidebar is open
}

// Root state interface - combines all state slices
export interface RootState {
  categories: CategoryState;
  products: ProductState;
  cart: CartState;
  auth: AuthState;
}

// Utility types
export type AppDispatch = any;  // Will be properly typed with store configuration

// Constants
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
export const FOODPANDA_CHECKOUT_URL = 'https://www.foodpanda.com/checkout';  // External checkout URL
