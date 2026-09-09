import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, User, LogOut, ShoppingCart } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { settingsApi } from '../../api/settingsApi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState(null);
  const { user, isAuthenticated, logout, isAdmin } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await settingsApi.getSettings();
      setSettings(response.data.settings);
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Products', href: '/products' },
    { name: 'Services', href: '/services' },
    { name: 'Industries', href: '/industries' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-secondary-800 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-6">
              <a href="tel:0141-2378454" className="flex items-center gap-2 hover:text-primary-300 transition-colors">
                <Phone className="w-4 h-4" />
                <span>0141-2378454</span>
              </a>
              <a href="mailto:info@isysinformatics.com" className="flex items-center gap-2 hover:text-primary-300 transition-colors">
                <Mail className="w-4 h-4" />
                <span>info@isysinformatics.com</span>
              </a>
              {settings?.gstNumber && (
                <span className="hover:text-primary-300 transition-colors">
                  GST: {settings.gstNumber}
                </span>
              )}
            </div>
            <div className="hidden md:flex items-center gap-4">
              <a
                href="/ISYS_Informatics_Product_Catalogue.pdf"
                download
                className="hover:text-primary-300 transition-colors"
              >
                Download Catalogue
              </a>
              <Link to="/enquiry" className="hover:text-primary-300 transition-colors">
                Request Quote
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            {settings?.logo ? (
              <img
                src={settings.logo.startsWith('http') ? settings.logo : `http://localhost:5001${settings.logo}`}
                alt="Company Logo"
                className="h-12 w-auto object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            ) : (
              <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">IS</span>
              </div>
            )}
            <div className="text-2xl font-bold text-primary-600 leading-tight">
              ISYS INFORMATICS
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-primary-600'
                    : 'text-gray-700 hover:text-primary-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {isAdmin ? (
                  <Link
                    to="/admin/dashboard"
                    className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-primary-600"
                  >
                    <User className="w-4 h-4" />
                    Admin Dashboard
                  </Link>
                ) : (
                  <Link
                    to="/customer/dashboard"
                    className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-primary-600"
                  >
                    <User className="w-4 h-4" />
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-red-600"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-700 hover:text-primary-600"
                >
                  Login
                </Link>
                <Link
                  to="/customer/register"
                  className="btn-primary text-sm"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(item.href)
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-200 mt-4">
              {isAuthenticated ? (
                <>
                  {isAdmin ? (
                    <Link
                      to="/admin/dashboard"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  ) : (
                    <Link
                      to="/customer/dashboard"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsOpen(false)}
                    >
                      Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/customer/register"
                    className="block px-3 py-2 rounded-md text-base font-medium text-primary-600 hover:bg-primary-50"
                    onClick={() => setIsOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
