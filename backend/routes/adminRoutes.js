const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticateAdmin } = require('../middleware/auth');

// Admin login
router.post('/login', adminController.loginAdmin);

// Create admin (for initial setup)
router.post('/create', adminController.createAdmin);

// Get admin profile
router.get('/profile', authenticateAdmin, adminController.getAdminProfile);

// Update admin profile
router.put('/profile', authenticateAdmin, adminController.updateAdminProfile);

// Change password
router.post('/change-password', authenticateAdmin, adminController.changePassword);

module.exports = router;
