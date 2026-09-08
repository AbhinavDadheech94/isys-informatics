import axiosInstance from './axios';

export const complaintApi = {
  createComplaint: (formData) => axiosInstance.post('/complaints', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getMyComplaints: () => axiosInstance.get('/complaints/my'),
  getAllComplaints: (params) => axiosInstance.get('/complaints', { params }),
  getComplaintById: (id) => axiosInstance.get(`/complaints/${id}`),
  updateComplaint: (id, data) => axiosInstance.put(`/complaints/${id}`, data),
  deleteComplaint: (id) => axiosInstance.delete(`/complaints/${id}`),
};
