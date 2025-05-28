// components/UserOrderModal.jsx
import React from 'react';
import styles from './UserOrder.module.css';

const UserOrderModal = ({ user, orders, onClose }) => {
  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContainer}>
        <button className={styles.closeButton} onClick={onClose}>✖</button>
        <h2 className={styles.modalTitle}>Orders for {user?.firstName} {user?.lastName}</h2>

        {orders.length === 0 ? (
          <p>No orders found for this user.</p>
        ) : (
          <div className={styles.ordersList}>
            {orders.map((order, index) => (
              <div key={order._id} className={styles.orderCard}>
                <p><strong>Order No:</strong> {order.orderNumber}</p>
                <p><strong>Total:</strong> ${order.Total}</p>
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserOrderModal;
