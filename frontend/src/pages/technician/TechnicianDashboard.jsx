import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ClipboardList, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import axios from '../../api/axios';

const TechnicianDashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0
  });
  const [recentRequests, setRecentRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get('/service-requests/assigned');
      const requests = response.data.serviceRequests || [];

      setStats({
        total: requests.length,
        pending: requests.filter(r => r.status === 'Open' || r.status === 'Assigned').length,
        inProgress: requests.filter(r => r.status === 'In Progress').length,
        completed: requests.filter(r => r.status === 'Resolved' || r.status === 'Closed').length
      });

      setRecentRequests(requests.slice(0, 5));
      setError(null);
    } catch (err) {
      console.error('Error fetching dashboard:', err);
      setError('Failed to load: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) {
    return <div className="p-8">Loading component...</div>;
  }

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong>Error:</strong> {error}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Technician Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Requests</p>
              <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <ClipboardList className="w-12 h-12 text-primary-600" />
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-3xl font-bold text-gray-900">{stats.pending}</p>
            </div>
            <Clock className="w-12 h-12 text-yellow-600" />
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">In Progress</p>
              <p className="text-3xl font-bold text-gray-900">{stats.inProgress}</p>
            </div>
            <AlertCircle className="w-12 h-12 text-blue-600" />
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-3xl font-bold text-gray-900">{stats.completed}</p>
            </div>
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
        </div>
      </div>

      {/* Recent Requests */}
      <div className="card">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Recent Service Requests</h2>
        </div>
        <div className="p-6">
          {recentRequests.length === 0 ? (
            <p className="text-gray-600">No service requests assigned to you.</p>
          ) : (
            <div className="space-y-4">
              {recentRequests.map((request) => (
                <div key={request._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-900">{request.subject}</h3>
                    <p className="text-sm text-gray-600">{request.requestType}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(request.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      request.status === 'Open' ? 'bg-yellow-100 text-yellow-800' :
                      request.status === 'Assigned' ? 'bg-blue-100 text-blue-800' :
                      request.status === 'In Progress' ? 'bg-purple-100 text-purple-800' :
                      request.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                      request.status === 'Closed' ? 'bg-gray-100 text-gray-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {request.status}
                    </span>
                    <Link
                      to={`/technician/service-requests/${request._id}`}
                      className="btn-primary text-sm py-2"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TechnicianDashboard;
