const express = require('express');
const router = express.Router();
const { authenticateAdmin } = require('../middleware/auth');
const {
  createContact,
  getAllContacts,
  getContact,
  updateContactStatus,
  deleteContact
} = require('../controllers/contactController');

// Public routes
router.post('/', createContact);

// Protected routes (Admin only)
router.get('/', authenticateAdmin, getAllContacts);
router.get('/:id', authenticateAdmin, getContact);
router.put('/:id', authenticateAdmin, updateContactStatus);
router.delete('/:id', authenticateAdmin, deleteContact);

module.exports = router;
