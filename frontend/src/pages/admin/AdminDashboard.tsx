import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { fetchCategories, createCategory, updateCategory, deleteCategory } from '../../store/categorySlice';
import AdminHeader from '../../components/AdminHeader';
import { motion } from 'framer-motion';

const AdminDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories } = useSelector((state: RootState) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleAddCategory = () => {
    const newCategory = prompt('Enter new category name:');
    if (newCategory) {
      const formData = new FormData();
      formData.append('name', newCategory);
      formData.append('description', '');
      dispatch(createCategory(formData));
    }
  };

  const handleUpdateCategory = (id: string) => {
    const updatedName = prompt('Enter new category name:');
    if (updatedName) {
      const formData = new FormData();
      formData.append('name', updatedName);
      formData.append('description', '');
      dispatch(updateCategory({ id, categoryData: formData }));
    }
  };

  const handleDeleteCategory = (id: string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      dispatch(deleteCategory(id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />

      <section className="py-16">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
            <button onClick={handleAddCategory} className="btn-primary">
              Add Category
            </button>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <ul>
              {categories.map((category) => (
                <motion.li
                  key={category._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="block px-4 py-2 hover:bg-gray-50 border-b border-gray-200"
                >
                  <div className="flex justify-between items-center">
                    <span>{category.name}</span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleUpdateCategory(category._id)}
                        className="text-blue-500 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category._id)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;

