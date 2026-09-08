const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const Category = require('../models/Category');
const Product = require('../models/Product');
const Service = require('../models/Service');
const User = require('../models/User');
const CompanySettings = require('../models/CompanySettings');

dotenv.config();

// Seed data
const categories = [
  {
    name: 'Surveillance, Security & Access Control',
    slug: 'surveillance-security-access-control',
    description: 'CCTV cameras, biometric systems, access control devices, and complete security solutions',
    image: '/uploads/category-security.jpg',
    active: true
  },
  {
    name: 'Entrance & Road Safety Solutions',
    slug: 'entrance-road-safety-solutions',
    description: 'Boom barriers, bollards, road safety equipment, and traffic management solutions',
    image: '/uploads/category-road-safety.jpg',
    active: true
  },
  {
    name: 'Scanning, Screening & Power Solutions',
    slug: 'scanning-screening-power-solutions',
    description: 'Baggage scanners, metal detectors, safes, and power management equipment',
    image: '/uploads/category-scanning.jpg',
    active: true
  },
  {
    name: 'Logistics & Material Handling',
    slug: 'logistics-material-handling',
    description: 'Pallets, stackers, trolleys, and complete material handling solutions',
    image: '/uploads/category-logistics.jpg',
    active: true
  },
  {
    name: 'Insulated Ice / Vaccine Boxes & Freezers',
    slug: 'insulated-ice-vaccine-boxes-freezers',
    description: 'Ice boxes, vaccine carriers, deep freezers, and cold storage solutions',
    image: '/uploads/category-cold-storage.jpg',
    active: true
  },
  {
    name: 'Industrial Lubricants & Sprays',
    slug: 'industrial-lubricants-sprays',
    description: 'Industrial greases, lubricants, and maintenance sprays',
    image: '/uploads/category-lubricants.jpg',
    active: true
  },
  {
    name: 'Waste Management Solutions',
    slug: 'waste-management-solutions',
    description: 'Waste bins, dustbins, and complete waste management systems',
    image: '/uploads/category-waste.jpg',
    active: true
  },
  {
    name: 'Office cum Home Solutions',
    slug: 'office-home-solutions',
    description: 'Office equipment, storage solutions, and home automation products',
    image: '/uploads/category-office.jpg',
    active: true
  },
  {
    name: 'Industrial Storage Solutions',
    slug: 'industrial-storage-solutions',
    description: 'Chemical tanks, industrial bins, racking systems, and storage solutions',
    image: '/uploads/category-storage.jpg',
    active: true
  }
];

