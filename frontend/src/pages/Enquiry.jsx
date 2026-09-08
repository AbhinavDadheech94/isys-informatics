import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productApi } from '../api/productApi';
import { enquiryApi } from '../api/enquiryApi';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

const Enquiry = () => {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('product');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { success, error } = useNotification();

  const [enquiryData, setEnquiryData] = useState({
    product: productId || '',
    name: '',
    email: '',
    phone: '',
    companyName: '',
    quantity: '',
    requirement: '',
    city: '',
    state: '',
    message: ''
  });

  useEffect(() => {
    fetchProducts();
    if (user) {
      setEnquiryData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        companyName: user.companyName || '',
        city: user.city || '',
        state: user.state || ''
      }));
    }
  }, [user, productId]);

  const fetchProducts = async () => {
    try {
      const response = await productApi.getProducts();
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await enquiryApi.createEnquiry(enquiryData);
      success('Enquiry submitted successfully');
      setEnquiryData({
        product: '',
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        companyName: user?.companyName || '',
        quantity: '',
        requirement: '',
        city: user?.city || '',
        state: user?.state || '',
        message: ''
      });
    } catch (err) {
      error('Failed to submit enquiry');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="page-header">
        <h1 className="text-3xl font-bold text-gray-900">Request a Quote</h1>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <p className="text-gray-600 mb-6">
            Fill out the form below and our team will get back to you with a detailed quotation.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product
              </label>
              <select
                value={enquiryData.product}
                onChange={(e) => setEnquiryData({...enquiryData, product: e.target.value})}
                className="input-field"
              >
                <option value="">Select a product (optional)</option>
                {products.map((product) => (
                  <option key={product._id} value={product._id}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={enquiryData.name}
                  onChange={(e) => setEnquiryData({...enquiryData, name: e.target.value})}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={enquiryData.email}
                  onChange={(e) => setEnquiryData({...enquiryData, email: e.target.value})}
                  className="input-field"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone *
                </label>
                <input
                  type="tel"
                  required
                  value={enquiryData.phone}
                  onChange={(e) => setEnquiryData({...enquiryData, phone: e.target.value})}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  value={enquiryData.companyName}
                  onChange={(e) => setEnquiryData({...enquiryData, companyName: e.target.value})}
                  className="input-field"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <input
                  type="text"
                  value={enquiryData.quantity}
                  onChange={(e) => setEnquiryData({...enquiryData, quantity: e.target.value})}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Requirement
                </label>
                <input
                  type="text"
                  value={enquiryData.requirement}
                  onChange={(e) => setEnquiryData({...enquiryData, requirement: e.target.value})}
                  className="input-field"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  value={enquiryData.city}
                  onChange={(e) => setEnquiryData({...enquiryData, city: e.target.value})}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <input
                  type="text"
                  value={enquiryData.state}
                  onChange={(e) => setEnquiryData({...enquiryData, state: e.target.value})}
                  className="input-field"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                rows="4"
                value={enquiryData.message}
                onChange={(e) => setEnquiryData({...enquiryData, message: e.target.value})}
                className="input-field"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading ? 'Submitting...' : 'Submit Enquiry'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Enquiry;
