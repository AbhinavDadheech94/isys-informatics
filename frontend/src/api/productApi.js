import axiosInstance from './axios';

export const productApi = {
  getProducts: (params) => axiosInstance.get('/products', { params }),
  getProductBySlug: (slug) => axiosInstance.get(`/products/${slug}`),
  getFeaturedProducts: () => axiosInstance.get('/products/featured/all'),
  createProduct: (formData) => {
    if (formData instanceof FormData) {
      return axiosInstance.post('/products', formData);
    } else {
      return axiosInstance.post('/products', formData, {
        headers: { 'Content-Type': 'application/json' }
      });
    }
  },
  updateProduct: (id, formData) => {
    if (formData instanceof FormData) {
      return axiosInstance.put(`/products/${id}`, formData);
    } else {
      return axiosInstance.put(`/products/${id}`, formData, {
        headers: { 'Content-Type': 'application/json' }
      });
    }
  },
  deleteProduct: (id) => axiosInstance.delete(`/products/${id}`),
  toggleFeatured: (id) => axiosInstance.put(`/products/${id}/featured`),
  toggleActive: (id) => axiosInstance.put(`/products/${id}/active`),
  getAllProducts: (params) => axiosInstance.get('/products/all/all', { params }),
};
