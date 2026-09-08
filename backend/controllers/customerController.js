const User = require('../models/User');
const Enquiry = require('../models/Enquiry');
const ServiceRequest = require('../models/ServiceRequest');
const Complaint = require('../models/Complaint');

// @desc    Get all customers (Admin)
// @route   GET /api/customers
// @access  Private/Admin
exports.getAllCustomers = async (req, res) => {
  try {
    const { search, page = 1, limit = 20 } = req.query;

    let query = { role: 'customer' };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { companyName: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }

    const customers = await User.find(query)
      .select('-password')
      .sort('-createdAt')
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await User.countDocuments(query);

    // Add statistics for each customer
    const customersWithStats = await Promise.all(
      customers.map(async (customer) => {
        const enquiryCount = await Enquiry.countDocuments({ customer: customer._id });
        const serviceRequestCount = await ServiceRequest.countDocuments({ customer: customer._id });
        const complaintCount = await Complaint.countDocuments({ customer: customer._id });

        return {
          ...customer.toObject(),
          enquiryCount,
          serviceRequestCount,
          complaintCount
        };
      })
    );

    res.status(200).json({
      success: true,
      count: customersWithStats.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      customers: customersWithStats
    });
  } catch (error) {
    console.error('Get all customers error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching customers',
      error: error.message
    });
  }
};

// @desc    Get single customer (Admin)
// @route   GET /api/customers/:id
// @access  Private/Admin
exports.getCustomerById = async (req, res) => {
  try {
    const customer = await User.findById(req.params.id).select('-password');

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found'
      });
    }

    if (customer.role !== 'customer') {
      return res.status(400).json({
        success: false,
        message: 'User is not a customer'
      });
    }

    // Get customer's activity
    const enquiries = await Enquiry.find({ customer: customer._id })
      .populate('product', 'name slug')
      .sort('-createdAt')
      .limit(10);

    const serviceRequests = await ServiceRequest.find({ customer: customer._id })
      .sort('-createdAt')
      .limit(10);

    const complaints = await Complaint.find({ customer: customer._id })
      .sort('-createdAt')
      .limit(10);

    const enquiryCount = await Enquiry.countDocuments({ customer: customer._id });
    const serviceRequestCount = await ServiceRequest.countDocuments({ customer: customer._id });
    const complaintCount = await Complaint.countDocuments({ customer: customer._id });

    res.status(200).json({
      success: true,
      customer: {
        ...customer.toObject(),
        enquiryCount,
        serviceRequestCount,
        complaintCount,
        recentEnquiries: enquiries,
        recentServiceRequests: serviceRequests,
        recentComplaints: complaints
      }
    });
  } catch (error) {
    console.error('Get customer error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching customer',
      error: error.message
    });
  }
};

// @desc    Update customer (Admin)
// @route   PUT /api/customers/:id
// @access  Private/Admin
exports.updateCustomer = async (req, res) => {
  try {
    const { name, companyName, phone, city, state, gstNumber, address, isActive } = req.body;

    let customer = await User.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found'
      });
    }

    if (customer.role !== 'customer') {
      return res.status(400).json({
        success: false,
        message: 'User is not a customer'
      });
    }

    if (name) customer.name = name;
    if (companyName) customer.companyName = companyName;
    if (phone) customer.phone = phone;
    if (city) customer.city = city;
    if (state) customer.state = state;
    if (gstNumber) customer.gstNumber = gstNumber;
    if (address) customer.address = address;
    if (isActive !== undefined) customer.isActive = isActive;

    await customer.save();

    res.status(200).json({
      success: true,
      message: 'Customer updated successfully',
      customer: {
        id: customer._id,
        name: customer.name,
        email: customer.email,
        companyName: customer.companyName,
        phone: customer.phone,
        city: customer.city,
        state: customer.state,
        gstNumber: customer.gstNumber,
        address: customer.address,
        isActive: customer.isActive
      }
    });
  } catch (error) {
    console.error('Update customer error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating customer',
      error: error.message
    });
  }
};

// @desc    Delete customer (Admin)
// @route   DELETE /api/customers/:id
// @access  Private/Admin
exports.deleteCustomer = async (req, res) => {
  try {
    const customer = await User.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found'
      });
    }

    if (customer.role !== 'customer') {
      return res.status(400).json({
        success: false,
        message: 'User is not a customer'
      });
    }

    await customer.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Customer deleted successfully'
    });
  } catch (error) {
    console.error('Delete customer error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting customer',
      error: error.message
    });
  }
};
