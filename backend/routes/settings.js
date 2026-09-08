const express = require('express');
const router = express.Router();
const {
  getSettings,
  updateSettings
} = require('../controllers/settingsController');
const { protect, admin } = require('../middleware/auth');
const upload = require('../utils/upload');

// Public routes
router.get('/', getSettings);

// Admin routes
router.put('/', protect, admin, upload.single('logo'), updateSettings);

module.exports = router;
