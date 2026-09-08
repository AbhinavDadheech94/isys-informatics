import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Users,
  FileText,
  Wrench,
  AlertCircle,
  MessageSquare,
  Settings,
  LogOut,
  User,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Cog
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminSidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/categories', icon: FolderTree, label: 'Categories' },
    { path: '/admin/products', icon: Package, label: 'Products' },
    { path: '/admin/customers', icon: Users, label: 'Customers' },
    { path: '/admin/technicians', icon: Users, label: 'Technicians' },
    { path: '/admin/enquiries', icon: FileText, label: 'Enquiries' },
    { path: '/admin/service-requests', icon: Wrench, label: 'Service Requests' },
    { path: '/admin/complaints', icon: AlertCircle, label: 'Complaints' },
    { path: '/admin/messages', icon: MessageSquare, label: 'Messages' },
    { path: '/admin/services', icon: Cog, label: 'Services' },
  ];

  const settingsSubItems = [
    { path: '/admin/settings', icon: Settings, label: 'Company Settings' },
    { path: '/admin/profile', icon: User, label: 'Profile Settings' },
  ];

  return (
    <div
      className={`bg-secondary-800 text-white h-screen fixed left-0 top-0 flex flex-col transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
      style={{ height: '100vh' }}
    >
      <div className="p-4 flex-shrink-0 flex items-center justify-between">
        {!isCollapsed && (
          <div>
            <h2 className="text-lg font-bold">Admin Panel</h2>
            <p className="text-xs text-gray-400 mt-1">ISYS INFORMATICS</p>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-secondary-700 rounded-lg transition-colors"
        >
          {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      <nav className="mt-4 flex-1 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 120px)' }}>
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                    isActive(item.path)
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-300 hover:bg-secondary-700 hover:text-white'
                  }`}
                  title={isCollapsed ? item.label : ''}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && <span>{item.label}</span>}
                </Link>
              </li>
            );
          })}

          {/* Settings with submenu */}
          {!isCollapsed && (
            <li>
              <button
                onClick={() => setSettingsOpen(!settingsOpen)}
                className="flex items-center justify-between w-full px-4 py-3 text-gray-300 hover:bg-secondary-700 hover:text-white transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5 flex-shrink-0" />
                  <span>Settings</span>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform ${settingsOpen ? 'rotate-180' : ''}`} />
              </button>
              {settingsOpen && (
                <ul className="ml-8 mt-1 space-y-1">
                  {settingsSubItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <li key={item.path}>
                        <Link
                          to={item.path}
                          className={`flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
                            isActive(item.path)
                              ? 'bg-primary-600 text-white'
                              : 'text-gray-400 hover:bg-secondary-700 hover:text-white'
                          }`}
                        >
                          <Icon className="w-4 h-4 flex-shrink-0" />
                          <span>{item.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          )}
        </ul>
      </nav>

      <div className="p-4 border-t border-secondary-700 flex-shrink-0">
        <button
          onClick={logout}
          className="flex items-center justify-center w-full p-3 text-gray-300 hover:bg-secondary-700 hover:text-white transition-colors rounded-lg"
          title="Logout"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
