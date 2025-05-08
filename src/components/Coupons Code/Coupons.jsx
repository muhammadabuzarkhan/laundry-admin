import React, { useState } from 'react';
import styles from './CouponsCode.module.css';

const CouponCode = () => {
  const [coupons, setCoupons] = useState([
    { 
      id: '01', 
      title: 'Green Monday', 
      code: 'L485993',
      usageLimit: '0',
      limitCouponTimes: '20',
      discount: '250',
      date: '12/31/2024'
    },
    { 
      id: '02', 
      title: 'Christmas Deal', 
      code: 'L981728',
      usageLimit: '1',
      limitCouponTimes: '100',
      discount: '200',
      date: '12/31/2024'
    },
    { 
      id: '03', 
      title: 'Dashing Monday', 
      code: 'L599400',
      usageLimit: '2',
      limitCouponTimes: '2',
      discount: '100',
      date: '1/10/2025'
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    code: '',
    usageLimit: '',
    limitCouponTimes: '',
    discount: '',
    expiryDate: ''
  });

  const handleOpenAddModal = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    // Reset form
    setFormData({
      title: '',
      code: '',
      usageLimit: '',
      limitCouponTimes: '',
      discount: '',
      expiryDate: ''
    });
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    setCoupons(coupons.filter(coupon => coupon.id !== deleteId));
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const generateCouponCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = 'L';
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Generate a new ID (simple implementation)
    const newId = String(coupons.length + 1).padStart(2, '0');
    
    // Create new coupon object
    const newCoupon = {
      id: newId,
      title: formData.title,
      code: formData.code || generateCouponCode(),
      usageLimit: formData.usageLimit,
      limitCouponTimes: formData.limitCouponTimes,
      discount: formData.discount,
      date: new Date(formData.expiryDate).toLocaleDateString('en-US')
    };
    
    // Add to coupons array
    setCoupons([...coupons, newCoupon]);
    
    // Close modal and reset form
    handleCloseAddModal();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>COUPON MANAGEMENT</h1>
        <button className={styles.addButton} onClick={handleOpenAddModal}>
          ADD COUPON
        </button>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.entriesContainer}>
          <span>Show : </span>
          <div className={styles.dropdown}>
            <span>10</span>
            <span className={styles.dropdownIcon}>▼</span>
          </div>
          <span>Entries</span>
        </div>

        <div className={styles.searchContainer}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search"
          />
          <button className={styles.searchButton}>
            <span className={styles.searchIcon}>⌕</span>
          </button>
          <button className={styles.filterButton}>
            <span className={styles.filterIcon}>⊻</span>
          </button>
        </div>
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
            {coupons.map((coupon) => (
              <tr key={coupon.id}>
                <td>{coupon.id}</td>
                <td>{coupon.title}</td>
                <td>{coupon.code}</td>
                <td>{coupon.usageLimit}</td>
                <td>{coupon.limitCouponTimes}</td>
                <td>{coupon.discount}</td>
                <td>{coupon.date}</td>
                <td className={styles.actionButtons}>
                  <button 
                    className={styles.deleteButton}
                    onClick={() => handleDeleteClick(coupon.id)}
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

      {/* Add Coupon Modal */}
      {showAddModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2>Add New Coupon</h2>
              <button className={styles.closeButton} onClick={handleCloseAddModal}>×</button>
            </div>
            <form onSubmit={handleSubmit} className={styles.modalForm}>
              <div className={styles.formGroup}>
                <label htmlFor="title">Coupon Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter coupon title"
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="code">Coupon Code (Optional)</label>
                <input
                  type="text"
                  id="code"
                  name="code"
                  value={formData.code}
                  onChange={handleInputChange}
                  placeholder="Leave blank to auto-generate"
                />
              </div>
              
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="usageLimit">Usage Limit</label>
                  <input
                    type="number"
                    id="usageLimit"
                    name="usageLimit"
                    value={formData.usageLimit}
                    onChange={handleInputChange}
                    min="0"
                    required
                    placeholder="Per user"
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="limitCouponTimes">Limit Coupon Times</label>
                  <input
                    type="number"
                    id="limitCouponTimes"
                    name="limitCouponTimes"
                    value={formData.limitCouponTimes}
                    onChange={handleInputChange}
                    min="0"
                    required
                    placeholder="Total usage limit"
                  />
                </div>
              </div>
              
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="discount">Discount Amount</label>
                  <input
                    type="number"
                    id="discount"
                    name="discount"
                    value={formData.discount}
                    onChange={handleInputChange}
                    min="0"
                    required
                    placeholder="Enter discount amount"
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="expiryDate">Expiry Date</label>
                  <input
                    type="date"
                    id="expiryDate"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className={styles.formActions}>
                <button type="button" className={styles.cancelButton} onClick={handleCloseAddModal}>
                  Cancel
                </button>
                <button type="submit" className={styles.submitButton}>
                  Save Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.confirmationModal}>
            <div className={styles.modalHeader}>
              <h2>Confirm Deletion</h2>
              <button className={styles.closeButton} onClick={handleCancelDelete}>×</button>
            </div>
            <div className={styles.modalContent}>
              <p>Are you sure you want to delete this coupon?</p>
              <p>This action cannot be undone.</p>
            </div>
            <div className={styles.modalActions}>
              <button className={styles.cancelButton} onClick={handleCancelDelete}>
                No
              </button>
              <button className={styles.deleteConfirmButton} onClick={handleConfirmDelete}>
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CouponCode;