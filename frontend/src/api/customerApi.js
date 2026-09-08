import axiosInstance from './axios';

export const customerApi = {
  getAllCustomers: (params) => axiosInstance.get('/customers', { params }),
  getCustomerById: (id) => axiosInstance.get(`/customers/${id}`),
  updateCustomer: (id, data) => axiosInstance.put(`/customers/${id}`, data),
  deleteCustomer: (id) => axiosInstance.delete(`/customers/${id}`),
};
