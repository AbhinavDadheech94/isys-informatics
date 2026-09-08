import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ClipboardList, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const TechnicianLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/technician/dashboard', icon: LayoutDashboard },
    { name: 'Service Requests', path: '/technician/service-requests', icon: ClipboardList },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg fixed h-full">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-xl font-bold text-primary-600">ISYS INFORMATICS</h1>
            <p className="text-sm text-gray-600 mt-1">Technician Portal</p>
          </div>
          <nav className="p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive(item.path)
                        ? 'bg-primary-50 text-primary-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="absolute bottom-0 w-full p-4 border-t border-gray-200 space-y-2">
            <Link
              to="/technician/profile"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 w-full"
            >
              <User className="w-5 h-5" />
              Profile
            </Link>
            <button
              onClick={logout}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 w-full"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-64">
          {/* Header */}
          <header className="bg-white shadow-sm px-6 py-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">
                {menuItems.find(item => isActive(item.path))?.name || 'Technician Portal'}
              </h2>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default TechnicianLayout;
