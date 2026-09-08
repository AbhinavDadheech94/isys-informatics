const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const {
  createServiceRequest,
  getMyServiceRequests,
  getAllServiceRequests,
  getServiceRequestById,
  updateServiceRequest,
  deleteServiceRequest,
  getTechnicians
} = require('../controllers/serviceRequestController');
const { protect, admin, technician } = require('../middleware/auth');
const upload = require('../utils/upload');

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

// Protected routes
router.post('/', protect, upload.single('attachment'), [
  body('requestType').notEmpty().withMessage('Request type is required'),
  body('subject').trim().notEmpty().withMessage('Subject is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('phone').trim().notEmpty().withMessage('Phone is required'),
  body('address').trim().notEmpty().withMessage('Address is required'),
  validateRequest
], createServiceRequest);

router.get('/my', protect, getMyServiceRequests);

// Technician routes
router.get('/technicians', protect, admin, getTechnicians);
router.get('/assigned', protect, technician, getMyServiceRequests);
router.get('/:id', protect, getServiceRequestById);
router.put('/:id', protect, [
  body('status').optional().isIn(['Open', 'Assigned', 'In Progress', 'On Hold', 'Resolved', 'Closed'])
    .withMessage('Invalid status'),
  body('priority').optional().isIn(['Low', 'Medium', 'High', 'Urgent'])
    .withMessage('Invalid priority'),
  validateRequest
], updateServiceRequest);

// Admin routes
router.get('/', protect, admin, getAllServiceRequests);
router.delete('/:id', protect, admin, deleteServiceRequest);

module.exports = router;
