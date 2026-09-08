const Enquiry = require('../models/Enquiry');
const Product = require('../models/Product');

// @desc    Create new enquiry
// @route   POST /api/enquiries
// @access  Public
exports.createEnquiry = async (req, res) => {
  try {
    const {
      product,
      companyName,
      name,
      email,
      phone,
      quantity,
      requirement,
      city,
      state,
      message
    } = req.body;

    // Validation
    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email and phone'
      });
    }

    // Validate product if provided
    if (product) {
      const productExists = await Product.findById(product);
      if (!productExists) {
        return res.status(400).json({
          success: false,
          message: 'Invalid product'
        });
      }
    }

    const enquiryData = {
      product,
      companyName,
      name,
      email,
      phone,
      quantity,
      requirement,
      city,
      state,
      message
    };

    // Add customer if logged in
    if (req.user && req.user.id) {
      enquiryData.customer = req.user.id;
    }

    const enquiry = await Enquiry.create(enquiryData);

    const populatedEnquiry = await Enquiry.findById(enquiry._id)
      .populate('customer', 'name email companyName')
      .populate('product', 'name slug');

    res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully',
      enquiry: populatedEnquiry
    });
  } catch (error) {
    console.error('Create enquiry error:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting enquiry',
      error: error.message
    });
  }
};

// @desc    Get my enquiries
// @route   GET /api/enquiries/my
// @access  Private
exports.getMyEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find({ customer: req.user.id })
      .populate('product', 'name slug image')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: enquiries.length,
      enquiries
    });
  } catch (error) {
    console.error('Get my enquiries error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching enquiries',
      error: error.message
    });
  }
};

// @desc    Get all enquiries (Admin)
// @route   GET /api/enquiries
// @access  Private/Admin
exports.getAllEnquiries = async (req, res) => {
  try {
    const { status, category, date, search, page = 1, limit = 20 } = req.query;

    let query = {};

    if (status) {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { companyName: { $regex: search, $options: 'i' } }
      ];
    }

    const enquiries = await Enquiry.find(query)
      .populate('customer', 'name email companyName phone')
      .populate('product', 'name slug')
      .sort('-createdAt')
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Enquiry.countDocuments(query);

    res.status(200).json({
      success: true,
      count: enquiries.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      enquiries
    });
  } catch (error) {
    console.error('Get all enquiries error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching enquiries',
      error: error.message
    });
  }
};

// @desc    Get single enquiry
// @route   GET /api/enquiries/:id
// @access  Private/Admin
exports.getEnquiryById = async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id)
      .populate('customer', 'name email companyName phone city state address')
      .populate('product', 'name slug description image category')
      .populate('timeline.updatedBy', 'name role');

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found'
      });
    }

    res.status(200).json({
      success: true,
      enquiry
    });
  } catch (error) {
    console.error('Get enquiry error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching enquiry',
      error: error.message
    });
  }
};

// @desc    Update enquiry status
// @route   PUT /api/enquiries/:id/status
// @access  Private/Admin
exports.updateEnquiryStatus = async (req, res) => {
  try {
    const { status, adminNotes } = req.body;

    const enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found'
      });
    }

    const oldStatus = enquiry.status;
    enquiry.status = status;
    enquiry.adminNotes = adminNotes;

    // Add timeline entry
    enquiry.timeline.push({
      status,
      note: adminNotes || `Status changed from ${oldStatus} to ${status}`,
      updatedBy: req.user.id
    });

    await enquiry.save();

    const populatedEnquiry = await Enquiry.findById(enquiry._id)
      .populate('customer', 'name email companyName')
      .populate('product', 'name slug')
      .populate('timeline.updatedBy', 'name role');

    res.status(200).json({
      success: true,
      message: 'Enquiry status updated successfully',
      enquiry: populatedEnquiry
    });
  } catch (error) {
    console.error('Update enquiry status error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating enquiry status',
      error: error.message
    });
  }
};

// @desc    Delete enquiry
// @route   DELETE /api/enquiries/:id
// @access  Private/Admin
exports.deleteEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found'
      });
    }

    await enquiry.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Enquiry deleted successfully'
    });
  } catch (error) {
    console.error('Delete enquiry error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting enquiry',
      error: error.message
    });
  }
};
