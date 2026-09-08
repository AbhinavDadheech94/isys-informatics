import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children, requireAdmin = false, requireCustomer = false, requireTechnician = false }) => {
  const { user, loading, isAuthenticated, isAdmin, isCustomer, isTechnician } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/customer/dashboard" replace />;
  }

  if (requireCustomer && !isCustomer) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  if (requireTechnician && !isTechnician) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
