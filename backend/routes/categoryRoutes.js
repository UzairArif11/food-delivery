const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { upload, handleMulterError } = require('../middleware/upload');
const { authenticateAdmin } = require('../middleware/auth');

// Get all categories
router.get('/', categoryController.getAllCategories);

// Get single category by ID
router.get('/:id', categoryController.getCategoryById);

// Create new category
router.post('/', authenticateAdmin, upload.single('image'), handleMulterError, categoryController.createCategory);

// Update category
router.put('/:id', authenticateAdmin, upload.single('image'), handleMulterError, categoryController.updateCategory);

// Delete category
router.delete('/:id', authenticateAdmin, categoryController.deleteCategory);

module.exports = router;

