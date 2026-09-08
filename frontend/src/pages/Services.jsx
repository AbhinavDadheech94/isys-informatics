import React, { useState, useEffect } from 'react';
import { servicesApi } from '../api/servicesApi';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';
import { Wrench, Shield, Factory, Zap, Truck, Building2, Users, Settings } from 'lucide-react';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const response = await servicesApi.getServices();
      setServices(response.data.services);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (serviceName) => {
    const name = serviceName?.toLowerCase() || '';
    if (name.includes('security') || name.includes('surveillance')) return <Shield className="w-8 h-8" />;
    if (name.includes('industrial') || name.includes('storage')) return <Factory className="w-8 h-8" />;
    if (name.includes('fire') || name.includes('safety')) return <Zap className="w-8 h-8" />;
    if (name.includes('material') || name.includes('handling')) return <Truck className="w-8 h-8" />;
    if (name.includes('installation') || name.includes('maintenance')) return <Wrench className="w-8 h-8" />;
    if (name.includes('building') || name.includes('office')) return <Building2 className="w-8 h-8" />;
    if (name.includes('consulting') || name.includes('survey')) return <Users className="w-8 h-8" />;
    return <Settings className="w-8 h-8" />;
  };

  return (
    <div className="min-h-screen">
      <div className="page-header">
        <h1 className="text-3xl font-bold text-gray-900">Our Services</h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <LoadingSpinner size="lg" />
        ) : services.length === 0 ? (
          <EmptyState
            title="No Services Available"
            description="Check back later for our service offerings"
            icon="settings"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service._id} className="card p-6">
                <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center mb-4 text-primary-600">
                  {getIcon(service.name)}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.name}</h3>
                <p className="text-gray-600 mb-4">{service.shortDescription}</p>
                {service.description && (
                  <p className="text-sm text-gray-500 line-clamp-3">{service.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Default Services Display */}
        {services.length === 0 && !loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center mb-4 text-primary-600">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Security System Installation</h3>
              <p className="text-gray-600">
                Professional installation of CCTV, access control, and security systems
              </p>
            </div>
            <div className="card p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center mb-4 text-primary-600">
                <Wrench className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AMC & Maintenance</h3>
              <p className="text-gray-600">
                Comprehensive annual maintenance contracts for all installed systems
              </p>
            </div>
            <div className="card p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center mb-4 text-primary-600">
                <Factory className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Industrial Solutions</h3>
              <p className="text-gray-600">
                Customized industrial storage and material handling solutions
              </p>
            </div>
            <div className="card p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center mb-4 text-primary-600">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fire Safety Installation</h3>
              <p className="text-gray-600">
                Complete fire alarm and safety system installation and maintenance
              </p>
            </div>
            <div className="card p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center mb-4 text-primary-600">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Site Survey</h3>
              <p className="text-gray-600">
                Professional site assessment and solution recommendations
              </p>
            </div>
            <div className="card p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center mb-4 text-primary-600">
                <Settings className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Custom Solutions</h3>
              <p className="text-gray-600">
                Tailored solutions to meet specific business requirements
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
