const mongoose = require('mongoose');

const callbackRequestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true
  },
  company: {
    type: String,
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Please provide your phone'],
    trim: true
  },
  email: {
    type: String,
    trim: true
  },
  preferredTime: {
    type: String,
    trim: true
  },
  requirement: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Called', 'Not Available', 'Follow-up Required', 'Closed'],
    default: 'Pending'
  },
  adminNotes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('CallbackRequest', callbackRequestSchema);
