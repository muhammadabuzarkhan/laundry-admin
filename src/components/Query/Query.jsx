import React, { useState } from 'react';
import styles from './Query.module.css';

const Query = () => {
  const [queries, setQueries] = useState([
    { 
      id: '01', 
      name: 'John Smith', 
      email: 'john.smith@example.com',
      subject: 'Order Delivery Issue',
      message: 'I placed an order three days ago but haven\'t received any shipping confirmation yet.',
      date: '05/25/2024',
      status: 'Waiting'
    },
    { 
      id: '02', 
      name: 'Sarah Johnson', 
      email: 'sarah.j@example.com',
      subject: 'Refund Request',
      message: 'I would like to request a refund for my recent purchase as the item was damaged.',
      date: '05/24/2024',
      status: 'Responded'
    },
    { 
      id: '03', 
      name: 'Michael Brown', 
      email: 'michael.brown@example.com',
      subject: 'Product Availability',
      message: 'When will the out-of-stock item be available again? I\'ve been waiting for weeks.',
      date: '05/23/2024',
      status: 'Waiting'
    },
    { 
      id: '04', 
      name: 'Emma Wilson', 
      email: 'emma.w@example.com',
      subject: 'Account Login Issue',
      message: 'I\'m unable to log into my account. I\'ve tried resetting my password but still having issues.',
      date: '05/22/2024',
      status: 'Responded'
    }
  ]);

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedQueryId, setSelectedQueryId] = useState(null);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState('');

  const handleStatusChange = (id) => {
    const query = queries.find(q => q.id === id);
    if (query && query.status === 'Waiting') {
      setSelectedQueryId(id);
      setShowConfirmation(true);
    }
  };

  const confirmStatusChange = () => {
    setQueries(queries.map(query => 
      query.id === selectedQueryId 
        ? { ...query, status: 'Responded' } 
        : query
    ));
    setShowConfirmation(false);
    setSelectedQueryId(null);
  };

  const cancelStatusChange = () => {
    setShowConfirmation(false);
    setSelectedQueryId(null);
  };

  const viewMessage = (message) => {
    setSelectedMessage(message);
    setShowMessageModal(true);
  };

  const closeMessageModal = () => {
    setShowMessageModal(false);
    setSelectedMessage('');
  };

  const getStatusClass = (status) => {
    return status === 'Waiting' ? styles.statusWaiting : styles.statusResponded;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>QUERY MANAGEMENT</h1>
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
              <th>Sr#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Message</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {queries.map((query) => (
              <tr key={query.id}>
                <td>{query.id}</td>
                <td>{query.name}</td>
                <td>{query.email}</td>
                <td>{query.subject}</td>
                <td>
                  <button 
                    className={styles.viewButton}
                    onClick={() => viewMessage(query.message)}
                  >
                    View
                  </button>
                </td>
                <td>{query.date}</td>
                <td>
                  <span className={`${styles.statusPill} ${getStatusClass(query.status)}`}>
                    {query.status}
                  </span>
                </td>
                <td className={styles.actionButtons}>
                  {query.status === 'Waiting' && (
                    <button 
                      className={styles.respondButton}
                      onClick={() => handleStatusChange(query.id)}
                    >
                      Mark as Responded
                    </button>
                  )}
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
              <h2>Confirm Status Change</h2>
              <button className={styles.closeButton} onClick={cancelStatusChange}>×</button>
            </div>
            <div className={styles.modalContent}>
              <p>Are you sure? This will never reverse.</p>
            </div>
            <div className={styles.modalActions}>
              <button className={styles.cancelButton} onClick={cancelStatusChange}>
                Cancel
              </button>
              <button className={styles.confirmButton} onClick={confirmStatusChange}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {showMessageModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.messageModal}>
            <div className={styles.modalHeader}>
              <h2>Message</h2>
              <button className={styles.closeButton} onClick={closeMessageModal}>×</button>
            </div>
            <div className={styles.modalContent}>
              <p className={styles.messageText}>{selectedMessage}</p>
            </div>
            <div className={styles.modalActions}>
              <button className={styles.closeModalButton} onClick={closeMessageModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Query;