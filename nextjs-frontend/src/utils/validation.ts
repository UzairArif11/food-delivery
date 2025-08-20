// Input validation utilities for forms
// Provides consistent validation across the application

export interface ValidationRule {
  message: string;
  test: (value: any) => boolean;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

// Common validation rules
export const ValidationRules = {
  required: (message = 'This field is required'): ValidationRule => ({
    message,
    test: (value: any) => {
      if (typeof value === 'string') return value.trim().length > 0;
      if (typeof value === 'number') return !isNaN(value);
      if (Array.isArray(value)) return value.length > 0;
      return value != null && value !== undefined;
    },
  }),

  email: (message = 'Please enter a valid email address'): ValidationRule => ({
    message,
    test: (value: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value?.trim() || '');
    },
  }),

  minLength: (min: number, message?: string): ValidationRule => ({
    message: message || `Must be at least ${min} characters long`,
    test: (value: string) => (value?.trim() || '').length >= min,
  }),

  maxLength: (max: number, message?: string): ValidationRule => ({
    message: message || `Must be no more than ${max} characters long`,
    test: (value: string) => (value?.trim() || '').length <= max,
  }),

  minValue: (min: number, message?: string): ValidationRule => ({
    message: message || `Must be at least ${min}`,
    test: (value: number) => !isNaN(value) && value >= min,
  }),

  maxValue: (max: number, message?: string): ValidationRule => ({
    message: message || `Must be no more than ${max}`,
    test: (value: number) => !isNaN(value) && value <= max,
  }),

  phone: (message = 'Please enter a valid phone number'): ValidationRule => ({
    message,
    test: (value: string) => {
      // Simple phone validation - adjust pattern as needed
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      return phoneRegex.test(value?.replace(/[\s\-\(\)]/g, '') || '');
    },
  }),

  url: (message = 'Please enter a valid URL'): ValidationRule => ({
    message,
    test: (value: string) => {
      try {
        new URL(value?.trim() || '');
        return true;
      } catch {
        return false;
      }
    },
  }),

  fileSize: (maxSizeMB: number, message?: string): ValidationRule => ({
    message: message || `File must be smaller than ${maxSizeMB}MB`,
    test: (file: File) => {
      if (!file) return true; // Optional file
      return file.size <= maxSizeMB * 1024 * 1024;
    },
  }),

  fileType: (allowedTypes: string[], message?: string): ValidationRule => ({
    message: message || `File must be one of: ${allowedTypes.join(', ')}`,
    test: (file: File) => {
      if (!file) return true; // Optional file
      return allowedTypes.includes(file.type);
    },
  }),
};

// Validation function
export const validate = (value: any, rules: ValidationRule[]): ValidationResult => {
  const errors: string[] = [];

  for (const rule of rules) {
    if (!rule.test(value)) {
      errors.push(rule.message);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Validate multiple fields
export const validateFields = (
  data: Record<string, any>,
  schema: Record<string, ValidationRule[]>
): Record<string, ValidationResult> => {
  const results: Record<string, ValidationResult> = {};

  for (const [field, rules] of Object.entries(schema)) {
    results[field] = validate(data[field], rules);
  }

  return results;
};

// Check if all validations passed
export const isFormValid = (validationResults: Record<string, ValidationResult>): boolean => {
  return Object.values(validationResults).every(result => result.isValid);
};

// Get all error messages from validation results
export const getFormErrors = (validationResults: Record<string, ValidationResult>): string[] => {
  const allErrors: string[] = [];
  
  for (const result of Object.values(validationResults)) {
    allErrors.push(...result.errors);
  }
  
  return allErrors;
};

// Sanitize input to prevent XSS
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

// Form validation schemas for common forms
export const FormSchemas = {
  loginForm: {
    email: [ValidationRules.required(), ValidationRules.email()],
    password: [ValidationRules.required(), ValidationRules.minLength(6)],
  },

  contactForm: {
    name: [ValidationRules.required(), ValidationRules.minLength(2), ValidationRules.maxLength(100)],
    email: [ValidationRules.required(), ValidationRules.email()],
    phone: [ValidationRules.phone()], // Optional
    subject: [ValidationRules.required()],
    message: [ValidationRules.required(), ValidationRules.minLength(10), ValidationRules.maxLength(1000)],
  },

  categoryForm: {
    name: [ValidationRules.required(), ValidationRules.minLength(2), ValidationRules.maxLength(50)],
    description: [ValidationRules.required(), ValidationRules.minLength(10), ValidationRules.maxLength(200)],
    image: [
      ValidationRules.fileType(['image/jpeg', 'image/png', 'image/webp'], 'Please upload a valid image file (JPEG, PNG, or WebP)'),
      ValidationRules.fileSize(5, 'Image must be smaller than 5MB'),
    ],
  },

  productForm: {
    name: [ValidationRules.required(), ValidationRules.minLength(2), ValidationRules.maxLength(100)],
    description: [ValidationRules.required(), ValidationRules.minLength(10), ValidationRules.maxLength(500)],
    price: [ValidationRules.required(), ValidationRules.minValue(0.01)],
    category: [ValidationRules.required()],
    image: [
      ValidationRules.fileType(['image/jpeg', 'image/png', 'image/webp'], 'Please upload a valid image file (JPEG, PNG, or WebP)'),
      ValidationRules.fileSize(5, 'Image must be smaller than 5MB'),
    ],
  },
};
