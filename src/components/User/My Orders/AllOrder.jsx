// AllOrder.jsx
import React from 'react';
import styles from './AllOrder.module.css';

const AllOrder = ({ user, orders, onClose }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>All Orders - {user?.firstName} {user?.lastName}</h2>
          <button onClick={onClose} className={styles.closeButton}>×</button>
        </div>

        {orders.length === 0 ? (
          <p className={styles.noData}>No orders found.</p>
        ) : (
          <table className={styles.orderTable}>
            <thead>
              <tr>
                <th>S.NO.</th>
                <th>Order ID</th>
                <th>Order Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id}>
                  <td>{index + 1}</td>
                  <td>{order._id}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>{order.Total || 'N/A'}</td>
                  <td>{order.status || 'Pending'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AllOrder;
