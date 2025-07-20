'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { RootState, AppDispatch } from '@/lib/store';
import { fetchCategories, updateCategory } from '@/lib/slices/categorySlice';
import { Button } from '@/components/ui/button';
import Input from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const EditCategoryPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const id = params?.id as string;

  const { categories, loading } = useSelector((state: RootState) => state.categories);
  const category = categories.find(cat => cat._id === id);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null as File | null
  });

  const [submitting, setSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories.length]);

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || '',
        description: category.description || '',
        image: null
      });
      if (category.image) {
        setPreviewImage(`http://localhost:5000/${category.image.replace(/^\/*/, '')}`);
      }
    }
  }, [category]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.description.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSubmitting(true);
    
    try {
      const updateData = new FormData();
      updateData.append('name', formData.name);
      updateData.append('description', formData.description);
      if (formData.image) {
        console.log('Uploading image:', formData.image);
        updateData.append('image', formData.image);
      }

      await dispatch(updateCategory({ id, formData: updateData })).unwrap();
      toast.success('Category updated successfully!');
      router.push('/admin/dashboard');
    } catch (error) {
      console.error('Error updating category:', error);
      toast.error('Failed to update category');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h1>
          <Button onClick={() => router.push('/admin/dashboard')}>Back to Dashboard</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => router.push('/admin/dashboard')}
                className="text-gray-500 hover:text-gray-700 mr-4"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </button>
              <h1 className="text-xl font-semibold text-gray-900">
                Edit Category
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Category Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter category name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Category Image</Label>
                  <Input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter category description"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
                  rows={4}
                  required
                />
              </div>

              {previewImage && (
                <div className="space-y-2">
                  <Label>Current/Preview Image</Label>
                  <div className="relative w-48 h-48 border-2 border-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={previewImage}
                      alt="Category preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end space-x-4 pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push('/admin/dashboard')}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {submitting ? 'Updating...' : 'Update Category'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCategoryPage;
