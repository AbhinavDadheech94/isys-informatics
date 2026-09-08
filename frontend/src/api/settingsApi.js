import axiosInstance from './axios';

export const settingsApi = {
  getSettings: () => axiosInstance.get('/settings'),
  updateSettings: (formData) => axiosInstance.put('/settings', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
};
