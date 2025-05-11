import React, { useState, useEffect } from 'react';
import styles from './Query.module.css';

const Query = () => {
  const [queries, setQueries] = useState([]);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState('');

  // Fetch all queries on mount
  useEffect(() => {
    const fetchQueries = async () => {
      const token = localStorage.getItem('token');
      const baseUrl = process.env.REACT_APP_BASE_URL;
      try {
        const response = await fetch(`${baseUrl}/api/admin/auth/query/get`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();
        if (result.status && result.data?.allqueries) {
          const formattedQueries = result.data.allqueries.map((q, index) => ({
            id: (index + 1).toString().padStart(2, '0'),
            name: q.name,
            email: q.email,
            subject: q.subject,
            message: q.message,
            date: q.recievedOn,
            status: q.status,
            _id: q._id,
          }));
          setQueries(formattedQueries);
        }
      } catch (error) {
        console.error('Failed to fetch queries:', error);
      }
    };

    fetchQueries();
  }, []);

  const handleStatusChange = async (id) => {
    const token = localStorage.getItem('token');
    const baseUrl = process.env.REACT_APP_BASE_URL;

    try {
      const response = await fetch(`${baseUrl}/api/admin/auth/query/status/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (result.status) {
        setQueries(prev =>
          prev.map(q =>
            q._id === id ? { ...q, status: 'Responded' } : q
          )
        );
      } else {
        console.error('Failed to update status:', result.message);
      }
    } catch (error) {
      console.error('API error:', error);
    }
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
    return status === 'Waiting' || status === 'Pending'
      ? styles.statusWaiting
      : styles.statusResponded;
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
              <tr key={query._id}>
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
                  {(query.status === 'Waiting' || query.status === 'Pending') && (
                    <button 
                      className={styles.respondButton}
                      onClick={() => handleStatusChange(query._id)}
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
