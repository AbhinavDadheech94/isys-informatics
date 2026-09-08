import axios from './axios';

export const serviceRequestApi = {
  // Create service request
  createServiceRequest: (data) => axios.post('/service-requests', data),

  // Get my service requests (for customers)
  getMyServiceRequests: () => axios.get('/service-requests/my'),

  // Get assigned service requests (for technicians)
  getAssignedServiceRequests: () => axios.get('/service-requests/assigned'),

  // Get all service requests (Admin)
  getAllServiceRequests: (params) => axios.get('/service-requests', { params }),

  // Get technicians (Admin)
  getTechnicians: () => axios.get('/service-requests/technicians'),

  // Get service request by ID
  getServiceRequestById: (id) => axios.get(`/service-requests/${id}`),

  // Update service request
  updateServiceRequest: (id, data) => axios.put(`/service-requests/${id}`, data),

  // Delete service request
  deleteServiceRequest: (id) => axios.delete(`/service-requests/${id}`)
};
