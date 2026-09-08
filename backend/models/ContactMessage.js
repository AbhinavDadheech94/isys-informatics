const mongoose = require('mongoose');

const contactMessageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true
  },
  company: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  subject: {
    type: String,
    required: [true, 'Please provide subject'],
    trim: true
  },
  message: {
    type: String,
    required: [true, 'Please provide message'],
    trim: true
  },
  status: {
    type: String,
    enum: ['New', 'Read', 'Replied', 'Closed'],
    default: 'New'
  },
  adminNotes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('ContactMessage', contactMessageSchema);
