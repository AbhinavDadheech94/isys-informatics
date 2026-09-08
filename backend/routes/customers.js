const express = require('express');
const router = express.Router();
const {
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer
} = require('../controllers/customerController');
const { protect, admin } = require('../middleware/auth');

// Admin routes
router.get('/', protect, admin, getAllCustomers);
router.get('/:id', protect, admin, getCustomerById);
router.put('/:id', protect, admin, updateCustomer);
router.delete('/:id', protect, admin, deleteCustomer);

module.exports = router;
