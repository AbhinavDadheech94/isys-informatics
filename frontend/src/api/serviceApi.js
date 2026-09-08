import axiosInstance from './axios';

export const serviceApi = {
  createServiceRequest: (formData) => axiosInstance.post('/service-requests', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getMyServiceRequests: () => axiosInstance.get('/service-requests/my'),
  getAllServiceRequests: (params) => axiosInstance.get('/service-requests', { params }),
  getServiceRequestById: (id) => axiosInstance.get(`/service-requests/${id}`),
  updateServiceRequest: (id, data) => axiosInstance.put(`/service-requests/${id}`, data),
  deleteServiceRequest: (id) => axiosInstance.delete(`/service-requests/${id}`),
};
