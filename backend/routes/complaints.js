const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const {
  createComplaint,
  getMyComplaints,
  getAllComplaints,
  getComplaintById,
  updateComplaint,
  deleteComplaint
} = require('../controllers/complaintController');
const { protect, admin } = require('../middleware/auth');
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
  body('subject').trim().notEmpty().withMessage('Subject is required'),
  body('complaintType').notEmpty().withMessage('Complaint type is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  validateRequest
], createComplaint);

router.get('/my', protect, getMyComplaints);

// Admin routes
router.get('/', protect, admin, getAllComplaints);
router.get('/:id', protect, admin, getComplaintById);
router.put('/:id', protect, admin, [
  body('status').optional().isIn(['Open', 'Under Review', 'In Progress', 'Resolved', 'Closed'])
    .withMessage('Invalid status'),
  body('priority').optional().isIn(['Low', 'Medium', 'High', 'Urgent'])
    .withMessage('Invalid priority'),
  validateRequest
], updateComplaint);
router.delete('/:id', protect, admin, deleteComplaint);

module.exports = router;
