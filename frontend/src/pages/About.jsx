import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen">
      <div className="page-header">
        <h1 className="text-3xl font-bold text-gray-900">About ISYS INFORMATICS</h1>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="prose max-w-none">
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Company Overview</h2>
            <p className="text-gray-700 mb-4">
              ISYS INFORMATICS is a leading provider of integrated industrial and security solutions, 
              serving organizations across hospitality, healthcare, manufacturing, retail, education, 
              and government sectors. Based in Jaipur, Rajasthan, we specialize in delivering 
              comprehensive solutions that enhance security, safety, and operational efficiency.
            </p>
            <p className="text-gray-700 mb-4">
              With years of experience in the industry, we have established ourselves as a trusted 
              partner for businesses seeking reliable products and professional services. Our commitment 
              to quality, innovation, and customer satisfaction has earned us a reputation as a 
              preferred solution provider in the region.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Solutions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Security & Surveillance</h3>
                <p className="text-gray-700">
                  CCTV systems, biometric access control, RFID systems, GPS tracking, and comprehensive 
                  security solutions for complete premises protection.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Fire & Safety</h3>
                <p className="text-gray-700">
                  Fire extinguishers, smoke detectors, fire alarm systems, and safety equipment to 
                  ensure workplace safety and regulatory compliance.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Material Handling</h3>
                <p className="text-gray-700">
                  Pallets, stackers, trolleys, and complete material handling solutions for efficient 
                  warehouse and logistics operations.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Industrial Storage</h3>
                <p className="text-gray-700">
                  Chemical tanks, industrial bins, racking systems, and storage solutions designed 
                  for heavy-duty industrial applications.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Cleaning Solutions</h3>
                <p className="text-gray-700">
                  Industrial vacuum cleaners, scrubbers, cleaning chemicals, and complete cleaning 
                  equipment for facility maintenance.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Installation & AMC</h3>
                <p className="text-gray-700">
                  Professional installation services and comprehensive annual maintenance contracts 
                  for all our products and solutions.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Choose ISYS INFORMATICS?</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-primary-600 font-bold">•</span>
                <span>Comprehensive product portfolio across multiple categories</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary-600 font-bold">•</span>
                <span>Professional installation and maintenance services</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary-600 font-bold">•</span>
                <span>Quality products from trusted manufacturers</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary-600 font-bold">•</span>
                <span>Experienced team of technicians and engineers</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary-600 font-bold">•</span>
                <span>Customer-centric approach with responsive support</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary-600 font-bold">•</span>
                <span>Competitive pricing with value-added services</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary-600 font-bold">•</span>
                <span>Proven track record with esteemed clients</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment</h2>
            <p className="text-gray-700 mb-4">
              At ISYS INFORMATICS, we are committed to delivering excellence in every aspect of our 
              business. From product selection to installation and after-sales support, we ensure that 
              our clients receive the highest quality service and solutions tailored to their specific needs.
            </p>
            <p className="text-gray-700">
              Our customer-centric approach means that we work closely with our clients to understand 
              their requirements and provide customized solutions that deliver measurable results. We 
              believe in building long-term relationships based on trust, reliability, and mutual success.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
