const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { upload, handleMulterError } = require('../middleware/upload');
const { authenticateAdmin } = require('../middleware/auth');

// Get all products
router.get('/', productController.getAllProducts);

// Get products by category
router.get('/category/:categoryId', productController.getProductsByCategory);

// Get single product by ID
router.get('/:id', productController.getProductById);

// Create new product
router.post('/', authenticateAdmin, upload.single('image'), handleMulterError, productController.createProduct);

// Update product
router.put('/:id', authenticateAdmin, upload.single('image'), handleMulterError, productController.updateProduct);

// Delete product
router.delete('/:id', authenticateAdmin, productController.deleteProduct);

module.exports = router;
