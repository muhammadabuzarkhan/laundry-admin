import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Profile from '../../components/Profile/Profile';

const ProfilePage = () => {
  return (
    <div className="dashboard-page" style={{display:'flex'}}>
      <Sidebar />
      <Profile />
    </div>
  );
};

export default ProfilePage;
