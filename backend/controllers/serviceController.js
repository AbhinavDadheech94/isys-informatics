const Service = require('../models/Service');

// @desc    Get all services
// @route   GET /api/services
// @access  Public
exports.getServices = async (req, res) => {
  try {
    const services = await Service.find({ active: true })
      .sort({ name: 1 });

    res.status(200).json({
      success: true,
      count: services.length,
      services
    });
  } catch (error) {
    console.error('Get services error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching services',
      error: error.message
    });
  }
};

// @desc    Get single service by slug
// @route   GET /api/services/:slug
// @access  Public
exports.getServiceBySlug = async (req, res) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    res.status(200).json({
      success: true,
      service
    });
  } catch (error) {
    console.error('Get service error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching service',
      error: error.message
    });
  }
};

// @desc    Create new service
// @route   POST /api/services
// @access  Private/Admin
exports.createService = async (req, res) => {
  try {
    const { name, shortDescription, description, image, icon, active } = req.body;

    let imagePath = image;
    if (req.file) {
      const fs = require('fs');
      const path = require('path');
      const uploadDir = path.resolve(__dirname, '../../image-uploads');
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const filename = req.file.fieldname + '-' + uniqueSuffix + path.extname(req.file.originalname);
      const filePath = path.join(uploadDir, filename);
      fs.writeFileSync(filePath, req.file.buffer);
      imagePath = `/image-uploads/${filename}`;
    }

    const service = await Service.create({
      name,
      shortDescription,
      description,
      image: imagePath,
      icon,
      active
    });

    res.status(201).json({
      success: true,
      message: 'Service created successfully',
      service
    });
  } catch (error) {
    console.error('Create service error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating service',
      error: error.message
    });
  }
};

// @desc    Update service
// @route   PUT /api/services/:id
// @access  Private/Admin
exports.updateService = async (req, res) => {
  try {
    let service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    const { name, shortDescription, description, image, icon, active } = req.body;

    const updateData = {
      name,
      shortDescription,
      description,
      icon,
      active
    };

    // Add new image if uploaded
    if (req.file) {
      const fs = require('fs');
      const path = require('path');
      const uploadDir = path.resolve(__dirname, '../../image-uploads');
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const filename = req.file.fieldname + '-' + uniqueSuffix + path.extname(req.file.originalname);
      const filePath = path.join(uploadDir, filename);
      fs.writeFileSync(filePath, req.file.buffer);
      updateData.image = `/image-uploads/${filename}`;
    } else if (image) {
      updateData.image = image;
    }

    service = await Service.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Service updated successfully',
      service
    });
  } catch (error) {
    console.error('Update service error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating service',
      error: error.message
    });
  }
};

// @desc    Delete service
// @route   DELETE /api/services/:id
// @access  Private/Admin
exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    await service.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Service deleted successfully'
    });
  } catch (error) {
    console.error('Delete service error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting service',
      error: error.message
    });
  }
};

// @desc    Get all services (including inactive) - Admin only
// @route   GET /api/services/all
// @access  Private/Admin
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find()
      .sort({ name: 1 });

    res.status(200).json({
      success: true,
      count: services.length,
      services
    });
  } catch (error) {
    console.error('Get all services error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching services',
      error: error.message
    });
  }
};
