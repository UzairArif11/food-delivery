import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import apiService from '../api';

export interface Contact {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'pending' | 'in-progress' | 'resolved';
  createdAt: string;
  updatedAt?: string;
}

interface ContactState {
  contacts: Contact[];
  loading: boolean;
  error: string | null;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalContacts: number;
    limit: number;
  };
}

const initialState: ContactState = {
  contacts: [],
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalContacts: 0,
    limit: 10,
  },
};

// Async thunks
export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (params: { page?: number; limit?: number; status?: string; search?: string } = {}) => {
    const { page = 1, limit = 10, status, search } = params;
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    
    if (status) queryParams.append('status', status);
    if (search) queryParams.append('search', search);

    return await apiService.get(`/contacts?${queryParams}`);
   
  }
);

export const updateContactStatus = createAsyncThunk(
  'contacts/updateStatus',
  async ({ id, status }: { id: string; status: 'pending' | 'in-progress' | 'resolved' }) => {
   return await apiService.put(`${process.env.NEXT_PUBLIC_API_URL}/contacts/${id}`,status );
    
  } 
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id: string) => {
  return await apiService.delete(`${process.env.NEXT_PUBLIC_API_URL}/contacts/${id}`);
    
  }
);

const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearContacts: (state) => {
      state.contacts = [];
      state.pagination = initialState.pagination;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch contacts
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload.contacts|| [];
        state.pagination = {
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages,
          totalContacts: action.payload.totalContacts,
          limit: action.payload.limit,
        };
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch contacts';
      })
      
      // Update contact status
      .addCase(updateContactStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateContactStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.contacts.findIndex(contact => contact._id === action.payload._id);
        if (index !== -1) {
          state.contacts[index] = action.payload;
        }
      })
      .addCase(updateContactStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update contact status';
      })
      
      // Delete contact
      .addCase(deleteContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = state.contacts.filter(contact => contact._id !== action.payload);
        state.pagination.totalContacts -= 1;
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete contact';
      });
  },
});

export const { setError, clearContacts } = contactSlice.actions;
export default contactSlice.reducer;
