import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Order from '../../components/Order/Order';

const OrderPage = () => {
  return (
    <div className="dashboard-page" style={{display:'flex'}}>
      <Sidebar />
      <Order />
    </div>
  );
};

export default OrderPage;
