const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const {
  getServices,
  getServiceBySlug,
  createService,
  updateService,
  deleteService,
  getAllServices
} = require('../controllers/serviceController');
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

// Public routes
router.get('/', getServices);
router.get('/:slug', getServiceBySlug);

// Admin routes
router.get('/all/all', protect, admin, getAllServices);
router.post('/', protect, admin, upload.single('image'), [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('slug').trim().notEmpty().withMessage('Slug is required'),
  validateRequest
], createService);

router.put('/:id', protect, admin, upload.single('image'), [
  body('name').optional().trim().notEmpty().withMessage('Name is required'),
  body('slug').optional().trim().notEmpty().withMessage('Slug is required'),
  validateRequest
], updateService);

router.delete('/:id', protect, admin, deleteService);

module.exports = router;
