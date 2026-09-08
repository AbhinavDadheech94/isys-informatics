import React from 'react';
import { Package, Users, FileText, Settings } from 'lucide-react';

const EmptyState = ({ title, description, icon, action }) => {
  const getIcon = () => {
    switch (icon) {
      case 'products':
        return <Package className="w-16 h-16 text-gray-400" />;
      case 'users':
        return <Users className="w-16 h-16 text-gray-400" />;
      case 'documents':
        return <FileText className="w-16 h-16 text-gray-400" />;
      case 'settings':
        return <Settings className="w-16 h-16 text-gray-400" />;
      default:
        return <Package className="w-16 h-16 text-gray-400" />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="mb-4">
        {getIcon()}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-center mb-6 max-w-md">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
};

export default EmptyState;
