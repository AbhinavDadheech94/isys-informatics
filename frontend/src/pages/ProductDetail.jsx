import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { productApi } from '../api/productApi';
import { enquiryApi } from '../api/enquiryApi';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

const ProductDetail = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const { user } = useAuth();
  const { success, error } = useNotification();

  const [enquiryData, setEnquiryData] = useState({
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
    fetchProduct();
  }, [slug]);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await productApi.getProductBySlug(slug);
      setProduct(response.data.product);
      setRelatedProducts(response.data.relatedProducts || []);
      
      // Pre-fill form if user is logged in
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
    } catch (err) {
      error('Failed to load product details');
    } finally {
      setLoading(false);
    }
  };

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    try {
      await enquiryApi.createEnquiry({
        ...enquiryData,
        product: product._id
      });
      success('Enquiry submitted successfully');
      setShowEnquiryForm(false);
      setEnquiryData({
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
    } catch (err) {
      error('Failed to submit enquiry');
    }
  };

  const handleWhatsApp = () => {
    const message = `Hello ISYS INFORMATICS, I am interested in ${product.name}. Please share details and quotation.`;
    const whatsappUrl = `https://wa.me/919414058322?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (loading) {
    return <LoadingSpinner size="lg" />;
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <Link to="/products" className="btn-primary">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="page-header">
        <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div>
            {product.image ? (
              <img
                src={`http://localhost:5001${product.image}`}
                alt={product.name}
                className="w-full rounded-lg shadow-md"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23f3f4f6" width="400" height="300"/%3E%3Ctext fill="%239ca3af" font-family="Arial" font-size="14" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3ENo Image%3C/text%3E%3C/svg%3E';
                }}
              />
            ) : (
              <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-400">No Image Available</span>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-4">
              <span className="text-sm text-primary-600 font-medium">
                {product.category?.name}
              </span>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">{product.name}</h2>

            {product.shortDescription && (
              <p className="text-gray-700 mb-6">{product.shortDescription}</p>
            )}

            {product.specifications && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Specifications</h3>
                <p className="text-gray-700 whitespace-pre-line">{product.specifications}</p>
              </div>
            )}

            <div className="flex flex-wrap gap-4 mb-6">
              <button
                onClick={() => setShowEnquiryForm(true)}
                className="btn-primary flex-1"
              >
                Request Quote
              </button>
              <button
                onClick={handleWhatsApp}
                className="btn-outline flex-1"
              >
                WhatsApp Enquiry
              </button>
            </div>

            <div className="text-sm text-gray-600">
              <p>Price on Request</p>
            </div>
          </div>
        </div>

        {/* Detailed Description */}
        {product.description && (
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Description</h3>
            <p className="text-gray-700 whitespace-pre-line">{product.description}</p>
          </div>
        )}

        {/* Enquiry Form Modal */}
        {showEnquiryForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Request Quote</h3>
                  <button
                    onClick={() => setShowEnquiryForm(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleEnquirySubmit} className="space-y-4">
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

                  <div className="flex gap-4">
                    <button type="submit" className="btn-primary flex-1">
                      Submit Enquiry
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowEnquiryForm(false)}
                      className="btn-outline flex-1"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct._id}
                  to={`/product/${relatedProduct.slug}`}
                  className="card overflow-hidden"
                >
                  <div className="aspect-w-16 aspect-h-12 bg-gray-200">
                    {relatedProduct.image ? (
                      <img
                        src={`http://localhost:5001${relatedProduct.image}`}
                        alt={relatedProduct.name}
                        className="w-full h-auto object-contain"
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23f3f4f6" width="400" height="300"/%3E%3Ctext fill="%239ca3af" font-family="Arial" font-size="14" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3ENo Image%3C/text%3E%3C/svg%3E';
                        }}
                      />
                    ) : (
                      <div className="w-full h-48 flex items-center justify-center bg-gray-200">
                        <span className="text-gray-400">No Image</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {relatedProduct.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {relatedProduct.category?.name}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
