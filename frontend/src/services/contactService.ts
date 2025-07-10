import api from './api';

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    name: string;
    email: string;
    subject: string;
    createdAt: string;
  };
  errors?: string[];
}

class ContactService {
  async submitContactForm(contactData: ContactFormData): Promise<ContactResponse> {
    try {
      const response: any = await api.post('/contacts', contactData);
      return response; // The api service already returns response.data
    } catch (error: any) {
      // Handle validation errors or server errors
      if (error.response?.data) {
        return error.response.data;
      }
      
      // Generic error handling
      return {
        success: false,
        message: 'Failed to submit contact form. Please try again later.',
        errors: ['Network error or server unavailable']
      };
    }
  }

  // Admin methods (require authentication)
  async getAllContacts(params?: {
    page?: number;
    limit?: number;
    status?: string;
    subject?: string;
  }): Promise<any> {
    try {
      const response: any = await api.get('/contacts', { params });
      return response; // The api service already returns response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch contacts');
    }
  }

  async getContact(id: string): Promise<any> {
    try {
      const response: any = await api.get(`/contacts/${id}`);
      return response; // The api service already returns response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch contact');
    }
  }

  async updateContactStatus(id: string, status: string): Promise<any> {
    try {
      const response: any = await api.put(`/contacts/${id}`, { status });
      return response; // The api service already returns response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update contact status');
    }
  }

  async deleteContact(id: string): Promise<any> {
    try {
      const response: any = await api.delete(`/contacts/${id}`);
      return response; // The api service already returns response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to delete contact');
    }
  }
}

const contactService = new ContactService();
export default contactService;
