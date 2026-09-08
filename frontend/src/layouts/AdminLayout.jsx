import React, { useState, useEffect } from 'react';
import AdminSidebar from '../components/admin/AdminSidebar';

const AdminLayout = ({ children }) => {
  const [sidebarWidth, setSidebarWidth] = useState(256);

  useEffect(() => {
    const handleResize = () => {
      const sidebar = document.querySelector('.bg-secondary-800');
      if (sidebar) {
        setSidebarWidth(sidebar.offsetWidth);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 transition-all duration-300" style={{ marginLeft: `${sidebarWidth}px` }}>
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;