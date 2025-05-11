import React, { useState, useEffect } from 'react';
import styles from './Subscription.module.css';

const Subscription = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteEmail, setDeleteEmail] = useState(null);

  const baseUrl = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem('token'); // Optional: remove if your API doesn't need auth

  // Format date to 'YYYY-MM-DD'
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // This will return 'YYYY-MM-DD'
  };

  // Fetch subscribers on mount
  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/subscribers`, {
          headers: {
            Authorization: `Bearer ${token}`, // Optional
          },
        });

        const data = await res.json();
        if (Array.isArray(data)) {
          const formatted = data.map((sub, index) => ({
            id: (index + 1).toString().padStart(2, '0'),
            email: sub.email,
            date: formatDate(sub.subscribedAt), // Use formatDate to format the 'subscribedAt' field
            status: 'Active', // You can adjust this based on your schema
          }));
          setSubscriptions(formatted);
        } else {
          console.error('Unexpected response:', data);
        }
      } catch (error) {
        console.error('Error fetching subscribers:', error);
      }
    };

    fetchSubscribers();
  }, [baseUrl, token]);

  const handleDeleteClick = (email) => {
    setDeleteEmail(email);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const res = await fetch(`http://localhost:3021/api/admin/auth/subscribers/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Optional
        },
        body: JSON.stringify({ email: deleteEmail }),
      });

      const result = await res.json();
      if (res.ok) {
        setSubscriptions((prev) => prev.filter((sub) => sub.email !== deleteEmail));
      } else {
        console.error(result.error || 'Delete failed');
      }
    } catch (error) {
      console.error('Error deleting subscriber:', error);
    } finally {
      setShowConfirmation(false);
      setDeleteEmail(null);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
    setDeleteEmail(null);
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
              <tr key={subscription.email}>
                <td>{subscription.id}</td>
                <td>{subscription.email}</td>
                <td>{subscription.date}</td> {/* Display formatted date */}
                <td>
                  <span className={`${styles.statusPill} ${getStatusClass(subscription.status)}`}>
                    {subscription.status}
                  </span>
                </td>
                <td className={styles.actionButtons}>
                  <button 
                    className={styles.deleteButton}
                    onClick={() => handleDeleteClick(subscription.email)}
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
