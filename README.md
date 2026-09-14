############### Test Login Credentails 
Admin: admin@isysinformatics.com / ChangeMe@123
Customer: customer@test.com / Customer@123
Technician: technician@test.com / Technician@123
 
# ISYS INFORMATICS - B2B Industrial Solutions Website

A complete production-ready full-stack web application for ISYS INFORMATICS, a B2B industrial products and security solutions company. The application includes customer-facing features for browsing products, submitting enquiries, and managing service requests, along with comprehensive admin and technician portals for managing all aspects of the business.

## 🌟 Features

### Customer Features
- **Product Browsing**: Browse products by category with search and filtering
- **Product Details**: View detailed product information with specifications
- **Enquiry System**: Submit product enquiries and request quotations
- **Customer Dashboard**: Track enquiries, service requests, and profile
- **Service Requests**: Submit installation, AMC, and maintenance requests
- **Contact Forms**: General contact and callback request forms
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

### Admin Features
- **Dashboard**: Real-time statistics and analytics
- **Product Management**: Full CRUD operations with image upload
- **Category Management**: Organize products into categories with image upload
- **Enquiry Management**: Track and manage customer enquiries
- **Service Request Management**: Handle installation and maintenance requests
- **Customer Management**: View and manage customer accounts
- **Technician Management**: Create and manage technician accounts
- **Technician Assignment**: Assign service requests to technicians
- **Complaints Management**: Handle customer complaints
- **Messages Management**: Manage contact form submissions
- **Services Management**: Manage service offerings
- **Company Settings**: Configure company information, logo, GST number, and content
- **Profile Management**: Admin profile and logout controls

### Technician Features
- **Technician Dashboard**: View assigned service requests and statistics
- **Service Request Management**: View details, update status, add notes
- **Timeline/History**: Track request history and changes
- **Profile Management**: Technician profile management

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI framework
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling framework
- **Axios** - HTTP client
- **Lucide React** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Multer** - File upload handling

## 📁 Project Structure