const products = [
  // Category 1: Surveillance, Security & Access Control
  {
    name: 'Biometric Machine',
    slug: 'biometric-machine',
    sku: 'SEC-BIO-001',
    category: 'surveillance-security-access-control',
    shortDescription: 'Advanced biometric authentication system with fingerprint, card, password, and face recognition',
    description: 'State-of-the-art biometric machine supporting multiple authentication methods including fingerprint, card, password, and face recognition. Ideal for secure access control in offices, factories, and high-security areas.',
    specifications: 'Fingerprint sensor, Card reader, Face recognition, Password support, TCP/IP connectivity',
    image: '/uploads/biometric-machine.jpg',
    featured: true,
    active: true,
    enquiryEnabled: true,
    tags: ['biometric', 'access control', 'security', 'fingerprint']
  },
  {
    name: 'CCTV Camera',
    slug: 'cctv-camera',
    sku: 'SEC-CCTV-001',
    category: 'surveillance-security-access-control',
    shortDescription: 'High-definition CCTV camera for surveillance and security monitoring',
    description: 'Professional CCTV camera with high-definition video recording, night vision, and remote monitoring capabilities. Perfect for 24/7 surveillance of premises.',
    specifications: 'HD resolution, Night vision, Remote access, Motion detection, Weatherproof',
    image: '/uploads/cctv-camera.jpg',
    featured: true,
    active: true,
    enquiryEnabled: true,
    tags: ['cctv', 'camera', 'surveillance', 'security']
  },
  {
    name: 'Access Control Device',
    slug: 'access-control-device',
    sku: 'SEC-ACC-001',
    category: 'surveillance-security-access-control',
    shortDescription: 'Electronic access control system for secure entry management',
    description: 'Advanced access control device for managing secure entry points. Supports multiple authentication methods and integrates with existing security systems.',
    specifications: 'Multiple authentication, Integration support, Audit trail, Remote management',
    image: '/uploads/access-control.jpg',
    featured: false,
    active: true,
    enquiryEnabled: true,
    tags: ['access control', 'security', 'entry management']
  },
  {
    name: 'EM Lock',
    slug: 'em-lock',
    sku: 'SEC-EML-001',
    category: 'surveillance-security-access-control',
    shortDescription: 'Electromagnetic lock for secure door access control',
    description: 'Heavy-duty electromagnetic lock providing secure door control. Compatible with most access control systems.',
    specifications: '600lbs holding force, 12V/24V operation, Fail-safe/fail-secure options',
    image: '/uploads/em-lock.jpg',
    featured: false,
    active: true,
    enquiryEnabled: true,
    tags: ['em lock', 'door lock', 'access control', 'security']
  },
  {
    name: 'GPS Tracker',
    slug: 'gps-tracker',
    sku: 'SEC-GPS-001',
    category: 'surveillance-security-access-control',
    shortDescription: 'Real-time GPS tracking system for vehicles and assets',
    description: 'Advanced GPS tracker with real-time location monitoring, geofencing, and route tracking. Ideal for fleet management and asset security.',
    specifications: 'Real-time tracking, Geofencing, Route history, Mobile app support',
    image: '/uploads/gps-tracker.jpg',
    featured: false,
    active: true,
    enquiryEnabled: true,
    tags: ['gps', 'tracker', 'vehicle tracking', 'fleet management']
  },

  // Category 2: Entrance & Road Safety Solutions
  {
    name: 'Boom Barrier',
    slug: 'boom-barrier',
    sku: 'ENT-BB-001',
    category: 'entrance-road-safety-solutions',
    shortDescription: 'Automatic boom barrier for vehicle access control',
    description: 'Heavy-duty automatic boom barrier for controlling vehicle access at parking lots, toll booths, and secure entrances.',
    specifications: '6m arm length, Motorized operation, Safety sensors, Remote control',
    image: '/uploads/boom-barrier.jpg',
    featured: true,
    active: true,
    enquiryEnabled: true,
    tags: ['boom barrier', 'parking', 'access control', 'traffic']
  },
  {
    name: 'Speed Breaker',
    slug: 'speed-breaker',
    sku: 'ENT-SB-001',
    category: 'entrance-road-safety-solutions',
    shortDescription: 'Rubber speed breaker for traffic speed control',
    description: 'High-visibility rubber speed breaker for effective traffic speed management. Durable and weather-resistant.',
    specifications: 'Rubber construction, Reflective markers, Easy installation, Heavy-duty',
    image: '/uploads/speed-breaker.jpg',
    featured: false,
    active: true,
    enquiryEnabled: true,
    tags: ['speed breaker', 'traffic safety', 'road safety']
  },
  {
    name: 'Traffic Cone',
    slug: 'traffic-cone',
    sku: 'ENT-TC-001',
    category: 'entrance-road-safety-solutions',
    shortDescription: 'High-visibility traffic cone for traffic management',
    description: 'Bright orange traffic cone with reflective bands for effective traffic direction and safety.',
    specifications: '750mm height, Reflective bands, Stackable, UV resistant',
    image: '/uploads/traffic-cone.jpg',
    featured: false,
    active: true,
    enquiryEnabled: true,
    tags: ['traffic cone', 'traffic safety', 'road safety']
  },
  {
    name: 'Fire Extinguisher',
    slug: 'fire-extinguisher',
    sku: 'ENT-FE-001',
    category: 'entrance-road-safety-solutions',
    shortDescription: 'ABC fire extinguisher for fire safety',
    description: 'Multi-purpose ABC fire extinguisher suitable for Class A, B, and C fires. Essential for workplace safety compliance.',
    specifications: '2kg/5kg capacity, ABC type, Wall mountable, ISI certified',
    image: '/uploads/fire-extinguisher.jpg',
    featured: true,
    active: true,
    enquiryEnabled: true,
    tags: ['fire extinguisher', 'fire safety', 'safety equipment']
  },
  {
    name: 'Smoke Detector',
    slug: 'smoke-detector',
    sku: 'ENT-SD-001',
    category: 'entrance-road-safety-solutions',
    shortDescription: 'Photoelectric smoke detector for early fire detection',
    description: 'Sensitive smoke detector with early warning system. Connects to fire alarm systems for comprehensive fire safety.',
    specifications: 'Photoelectric sensor, 85dB alarm, Low battery indicator, Interconnectable',
    image: '/uploads/smoke-detector.jpg',
    featured: false,
    active: true,
    enquiryEnabled: true,
    tags: ['smoke detector', 'fire safety', 'fire alarm']
  },

  // Category 4: Logistics & Material Handling
  {
    name: 'Hand Pallet Truck',
    slug: 'hand-pallet-truck',
    sku: 'LOG-HPT-001',
    category: 'logistics-material-handling',
    shortDescription: 'Manual hand pallet truck for material handling',
    description: 'Robust hand pallet truck for efficient material handling in warehouses and factories. Easy to operate and maintain.',
    specifications: '2-ton capacity, 115mm fork size, Nylon wheels, Ergonomic handle',
    image: '/uploads/hand-pallet-truck.jpg',
    featured: true,
    active: true,
    enquiryEnabled: true,
    tags: ['pallet truck', 'material handling', 'warehouse equipment']
  },
  {
    name: 'Platform Trolley',
    slug: 'platform-trolley',
    sku: 'LOG-PT-001',
    category: 'logistics-material-handling',
    shortDescription: 'Heavy-duty platform trolley for material transport',
    description: 'Sturdy platform trolley for transporting goods within facilities. Available in various sizes and load capacities.',
    specifications: '500kg capacity, 1200x800mm platform, Pneumatic wheels, Push handle',
    image: '/uploads/platform-trolley.jpg',
    featured: false,
    active: true,
    enquiryEnabled: true,
    tags: ['platform trolley', 'material handling', 'transport']
  },
  {
    name: 'Poly Pallet',
    slug: 'poly-pallet',
    sku: 'LOG-PP-001',
    category: 'logistics-material-handling',
    shortDescription: 'Durable poly pallet for storage and transport',
    description: 'Lightweight yet durable poly pallet for storage and material handling. Weather-resistant and easy to clean.',
    specifications: '1200x1000mm, Dynamic load 1-ton, Static load 4-ton, HDPE material',
    image: '/uploads/poly-pallet.jpg',
    featured: false,
    active: true,
    enquiryEnabled: true,
    tags: ['poly pallet', 'storage', 'material handling']
  },
  {
    name: 'Industrial Crate',
    slug: 'industrial-crate',
    sku: 'LOG-IC-001',
    category: 'logistics-material-handling',
    shortDescription: 'Ventilated industrial crate for storage',
    description: 'Perforated industrial crate for storage and transport of goods. Allows ventilation and visibility of contents.',
    specifications: '600x400x300mm, Stackable, Ventilated sides, HDPE material',
    image: '/uploads/industrial-crate.jpg',
    featured: false,
    active: true,
    enquiryEnabled: true,
    tags: ['industrial crate', 'storage', 'ventilated']
  },

  // Category 5: Insulated Ice / Vaccine Boxes & Freezers
  {
    name: 'Ice Box',
    slug: 'ice-box',
    sku: 'ICE-IB-001',
    category: 'insulated-ice-vaccine-boxes-freezers',
    shortDescription: 'Insulated ice box for cold storage',
    description: 'High-quality insulated ice box for maintaining temperature during transport. Available in various capacities.',
    specifications: '20L capacity, PU insulation, 24-hour ice retention, Food-grade material',
    image: '/uploads/ice-box.jpg',
    featured: true,
    active: true,
    enquiryEnabled: true,
    tags: ['ice box', 'cold storage', 'insulated']
  },
  {
    name: 'Deep Freezer',
    sku: 'ICE-DF-001',
    slug: 'deep-freezer',
    category: 'insulated-ice-vaccine-boxes-freezers',
    shortDescription: 'Commercial deep freezer for frozen storage',
    description: 'Energy-efficient deep freezer for commercial frozen storage. Reliable temperature control for perishable items.',
    specifications: '300L capacity, -18°C operation, Digital temperature display, Energy efficient',
    image: '/uploads/deep-freezer.jpg',
    featured: false,
    active: true,
    enquiryEnabled: true,
    tags: ['deep freezer', 'refrigeration', 'cold storage']
  },
  {
    name: 'Vaccine Carrier',
    slug: 'vaccine-carrier',
    sku: 'ICE-VC-001',
    category: 'insulated-ice-vaccine-boxes-freezers',
    shortDescription: 'Insulated vaccine carrier for medical transport',
    description: 'WHO-compliant vaccine carrier for safe transport of vaccines and medicines. Maintains required temperature range.',
    specifications: '5L capacity, Cold pack compatible, Temperature monitor, Medical grade',
    image: '/uploads/vaccine-carrier.jpg',
    featured: false,
    active: true,
    enquiryEnabled: true,
    tags: ['vaccine carrier', 'medical', 'cold chain']
  },

  // Category 6: Waste Management Solutions
  {
    name: 'Waste Bin',
    slug: 'waste-bin',
    sku: 'WST-WB-001',
    category: 'waste-management-solutions',
    shortDescription: 'Heavy-duty waste bin for waste management',
    description: 'Durable waste bin for effective waste management. Available in various sizes and colors for segregation.',
    specifications: '100L capacity, HDPE material, Pedal operated, Leak-proof',
    image: '/uploads/waste-bin.jpg',
    featured: true,
    active: true,
    enquiryEnabled: true,
    tags: ['waste bin', 'waste management', 'sanitation']
  },
  {
    name: 'Wheel Barrow',
    slug: 'wheel-barrow',
    sku: 'WST-WB-002',
    category: 'waste-management-solutions',
    shortDescription: 'Heavy-duty wheel barrow for waste transport',
    description: 'Robust wheel barrow for efficient waste transport and material handling. Pneumatic wheels for smooth operation.',
    specifications: '100L capacity, Steel tray, Pneumatic wheels, Ergonomic handles',
    image: '/uploads/wheel-barrow.jpg',
    featured: false,
    active: true,
    enquiryEnabled: true,
    tags: ['wheel barrow', 'transport', 'material handling']
  },
  {
    name: 'Foot Operated Dust Bin',
    slug: 'foot-operated-dust-bin',
    sku: 'WST-FB-001',
    category: 'waste-management-solutions',
    shortDescription: 'Hygienic foot-operated dust bin',
    description: 'Hands-free foot-operated dust bin for hygienic waste disposal. Ideal for healthcare and food service areas.',
    specifications: '50L capacity, Stainless steel body, Pedal operation, Removable inner bin',
    image: '/uploads/foot-operated-dust-bin.jpg',
    featured: false,
    active: true,
    enquiryEnabled: true,
    tags: ['dust bin', 'hygienic', 'foot operated']
  },

  // Category 7: Office cum Home Solutions
  {
    name: 'File Racking System',
    slug: 'file-racking-system',
    sku: 'OFC-FRS-001',
    category: 'office-home-solutions',
    shortDescription: 'Modular file racking system for document storage',
    description: 'Space-efficient file racking system for organized document storage. Adjustable shelves for flexibility.',
    specifications: '5-tier system, Adjustable shelves, Powder-coated finish, 50kg per shelf',
    image: '/uploads/file-racking-system.jpg',
    featured: false,
    active: true,
    enquiryEnabled: true,
    tags: ['file racking', 'storage', 'office', 'document storage']
  },
  {
    name: 'First Aid Box',
    slug: 'first-aid-box',
    sku: 'OFC-FAB-001',
    category: 'office-home-solutions',
    shortDescription: 'Comprehensive first aid box for emergency response',
    description: 'Well-stocked first aid box meeting safety standards. Essential for workplace safety compliance.',
    specifications: 'Wall mountable, Complete kit, Refillable, Weather-resistant',
    image: '/uploads/first-aid-box.jpg',
    featured: true,
    active: true,
    enquiryEnabled: true,
    tags: ['first aid', 'safety', 'emergency', 'medical']
  },
  {
    name: 'Air Curtain',
    slug: 'air-curtain',
    sku: 'OFC-AC-001',
    category: 'office-home-solutions',
    shortDescription: 'Commercial air curtain for climate control',
    description: 'High-velocity air curtain for maintaining indoor climate and preventing insect entry. Energy-efficient operation.',
    specifications: '1200mm width, 3-speed control, Remote operation, Low noise',
    image: '/uploads/air-curtain.jpg',
    featured: false,
    active: true,
    enquiryEnabled: true,
    tags: ['air curtain', 'climate control', 'commercial']
  },

  // Category 8: Industrial Storage Solutions
  {
    name: 'Chemical Tank',
    slug: 'chemical-tank',
    sku: 'IND-CT-001',
    category: 'industrial-storage-solutions',
    shortDescription: 'Heavy-duty chemical tank for chemical storage',
    description: 'UV-stabilized chemical tank for safe chemical storage. Available in various capacities for different industrial needs.',
    specifications: '1000L capacity, HDPE material, UV stabilized, Leak-proof design',
    image: '/uploads/chemical-tank.jpg',
    featured: true,
    active: true,
    enquiryEnabled: true,
    tags: ['chemical tank', 'storage', 'industrial', 'hdpe']
  },
  {
    name: 'Industrial Racking System',
    slug: 'industrial-racking-system',
    sku: 'IND-IRS-001',
    category: 'industrial-storage-solutions',
    shortDescription: 'Heavy-duty industrial racking system',
    description: 'Robust industrial racking system for warehouse storage. High load capacity with adjustable beam levels.',
    specifications: '5-ton capacity per level, Bolted construction, Powder-coated, Easy assembly',
    image: '/uploads/industrial-racking-system.jpg',
    featured: false,
    active: true,
    enquiryEnabled: true,
    tags: ['racking system', 'warehouse', 'storage', 'industrial']
  },
  {
    name: 'Industrial Bin',
    slug: 'industrial-bin',
    sku: 'IND-IB-001',
    category: 'industrial-storage-solutions',
    shortDescription: 'Heavy-duty industrial bin for storage',
    description: 'Durable industrial bin for bulk storage and material handling. Stackable design for space efficiency.',
    specifications: '60L capacity, Reinforced base, Stackable, HDPE material',
    image: '/uploads/industrial-bin.jpg',
    featured: false,
    active: true,
    enquiryEnabled: true,
    tags: ['industrial bin', 'storage', 'bulk storage']
  }
];

