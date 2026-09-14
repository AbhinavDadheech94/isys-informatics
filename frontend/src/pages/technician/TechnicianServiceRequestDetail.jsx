import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { useNotification } from '../../context/NotificationContext';

const TechnicianServiceRequestDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { success, error } = useNotification();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [technicianNote, setTechnicianNote] = useState('');

  useEffect(() => {
    fetchRequest();
  }, [id]);

  const fetchRequest = async () => {
    try {
      const response = await axios.get(`/service-requests/${id}`);
      setRequest(response.data.serviceRequest);
      setNewStatus(response.data.serviceRequest.status);
    } catch (err) {
      error('Failed to load service request');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      await axios.put(`/service-requests/${id}`, {
        status: newStatus,
        adminNotes: technicianNote
      });
      success('Status updated successfully');
      fetchRequest();
      setTechnicianNote('');
    } catch (err) {
      error('Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  if (!request) {
    return <div className="p-8">Service request not found</div>;
  }

  return (
    <div>
      <button
        onClick={() => navigate('/technician/service-requests')}
        className="mb-6 btn-outline"
      >
        ← Back to Requests
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Request Details */}
        <div className="lg:col-span-2">
          <div className="card mb-6">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">{request.subject}</h2>
              <p className="text-sm text-gray-600 mt-1">{request.requestType}</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-600">Customer</p>
                  <p className="font-medium text-gray-900">{request.customer?.name}</p>
                  <p className="text-sm text-gray-600">{request.customer?.email}</p>
                  <p className="text-sm text-gray-600">{request.customer?.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Priority</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    request.priority === 'Urgent' ? 'bg-red-100 text-red-800' :
                    request.priority === 'High' ? 'bg-orange-100 text-orange-800' :
                    request.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {request.priority}
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-2">Description</p>
                <p className="text-gray-900">{request.description}</p>
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-2">Address</p>
                <p className="text-gray-900">{request.address}</p>
              </div>

              {request.attachment && (
                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-2">Attachment</p>
                  <a
                    href={`https://isysinformatics.com${request.attachment}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-900"
                  >
                    View Attachment
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Timeline */}
          <div className="card">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900">Timeline</h3>
            </div>
            <div className="p-6">
              {request.timeline && request.timeline.length > 0 ? (
                <div className="space-y-4">
                  {request.timeline.map((entry, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 bg-primary-600 rounded-full"></div>
                        {index < request.timeline.length - 1 && (
                          <div className="w-0.5 h-full bg-gray-300"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <p className="font-medium text-gray-900">{entry.status}</p>
                        <p className="text-sm text-gray-600">{entry.note}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(entry.date).toLocaleString()} by {entry.updatedBy?.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No timeline entries yet.</p>
              )}
            </div>
          </div>
        </div>

        {/* Status Update */}
        <div>
          <div className="card">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900">Update Status</h3>
            </div>
            <div className="p-6">
              <form onSubmit={handleUpdateStatus} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status *
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="input-field"
                    required
                  >
                    <option value="Open">Open</option>
                    <option value="Assigned">Assigned</option>
                    <option value="In Progress">In Progress</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Note
                  </label>
                  <textarea
                    value={technicianNote}
                    onChange={(e) => setTechnicianNote(e.target.value)}
                    className="input-field"
                    rows="4"
                    placeholder="Add your notes here..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={updating}
                  className="btn-primary w-full"
                >
                  {updating ? 'Updating...' : 'Update Status'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicianServiceRequestDetail;
