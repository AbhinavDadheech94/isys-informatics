const Product = require('../models/Product');
const Category = require('../models/Category');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
exports.getProducts = async (req, res) => {
  try {
    const { category, featured, search, sort = '-createdAt', page = 1, limit = 12 } = req.query;

    // Build query
    let query = { active: true };

    if (category) {
      const categoryDoc = await Category.findOne({ slug: category });
      if (categoryDoc) {
        query.category = categoryDoc._id;
      }
    }

    if (featured === 'true') {
      query.featured = true;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    // Execute query
    const products = await Product.find(query)
      .populate('category', 'name slug')
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Product.countDocuments(query);

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      products
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching products',
      error: error.message
    });
  }
};

// @desc    Get single product by slug
// @route   GET /api/products/:slug
// @access  Public
exports.getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .populate('category', 'name slug description');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Get related products from same category
    const relatedProducts = await Product.find({
      category: product.category,
      _id: { $ne: product._id },
      active: true
    })
      .populate('category', 'name slug')
      .limit(6);

    res.status(200).json({
      success: true,
      product,
      relatedProducts
    });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching product',
      error: error.message
    });
  }
};

// @desc    Create new product
// @route   POST /api/products
// @access  Private/Admin
exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      sku,
      category,
      shortDescription,
      description,
      specifications,
      featured,
      active,
      enquiryEnabled,
      tags
    } = req.body;

    // Validate category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({
        success: false,
        message: 'Invalid category'
      });
    }

    const fs = require('fs');
    const path = require('path');

    let imagePath = '';

    // Handle file upload manually (memory storage workaround)
    if (req.file) {
      const uploadDir = path.resolve(__dirname, '../../image-uploads');
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const filename = req.file.fieldname + '-' + uniqueSuffix + path.extname(req.file.originalname);
      const filePath = path.join(uploadDir, filename);

      fs.writeFileSync(filePath, req.file.buffer);
      imagePath = `/image-uploads/${filename}`;
    }

    const product = await Product.create({
      name,
      sku,
      category,
      shortDescription,
      description,
      specifications,
      image: imagePath,
      additionalImages: req.body.additionalImages || [],
      featured: featured || false,
      active: active !== undefined ? active : true,
      enquiryEnabled: enquiryEnabled !== undefined ? enquiryEnabled : true,
      tags: tags || []
    });

    const populatedProduct = await Product.findById(product._id).populate('category', 'name slug');

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product: populatedProduct
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating product',
      error: error.message
    });
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
exports.updateProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const {
      name,
      sku,
      category,
      shortDescription,
      description,
      specifications,
      featured,
      active,
      enquiryEnabled,
      tags,
      additionalImages
    } = req.body;

    // Validate category if provided
    if (category) {
      const categoryExists = await Category.findById(category);
      if (!categoryExists) {
        return res.status(400).json({
          success: false,
          message: 'Invalid category'
        });
      }
    }

    const updateData = {
      name,
      sku,
      category,
      shortDescription,
      description,
      specifications,
      featured,
      active,
      enquiryEnabled,
      tags,
      additionalImages
    };

    // Add new image if uploaded, otherwise keep existing
    if (req.file) {
      const fs = require('fs');
      const path = require('path');

      const uploadDir = path.resolve(__dirname, '../../image-uploads');
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const filename = req.file.fieldname + '-' + uniqueSuffix + path.extname(req.file.originalname);
      const filePath = path.join(uploadDir, filename);

      fs.writeFileSync(filePath, req.file.buffer);
      updateData.image = `/image-uploads/${filename}`;
    } else {
      // Keep existing image if no new file uploaded
      updateData.image = product.image;
    }

    product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('category', 'name slug');

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      product
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating product',
      error: error.message
    });
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting product',
      error: error.message
    });
  }
};

// @desc    Toggle product featured status
// @route   PUT /api/products/:id/featured
// @access  Private/Admin
exports.toggleFeatured = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    product.featured = !product.featured;
    await product.save();

    res.status(200).json({
      success: true,
      message: 'Product featured status updated',
      product
    });
  } catch (error) {
    console.error('Toggle featured error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating product',
      error: error.message
    });
  }
};

// @desc    Toggle product active status
// @route   PUT /api/products/:id/active
// @access  Private/Admin
exports.toggleActive = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    product.active = !product.active;
    await product.save();

    res.status(200).json({
      success: true,
      message: 'Product active status updated',
      product
    });
  } catch (error) {
    console.error('Toggle active error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating product',
      error: error.message
    });
  }
};

// @desc    Get all products (including inactive) - Admin only
// @route   GET /api/products/all
// @access  Private/Admin
exports.getAllProducts = async (req, res) => {
  try {
    const { category, search, page = 1, limit = 20 } = req.query;

    let query = {};

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { sku: { $regex: search, $options: 'i' } }
      ];
    }

    const products = await Product.find(query)
      .populate('category', 'name slug')
      .sort('-createdAt')
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Product.countDocuments(query);

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      products
    });
  } catch (error) {
    console.error('Get all products error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching products',
      error: error.message
    });
  }
};

// @desc    Get featured products
// @route   GET /api/products/featured/all
// @access  Public
exports.getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({ featured: true, active: true })
      .populate('category', 'name slug')
      .sort('-createdAt')
      .limit(8);

    res.status(200).json({
      success: true,
      count: products.length,
      products
    });
  } catch (error) {
    console.error('Get featured products error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching featured products',
      error: error.message
    });
  }
};
