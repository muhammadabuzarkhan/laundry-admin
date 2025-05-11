// import React, { useState, useEffect } from 'react';
// import styles from './CouponsCode.module.css';

// const CouponCode = () => {
//   const [coupons, setCoupons] = useState([]);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [deleteId, setDeleteId] = useState(null);
//   const [formData, setFormData] = useState({
//     title: '',
//     code: '',
//     usageLimit: '',
//     limitCouponTimes: '',
//     discount: '',
//     expiryDate: ''
//   });

//   // Fetch coupons from the API when the component mounts
//   useEffect(() => {
//     const fetchCoupons = async () => {
//       try {
//         const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/admin/auth/coupen/get`); // Dynamic API URL
//         const data = await response.json();
//         if (data.status === 'All Coupen Code' && data.data.allCoupen) {
//           setCoupons(data.data.allCoupen);
//         } else {
//           console.error('Error fetching coupon data:', data.message);
//         }
//       } catch (error) {
//         console.error('Failed to fetch coupons:', error);
//       }
//     };

//     fetchCoupons();
//   }, []); // Empty dependency array means this runs only once when the component mounts

//   const handleOpenAddModal = () => {
//     setShowAddModal(true);
//   };

//   const handleCloseAddModal = () => {
//     setShowAddModal(false);
//     // Reset form
//     setFormData({
//       title: '',
//       code: '',
//       usageLimit: '',
//       limitCouponTimes: '',
//       discount: '',
//       expiryDate: ''
//     });
//   };

//   const handleDeleteClick = (id) => {
//     setDeleteId(id);
//     setShowDeleteModal(true);
//   };

//   const handleConfirmDelete = async () => {
//     try {
//       const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/admin/auth/delete/:id`, {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ id: deleteId }), // Send the ID of the coupon to delete
//       });

//       const data = await response.json();
//       if (data.status === 'Success') {
//         // Remove the coupon from the state if deletion is successful
//         setCoupons(coupons.filter(coupon => coupon._id !== deleteId));
//         setShowDeleteModal(false);
//         setDeleteId(null);
//       } else {
//         console.error('Error deleting coupon:', data.message);
//       }
//     } catch (error) {
//       console.error('Failed to delete coupon:', error);
//     }
//   };

//   const handleCancelDelete = () => {
//     setShowDeleteModal(false);
//     setDeleteId(null);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const generateCouponCode = () => {
//     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
//     let result = 'L';
//     for (let i = 0; i < 6; i++) {
//       result += characters.charAt(Math.floor(Math.random() * characters.length));
//     }
//     return result;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Create new coupon object
//     const newCoupon = {
//       title: formData.title,
//       code: formData.code || generateCouponCode(),
//       usageLimit: formData.usageLimit,
//       limitCouponTimes: formData.limitCouponTimes,
//       discount: formData.discount,
//       expiryDate: new Date(formData.expiryDate).toISOString(),
//     };

//     try {
//       const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/admin/auth/coupen/create`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newCoupon),
//       });

//       const data = await response.json();
//       if (data.status === 'Success') {
//         setCoupons([...coupons, data.newCoupon]); // Add new coupon to the list
//         handleCloseAddModal();
//       } else {
//         console.error('Error creating coupon:', data.message);
//       }
//     } catch (error) {
//       console.error('Failed to create coupon:', error);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.header}>
//         <h1 className={styles.title}>COUPON MANAGEMENT</h1>
//         <button className={styles.addButton} onClick={handleOpenAddModal}>
//           ADD COUPON
//         </button>
//       </div>

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

//       {/* Add Coupon Modal */}
//       {showAddModal && (
//         <div className={styles.modalOverlay}>
//           <div className={styles.modal}>
//             <div className={styles.modalHeader}>
//               <h2>Add New Coupon</h2>
//               <button className={styles.closeButton} onClick={handleCloseAddModal}>×</button>
//             </div>
//             <form onSubmit={handleSubmit} className={styles.modalForm}>
//               <div className={styles.formGroup}>
//                 <label htmlFor="title">Coupon Title</label>
//                 <input
//                   type="text"
//                   id="title"
//                   name="title"
//                   value={formData.title}
//                   onChange={handleInputChange}
//                   required
//                   placeholder="Enter coupon title"
//                 />
//               </div>

