import axiosInstance from './axios';

export const callbackApi = {
  createCallbackRequest: (callbackData) => axiosInstance.post('/callback', callbackData),
  getAllCallbackRequests: (params) => axiosInstance.get('/callback', { params }),
  getCallbackRequestById: (id) => axiosInstance.get(`/callback/${id}`),
  updateCallbackRequest: (id, data) => axiosInstance.put(`/callback/${id}`, data),
  deleteCallbackRequest: (id) => axiosInstance.delete(`/callback/${id}`),
};
