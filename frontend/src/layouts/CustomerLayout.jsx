import React from 'react';
import CustomerSidebar from '../components/customer/CustomerSidebar';

const CustomerLayout = ({ children }) => {
  return (
    <div className="flex">
      <CustomerSidebar />
      <div className="flex-1 ml-64">
        {children}
      </div>
    </div>
  );
};

export default CustomerLayout;