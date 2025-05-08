import React, { useState } from 'react';
import styles from './Subscription.module.css';

const Subscription = () => {
  const subscriptions = [
    { 
      id: '01', 
      email: 'john.doe@example.com', 
      date: '05/15/2024',
      status: 'Active'
    },
    { 
      id: '02', 
      email: 'sarah.smith@example.com', 
      date: '05/18/2024',
      status: 'Active'
    },
    { 
      id: '03', 
      email: 'michael.brown@example.com', 
      date: '05/20/2024',
      status: 'Inactive'
    },
    { 
      id: '04', 
      email: 'emma.wilson@example.com', 
      date: '05/22/2024',
      status: 'Active'
    }
  ];

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = () => {
    console.log(`Deleting subscription with ID: ${deleteId}`);
    // Here you would typically send a delete request to your backend
    setShowConfirmation(false);
    setDeleteId(null);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
    setDeleteId(null);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Active':
        return styles.statusActive;
      case 'Inactive':
        return styles.statusInactive;
      default:
        return '';
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>SUBSCRIPTION MANAGEMENT</h1>
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
              <th>Sr #</th>
              <th>Email</th>
              <th>Date of Subscription</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((subscription) => (
              <tr key={subscription.id}>
                <td>{subscription.id}</td>
                <td>{subscription.email}</td>
                <td>{subscription.date}</td>
                <td>
                  <span className={`${styles.statusPill} ${getStatusClass(subscription.status)}`}>
                    {subscription.status}
                  </span>
                </td>
                <td className={styles.actionButtons}>
                  <button 
                    className={styles.deleteButton}
                    onClick={() => handleDeleteClick(subscription.id)}
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

      {showConfirmation && (
        <div className={styles.modalOverlay}>
          <div className={styles.confirmationModal}>
            <div className={styles.modalHeader}>
              <h2>Confirm Deletion</h2>
              <button className={styles.closeButton} onClick={handleCancelDelete}>×</button>
            </div>
            <div className={styles.modalContent}>
              <p>Are you sure you want to delete this subscription?</p>
              <p>This action cannot be undone.</p>
            </div>
            <div className={styles.modalActions}>
              <button className={styles.cancelButton} onClick={handleCancelDelete}>
                Cancel
              </button>
              <button className={styles.deleteConfirmButton} onClick={handleConfirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Subscription;