import React, { useState, useEffect } from 'react';
import { serviceRequestApi } from '../../api/serviceRequestApi';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import { useNotification } from '../../context/NotificationContext';

const AdminServiceRequests = () => {
  const [serviceRequests, setServiceRequests] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [assigningTo, setAssigningTo] = useState('');
  const { success, error } = useNotification();

  useEffect(() => {
    fetchServiceRequests();
    fetchTechnicians();
  }, []);

  const fetchServiceRequests = async () => {
    setLoading(true);
    try {
      const response = await serviceRequestApi.getAllServiceRequests();
      setServiceRequests(response.data.serviceRequests);
    } catch (err) {
      console.error('Error fetching service requests:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTechnicians = async () => {
    try {
      const response = await serviceRequestApi.getTechnicians();
      setTechnicians(response.data.technicians);
    } catch (err) {
      console.error('Error fetching technicians:', err);
    }
  };

  const handleStatusUpdate = async (requestId, status) => {
    try {
      await serviceRequestApi.updateServiceRequest(requestId, { status });
      success('Service request status updated successfully');
      fetchServiceRequests();
      setSelectedRequest(null);
    } catch (err) {
      error('Failed to update service request status');
    }
  };

  const handleAssignTechnician = async () => {
    if (!assigningTo) {
      error('Please select a technician');
      return;
    }
    try {
      await serviceRequestApi.updateServiceRequest(selectedRequest._id, {
        assignedTo: assigningTo
      });
      success('Technician assigned successfully');
      fetchServiceRequests();
      setShowAssignModal(false);
      setAssigningTo('');
      setSelectedRequest(null);
    } catch (err) {
      error('Failed to assign technician');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open': return 'bg-green-100 text-green-800';
      case 'Assigned': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'On Hold': return 'bg-orange-100 text-orange-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      case 'Closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <LoadingSpinner size="lg" />;
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="text-3xl font-bold text-gray-900">Service Request Management</h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {serviceRequests.length === 0 ? (
          <EmptyState
            title="No Service Requests Found"
            description="Service requests will appear here"
            icon="settings"
          />
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assigned To
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {serviceRequests.map((request) => (
                  <tr key={request._id}>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <div className="text-xs font-medium text-gray-900">
                        {request.customer?.name || 'Unknown'}
                      </div>
                      <div className="text-xs text-gray-500">{request.customer?.email}</div>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <div className="text-xs text-gray-900">{request.subject}</div>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <div className="text-xs text-gray-500">{request.requestType}</div>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <div className="text-xs text-gray-900">
                        {request.assignedTo?.name || 'Not Assigned'}
                      </div>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <div className="text-xs text-gray-500">
                        {new Date(request.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        request.priority === 'High' || request.priority === 'Urgent'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {request.priority}
                      </span>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-xs font-medium">
                      <button
                        onClick={() => setSelectedRequest(request)}
                        className="text-primary-600 hover:text-primary-900 mr-2"
                      >
                        View
                      </button>
                      <button
                        onClick={() => {
                          setSelectedRequest(request);
                          setAssigningTo(request.assignedTo?._id || '');
                          setShowAssignModal(true);
                        }}
                        className="text-green-600 hover:text-green-900"
                      >
                        Assign
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Service Request Detail Modal */}
      {selectedRequest && !showAssignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Service Request Details</h3>
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Customer</p>
                    <p className="font-medium">{selectedRequest.customer?.name || 'Unknown'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{selectedRequest.customer?.email}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Request Type</p>
                  <p className="font-medium">{selectedRequest.requestType}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Subject</p>
                  <p className="font-medium">{selectedRequest.subject}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Description</p>
                  <p className="font-medium">{selectedRequest.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium">{selectedRequest.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Address</p>
                    <p className="font-medium">{selectedRequest.address}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-2">Update Status</p>
                  <div className="flex flex-wrap gap-2">
                    {['Open', 'Assigned', 'In Progress', 'On Hold', 'Resolved', 'Closed'].map((status) => (
                      <button
                        key={status}
                        onClick={() => handleStatusUpdate(selectedRequest._id, status)}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          selectedRequest.status === status
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

      {/* Assign Technician Modal */}
      {showAssignModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Assign Technician</h3>
                <button
                  onClick={() => {
                    setShowAssignModal(false);
                    setAssigningTo('');
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Service Request</p>
                  <p className="font-medium">{selectedRequest.subject}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Technician *
                  </label>
                  <select
                    value={assigningTo}
                    onChange={(e) => setAssigningTo(e.target.value)}
                    className="input-field"
                    required
                  >
                    <option value="">Select a technician</option>
                    {technicians.map((tech) => (
                      <option key={tech._id} value={tech._id}>
                        {tech.name} ({tech.email})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleAssignTechnician}
                    className="btn-primary flex-1"
                  >
                    Assign
                  </button>
                  <button
                    onClick={() => {
                      setShowAssignModal(false);
                      setAssigningTo('');
                    }}
                    className="btn-outline flex-1"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminServiceRequests;
