const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const {
  register,
  login,
  getMe,
  updateProfile,
  changePassword,
  getTechnicians,
  deleteUser
} = require('../controllers/authController');
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

// Public routes
router.post('/register', [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  validateRequest
], register);

router.post('/login', [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
  validateRequest
], login);

// Protected routes
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.put('/change-password', protect, changePassword);

// Admin routes
router.get('/technicians', protect, admin, getTechnicians);
router.delete('/users/:id', protect, admin, deleteUser);

module.exports = router;
