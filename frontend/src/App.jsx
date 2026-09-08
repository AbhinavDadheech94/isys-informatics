import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Notification from './components/common/Notification';
import ProtectedRoute from './components/common/ProtectedRoute';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Services from './pages/Services';
import Industries from './pages/Industries';
import Contact from './pages/Contact';
import Enquiry from './pages/Enquiry';
import Login from './pages/Login';

// Customer Pages
import CustomerRegister from './pages/customer/CustomerRegister';
import CustomerDashboard from './pages/customer/CustomerDashboard';
import CustomerEnquiries from './pages/customer/CustomerEnquiries';
import CustomerServiceRequests from './pages/customer/CustomerServiceRequests';
import CustomerProfile from './pages/customer/CustomerProfile';
import CustomerLayout from './layouts/CustomerLayout';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminCategories from './pages/admin/AdminCategories';
import AdminProducts from './pages/admin/AdminProducts';
import AdminCustomers from './pages/admin/AdminCustomers';
import AdminTechnicians from './pages/admin/AdminTechnicians';
import AdminEnquiries from './pages/admin/AdminEnquiries';
import AdminServiceRequests from './pages/admin/AdminServiceRequests';
import AdminComplaints from './pages/admin/AdminComplaints';
import AdminMessages from './pages/admin/AdminMessages';
import AdminServices from './pages/admin/AdminServices';
import AdminSettings from './pages/admin/AdminSettings';
import AdminProfile from './pages/admin/AdminProfile';
import AdminLayout from './layouts/AdminLayout';

// Technician Pages
import TechnicianDashboard from './pages/technician/TechnicianDashboard';
import TechnicianServiceRequests from './pages/technician/TechnicianServiceRequests';
import TechnicianServiceRequestDetail from './pages/technician/TechnicianServiceRequestDetail';
import TechnicianProfile from './pages/technician/TechnicianProfile';
import TechnicianLayout from './layouts/TechnicianLayout';

// Error Pages
import NotFound from './pages/NotFound';

// Public layout wrapper
const PublicLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <Routes>
                {/* Public Routes with Navbar and Footer */}
                <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
                <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
                <Route path="/products" element={<PublicLayout><Products /></PublicLayout>} />
                <Route path="/products/:categorySlug" element={<PublicLayout><Products /></PublicLayout>} />
                <Route path="/product/:slug" element={<PublicLayout><ProductDetail /></PublicLayout>} />
                <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
                <Route path="/services/:slug" element={<PublicLayout><Services /></PublicLayout>} />
                <Route path="/industries" element={<PublicLayout><Industries /></PublicLayout>} />
                <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
                <Route path="/enquiry" element={<PublicLayout><Enquiry /></PublicLayout>} />

                {/* Customer Routes */}
                <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
                <Route path="/customer/login" element={<PublicLayout><Login /></PublicLayout>} />
                <Route path="/admin/login" element={<PublicLayout><Login /></PublicLayout>} />
                <Route path="/customer/register" element={<PublicLayout><CustomerRegister /></PublicLayout>} />
                <Route
                  path="/customer/dashboard"
                  element={
                    <ProtectedRoute requireCustomer>
                      <CustomerLayout><CustomerDashboard /></CustomerLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/customer/enquiries"
                  element={
                    <ProtectedRoute requireCustomer>
                      <CustomerLayout><CustomerEnquiries /></CustomerLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/customer/service-requests"
                  element={
                    <ProtectedRoute requireCustomer>
                      <CustomerLayout><CustomerServiceRequests /></CustomerLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/customer/profile"
                  element={
                    <ProtectedRoute requireCustomer>
                      <CustomerLayout><CustomerProfile /></CustomerLayout>
                    </ProtectedRoute>
                  }
                />

                {/* Admin Routes */}
                <Route
                  path="/admin/dashboard"
                  element={
                    <ProtectedRoute requireAdmin>
                      <AdminLayout><AdminDashboard /></AdminLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/categories"
                  element={
                    <ProtectedRoute requireAdmin>
                      <AdminLayout><AdminCategories /></AdminLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/products"
                  element={
                    <ProtectedRoute requireAdmin>
                      <AdminLayout><AdminProducts /></AdminLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/customers"
                  element={
                    <ProtectedRoute requireAdmin>
                      <AdminLayout><AdminCustomers /></AdminLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/technicians"
                  element={
                    <ProtectedRoute requireAdmin>
                      <AdminLayout><AdminTechnicians /></AdminLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/enquiries"
                  element={
                    <ProtectedRoute requireAdmin>
                      <AdminLayout><AdminEnquiries /></AdminLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/service-requests"
                  element={
                    <ProtectedRoute requireAdmin>
                      <AdminLayout><AdminServiceRequests /></AdminLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/complaints"
                  element={
                    <ProtectedRoute requireAdmin>
                      <AdminLayout><AdminComplaints /></AdminLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/messages"
                  element={
                    <ProtectedRoute requireAdmin>
                      <AdminLayout><AdminMessages /></AdminLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/services"
                  element={
                    <ProtectedRoute requireAdmin>
                      <AdminLayout><AdminServices /></AdminLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/settings"
                  element={
                    <ProtectedRoute requireAdmin>
                      <AdminLayout><AdminSettings /></AdminLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/profile"
                  element={
                    <ProtectedRoute requireAdmin>
                      <AdminLayout><AdminProfile /></AdminLayout>
                    </ProtectedRoute>
                  }
                />

                {/* Technician Routes */}
                <Route
                  path="/technician/dashboard"
                  element={
                    <ProtectedRoute requireTechnician>
                      <TechnicianLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<TechnicianDashboard />} />
                </Route>
                <Route
                  path="/technician/service-requests"
                  element={
                    <ProtectedRoute requireTechnician>
                      <TechnicianLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<TechnicianServiceRequests />} />
                </Route>
                <Route
                  path="/technician/service-requests/:id"
                  element={
                    <ProtectedRoute requireTechnician>
                      <TechnicianLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<TechnicianServiceRequestDetail />} />
                </Route>
                <Route
                  path="/technician/profile"
                  element={
                    <ProtectedRoute requireTechnician>
                      <TechnicianLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<TechnicianProfile />} />
                </Route>

                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
          <Notification />
        </Router>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