```
isys-informatics/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── api/            # API layer and axios configuration
│   │   ├── components/     # Reusable React components
│   │   │   ├── common/     # Common components (LoadingSpinner, Notification, etc.)
│   │   │   └── layout/     # Layout components (Navbar, Footer)
│   │   ├── context/        # React context for state management
│   │   ├── layouts/        # Page layouts (AdminLayout, CustomerLayout, TechnicianLayout)
│   │   ├── pages/          # Page components
│   │   │   ├── admin/      # Admin pages
│   │   │   ├── customer/   # Customer pages
│   │   │   └── technician/ # Technician pages
│   │   ├── App.jsx         # Main App component
│   │   └── main.jsx        # Application entry point
│   ├── public/             # Public assets
│   ├── index.html          # HTML template
│   ├── vite.config.js      # Vite configuration
│   ├── tailwind.config.js  # Tailwind CSS configuration
│   └── package.json        # Frontend dependencies
│
├── backend/                # Express backend application
│   ├── config/             # Configuration files
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Express middleware
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── utils/              # Utility functions (upload.js)
│   ├── uploads/            # File upload directory
│   ├── seed/               # Database seed script
│   ├── server.js           # Express server entry point
│   └── package.json        # Backend dependencies
│
├── .gitignore              # Git ignore rules
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd isys-informatics
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Configuration**

   Create a `.env` file in the `backend` directory:
   ```env
   # Server Configuration
   PORT=5001
   NODE_ENV=development

   # MongoDB Configuration
   MONGO_URI=mongodb://localhost:27017/isys-informatics

   # JWT Configuration
   JWT_SECRET=isys_informatics_jwt_secret_key_2024_secure
   JWT_EXPIRE=7d

   # Client URL
   CLIENT_URL=http://localhost:5173

   # Upload Configuration
   UPLOAD_DIR=./uploads
   MAX_FILE_SIZE=5242880

   # Admin Configuration (for seed script)
   ADMIN_EMAIL=admin@isysinformatics.com
   ADMIN_PASSWORD=ChangeMe@123
   ```

5. **Start MongoDB**
   ```bash
   # Make sure MongoDB is running on your system
   # Default connection: mongodb://localhost:27017
   ```

6. **Seed the Database**
   ```bash
   cd backend
   npm run seed
   ```
   This will create:
   - 9 product categories
   - Sample products with specifications
   - Service offerings
   - Admin user (email: admin@isysinformatics.com, password: ChangeMe@123)
   - Company settings

7. **Start the Application**
   ```bash
   cd ..
   npm run dev
   ```
   This will start both frontend and backend concurrently:
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5001

## 🔐 Default Credentials

### Admin Account
- **Email**: admin@isysinformatics.com
- **Password**: ChangeMe@123

### Customer Account
- Register a new account at `/customer/register`

### Technician Account
- Created by admin via Admin Panel → Technicians

## 📱 Application URLs

### Frontend
- **Home**: http://localhost:5173/
- **Login**: http://localhost:5173/login
- **Customer Register**: http://localhost:5173/customer/register
- **Admin Dashboard**: http://localhost:5173/admin/dashboard
- **Customer Dashboard**: http://localhost:5173/customer/dashboard
- **Technician Dashboard**: http://localhost:5173/technician/dashboard

### Backend API
- **API Base URL**: http://localhost:5001/api
- **Health Check**: http://localhost:5001/api/health

## 🎯 Main Features

### Public Pages
- **Home**: Company overview, product slider, and featured products
- **About**: Company information and approach
- **Products**: Product catalog with category-driven browsing
- **Product Details**: Detailed product information with enquiry form
- **Services**: Service offerings
- **Industries**: Industries served
- **Contact**: Contact form and company information
- **Enquiry**: General enquiry form

### Customer Portal
- **Dashboard**: Overview of enquiries and service requests
- **My Enquiries**: Track product enquiry status
- **Service Requests**: Submit and track service requests
- **Profile**: Manage account information

### Admin Panel
- **Dashboard**: Business statistics and recent activity
- **Categories**: Manage product categories with image upload
- **Products**: Manage products with image upload
- **Customers**: View customer information
- **Technicians**: Create and manage technician accounts
- **Enquiries**: Manage customer enquiries
- **Service Requests**: Handle service requests and assign to technicians
- **Complaints**: Manage customer complaints
- **Messages**: Manage contact form submissions
- **Services**: Manage service offerings
- **Settings**: Configure company information, logo, GST number
- **Profile**: Admin profile management

### Technician Portal
- **Dashboard**: View assigned service requests and statistics
- **Service Requests**: View details, update status, add notes
- **Service Request Detail**: Detailed view with timeline/history
- **Profile**: Technician profile management

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Customer registration
- `POST /api/auth/login` - User login (admin, customer, technician)
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile
- `PUT /api/auth/change-password` - Change password

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:slug` - Get product by slug
- `GET /api/products/featured/all` - Get featured products
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)
- `PUT /api/products/:id/featured` - Toggle featured (Admin)
- `PUT /api/products/:id/active` - Toggle active (Admin)

### Categories
- `GET /api/categories` - Get all active categories
- `GET /api/categories/:slug` - Get category by slug
- `POST /api/categories` - Create category (Admin)
- `PUT /api/categories/:id` - Update category (Admin)
- `DELETE /api/categories/:id` - Delete category (Admin)

### Enquiries
- `POST /api/enquiries` - Create enquiry
- `GET /api/enquiries/my` - Get my enquiries (Customer)
- `GET /api/enquiries` - Get all enquiries (Admin)
- `GET /api/enquiries/:id` - Get enquiry details (Admin)
- `PUT /api/enquiries/:id/status` - Update enquiry status (Admin)
- `DELETE /api/enquiries/:id` - Delete enquiry (Admin)

### Service Requests
- `POST /api/service-requests` - Create service request (Customer)
- `GET /api/service-requests/my` - Get my service requests (Customer)
- `GET /api/service-requests/assigned` - Get assigned requests (Technician)
- `GET /api/service-requests` - Get all service requests (Admin)
- `GET /api/service-requests/:id` - Get service request details
- `PUT /api/service-requests/:id` - Update service request (Admin/Technician)
- `DELETE /api/service-requests/:id` - Delete service request (Admin)

