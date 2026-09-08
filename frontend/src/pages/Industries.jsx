import React from 'react';
import {
  Building2,
  Hotel,
  HeartPulse,
  GraduationCap,
  Briefcase,
  Store,
  HardHat,
  Warehouse,
} from 'lucide-react';

const Industries = () => {
  const industries = [
    {
      name: 'Hotels & Hospitality',
      icon: <Hotel className="w-8 h-8" />,
      description:
        'Security systems, fire safety, and facility management solutions for hotels and resorts',
    },
    {
      name: 'Hospitals & Healthcare',
      icon: <HeartPulse className="w-8 h-8" />,
      description:
        'Specialized security and safety solutions for healthcare facilities',
    },
    {
      name: 'Educational Institutions',
      icon: <GraduationCap className="w-8 h-8" />,
      description:
        'Campus security, surveillance, and safety systems for schools and colleges',
    },
    {
      name: 'Government Organizations',
      icon: <Building2 className="w-8 h-8" />,
      description:
        'High-security solutions for government buildings and public facilities',
    },
    {
      name: 'Manufacturing',
      icon: <HardHat className="w-8 h-8" />,
      description:
        'Industrial safety, material handling, and storage solutions for manufacturing units',
    },
    {
      name: 'Automobile Industry',
      icon: <Briefcase className="w-8 h-8" />,
      description:
        'Security and safety solutions for automobile showrooms and service centers',
    },
    {
      name: 'Retail',
      icon: <Store className="w-8 h-8" />,
      description:
        'Retail security, surveillance, and loss prevention solutions',
    },
    {
      name: 'Infrastructure & Real Estate',
      icon: <Building2 className="w-8 h-8" />,
      description:
        'Comprehensive security and safety solutions for construction and real estate',
    },
    {
      name: 'Warehousing & Logistics',
      icon: <Warehouse className="w-8 h-8" />,
      description:
        'Material handling, storage, and security solutions for warehouses',
    },
    {
      name: 'Corporate Offices',
      icon: <Building2 className="w-8 h-8" />,
      description:
        'Office security, access control, and facility management solutions',
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="page-header">
        <h1 className="text-3xl font-bold text-gray-900">
          Industries We Serve
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <p className="text-gray-600 max-w-3xl mx-auto">
            ISYS INFORMATICS serves diverse industries with tailored solutions
            that meet specific operational requirements and regulatory
            standards. Our experience across multiple sectors enables us to
            deliver proven solutions backed by industry expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry, index) => (
            <div
              key={index}
              className="card p-6 hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center mb-4 text-primary-600">
                {industry.icon}
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {industry.name}
              </h3>

              <p className="text-gray-600">{industry.description}</p>
            </div>
          ))}
        </div>

        {/* Clients Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Our Esteemed Clients
          </h2>

          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[
                'The Park Classic, Jaipur',
                'IBIS Hotels',
                'Samode Hotels, Jaipur',
                'ITC Rajputana, Jaipur',
                'Apex Hospitals, Jaipur',
                'Khandaka Jain Jewellers',
                'Jaipur Haat',
                'Tordi Haveli Hotel',
                'Hero Swift Showroom',
                'OYO Rooms',
                'HPCL Petroleum Pumps',
                'Vivo',
              ].map((client, index) => (
                <div
                  key={index}
                  className="text-center p-4 bg-gray-50 rounded-lg"
                >
                  <p className="text-sm font-medium text-gray-700">
                    {client}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-center text-gray-600 mt-6">
              Trusted by organizations across multiple sectors
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Industries;