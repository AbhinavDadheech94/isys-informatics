const Complaint = require('../models/Complaint');

// @desc    Create new complaint
// @route   POST /api/complaints
// @access  Private
exports.createComplaint = async (req, res) => {
  try {
    const {
      subject,
      complaintType,
      product,
      description,
      priority,
      attachment,
      contactInformation
    } = req.body;

    // Validation
    if (!subject || !complaintType || !description) {
      return res.status(400).json({
        success: false,
        message: 'Please provide subject, complaint type and description'
      });
    }

    let attachmentPath = attachment;
    if (req.file) {
      const fs = require('fs');
      const path = require('path');
      const uploadDir = path.resolve(__dirname, '../../image-uploads');
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const filename = req.file.fieldname + '-' + uniqueSuffix + path.extname(req.file.originalname);
      const filePath = path.join(uploadDir, filename);
      fs.writeFileSync(filePath, req.file.buffer);
      attachmentPath = `/image-uploads/${filename}`;
    }

    const complaintData = {
      customer: req.user.id,
      subject,
      complaintType,
      product,
      description,
      priority: priority || 'Medium',
      attachment: attachmentPath,
      contactInformation
    };

    const complaint = await Complaint.create(complaintData);

    const populatedComplaint = await Complaint.findById(complaint._id)
      .populate('customer', 'name email companyName phone');

    res.status(201).json({
      success: true,
      message: 'Complaint submitted successfully',
      complaint: populatedComplaint
    });
  } catch (error) {
    console.error('Create complaint error:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting complaint',
      error: error.message
    });
  }
};

// @desc    Get my complaints
// @route   GET /api/complaints/my
// @access  Private
exports.getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ customer: req.user.id })
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: complaints.length,
      complaints
    });
  } catch (error) {
    console.error('Get my complaints error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching complaints',
      error: error.message
    });
  }
};

// @desc    Get all complaints (Admin)
// @route   GET /api/complaints
// @access  Private/Admin
exports.getAllComplaints = async (req, res) => {
  try {
    const { status, priority, page = 1, limit = 20 } = req.query;

    let query = {};

    if (status) {
      query.status = status;
    }

    if (priority) {
      query.priority = priority;
    }

    const complaints = await Complaint.find(query)
      .populate('customer', 'name email companyName phone')
      .sort('-createdAt')
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Complaint.countDocuments(query);

    res.status(200).json({
      success: true,
      count: complaints.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      complaints
    });
  } catch (error) {
    console.error('Get all complaints error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching complaints',
      error: error.message
    });
  }
};

// @desc    Get single complaint
// @route   GET /api/complaints/:id
// @access  Private/Admin
exports.getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id)
      .populate('customer', 'name email companyName phone city state address')
      .populate('timeline.updatedBy', 'name role');

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found'
      });
    }

    res.status(200).json({
      success: true,
      complaint
    });
  } catch (error) {
    console.error('Get complaint error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching complaint',
      error: error.message
    });
  }
};

// @desc    Update complaint
// @route   PUT /api/complaints/:id
// @access  Private/Admin
exports.updateComplaint = async (req, res) => {
  try {
    const { status, adminNotes, priority } = req.body;

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found'
      });
    }

    const oldStatus = complaint.status;

    if (status) complaint.status = status;
    if (adminNotes) complaint.adminNotes = adminNotes;
    if (priority) complaint.priority = priority;

    // Add timeline entry if status changed
    if (status && status !== oldStatus) {
      complaint.timeline.push({
        status,
        note: adminNotes || `Status changed from ${oldStatus} to ${status}`,
        updatedBy: req.user.id
      });
    }

    await complaint.save();

    const populatedComplaint = await Complaint.findById(complaint._id)
      .populate('customer', 'name email companyName')
      .populate('timeline.updatedBy', 'name role');

    res.status(200).json({
      success: true,
      message: 'Complaint updated successfully',
      complaint: populatedComplaint
    });
  } catch (error) {
    console.error('Update complaint error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating complaint',
      error: error.message
    });
  }
};

// @desc    Delete complaint
// @route   DELETE /api/complaints/:id
// @access  Private/Admin
exports.deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found'
      });
    }

    await complaint.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Complaint deleted successfully'
    });
  } catch (error) {
    console.error('Delete complaint error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting complaint',
      error: error.message
    });
  }
};
