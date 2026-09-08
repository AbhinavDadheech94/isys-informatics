const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const {
  createEnquiry,
  getMyEnquiries,
  getAllEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
  deleteEnquiry
} = require('../controllers/enquiryController');
const { protect, admin } = require('../middleware/auth');

// Validation middleware
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: errors.array()
    });
  }
  next();
};

// Public route
router.post('/', [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').trim().notEmpty().withMessage('Phone is required'),
  validateRequest
], createEnquiry);

// Protected routes
router.get('/my', protect, getMyEnquiries);

// Admin routes
router.get('/', protect, admin, getAllEnquiries);
router.get('/:id', protect, admin, getEnquiryById);
router.put('/:id/status', protect, admin, [
  body('status').isIn(['New', 'Contacted', 'Quotation Sent', 'In Discussion', 'Converted', 'Closed'])
    .withMessage('Invalid status'),
  validateRequest
], updateEnquiryStatus);
router.delete('/:id', protect, admin, deleteEnquiry);

module.exports = router;
