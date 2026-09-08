import axiosInstance from './axios';

export const authApi = {
  register: (userData) => axiosInstance.post('/auth/register', userData),
  login: (credentials) => axiosInstance.post('/auth/login', credentials),
  getMe: () => axiosInstance.get('/auth/me'),
  updateProfile: (userData) => axiosInstance.put('/auth/profile', userData),
  changePassword: (passwordData) => axiosInstance.put('/auth/change-password', passwordData),
  getTechnicians: () => axiosInstance.get('/auth/technicians'),
  deleteUser: (id) => axiosInstance.delete(`/auth/users/${id}`)
};
