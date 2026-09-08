import React, { useState, useEffect } from 'react';
import { enquiryApi } from '../../api/enquiryApi';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import { useNotification } from '../../context/NotificationContext';

const AdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const { success, error } = useNotification();

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const response = await enquiryApi.getAllEnquiries();
      setEnquiries(response.data.enquiries);
    } catch (err) {
      console.error('Error fetching enquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (enquiryId, status) => {
    try {
      await enquiryApi.updateEnquiryStatus(enquiryId, { status });
      success('Enquiry status updated successfully');
      fetchEnquiries();
      setSelectedEnquiry(null);
    } catch (err) {
      error('Failed to update enquiry status');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'New': return 'bg-green-100 text-green-800';
      case 'Contacted': return 'bg-blue-100 text-blue-800';
      case 'Quotation Sent': return 'bg-yellow-100 text-yellow-800';
      case 'In Discussion': return 'bg-purple-100 text-purple-800';
      case 'Converted': return 'bg-green-100 text-green-800';
      case 'Closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <LoadingSpinner size="lg" />;
  }

  return (
    <div className="min-h-screen">
      <div className="page-header">
        <h1 className="text-3xl font-bold text-gray-900">Enquiry Management</h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {enquiries.length === 0 ? (
          <EmptyState
            title="No Enquiries Found"
            description="Product enquiries will appear here"
            icon="documents"
          />
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {enquiries.map((enquiry) => (
                  <tr key={enquiry._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{enquiry.name}</div>
                      <div className="text-sm text-gray-500">{enquiry.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{enquiry.product?.name || 'General'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{enquiry.companyName || '-'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {new Date(enquiry.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(enquiry.status)}`}>
                        {enquiry.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => setSelectedEnquiry(enquiry)}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Enquiry Detail Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Enquiry Details</h3>
                <button
                  onClick={() => setSelectedEnquiry(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-medium">{selectedEnquiry.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{selectedEnquiry.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium">{selectedEnquiry.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Company</p>
                    <p className="font-medium">{selectedEnquiry.companyName || '-'}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Product</p>
                  <p className="font-medium">{selectedEnquiry.product?.name || 'General Enquiry'}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Quantity</p>
                    <p className="font-medium">{selectedEnquiry.quantity || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Requirement</p>
                    <p className="font-medium">{selectedEnquiry.requirement || '-'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">City</p>
                    <p className="font-medium">{selectedEnquiry.city || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">State</p>
                    <p className="font-medium">{selectedEnquiry.state || '-'}</p>
                  </div>
                </div>

                {selectedEnquiry.message && (
                  <div>
                    <p className="text-sm text-gray-600">Message</p>
                    <p className="font-medium">{selectedEnquiry.message}</p>
                  </div>
                )}

                <div>
                  <p className="text-sm text-gray-600 mb-2">Update Status</p>
                  <div className="flex flex-wrap gap-2">
                    {['New', 'Contacted', 'Quotation Sent', 'In Discussion', 'Converted', 'Closed'].map((status) => (
                      <button
                        key={status}
                        onClick={() => handleStatusUpdate(selectedEnquiry._id, status)}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          selectedEnquiry.status === status
                            ? getStatusColor(status)
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEnquiries;
