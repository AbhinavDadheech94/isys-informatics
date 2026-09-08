const CompanySettings = require('../models/CompanySettings');

// @desc    Get company settings
// @route   GET /api/settings
// @access  Public
exports.getSettings = async (req, res) => {
  try {
    let settings = await CompanySettings.findOne();

    // Create default settings if none exist
    if (!settings) {
      settings = await CompanySettings.create({});
    }

    res.status(200).json({
      success: true,
      settings
    });
  } catch (error) {
    console.error('Get settings error:', error);
    console.error(error.stack);

    res.status(500).json({
      success: false,
      message: 'Error fetching settings',
      error: error.message
    });
  }
};

// @desc    Update company settings
// @route   PUT /api/settings
// @access  Private/Admin
exports.updateSettings = async (req, res) => {
  try {
    let settings = await CompanySettings.findOne();

    // Create default settings if none exist
    if (!settings) {
      settings = await CompanySettings.create({});
    }

    /*
     * Since AdminSettings.jsx uses FormData,
     * nested objects arrive as JSON strings.
     *
     * Example:
     * socialMedia = '{"facebook":"...","twitter":"..."}'
     *
     * Convert them back to objects before saving to MongoDB.
     */

    let socialMedia = req.body.socialMedia;
    let homepageHero = req.body.homepageHero;
    let homepageCTA = req.body.homepageCTA;

    // Parse socialMedia
    if (typeof socialMedia === 'string') {
      try {
        socialMedia = JSON.parse(socialMedia);
      } catch (error) {
        console.error('Invalid socialMedia JSON:', error);
        socialMedia = { facebook: '', twitter: '', linkedin: '', instagram: '' };
      }
    }

    // Parse homepageHero
    if (typeof homepageHero === 'string') {
      try {
        homepageHero = JSON.parse(homepageHero);
      } catch (error) {
        console.error('Invalid homepageHero JSON:', error);
        homepageHero = { headline: '', subheading: '', backgroundImage: '' };
      }
    }

    // Parse homepageCTA
    if (typeof homepageCTA === 'string') {
      try {
        homepageCTA = JSON.parse(homepageCTA);
      } catch (error) {
        console.error('Invalid homepageCTA JSON:', error);
        homepageCTA = { text: '', link: '' };
      }
    }

    /*
     * Update normal fields.
     *
     * hasOwnProperty is used instead of:
     * if (companyName)
     *
     * This allows the admin to intentionally save empty values.
     */

    const fields = [
      'companyName',
      'address',
      'phone',
      'mobile',
      'email',
      'whatsappNumber',
      'gstNumber',
      'aboutText',
      'footerText',
      'favicon',
      'certifications',
      'googleMapsUrl'
    ];

    fields.forEach((field) => {
      if (Object.prototype.hasOwnProperty.call(req.body, field)) {
        settings[field] = req.body[field];
      }
    });

    // Update nested objects only when provided
    if (socialMedia !== undefined) {
      settings.socialMedia = socialMedia;
    }

    if (homepageHero !== undefined) {
      settings.homepageHero = homepageHero;
    }

    if (homepageCTA !== undefined) {
      settings.homepageCTA = homepageCTA;
    }

    // Handle logo file upload
    if (req.file) {
      const fs = require('fs');
      const path = require('path');

      const uploadDir = path.resolve(__dirname, '../../image-uploads');
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const filename = req.file.fieldname + '-' + uniqueSuffix + path.extname(req.file.originalname);
      const filePath = path.join(uploadDir, filename);

      fs.writeFileSync(filePath, req.file.buffer);
      settings.logo = `/image-uploads/${filename}`;
    }

    // If logo URL is provided in FormData and no new file was uploaded
    if (req.body.logo && !req.file) {
      settings.logo = req.body.logo;
    }

    // Save settings
    await settings.save();

    res.status(200).json({
      success: true,
      message: 'Settings updated successfully',
      settings
    });

  } catch (error) {
    console.error('Update settings error:', error);
    console.error(error.stack);

    // Mongoose validation error
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid settings data',
        error: error.message
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error updating settings',
      error: error.message
    });
  }
};