import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Product from '../../components/Product/Product';

const ProductPage = () => {
  return (
    <div className="dashboard-page" style={{display:'flex'}}>
      <Sidebar />
      <Product />
    </div>
  );
};

export default ProductPage;
