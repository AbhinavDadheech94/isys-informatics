const ContactMessage = require('../models/ContactMessage');

// @desc    Create contact message
// @route   POST /api/contact
// @access  Public
exports.createContactMessage = async (req, res) => {
  try {
    const { name, company, email, phone, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, subject and message'
      });
    }

    const contactMessage = await ContactMessage.create({
      name,
      company,
      email,
      phone,
      subject,
      message
    });

    res.status(201).json({
      success: true,
      message: 'Contact message sent successfully',
      contactMessage
    });
  } catch (error) {
    console.error('Create contact message error:', error);
    res.status(500).json({
      success: false,
      message: 'Error sending contact message',
      error: error.message
    });
  }
};

// @desc    Get all contact messages (Admin)
// @route   GET /api/contact
// @access  Private/Admin
exports.getAllContactMessages = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;

    let query = {};

    if (status) {
      query.status = status;
    }

    const contactMessages = await ContactMessage.find(query)
      .sort('-createdAt')
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await ContactMessage.countDocuments(query);

    res.status(200).json({
      success: true,
      count: contactMessages.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      contactMessages
    });
  } catch (error) {
    console.error('Get all contact messages error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching contact messages',
      error: error.message
    });
  }
};

// @desc    Get single contact message
// @route   GET /api/contact/:id
// @access  Private/Admin
exports.getContactMessageById = async (req, res) => {
  try {
    const contactMessage = await ContactMessage.findById(req.params.id);

    if (!contactMessage) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }

    res.status(200).json({
      success: true,
      contactMessage
    });
  } catch (error) {
    console.error('Get contact message error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching contact message',
      error: error.message
    });
  }
};

// @desc    Update contact message status
// @route   PUT /api/contact/:id
// @access  Private/Admin
exports.updateContactMessage = async (req, res) => {
  try {
    const { status, adminNotes } = req.body;

    const contactMessage = await ContactMessage.findById(req.params.id);

    if (!contactMessage) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }

    if (status) contactMessage.status = status;
    if (adminNotes) contactMessage.adminNotes = adminNotes;

    await contactMessage.save();

    res.status(200).json({
      success: true,
      message: 'Contact message updated successfully',
      contactMessage
    });
  } catch (error) {
    console.error('Update contact message error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating contact message',
      error: error.message
    });
  }
};

// @desc    Delete contact message
// @route   DELETE /api/contact/:id
// @access  Private/Admin
exports.deleteContactMessage = async (req, res) => {
  try {
    const contactMessage = await ContactMessage.findById(req.params.id);

    if (!contactMessage) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }

    await contactMessage.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Contact message deleted successfully'
    });
  } catch (error) {
    console.error('Delete contact message error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting contact message',
      error: error.message
    });
  }
};
