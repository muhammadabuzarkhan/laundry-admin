import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Category from '../../components/Category/Category';

const CategoryPage = () => {
  return (
    <div className="dashboard-page" style={{display:'flex'}}>
      <Sidebar />
      <Category />
    </div>
  );
};

export default CategoryPage;
