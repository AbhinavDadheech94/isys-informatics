const mongoose = require('mongoose');

const companySettingsSchema = new mongoose.Schema({
  companyName: {
    type: String,
    default: 'ISYS INFORMATICS'
  },
  address: {
    type: String,
    default: 'CITY CENTER, SANSAR CHANDRA ROAD, JAIPUR, RAJASTHAN - 302001'
  },
  phone: {
    type: String,
    default: '0141-2378454'
  },
  mobile: {
    type: String,
    default: '+91-9414058322'
  },
  email: {
    type: String,
    default: 'info@isysinformatics.com'
  },
  whatsappNumber: {
    type: String,
    default: '+91-9414058322'
  },
  gstNumber: {
    type: String
  },
  aboutText: {
    type: String
  },
  footerText: {
    type: String
  },
  socialMedia: {
    facebook: String,
    twitter: String,
    linkedin: String,
    instagram: String
  },
  logo: {
    type: String
  },
  favicon: {
    type: String
  },
  homepageHero: {
    headline: String,
    subheading: String,
    backgroundImage: String
  },
  homepageCTA: {
    text: String,
    link: String
  },
  certifications: {
    type: String
  },
  googleMapsUrl: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('CompanySettings', companySettingsSchema);
