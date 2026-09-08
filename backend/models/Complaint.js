const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide customer']
  },
  subject: {
    type: String,
    required: [true, 'Please provide subject'],
    trim: true
  },
  complaintType: {
    type: String,
    enum: ['Product Issue', 'Service Issue', 'Quality Issue', 'Delivery Issue', 'Billing Issue', 'Other'],
    required: [true, 'Please provide complaint type']
  },
  product: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide description'],
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
  contactInformation: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['Open', 'Under Review', 'In Progress', 'Resolved', 'Closed'],
    default: 'Open'
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

module.exports = mongoose.model('Complaint', complaintSchema);
