import React, { useState, useEffect } from 'react';
import { settingsApi } from '../../api/settingsApi';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { useNotification } from '../../context/NotificationContext';

const AdminSettings = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [logoFile, setLogoFile] = useState(null);
  const { success, error } = useNotification();

  const [formData, setFormData] = useState({
    companyName: '',
    address: '',
    phone: '',
    mobile: '',
    email: '',
    whatsappNumber: '',
    gstNumber: '',
    logo: '',
    aboutText: '',
    footerText: '',
    socialMedia: {
      facebook: '',
      twitter: '',
      linkedin: '',
      instagram: ''
    },
    homepageHero: {
      headline: '',
      subheading: '',
      backgroundImage: ''
    },
    homepageCTA: {
      text: '',
      link: ''
    },
    certifications: '',
    googleMapsUrl: ''
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const response = await settingsApi.getSettings();
      const settingsData = response.data.settings;
      setSettings(settingsData);
      
      if (settingsData) {
        setFormData({
          companyName: settingsData.companyName || '',
          address: settingsData.address || '',
          phone: settingsData.phone || '',
          mobile: settingsData.mobile || '',
          email: settingsData.email || '',
          whatsappNumber: settingsData.whatsappNumber || '',
          gstNumber: settingsData.gstNumber || '',
          logo: settingsData.logo || '',
          aboutText: settingsData.aboutText || '',
          footerText: settingsData.footerText || '',
          socialMedia: settingsData.socialMedia || {
            facebook: '',
            twitter: '',
            linkedin: '',
            instagram: ''
          },
          homepageHero: settingsData.homepageHero || {
            headline: '',
            subheading: '',
            backgroundImage: ''
          },
          homepageCTA: settingsData.homepageCTA || {
            text: '',
            link: ''
          },
          certifications: settingsData.certifications || '',
          googleMapsUrl: settingsData.googleMapsUrl || ''
        });
      }
    } catch (err) {
      console.error('Error fetching settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'socialMedia' || key === 'homepageHero' || key === 'homepageCTA') {
          formDataToSend.append(key, JSON.stringify(formData[key]));
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      if (logoFile) {
        formDataToSend.append('logo', logoFile);
      }

      const response = await settingsApi.updateSettings(formDataToSend);
      success('Settings updated successfully');
      fetchSettings();
      setLogoFile(null);
    } catch (err) {
      console.error('Error updating settings:', err);
      console.error('Error response:', err.response);
      error('Failed to update settings: ' + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <LoadingSpinner size="lg" />;
  }

  return (
    <div className="min-h-screen">
      <div className="page-header">
        <h1 className="text-3xl font-bold text-gray-900">Company Settings</h1>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Company Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Company Information</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name *
                </label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Logo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setLogoFile(e.target.files[0])}
                  className="input-field"
                />
                {formData.logo && (
                  <div className="mt-2">
                    <img
                      src={formData.logo.startsWith('http') ? formData.logo : `http://localhost:5001${formData.logo}`}
                      alt="Current Logo"
                      className="h-16 w-auto"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    <p className="text-xs text-gray-500 mt-1">Current logo</p>
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-1">Upload your company logo (PNG, JPG, etc.)</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  GST Number
                </label>
                <input
                  type="text"
                  value={formData.gstNumber}
                  onChange={(e) => setFormData({...formData, gstNumber: e.target.value})}
                  className="input-field"
                  placeholder="Enter GST Number"
                />
                <p className="text-xs text-gray-500 mt-1">This will be displayed on the home page</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <textarea
                  rows="3"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="input-field"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mobile
                  </label>
                  <input
                    type="text"
                    value={formData.mobile}
                    onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                    className="input-field"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    WhatsApp Number
                  </label>
                  <input
                    type="text"
                    value={formData.whatsappNumber}
                    onChange={(e) => setFormData({...formData, whatsappNumber: e.target.value})}
                    className="input-field"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Content</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  About Text
                </label>
                <textarea
                  rows="4"
                  value={formData.aboutText}
                  onChange={(e) => setFormData({...formData, aboutText: e.target.value})}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Footer Text
                </label>
                <textarea
                  rows="2"
                  value={formData.footerText}
                  onChange={(e) => setFormData({...formData, footerText: e.target.value})}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Certifications
                </label>
                <input
                  type="text"
                  value={formData.certifications}
                  onChange={(e) => setFormData({...formData, certifications: e.target.value})}
                  className="input-field"
                  placeholder="e.g., ISO 9001:2008 Certified"
                />
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Social Media</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Facebook
                </label>
                <input
                  type="url"
                  value={formData.socialMedia.facebook}
                  onChange={(e) => setFormData({
                    ...formData, 
                    socialMedia: {...formData.socialMedia, facebook: e.target.value}
                  })}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Twitter
                </label>
                <input
                  type="url"
                  value={formData.socialMedia.twitter}
                  onChange={(e) => setFormData({
                    ...formData, 
                    socialMedia: {...formData.socialMedia, twitter: e.target.value}
                  })}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  LinkedIn
                </label>
                <input
                  type="url"
                  value={formData.socialMedia.linkedin}
                  onChange={(e) => setFormData({
                    ...formData, 
                    socialMedia: {...formData.socialMedia, linkedin: e.target.value}
                  })}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Instagram
                </label>
                <input
                  type="url"
                  value={formData.socialMedia.instagram}
                  onChange={(e) => setFormData({
                    ...formData, 
                    socialMedia: {...formData.socialMedia, instagram: e.target.value}
                  })}
                  className="input-field"
                />
              </div>
            </div>
          </div>

          {/* Homepage */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Homepage</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hero Headline
                </label>
                <input
                  type="text"
                  value={formData.homepageHero.headline}
                  onChange={(e) => setFormData({
                    ...formData, 
                    homepageHero: {...formData.homepageHero, headline: e.target.value}
                  })}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hero Subheading
                </label>
                <textarea
                  rows="2"
                  value={formData.homepageHero.subheading}
                  onChange={(e) => setFormData({
                    ...formData, 
                    homepageHero: {...formData.homepageHero, subheading: e.target.value}
                  })}
                  className="input-field"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CTA Text
                  </label>
                  <input
                    type="text"
                    value={formData.homepageCTA.text}
                    onChange={(e) => setFormData({
                      ...formData, 
                      homepageCTA: {...formData.homepageCTA, text: e.target.value}
                    })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CTA Link
                  </label>
                  <input
                    type="text"
                    value={formData.homepageCTA.link}
                    onChange={(e) => setFormData({
                      ...formData, 
                      homepageCTA: {...formData.homepageCTA, link: e.target.value}
                    })}
                    className="input-field"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Maps */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Google Maps</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Google Maps URL
              </label>
              <input
                type="url"
                value={formData.googleMapsUrl}
                onChange={(e) => setFormData({...formData, googleMapsUrl: e.target.value})}
                className="input-field"
                placeholder="https://maps.google.com/..."
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="btn-primary"
            >
              {saving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminSettings;
