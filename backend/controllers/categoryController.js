const Category = require('../models/Category');

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ active: true })
      .sort({ name: 1 });

    res.status(200).json({
      success: true,
      count: categories.length,
      categories
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching categories',
      error: error.message
    });
  }
};

// @desc    Get single category by slug
// @route   GET /api/categories/:slug
// @access  Public
exports.getCategoryBySlug = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    res.status(200).json({
      success: true,
      category
    });
  } catch (error) {
    console.error('Get category error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching category',
      error: error.message
    });
  }
};

// @desc    Create new category
// @route   POST /api/categories
// @access  Private/Admin
exports.createCategory = async (req, res) => {
  try {
    const { name, description, active } = req.body;
    const fs = require('fs');
    const path = require('path');

    let imagePath = null;

    // Handle file upload manually (memory storage workaround)
    if (req.file) {
      const uploadDir = path.resolve(__dirname, '../../image-uploads');
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const filename = req.file.fieldname + '-' + uniqueSuffix + path.extname(req.file.originalname);
      const filePath = path.join(uploadDir, filename);

      fs.writeFileSync(filePath, req.file.buffer);
      imagePath = `/image-uploads/${filename}`;
    }

    const category = await Category.create({
      name,
      description,
      image: imagePath,
      active
    });

    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      category
    });
  } catch (error) {
    console.error('Create category error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating category',
      error: error.message
    });
  }
};

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private/Admin
exports.updateCategory = async (req, res) => {
  try {
    let category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    const { name, description, active } = req.body;
    const fs = require('fs');
    const path = require('path');

    const updateData = { name, description, active };

    // Handle file upload manually (memory storage workaround)
    if (req.file) {
      const uploadDir = path.resolve(__dirname, '../../image-uploads');
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const filename = req.file.fieldname + '-' + uniqueSuffix + path.extname(req.file.originalname);
      const filePath = path.join(uploadDir, filename);

      fs.writeFileSync(filePath, req.file.buffer);
      updateData.image = `/image-uploads/${filename}`;
    }
    // If no new file uploaded, keep existing image
    else if (category.image) {
      updateData.image = category.image;
    }

    category = await Category.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Category updated successfully',
      category
    });
  } catch (error) {
    console.error('Update category error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating category',
      error: error.message
    });
  }
};

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    await category.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Category deleted successfully'
    });
  } catch (error) {
    console.error('Delete category error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting category',
      error: error.message
    });
  }
};

// @desc    Get all categories (including inactive) - Admin only
// @route   GET /api/categories/all
// @access  Private/Admin
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find()
      .sort({ name: 1 });

    res.status(200).json({
      success: true,
      count: categories.length,
      categories
    });
  } catch (error) {
    console.error('Get all categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching categories',
      error: error.message
    });
  }
};
