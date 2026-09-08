const ServiceRequest = require('../models/ServiceRequest');
const User = require('../models/User');

// @desc    Get all technicians
// @route   GET /api/service-requests/technicians
// @access  Private/Admin
exports.getTechnicians = async (req, res) => {
  try {
    const technicians = await User.find({ role: 'technician', isActive: true })
      .select('name email phone city state isActive');

    res.status(200).json({
      success: true,
      technicians
    });
  } catch (error) {
    console.error('Get technicians error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching technicians',
      error: error.message
    });
  }
};

// @desc    Create new service request
// @route   POST /api/service-requests
// @access  Private
exports.createServiceRequest = async (req, res) => {
  try {
    const {
      requestType,
      product,
      subject,
      description,
      preferredDate,
      phone,
      address,
      priority,
      attachment
    } = req.body;

    // Validation
    if (!requestType || !subject || !description || !phone || !address) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    const serviceRequestData = {
      customer: req.user.id,
      requestType,
      product,
      subject,
      description,
      preferredDate,
      phone,
      address,
      priority: priority || 'Medium',
      attachment: req.file ? (() => {
        const fs = require('fs');
        const path = require('path');
        const uploadDir = path.resolve(__dirname, '../../image-uploads');
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const filename = req.file.fieldname + '-' + uniqueSuffix + path.extname(req.file.originalname);
        const filePath = path.join(uploadDir, filename);
        fs.writeFileSync(filePath, req.file.buffer);
        return `/image-uploads/${filename}`;
      })() : attachment
    };

    const serviceRequest = await ServiceRequest.create(serviceRequestData);

    const populatedRequest = await ServiceRequest.findById(serviceRequest._id)
      .populate('customer', 'name email companyName phone');

    res.status(201).json({
      success: true,
      message: 'Service request submitted successfully',
      serviceRequest: populatedRequest
    });
  } catch (error) {
    console.error('Create service request error:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting service request',
      error: error.message
    });
  }
};

// @desc    Get my service requests
// @route   GET /api/service-requests/my
// @access  Private
exports.getMyServiceRequests = async (req, res) => {
  try {
    let query = {};

    // If user is customer, show their requests
    if (req.user.role === 'customer') {
      query.customer = req.user.id;
    }
    // If user is technician, show requests assigned to them
    else if (req.user.role === 'technician') {
      query.assignedTo = req.user.id;
    }

    const serviceRequests = await ServiceRequest.find(query)
      .populate('customer', 'name email companyName phone')
      .populate('assignedTo', 'name email')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: serviceRequests.length,
      serviceRequests
    });
  } catch (error) {
    console.error('Get my service requests error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching service requests',
      error: error.message
    });
  }
};

// @desc    Get all service requests (Admin)
// @route   GET /api/service-requests
// @access  Private/Admin
exports.getAllServiceRequests = async (req, res) => {
  try {
    const { status, priority, page = 1, limit = 20 } = req.query;

    let query = {};

    if (status) {
      query.status = status;
    }

    if (priority) {
      query.priority = priority;
    }

    const serviceRequests = await ServiceRequest.find(query)
      .populate('customer', 'name email companyName phone')
      .populate('assignedTo', 'name email')
      .sort('-createdAt')
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await ServiceRequest.countDocuments(query);

    res.status(200).json({
      success: true,
      count: serviceRequests.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      serviceRequests
    });
  } catch (error) {
    console.error('Get all service requests error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching service requests',
      error: error.message
    });
  }
};

// @desc    Get single service request
// @route   GET /api/service-requests/:id
// @access  Private/Admin
exports.getServiceRequestById = async (req, res) => {
  try {
    const serviceRequest = await ServiceRequest.findById(req.params.id)
      .populate('customer', 'name email companyName phone city state address')
      .populate('assignedTo', 'name email')
      .populate('timeline.updatedBy', 'name role');

    if (!serviceRequest) {
      return res.status(404).json({
        success: false,
        message: 'Service request not found'
      });
    }

    res.status(200).json({
      success: true,
      serviceRequest
    });
  } catch (error) {
    console.error('Get service request error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching service request',
      error: error.message
    });
  }
};

// @desc    Update service request
// @route   PUT /api/service-requests/:id
// @access  Private/Admin
exports.updateServiceRequest = async (req, res) => {
  try {
    const {
      status,
      assignedTo,
      estimatedCompletionDate,
      adminNotes,
      priority
    } = req.body;

    const serviceRequest = await ServiceRequest.findById(req.params.id);

    if (!serviceRequest) {
      return res.status(404).json({
        success: false,
        message: 'Service request not found'
      });
    }

    const oldStatus = serviceRequest.status;

    if (status) serviceRequest.status = status;
    if (assignedTo) {
      serviceRequest.assignedTo = assignedTo;
      // Auto-change status to Assigned if technician is assigned and status is Open
      if (serviceRequest.status === 'Open') {
        serviceRequest.status = 'Assigned';
      }
    }
    if (estimatedCompletionDate) serviceRequest.estimatedCompletionDate = estimatedCompletionDate;
    if (adminNotes) serviceRequest.adminNotes = adminNotes;
    if (priority) serviceRequest.priority = priority;

    // Add timeline entry if status changed
    if (serviceRequest.status !== oldStatus) {
      serviceRequest.timeline.push({
        status: serviceRequest.status,
        note: adminNotes || `Status changed from ${oldStatus} to ${serviceRequest.status}`,
        updatedBy: req.user.id
      });
    }

    await serviceRequest.save();

    const populatedRequest = await ServiceRequest.findById(serviceRequest._id)
      .populate('customer', 'name email companyName')
      .populate('assignedTo', 'name email')
      .populate('timeline.updatedBy', 'name role');

    res.status(200).json({
      success: true,
      message: 'Service request updated successfully',
      serviceRequest: populatedRequest
    });
  } catch (error) {
    console.error('Update service request error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating service request',
      error: error.message
    });
  }
};

// @desc    Delete service request
// @route   DELETE /api/service-requests/:id
// @access  Private/Admin
exports.deleteServiceRequest = async (req, res) => {
  try {
    const serviceRequest = await ServiceRequest.findById(req.params.id);

    if (!serviceRequest) {
      return res.status(404).json({
        success: false,
        message: 'Service request not found'
      });
    }

    await serviceRequest.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Service request deleted successfully'
    });
  } catch (error) {
    console.error('Delete service request error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting service request',
      error: error.message
    });
  }
};
