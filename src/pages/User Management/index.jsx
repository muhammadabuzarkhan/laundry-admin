import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import User from '../../components/User/User';

const UserPage = () => {
  return (
    <div className="dashboard-page" style={{display:'flex'}}>
      <Sidebar />
      <User />
    </div>
  );
};

export default UserPage;
