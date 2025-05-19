import React from 'react';
import styles from './CallOrder.module.css';

const ViewCallOrderModal = ({ order, onClose }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>Order Details</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>
        <div className={styles.modalContent}>
          {Object.entries(order).map(([key, value]) => (
            <p key={key}><strong>{key.replace(/_/g, ' ')}:</strong> {String(value)}</p>
          ))}
        </div>
        <div className={styles.modalActions}>
          <button className={styles.cancelButton} onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default ViewCallOrderModal;
