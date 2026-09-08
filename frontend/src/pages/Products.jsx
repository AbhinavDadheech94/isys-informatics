import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { productApi } from '../api/productApi';
import { categoryApi } from '../api/categoryApi';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';

const Products = () => {
  const [searchParams] = useSearchParams();
  const categorySlug = searchParams.get('category');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categorySlug || '');

  useEffect(() => {
    if (categorySlug) {
      setSelectedCategory(categorySlug);
    }
    fetchCategories();
    fetchProducts();
  }, [selectedCategory, searchTerm, categorySlug]);

  const fetchCategories = async () => {
    try {
      const response = await categoryApi.getCategories();
      setCategories(response.data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = {};
      if (selectedCategory) params.category = selectedCategory;
      if (searchTerm) params.search = searchTerm;

      const response = await productApi.getProducts(params);
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  const handleCategoryClick = (categorySlug) => {
    setSelectedCategory(categorySlug === selectedCategory ? '' : categorySlug);
  };

  return (
    <div className="min-h-screen">
      <div className="page-header">
        <h1 className="text-3xl font-bold text-gray-900">
          {selectedCategory && categories.find(c => c.slug === selectedCategory)
            ? categories.find(c => c.slug === selectedCategory).name
            : 'All Products'}
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSearch} className="flex gap-4">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field flex-1"
            />
            <button type="submit" className="btn-primary">
              Search
            </button>
          </form>
        </div>

        {/* Categories */}
        {!selectedCategory && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categories.map((category) => (
                <div
                  key={category._id}
                  onClick={() => handleCategoryClick(category.slug)}
                  className="card overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="bg-gray-200">
                    {category.image ? (
                      <img
                        src={category.image.startsWith('http') ? category.image : `http://localhost:5001${category.image}`}
                        alt={category.name}
                        className="w-full h-auto object-contain"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-full h-48 flex items-center justify-center bg-gray-200">
                        <span className="text-gray-400">No Image</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.name}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{category.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Products Grid - Only show when category is selected */}
        {selectedCategory && (
          <>
            {/* Back to Categories Button */}
            <div className="mb-8">
              <button
                onClick={() => handleCategoryClick('')}
                className="btn-outline"
              >
                ← Back to All Categories
              </button>
            </div>

            {loading ? (
              <LoadingSpinner size="lg" />
            ) : products.length === 0 ? (
              <EmptyState
                title="No Products Found"
                description="Try adjusting your search or filter criteria"
                icon="products"
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <div key={product._id} className="card overflow-hidden">
                    <div className="h-48 bg-gray-200">
                      {product.image ? (
                        <img
                          src={product.image.startsWith('http') ? product.image : `http://localhost:5001${product.image}`}
                          alt={product.name}
                          className="w-full h-48 object-contain"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="w-full h-48 flex items-center justify-center bg-gray-200">
                          <span className="text-gray-400">No Image</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {product.category?.name}
                      </p>
                      <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                        {product.shortDescription}
                      </p>
                      <div className="flex gap-2">
                        <Link
                          to={`/product/${product.slug}`}
                          className="flex-1 btn-outline text-sm py-2 text-center"
                        >
                          View Details
                        </Link>
                        <Link
                          to={`/enquiry?product=${product._id}`}
                          className="flex-1 btn-primary text-sm py-2 text-center"
                        >
                          Request Quote
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Products;
