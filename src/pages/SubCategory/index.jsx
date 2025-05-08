import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import SubCategory from '../../components/Sub Category/SubCategory';

const SubCategoryPage = () => {
  return (
    <div className="dashboard-page" style={{display:'flex'}}>
      <Sidebar />
      <SubCategory />
    </div>
  );
};

export default SubCategoryPage;
