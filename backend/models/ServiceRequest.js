const mongoose = require('mongoose');

const serviceRequestSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide customer']
  },
  requestType: {
    type: String,
    enum: ['Installation Request', 'AMC Request', 'Repair Request', 'Maintenance Request', 'Product Support', 'Site Visit Request', 'Other'],
    required: [true, 'Please provide request type']
  },
  product: {
    type: String,
    trim: true
  },
  subject: {
    type: String,
    required: [true, 'Please provide subject'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide description'],
    trim: true
  },
  preferredDate: {
    type: Date
  },
  phone: {
    type: String,
    required: [true, 'Please provide phone'],
    trim: true
  },
  address: {
    type: String,
    required: [true, 'Please provide address'],
    trim: true
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Urgent'],
    default: 'Medium'
  },
  attachment: {
    type: String
  },
  status: {
    type: String,
    enum: ['Open', 'Assigned', 'In Progress', 'On Hold', 'Resolved', 'Closed'],
    default: 'Open'
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  estimatedCompletionDate: {
    type: Date
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

module.exports = mongoose.model('ServiceRequest', serviceRequestSchema);