### Contact
- `POST /api/contact` - Submit contact message
- `GET /api/contact` - Get all contact messages (Admin)
- `GET /api/contact/:id` - Get contact message details (Admin)
- `PUT /api/contact/:id` - Update contact message (Admin)
- `DELETE /api/contact/:id` - Delete contact message (Admin)

### Settings
- `GET /api/settings` - Get company settings
- `PUT /api/settings` - Update company settings (Admin) - Supports logo upload

## 🎨 Design System

### Colors
- **Primary**: Professional blue (#0073e6)
- **Secondary**: Dark navy (#627d98)
- **Background**: White / Light gray
- **Accent**: Subtle red for CTAs

### Typography
- Clean, professional fonts
- Readable at all screen sizes
- Consistent heading hierarchy

### Components
- Modern cards with soft shadows
- Rounded corners
- Professional icons (Lucide React)
- Responsive layouts
- Loading states and error handling
- Collapsible admin sidebar

## 🔒 Security Features

- **Password Hashing**: bcrypt for secure password storage
- **JWT Authentication**: Token-based authentication
- **Protected Routes**: Role-based access control (Admin, Customer, Technician)
- **Input Validation**: Server-side validation
- **CORS Configuration**: Proper CORS setup for image uploads
- **Helmet**: Security headers (disabled for uploads)
- **Rate Limiting**: Protection against brute force attacks
- **Environment Variables**: Sensitive data in .env files

## 📦 Building for Production

### Backend
```bash
cd backend
npm start
```

### Frontend
```bash
cd frontend
npm run build
```

The built files will be in the `frontend/dist` directory.

## 🚀 Deployment

### Backend Deployment
1. Set up a MongoDB instance (MongoDB Atlas or self-hosted)
2. Configure environment variables on your server
3. Deploy the backend code
4. Install dependencies: `npm install --production`
5. Start the server: `npm start`
6. Use a process manager like PM2 for production

### Frontend Deployment
1. Build the frontend: `npm run build`
2. Deploy the `dist` folder to your web server
3. Configure your web server to serve the static files
4. Set up proper routing for SPA (single page application)

## 🧪 Testing

### Manual Testing Checklist
- [ ] User registration and login (customer, admin, technician)
- [ ] Product browsing and category filtering
- [ ] Enquiry submission
- [ ] Service request submission
- [ ] Admin authentication and dashboard
- [ ] Product CRUD operations with image upload
- [ ] Category management with image upload
- [ ] Technician creation and assignment
- [ ] Technician dashboard and service request updates
- [ ] Company settings with logo upload
- [ ] Responsive design on mobile/tablet/desktop

## 📝 Environment Variables

### Backend (.env)
```env
PORT=5001
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/isys-informatics
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880
ADMIN_EMAIL=admin@isysinformatics.com
ADMIN_PASSWORD=ChangeMe@123
```

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Error**
- Ensure MongoDB is running
- Check MONGO_URI in .env file
- Verify MongoDB credentials

**Frontend Build Errors**
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version (requires v16+)

**Image Upload Issues**
- Ensure uploads directory exists
- Check file size limits in MAX_FILE_SIZE
- Verify Multer configuration
- Check CORS settings for uploads

**Logo Not Displaying**
- Ensure backend is running on port 5001
- Check if logo file exists in uploads directory
- Verify CORS configuration in server.js

**Technician Dashboard Blank**
- Check if technician is assigned to any service requests
- Verify technician authentication token
- Check browser console for errors

## 📞 Support

For support and inquiries:
- **Email**: info@isysinformatics.com
- **Phone**: 0141-2378454
- **Mobile**: +91-9414058322

## 📄 License

This project is proprietary software for ISYS INFORMATICS.

## 👥 Development Team

Developed for ISYS INFORMATICS
- Company: ISYS INFORMATICS
- Location: Jaipur, Rajasthan, India
- Website: Built with modern web technologies

---

**Note**: This is a production-ready B2B web application designed for ISYS INFORMATICS. All features are fully functional and connected to a real MongoDB database. The application follows industry best practices for security, performance, and user experience.
