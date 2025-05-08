import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Subscription from '../../components/Subscription/Subscription';

const SubscriptionPage = () => {
  return (
    <div className="dashboard-page" style={{display:'flex'}}>
      <Sidebar />
      <Subscription />
    </div>
  );
};

export default SubscriptionPage;
