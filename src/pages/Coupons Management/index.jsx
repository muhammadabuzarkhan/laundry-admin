import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Coupon from '../../components/Coupons Code/Coupons';

const CouponPage = () => {
  return (
    <div className="dashboard-page" style={{display:'flex'}}>
      <Sidebar />
      <Coupon />
    </div>
  );
};

export default CouponPage;
