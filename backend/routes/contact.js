const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const {
  createContactMessage,
  getAllContactMessages,
  getContactMessageById,
  updateContactMessage,
  deleteContactMessage
} = require('../controllers/contactController');
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
  body('subject').trim().notEmpty().withMessage('Subject is required'),
  body('message').trim().notEmpty().withMessage('Message is required'),
  validateRequest
], createContactMessage);

// Admin routes
router.get('/', protect, admin, getAllContactMessages);
router.get('/:id', protect, admin, getContactMessageById);
router.put('/:id', protect, admin, [
  body('status').optional().isIn(['New', 'Read', 'Replied', 'Closed'])
    .withMessage('Invalid status'),
  validateRequest
], updateContactMessage);
router.delete('/:id', protect, admin, deleteContactMessage);

module.exports = router;
