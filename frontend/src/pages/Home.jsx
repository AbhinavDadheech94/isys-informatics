import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Factory, Truck, Zap, Users, Building2, ChevronLeft, ChevronRight } from 'lucide-react';
import { productApi } from '../api/productApi';
import { settingsApi } from '../api/settingsApi';
import allImage from '../assets/images/all.png';
import cctvImage from '../assets/images/cctv security system.png';
import fireSafetyImage from '../assets/images/fire safety system.png';
import accessControlImage from '../assets/images/access control system.png';
import roadSafetyImage from '../assets/images/Road safety cum entrance solutions.png';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [settings, setSettings] = useState(null);

  const sliderImages = [
    allImage,
    cctvImage,
    fireSafetyImage,
    accessControlImage,
    roadSafetyImage
  ];

  useEffect(() => {
    fetchFeaturedProducts();
    fetchSettings();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await productApi.getProducts({ featured: 'true', limit: 5 });
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchSettings = async () => {
    try {
      const response = await settingsApi.getSettings();
      setSettings(response.data.settings);
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [sliderImages.length]);

  return (
    <div>
      {/* Image Slider Section */}
      <section className="relative bg-black overflow-hidden">
        <div className="relative w-full h-[83vh]">
          {sliderImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={image}
                alt=""
                className="w-full h-[83vh] object-center mt-0"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          ))}

          {/* Slider Navigation */}
          {sliderImages.length > 1 && (
            <div className="absolute bottom-4 right-4 flex gap-2 z-10">
              <button
                onClick={prevSlide}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
              >
                <ChevronLeft className="w-8 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          )}

          {/* Slider Dots */}
          {sliderImages.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
              {sliderImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Hero Content Section */}
      <section className="relative bg-gradient-to-r from-primary-800 to-secondary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <div className="max-w-3xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Complete Industrial & Security Solutions Under One Roof
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Reliable products and professional solutions for security, safety, material handling,
              industrial storage, cleaning, automation and facility management.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/products" className="btn-primary inline-flex items-center gap-2">
                Explore Products
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/enquiry" className="btn-outline border-white text-white hover:bg-white hover:text-primary-800 inline-flex items-center gap-2">
                Request a Quote
              </Link>
              <a
                href="/ISYS_Informatics_Product_Catalogue.pdf"
                download
                className="btn-outline border-white text-white hover:bg-white hover:text-primary-800 inline-flex items-center gap-2"
              >
                Download Catalogue
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose ISYS INFORMATICS?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide comprehensive solutions trusted by organizations across multiple industries
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card p-6">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Security Solutions</h3>
              <p className="text-gray-600">
                Advanced surveillance, access control, and security systems for complete protection
              </p>
            </div>
            <div className="card p-6">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <Factory className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Industrial Storage</h3>
              <p className="text-gray-600">
                Durable storage solutions and material handling equipment for efficient operations
              </p>
            </div>
            <div className="card p-6">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <Truck className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Material Handling</h3>
              <p className="text-gray-600">
                Comprehensive logistics and material handling solutions for streamlined workflows
              </p>
            </div>
            <div className="card p-6">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fire & Safety</h3>
              <p className="text-gray-600">
                Complete fire safety systems and equipment for workplace safety compliance
              </p>
            </div>
            <div className="card p-6">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Installation</h3>
              <p className="text-gray-600">
                Professional installation and maintenance services by certified technicians
              </p>
            </div>
            <div className="card p-6">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <Building2 className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AMC Services</h3>
              <p className="text-gray-600">
                Comprehensive annual maintenance contracts for hassle-free operations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Contact us today for a free consultation and quote for your industrial and security needs
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn-primary">
              Contact Us
            </Link>
            <Link to="/enquiry" className="btn-outline">
              Request Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