const services = [
  {
    name: 'Security System Installation',
    slug: 'security-system-installation',
    shortDescription: 'Professional installation of CCTV, access control, and security systems',
    description: 'Complete security system installation including CCTV cameras, access control systems, biometric devices, and integrated security solutions. Our certified technicians ensure proper installation and configuration.',
    icon: '🔒',
    active: true
  },
  {
    name: 'Fire Safety Installation',
    slug: 'fire-safety-installation',
    shortDescription: 'Fire alarm and fire safety system installation',
    description: 'Installation of fire alarm systems, smoke detectors, fire extinguishers, and complete fire safety solutions as per regulatory requirements.',
    icon: '🔥',
    active: true
  },
  {
    name: 'AMC & Maintenance',
    slug: 'amc-maintenance',
    shortDescription: 'Annual maintenance contracts for all installed systems',
    description: 'Comprehensive annual maintenance contracts for security systems, fire safety equipment, and other installations. Regular maintenance, quick response, and priority support.',
    icon: '🔧',
    active: true
  },
  {
    name: 'Industrial Storage Solutions',
    slug: 'industrial-storage-solutions',
    shortDescription: 'Customized industrial storage and racking solutions',
    description: 'Design and installation of industrial storage systems including racking, shelving, and material handling equipment customized to your specific requirements.',
    icon: '🏭',
    active: true
  },
  {
    name: 'Material Handling Solutions',
    slug: 'material-handling-solutions',
    shortDescription: 'Complete material handling and logistics solutions',
    description: 'End-to-end material handling solutions including equipment supply, installation, and optimization for warehouses and manufacturing facilities.',
    icon: '📦',
    active: true
  },
  {
    name: 'Site Survey',
    slug: 'site-survey',
    shortDescription: 'Professional site assessment and solution recommendations',
    description: 'Comprehensive site survey to assess requirements and recommend optimal solutions for security, safety, storage, and material handling needs.',
    icon: '📋',
    active: true
  },
  {
    name: 'Customized Industrial Solutions',
    slug: 'customized-industrial-solutions',
    shortDescription: 'Tailored solutions for specific industrial requirements',
    description: 'Custom-designed solutions to meet unique industrial challenges. Our team works closely with clients to develop specialized solutions.',
    icon: '⚙️',
    active: true
  }
];

