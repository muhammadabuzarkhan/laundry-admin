// import React, { useState, useEffect } from 'react';
// import styles from './CouponsCode.module.css';
// import AddCouponModal from './AddCoupon'; // Import modal

// const CouponCode = () => {
//   const [coupons, setCoupons] = useState([]);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [deleteId, setDeleteId] = useState(null);
// useEffect(() => {
//   const fetchCoupons = async () => {
//     try {
//       const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/admin/auth/coupen/get`);
//       const data = await response.json();

//       console.log("Fetched data:", data); // Optional, for debugging

//       if (data.status === true && Array.isArray(data.data?.allCoupen)) {
//         setCoupons(data.data.allCoupen);
//       } else {
//         console.warn("Unexpected data format", data);
//       }
//     } catch (err) {
//       console.error('Failed to fetch coupons:', err);
//     }
//   };
//   fetchCoupons();
// }, []);


//   const handleDeleteClick = (id) => {
//     setDeleteId(id);
//     setShowDeleteModal(true);
//   };

//   const handleConfirmDelete = async () => {
//     try {
//       const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/admin/auth/coupen/delete/:id`, {
//         method: 'DELETE',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ id: deleteId }),
//       });

//       const data = await response.json();
//       if (data.status === 'Success') {
//         setCoupons(prev => prev.filter(c => c._id !== deleteId));
//         setShowDeleteModal(false);
//         setDeleteId(null);
//       }
//     } catch (err) {
//       console.error('Delete failed:', err);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.header}>
//         <h1>COUPON MANAGEMENT</h1>
//         <button className={styles.addButton} onClick={() => setShowAddModal(true)}>ADD COUPON</button>
//       </div>

//       {/* Coupons Table */}
//       {/* ... same table as before */}

//       <div className={styles.tableContainer}>
//         <table className={styles.table}>
//           <thead>
//             <tr>
//               <th>S#</th>
//               <th>Title</th>
//               <th>Coupon Code</th>
//               <th>Usage Limit</th>
//               <th>Limit Coupon Times</th>
//               <th>Discount</th>
//               <th>Date</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {coupons.map((coupon) => (
//               <tr key={coupon._id}>
//                 <td>{coupon._id}</td>
//                 <td>{coupon.title}</td>
//                 <td>{coupon.code}</td>
//                 <td>{coupon.noOfTimes}</td>
//                 <td>{coupon.limitCoupenTimes}</td>
//                 <td>{coupon.discount}</td>
//                 <td>{new Date(coupon.expireDate).toLocaleDateString('en-US')}</td>
//                 <td className={styles.actionButtons}>
//                   <button
//                     className={styles.deleteButton}
//                     onClick={() => handleDeleteClick(coupon._id)} // Use _id for delete
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                       <polyline points="3 6 5 6 21 6"></polyline>
//                       <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
//                     </svg>
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       {showAddModal && (
//         <AddCouponModal
//           onClose={() => setShowAddModal(false)}
//           onCouponAdded={(newCoupon) => setCoupons(prev => [...prev, newCoupon])}
//         />
//       )}

//       {/* Delete Confirmation Modal */}
//       {showDeleteModal && (
//         <div className={styles.modalOverlay}>
//           <div className={styles.confirmationModal}>
//             <div className={styles.modalHeader}>
//               <h2>Confirm Deletion</h2>
//               <button className={styles.closeButton} onClick={() => setShowDeleteModal(false)}>×</button>
//             </div>
//             <div className={styles.modalContent}>
//               <p>Are you sure you want to delete this coupon?</p>
//             </div>
//             <div className={styles.modalActions}>
//               <button onClick={() => setShowDeleteModal(false)}>No</button>
//               <button onClick={handleConfirmDelete}>Yes</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CouponCode;

import React, { useState, useEffect } from 'react';
import styles from './CouponsCode.module.css';
import AddCouponModal from './AddCoupon';

const CouponCode = () => {
  const [coupons, setCoupons] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const fetchCoupons = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/admin/auth/coupen/get`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();
        console.log("Fetched data:", data);

        if (data.status === true && Array.isArray(data.data?.allCoupen)) {
          setCoupons(data.data.allCoupen);
        } else {
          console.warn("Unexpected data format:", data);
        }
      } catch (err) {
        console.error('Failed to fetch coupons:', err);
      }
    };

    fetchCoupons();
  }, []);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/admin/auth/coupen/delete/${deleteId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.status === 'Success' || data.status === true) {
        setCoupons(prev => prev.filter(c => c._id !== deleteId));
      } else {
        console.warn('Failed to delete coupon:', data);
      }
    } catch (err) {
      console.error('Delete failed:', err);
    } finally {
      setShowDeleteModal(false);
      setDeleteId(null);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>COUPON MANAGEMENT</h1>
        <button className={styles.addButton} onClick={() => setShowAddModal(true)}>ADD COUPON</button>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>S#</th>
              <th>Title</th>
              <th>Coupon Code</th>
              <th>Usage Limit</th>
              <th>Limit Coupon Times</th>
              <th>Discount</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon, index) => (
              <tr key={coupon._id}>
                <td>{index + 1}</td>
                <td>{coupon.title}</td>
                <td>{coupon.code}</td>
                <td>{coupon.noOfTimes}</td>
                <td>{coupon.limitCoupenTimes}</td>
                <td>{coupon.discount}</td>
                <td>{new Date(coupon.expireDate).toLocaleDateString('en-US')}</td>
                <td className={styles.actionButtons}>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDeleteClick(coupon._id)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <AddCouponModal
          onClose={() => setShowAddModal(false)}
          onCouponAdded={(newCoupon) => setCoupons(prev => [...prev, newCoupon])}
        />
      )}

      {showDeleteModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.confirmationModal}>
            <div className={styles.modalHeader}>
              <h2>Confirm Deletion</h2>
              <button className={styles.closeButton} onClick={() => setShowDeleteModal(false)}>×</button>
            </div>
            <div className={styles.modalContent}>
              <p>Are you sure you want to delete this coupon?</p>
            </div>
            <div className={styles.modalActions}>
              <button onClick={() => setShowDeleteModal(false)}>No</button>
              <button onClick={handleConfirmDelete}>Yes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CouponCode;
