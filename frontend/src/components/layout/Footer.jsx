import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { settingsApi } from '../../api/settingsApi';

const Footer = () => {
  const [settings, setSettings] = useState(null);

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

  return (
    <footer className="bg-secondary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              {settings?.logo && (
                <img
                  src={settings.logo.startsWith('http') ? settings.logo : `http://localhost:5001${settings.logo}`}
                  alt="Company Logo"
                  className="h-8 w-auto flex-shrink-0"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              )}
              <h3 className="text-base font-bold leading-tight">{settings?.companyName || 'ISYS INFORMATICS'}</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              {settings?.aboutText || 'Complete Industrial & Security Solutions for organizations across multiple sectors.'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/industries" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Industries
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Products</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/products/surveillance-security" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Security Systems
                </Link>
              </li>
              <li>
                <Link to="/products/fire-safety" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Fire Safety
                </Link>
              </li>
              <li>
                <Link to="/products/material-handling" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Material Handling
                </Link>
              </li>
              <li>
                <Link to="/products/industrial-storage" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Industrial Storage
                </Link>
              </li>
              <li>
                <Link to="/products/cleaning-solutions" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Cleaning Solutions
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-white transition-colors text-sm">
                  View All Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Installation Services
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white transition-colors text-sm">
                  AMC Services
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Maintenance
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Site Survey
                </Link>
              </li>
              <li>
                <Link to="/enquiry" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Request Quote
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-4">
              {settings?.address && (
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary-400" />
                  <span className="text-sm text-gray-300 leading-relaxed">
                    {settings.address}
                  </span>
                </div>
              )}
              {settings?.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 flex-shrink-0 text-primary-400" />
                  <a href={`tel:${settings.phone}`} className="text-sm text-gray-300 hover:text-white transition-colors">
                    {settings.phone}
                  </a>
                </div>
              )}
              {settings?.mobile && (
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 flex-shrink-0 text-primary-400" />
                  <a href={`tel:${settings.mobile}`} className="text-sm text-gray-300 hover:text-white transition-colors">
                    {settings.mobile}
                  </a>
                </div>
              )}
              {settings?.email && (
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 flex-shrink-0 text-primary-400" />
                  <a href={`mailto:${settings.email}`} className="text-sm text-gray-300 hover:text-white transition-colors">
                    {settings.email}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-3">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-sm">
            <p className="text-gray-400">
              © {new Date().getFullYear()} {settings?.companyName || 'ISYS INFORMATICS'}. All rights reserved.
            </p>
            <div className="flex items-center gap-3">
              <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms & Conditions
              </Link>
              <Link to="/sitemap" className="text-gray-400 hover:text-white transition-colors">
                Sitemap
              </Link>
            </div>
            <div className="flex items-center gap-4">
              {settings?.socialMedia?.facebook && (
                <a href={settings.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {settings?.socialMedia?.twitter && (
                <a href={settings.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
              )}
              {settings?.socialMedia?.linkedin && (
                <a href={settings.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              {settings?.socialMedia?.instagram && (
                <a href={settings.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