const companySettings = {
  companyName: 'ISYS INFORMATICS',
  address: 'CITY CENTER, SANSAR CHANDRA ROAD, JAIPUR, RAJASTHAN - 302001',
  phone: '0141-2378454',
  mobile: '+91-9414058322',
  email: 'info@isysinformatics.com',
  whatsappNumber: '+91-9414058322',
  aboutText: 'ISYS INFORMATICS is a leading provider of integrated industrial and security solutions, serving organizations across hospitality, healthcare, manufacturing, retail, education, and government sectors. Based in Jaipur, Rajasthan, we specialize in delivering comprehensive solutions that enhance security, safety, and operational efficiency.',
  footerText: 'Your trusted partner for industrial and security solutions',
  socialMedia: {
    facebook: '',
    twitter: '',
    linkedin: '',
    instagram: ''
  },
  homepageHero: {
    headline: 'Complete Industrial & Security Solutions Under One Roof',
    subheading: 'Reliable products and professional solutions for security, safety, material handling, industrial storage, cleaning, automation and facility management.',
    backgroundImage: ''
  },
  homepageCTA: {
    text: 'Request Quote',
    link: '/enquiry'
  },
  certifications: 'ISO 9001:2008 Certified',
  googleMapsUrl: ''
};

async function seed() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');

    // Clear existing data
    console.log('Clearing existing data...');
    await Category.deleteMany({});
    await Product.deleteMany({});
    await Service.deleteMany({});
    await User.deleteMany({});
    await CompanySettings.deleteMany({});

    // Seed Categories
    console.log('Seeding categories...');
    const createdCategories = await Category.insertMany(categories);
    console.log(`${createdCategories.length} categories created`);

    // Create category slug to ID mapping
    const categoryMap = {};
    createdCategories.forEach(cat => {
      categoryMap[cat.slug] = cat._id;
    });

    // Seed Products
    console.log('Seeding products...');
    const productsWithCategoryIds = products.map(product => ({
      ...product,
      category: categoryMap[product.category]
    }));
    const createdProducts = await Product.insertMany(productsWithCategoryIds);
    console.log(`${createdProducts.length} products created`);

    // Seed Services
    console.log('Seeding services...');
    const createdServices = await Service.insertMany(services);
    console.log(`${createdServices.length} services created`);

    // Seed Admin User
    console.log('Seeding admin user...');
    const adminUser = await User.create({
      name: 'Admin',
      email: process.env.ADMIN_EMAIL || 'admin@isysinformatics.com',
      password: process.env.ADMIN_PASSWORD || 'ChangeMe@123',
      role: 'admin',
      isActive: true
    });
    console.log('Admin user created');

    // Seed Company Settings
    console.log('Seeding company settings...');
    await CompanySettings.create(companySettings);
    console.log('Company settings created');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();
