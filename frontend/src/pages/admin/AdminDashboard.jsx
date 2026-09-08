import React, { useState, useEffect } from 'react';
import { adminApi } from '../../api/adminApi';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { Package, Users, FileText, Wrench, AlertCircle, MessageSquare, Phone, Settings } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    setLoading(true);
    try {
      const response = await adminApi.getDashboardStats();
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner size="lg" />;
  }

  if (!stats) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Failed to load dashboard data</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to the admin control panel</p>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{stats.stats.totalProducts}</p>
              </div>
              <Package className="w-8 h-8 text-primary-600" />
            </div>
          </div>
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Customers</p>
                <p className="text-2xl font-bold text-gray-900">{stats.stats.totalCustomers}</p>
              </div>
              <Users className="w-8 h-8 text-primary-600" />
            </div>
          </div>
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">New Enquiries</p>
                <p className="text-2xl font-bold text-gray-900">{stats.stats.newEnquiries}</p>
              </div>
              <FileText className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Open Service Requests</p>
                <p className="text-2xl font-bold text-gray-900">{stats.stats.openServiceRequests}</p>
              </div>
              <Wrench className="w-8 h-8 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Products</p>
                <p className="text-2xl font-bold text-gray-900">{stats.stats.activeProducts}</p>
              </div>
              <Package className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Categories</p>
                <p className="text-2xl font-bold text-gray-900">{stats.stats.totalCategories}</p>
              </div>
              <Settings className="w-8 h-8 text-primary-600" />
            </div>
          </div>
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Open Complaints</p>
                <p className="text-2xl font-bold text-gray-900">{stats.stats.openComplaints}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
          </div>
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Contact Messages</p>
                <p className="text-2xl font-bold text-gray-900">{stats.stats.contactMessages}</p>
              </div>
              <MessageSquare className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Enquiries</h3>
            {stats.recentActivities.enquiries.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No recent enquiries</p>
            ) : (
              <div className="space-y-3">
                {stats.recentActivities.enquiries.map((enquiry) => (
                  <div key={enquiry._id} className="border-b border-gray-200 pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">
                          {enquiry.customer?.name || 'Unknown'}
                        </p>
                        <p className="text-sm text-gray-600">
                          {enquiry.product?.name || 'General Enquiry'}
                        </p>
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(enquiry.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Service Requests</h3>
            {stats.recentActivities.serviceRequests.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No recent service requests</p>
            ) : (
              <div className="space-y-3">
                {stats.recentActivities.serviceRequests.map((request) => (
                  <div key={request._id} className="border-b border-gray-200 pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">
                          {request.customer?.name || 'Unknown'}
                        </p>
                        <p className="text-sm text-gray-600">{request.subject}</p>
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(request.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
