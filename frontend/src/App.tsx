import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { store } from './store';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AddCategory from './pages/admin/AddCategory';
import AddProduct from './pages/admin/AddProduct';
import EditCategory from './pages/admin/EditCategory';
import EditProduct from './pages/admin/EditProduct';
import ProtectedRoute from './components/ProtectedRoute';
import 'react-toastify/dist/ReactToastify.css';
import './styles/admin.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/add-category" 
              element={
                <ProtectedRoute>
                  <AddCategory />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/add-product" 
              element={
                <ProtectedRoute>
                  <AddProduct />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/edit-category/:id" 
              element={
                <ProtectedRoute>
                  <EditCategory />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/edit-product/:id" 
              element={
                <ProtectedRoute>
                  <EditProduct />
                </ProtectedRoute>
              } 
            />
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
