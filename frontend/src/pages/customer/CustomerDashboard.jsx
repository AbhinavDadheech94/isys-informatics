import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { enquiryApi } from '../../api/enquiryApi';
import { serviceApi } from '../../api/serviceApi';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { FileText, Wrench, User, Plus, LogOut } from 'lucide-react';

const CustomerDashboard = () => {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState({
    totalEnquiries: 0,
    openEnquiries: 0,
    serviceRequests: 0,
    pendingRequests: 0
  });
  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [recentServiceRequests, setRecentServiceRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [enquiriesRes, serviceRequestsRes] = await Promise.all([
        enquiryApi.getMyEnquiries(),
        serviceApi.getMyServiceRequests()
      ]);

      const enquiries = enquiriesRes.data.enquiries || [];
      const serviceRequests = serviceRequestsRes.data.serviceRequests || [];

      setStats({
        totalEnquiries: enquiries.length,
        openEnquiries: enquiries.filter(e => e.status === 'New').length,
        serviceRequests: serviceRequests.length,
        pendingRequests: serviceRequests.filter(s => s.status === 'Open').length
      });

      setRecentEnquiries(enquiries.slice(0, 5));
      setRecentServiceRequests(serviceRequests.slice(0, 5));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner size="lg" />;
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.name}</h1>
        <p className="text-gray-600 mt-2">Customer Dashboard</p>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Enquiries</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalEnquiries}</p>
              </div>
              <FileText className="w-8 h-8 text-primary-600" />
            </div>
          </div>
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Open Enquiries</p>
                <p className="text-2xl font-bold text-gray-900">{stats.openEnquiries}</p>
              </div>
              <FileText className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Service Requests</p>
                <p className="text-2xl font-bold text-gray-900">{stats.serviceRequests}</p>
              </div>
              <Wrench className="w-8 h-8 text-orange-600" />
            </div>
          </div>
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Requests</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pendingRequests}</p>
              </div>
              <Wrench className="w-8 h-8 text-red-600" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Link
            to="/enquiry"
            className="card p-4 flex items-center gap-3 hover:shadow-lg transition-shadow"
          >
            <Plus className="w-5 h-5 text-primary-600" />
            <span className="font-medium">Request Quote</span>
          </Link>
          <Link
            to="/customer/service-requests"
            className="card p-4 flex items-center gap-3 hover:shadow-lg transition-shadow"
          >
            <Wrench className="w-5 h-5 text-primary-600" />
            <span className="font-medium">Service Request</span>
          </Link>
          <Link
            to="/customer/enquiries"
            className="card p-4 flex items-center gap-3 hover:shadow-lg transition-shadow"
          >
            <FileText className="w-5 h-5 text-primary-600" />
            <span className="font-medium">My Enquiries</span>
          </Link>
          <Link
            to="/customer/profile"
            className="card p-4 flex items-center gap-3 hover:shadow-lg transition-shadow"
          >
            <User className="w-5 h-5 text-primary-600" />
            <span className="font-medium">Update Profile</span>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Enquiries */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Enquiries</h3>
            {recentEnquiries.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No enquiries yet</p>
            ) : (
              <div className="space-y-3">
                {recentEnquiries.map((enquiry) => (
                  <div key={enquiry._id} className="border-b border-gray-200 pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">
                          {enquiry.product?.name || 'General Enquiry'}
                        </p>
                        <p className="text-sm text-gray-600">{new Date(enquiry.createdAt).toLocaleDateString()}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        enquiry.status === 'New' ? 'bg-green-100 text-green-800' :
                        enquiry.status === 'Contacted' ? 'bg-blue-100 text-blue-800' :
                        enquiry.status === 'Quotation Sent' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {enquiry.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <Link
              to="/customer/enquiries"
              className="block text-center mt-4 text-primary-600 hover:text-primary-700"
            >
              View All Enquiries →
            </Link>
          </div>

          {/* Recent Service Requests */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Service Requests</h3>
            {recentServiceRequests.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No service requests yet</p>
            ) : (
              <div className="space-y-3">
                {recentServiceRequests.map((request) => (
                  <div key={request._id} className="border-b border-gray-200 pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">{request.subject}</p>
                        <p className="text-sm text-gray-600">{new Date(request.createdAt).toLocaleDateString()}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        request.status === 'Open' ? 'bg-green-100 text-green-800' :
                        request.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                        request.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {request.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <Link
              to="/customer/service-requests"
              className="block text-center mt-4 text-primary-600 hover:text-primary-700"
            >
              View All Service Requests →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
