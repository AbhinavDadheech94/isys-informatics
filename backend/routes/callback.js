const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const {
  createCallbackRequest,
  getAllCallbackRequests,
  getCallbackRequestById,
  updateCallbackRequest,
  deleteCallbackRequest
} = require('../controllers/callbackController');
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
  body('phone').trim().notEmpty().withMessage('Phone is required'),
  validateRequest
], createCallbackRequest);

// Admin routes
router.get('/', protect, admin, getAllCallbackRequests);
router.get('/:id', protect, admin, getCallbackRequestById);
router.put('/:id', protect, admin, [
  body('status').optional().isIn(['Pending', 'Called', 'Not Available', 'Follow-up Required', 'Closed'])
    .withMessage('Invalid status'),
  validateRequest
], updateCallbackRequest);
router.delete('/:id', protect, admin, deleteCallbackRequest);

module.exports = router;
