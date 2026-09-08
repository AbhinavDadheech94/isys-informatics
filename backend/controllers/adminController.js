const User = require('../models/User');
const Product = require('../models/Product');
const Category = require('../models/Category');
const Enquiry = require('../models/Enquiry');
const ServiceRequest = require('../models/ServiceRequest');
const Complaint = require('../models/Complaint');
const ContactMessage = require('../models/ContactMessage');
const CallbackRequest = require('../models/CallbackRequest');

// @desc    Get dashboard statistics
// @route   GET /api/admin/dashboard
// @access  Private/Admin
exports.getDashboardStats = async (req, res) => {
  try {
    // Get counts
    const totalProducts = await Product.countDocuments();
    const activeProducts = await Product.countDocuments({ active: true });
    const featuredProducts = await Product.countDocuments({ featured: true });
    const totalCategories = await Category.countDocuments();
    const totalCustomers = await User.countDocuments({ role: 'customer' });
    const totalEnquiries = await Enquiry.countDocuments();
    const newEnquiries = await Enquiry.countDocuments({ status: 'New' });
    const openServiceRequests = await ServiceRequest.countDocuments({ status: 'Open' });
    const openComplaints = await Complaint.countDocuments({ status: 'Open' });
    const contactMessages = await ContactMessage.countDocuments({ status: 'New' });
    const callbackRequests = await CallbackRequest.countDocuments({ status: 'Pending' });

    // Get enquiries by month (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const enquiriesByMonth = await Enquiry.aggregate([
      {
        $match: {
          createdAt: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      }
    ]);

    // Get service requests by status
    const serviceRequestsByStatus = await ServiceRequest.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Get products by category
    const productsByCategory = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'categories',
          localField: '_id',
          foreignField: '_id',
          as: 'category'
        }
      },
      {
        $unwind: '$category'
      },
      {
        $project: {
          categoryName: '$category.name',
          count: 1
        }
      }
    ]);

    // Get recent activities
    const recentEnquiries = await Enquiry.find()
      .populate('customer', 'name companyName')
      .populate('product', 'name')
      .sort('-createdAt')
      .limit(5);

    const recentServiceRequests = await ServiceRequest.find()
      .populate('customer', 'name companyName')
      .sort('-createdAt')
      .limit(5);

    res.status(200).json({
      success: true,
      stats: {
        totalProducts,
        activeProducts,
        featuredProducts,
        totalCategories,
        totalCustomers,
        totalEnquiries,
        newEnquiries,
        openServiceRequests,
        openComplaints,
        contactMessages,
        callbackRequests
      },
      charts: {
        enquiriesByMonth,
        serviceRequestsByStatus,
        productsByCategory
      },
      recentActivities: {
        enquiries: recentEnquiries,
        serviceRequests: recentServiceRequests
      }
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard statistics',
      error: error.message
    });
  }
};
