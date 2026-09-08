import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../api/axios';

const TechnicianServiceRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get('/service-requests/assigned');
      setRequests(response.data.serviceRequests);
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredRequests = filter === 'all'
    ? requests
    : requests.filter(r => r.status === filter);

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Service Requests</h1>

      {/* Filter */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg ${
            filter === 'all' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700 border'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('Open')}
          className={`px-4 py-2 rounded-lg ${
            filter === 'Open' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700 border'
          }`}
        >
          Open
        </button>
        <button
          onClick={() => setFilter('In Progress')}
          className={`px-4 py-2 rounded-lg ${
            filter === 'In Progress' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700 border'
          }`}
        >
          In Progress
        </button>
        <button
          onClick={() => setFilter('Resolved')}
          className={`px-4 py-2 rounded-lg ${
            filter === 'Resolved' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700 border'
          }`}
        >
          Resolved
        </button>
      </div>

      {/* Requests List */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRequests.map((request) => (
                <tr key={request._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {request.subject}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {request.requestType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {request.customer?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      request.priority === 'Urgent' ? 'bg-red-100 text-red-800' :
                      request.priority === 'High' ? 'bg-orange-100 text-orange-800' :
                      request.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {request.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      request.status === 'Open' ? 'bg-yellow-100 text-yellow-800' :
                      request.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      request.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(request.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link
                      to={`/technician/service-requests/${request._id}`}
                      className="text-primary-600 hover:text-primary-900"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TechnicianServiceRequests;
