import axiosInstance from './axios';

export const contactApi = {
  createContactMessage: (messageData) => axiosInstance.post('/contact', messageData),
  getAllContactMessages: (params) => axiosInstance.get('/contact', { params }),
  getContactMessageById: (id) => axiosInstance.get(`/contact/${id}`),
  updateContactMessage: (id, data) => axiosInstance.put(`/contact/${id}`, data),
  deleteContactMessage: (id) => axiosInstance.delete(`/contact/${id}`),
};
