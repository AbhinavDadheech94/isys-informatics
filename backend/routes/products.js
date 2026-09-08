const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const {
  getProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
  toggleFeatured,
  toggleActive,
  getAllProducts,
  getFeaturedProducts
} = require('../controllers/productController');
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
router.get('/', getProducts);
router.get('/featured/all', getFeaturedProducts);
router.get('/:slug', getProductBySlug);

// Admin routes
router.get('/all/all', protect, admin, getAllProducts);
router.post('/', protect, admin, upload.single('image'), createProduct);
router.put('/:id', protect, admin, upload.single('image'), updateProduct);
router.delete('/:id', protect, admin, deleteProduct);
router.put('/:id/featured', protect, admin, toggleFeatured);
router.put('/:id/active', protect, admin, toggleActive);

module.exports = router;
