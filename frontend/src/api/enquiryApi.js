import axiosInstance from './axios';

export const enquiryApi = {
  createEnquiry: (enquiryData) => axiosInstance.post('/enquiries', enquiryData),
  getMyEnquiries: () => axiosInstance.get('/enquiries/my'),
  getAllEnquiries: (params) => axiosInstance.get('/enquiries', { params }),
  getEnquiryById: (id) => axiosInstance.get(`/enquiries/${id}`),
  updateEnquiryStatus: (id, statusData) => axiosInstance.put(`/enquiries/${id}/status`, statusData),
  deleteEnquiry: (id) => axiosInstance.delete(`/enquiries/${id}`),
};
