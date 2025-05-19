import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import CallOrder from '../../components/Call Order/CallOrder';

const CallOrderPage = () => {
  return (
    <div className="dashboard-page" style={{display:'flex'}}>
      <Sidebar />
      <CallOrder />
    </div>
  );
};

export default CallOrderPage;