//               <div className={styles.formGroup}>
//                 <label htmlFor="code">Coupon Code (Optional)</label>
//                 <input
//                   type="text"
//                   id="code"
//                   name="code"
//                   value={formData.code}
//                   onChange={handleInputChange}
//                   placeholder="Leave blank to auto-generate"
//                 />
//               </div>

//               <div className={styles.formRow}>
//                 <div className={styles.formGroup}>
//                   <label htmlFor="usageLimit">Usage Limit</label>
//                   <input
//                     type="number"
//                     id="usageLimit"
//                     name="usageLimit"
//                     value={formData.usageLimit}
//                     onChange={handleInputChange}
//                     min="0"
//                     required
//                     placeholder="Per user"
//                   />
//                 </div>

//                 <div className={styles.formGroup}>
//                   <label htmlFor="limitCouponTimes">Limit Coupon Times</label>
//                   <input
//                     type="number"
//                     id="limitCouponTimes"
//                     name="limitCouponTimes"
//                     value={formData.limitCouponTimes}
//                     onChange={handleInputChange}
//                     min="0"
//                     required
//                     placeholder="Total usage limit"
//                   />
//                 </div>
//               </div>

//               <div className={styles.formRow}>
//                 <div className={styles.formGroup}>
//                   <label htmlFor="discount">Discount Amount</label>
//                   <input
//                     type="number"
//                     id="discount"
//                     name="discount"
//                     value={formData.discount}
//                     onChange={handleInputChange}
//                     min="0"
//                     required
//                     placeholder="Enter discount amount"
//                   />
//                 </div>

//                 <div className={styles.formGroup}>
//                   <label htmlFor="expiryDate">Expiry Date</label>
//                   <input
//                     type="date"
//                     id="expiryDate"
//                     name="expiryDate"
//                     value={formData.expiryDate}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </div>
//               </div>

//               <div className={styles.formActions}>
//                 <button type="button" className={styles.cancelButton} onClick={handleCloseAddModal}>
//                   Cancel
//                 </button>
//                 <button type="submit" className={styles.submitButton}>
//                   Save Coupon
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Delete Confirmation Modal */}
//       {showDeleteModal && (
//         <div className={styles.modalOverlay}>
//           <div className={styles.confirmationModal}>
//             <div className={styles.modalHeader}>
//               <h2>Confirm Deletion</h2>
//               <button className={styles.closeButton} onClick={handleCancelDelete}>×</button>
//             </div>
//             <div className={styles.modalContent}>
//               <p>Are you sure you want to delete this coupon?</p>
//               <p>This action cannot be undone.</p>
//             </div>
//             <div className={styles.modalActions}>
//               <button className={styles.cancelButton} onClick={handleCancelDelete}>
//                 No
//               </button>
//               <button className={styles.deleteConfirmButton} onClick={handleConfirmDelete}>
//                 Yes
//               </button>
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
import AddCouponModal from './AddCoupon'; // Import modal

const CouponCode = () => {
  const [coupons, setCoupons] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/admin/auth/coupen/get`);
        const data = await response.json();
        if (data.status === 'All Coupen Code' && data.data.allCoupen) {
          setCoupons(data.data.allCoupen);
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
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/admin/auth/delete/:id`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: deleteId }),
      });

      const data = await response.json();
      if (data.status === 'Success') {
        setCoupons(prev => prev.filter(c => c._id !== deleteId));
        setShowDeleteModal(false);
        setDeleteId(null);
      }
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>COUPON MANAGEMENT</h1>
        <button className={styles.addButton} onClick={() => setShowAddModal(true)}>ADD COUPON</button>
      </div>

      {/* Coupons Table */}
      {/* ... same table as before */}

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
            {coupons.map((coupon) => (
              <tr key={coupon._id}>
                <td>{coupon._id}</td>
                <td>{coupon.title}</td>
                <td>{coupon.code}</td>
                <td>{coupon.noOfTimes}</td>
                <td>{coupon.limitCoupenTimes}</td>
                <td>{coupon.discount}</td>
                <td>{new Date(coupon.expireDate).toLocaleDateString('en-US')}</td>
                <td className={styles.actionButtons}>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDeleteClick(coupon._id)} // Use _id for delete
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

      {/* Delete Confirmation Modal */}
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
