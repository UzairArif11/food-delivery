// Type definitions for JavaScript (for documentation purposes)
// These are comments describing the expected object structures

/* 
Category: {
  _id: string,
  name: string,
  description?: string,
  image?: string,
  isActive: boolean,
  sortOrder: number,
  createdAt: string,
  updatedAt: string
}

Product: {
  _id: string,
  name: string,
  category: Category | string,
  price: number,
  image?: string,
  description?: string,
  isActive: boolean,
  createdAt: string,
  updatedAt: string
}

CartItem: {
  product: Product,
  quantity: number
}

Cart: {
  items: CartItem[],
  total: number,
  itemCount: number
}

Admin: {
  _id: string,
  username: string,
  email: string,
  isActive: boolean,
  createdAt: string,
  updatedAt: string
}

AuthState: {
  isAuthenticated: boolean,
  admin: Admin | null,
  token: string | null,
  loading: boolean,
  error: string | null
}

ApiResponse: {
  success: boolean,
  data?: any,
  message?: string,
  error?: string
}

FormField: {
  name: string,
  label: string,
  type: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select' | 'file',
  placeholder?: string,
  required?: boolean,
  options?: { value: string, label: string }[],
  validation?: {
    pattern?: string,
    min?: number,
    max?: number,
    minLength?: number,
    maxLength?: number
  }
}

CheckoutData: {
  items: CartItem[],
  total: number,
  customerInfo: {
    name: string,
    phone: string,
    address: string
  },
  deliveryMethod: 'delivery',
  paymentMethod: 'cash_on_delivery'
}
*/

export {};
