const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  },
  companyName: {
    type: String,
    trim: true
  },
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Please provide your phone'],
    trim: true
  },
  quantity: {
    type: String,
    trim: true
  },
  requirement: {
    type: String,
    trim: true
  },
  city: {
    type: String,
    trim: true
  },
  state: {
    type: String,
    trim: true
  },
  message: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['New', 'Contacted', 'Quotation Sent', 'In Discussion', 'Converted', 'Closed'],
    default: 'New'
  },
  adminNotes: {
    type: String,
    trim: true
  },
  timeline: [{
    status: String,
    note: String,
    date: {
      type: Date,
      default: Date.now
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Enquiry', enquirySchema);
