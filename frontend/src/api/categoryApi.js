import axiosInstance from './axios';

export const categoryApi = {
  getCategories: () => axiosInstance.get('/categories'),
  getCategoryBySlug: (slug) => axiosInstance.get(`/categories/${slug}`),
  createCategory: (formData) => {
    if (formData instanceof FormData) {
      return axiosInstance.post('/categories', formData);
    } else {
      return axiosInstance.post('/categories', formData, {
        headers: { 'Content-Type': 'application/json' }
      });
    }
  },
  updateCategory: (id, formData) => {
    if (formData instanceof FormData) {
      return axiosInstance.put(`/categories/${id}`, formData);
    } else {
      return axiosInstance.put(`/categories/${id}`, formData, {
        headers: { 'Content-Type': 'application/json' }
      });
    }
  },
  deleteCategory: (id) => axiosInstance.delete(`/categories/${id}`),
  getAllCategories: () => axiosInstance.get('/categories/all/all'),
};
