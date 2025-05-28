import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import CustomCustomer from '../../components/Custom Customers/User';

const CustomUserPage = () => {
  return (
    <div className="dashboard-page" style={{display:'flex'}}>
      <Sidebar />
      <CustomCustomer />
    </div>
  );
};

export default CustomUserPage;
