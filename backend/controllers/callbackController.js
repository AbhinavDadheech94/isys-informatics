const CallbackRequest = require('../models/CallbackRequest');

// @desc    Create callback request
// @route   POST /api/callback
// @access  Public
exports.createCallbackRequest = async (req, res) => {
  try {
    const { name, company, phone, email, preferredTime, requirement } = req.body;

    // Validation
    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name and phone'
      });
    }

    const callbackRequest = await CallbackRequest.create({
      name,
      company,
      phone,
      email,
      preferredTime,
      requirement
    });

    res.status(201).json({
      success: true,
      message: 'Callback request submitted successfully',
      callbackRequest
    });
  } catch (error) {
    console.error('Create callback request error:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting callback request',
      error: error.message
    });
  }
};

// @desc    Get all callback requests (Admin)
// @route   GET /api/callback
// @access  Private/Admin
exports.getAllCallbackRequests = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;

    let query = {};

    if (status) {
      query.status = status;
    }

    const callbackRequests = await CallbackRequest.find(query)
      .sort('-createdAt')
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await CallbackRequest.countDocuments(query);

    res.status(200).json({
      success: true,
      count: callbackRequests.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      callbackRequests
    });
  } catch (error) {
    console.error('Get all callback requests error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching callback requests',
      error: error.message
    });
  }
};

// @desc    Get single callback request
// @route   GET /api/callback/:id
// @access  Private/Admin
exports.getCallbackRequestById = async (req, res) => {
  try {
    const callbackRequest = await CallbackRequest.findById(req.params.id);

    if (!callbackRequest) {
      return res.status(404).json({
        success: false,
        message: 'Callback request not found'
      });
    }

    res.status(200).json({
      success: true,
      callbackRequest
    });
  } catch (error) {
    console.error('Get callback request error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching callback request',
      error: error.message
    });
  }
};

// @desc    Update callback request
// @route   PUT /api/callback/:id
// @access  Private/Admin
exports.updateCallbackRequest = async (req, res) => {
  try {
    const { status, adminNotes } = req.body;

    const callbackRequest = await CallbackRequest.findById(req.params.id);

    if (!callbackRequest) {
      return res.status(404).json({
        success: false,
        message: 'Callback request not found'
      });
    }

    if (status) callbackRequest.status = status;
    if (adminNotes) callbackRequest.adminNotes = adminNotes;

    await callbackRequest.save();

    res.status(200).json({
      success: true,
      message: 'Callback request updated successfully',
      callbackRequest
    });
  } catch (error) {
    console.error('Update callback request error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating callback request',
      error: error.message
    });
  }
};

// @desc    Delete callback request
// @route   DELETE /api/callback/:id
// @access  Private/Admin
exports.deleteCallbackRequest = async (req, res) => {
  try {
    const callbackRequest = await CallbackRequest.findById(req.params.id);

    if (!callbackRequest) {
      return res.status(404).json({
        success: false,
        message: 'Callback request not found'
      });
    }

    await callbackRequest.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Callback request deleted successfully'
    });
  } catch (error) {
    console.error('Delete callback request error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting callback request',
      error: error.message
    });
  }
};
