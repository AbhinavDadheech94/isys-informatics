const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide recipient']
  },
  type: {
    type: String,
    enum: ['enquiry', 'service_request', 'complaint', 'status_update', 'general'],
    required: [true, 'Please provide notification type']
  },
  title: {
    type: String,
    required: [true, 'Please provide title'],
    trim: true
  },
  message: {
    type: String,
    required: [true, 'Please provide message'],
    trim: true
  },
  relatedId: {
    type: mongoose.Schema.Types.ObjectId
  },
  relatedModel: {
    type: String
  },
  read: {
    type: Boolean,
    default: false
  },
  readAt: {
    type: Date
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Notification', notificationSchema);
