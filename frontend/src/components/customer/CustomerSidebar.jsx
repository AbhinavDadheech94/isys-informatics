import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Wrench, 
  User, 
  LogOut 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const CustomerSidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { path: '/customer/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/customer/enquiries', icon: FileText, label: 'My Enquiries' },
    { path: '/customer/service-requests', icon: Wrench, label: 'Service Requests' },
    { path: '/customer/profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen fixed left-0 top-0">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">Customer Portal</h2>
        <p className="text-sm text-gray-500 mt-1">ISYS INFORMATICS</p>
      </div>

      <nav className="mt-6">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-6 py-3 transition-colors ${
                    isActive(item.path)
                      ? 'bg-primary-50 text-primary-600 border-r-4 border-primary-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default CustomerSidebar;