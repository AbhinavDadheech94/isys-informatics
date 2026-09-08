import axiosInstance from './axios';

export const servicesApi = {
  getServices: () => axiosInstance.get('/services'),
  getServiceBySlug: (slug) => axiosInstance.get(`/services/${slug}`),
  createService: (formData) => axiosInstance.post('/services', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  updateService: (id, formData) => axiosInstance.put(`/services/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  deleteService: (id) => axiosInstance.delete(`/services/${id}`),
  getAllServices: () => axiosInstance.get('/services/all/all'),
};
