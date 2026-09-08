const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a service name'],
    trim: true
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  shortDescription: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  image: {
    type: String
  },
  icon: {
    type: String
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Auto-generate slug from name before saving
serviceSchema.pre('save', function(next) {
  if (this.isModified('name') && !this.slug) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  }
  next();
});

module.exports = mongoose.model('Service', serviceSchema);
