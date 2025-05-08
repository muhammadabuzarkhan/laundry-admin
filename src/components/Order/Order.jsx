import React from 'react';
import styles from './Order.module.css';

const Order = () => {
  const orders = [
    { id: '000001', customer: 'Hussain Hussaini', date: '05/03/25', collection: '05/03/25', delivery: '05/03/25', total: '£25', status: 'Completed' },
    { id: '000002', customer: 'John Smith', date: '05/03/25', collection: '05/03/25', delivery: '05/03/25', total: '£32', status: 'Pending' },
    { id: '000003', customer: 'Sarah Johnson', date: '04/03/25', collection: '04/03/25', delivery: '05/03/25', total: '£18', status: 'Processing' },
    { id: '000004', customer: 'Michael Brown', date: '04/03/25', collection: '04/03/25', delivery: '05/03/25', total: '£45', status: 'Completed' },
    { id: '000005', customer: 'Emma Wilson', date: '03/03/25', collection: '03/03/25', delivery: '04/03/25', total: '£22', status: 'Cancelled' },
    { id: '000006', customer: 'David Lee', date: '03/03/25', collection: '03/03/25', delivery: '04/03/25', total: '£38', status: 'Processing' },
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case 'Completed':
        return styles.statusCompleted;
      case 'Pending':
        return styles.statusPending;
      case 'Processing':
        return styles.statusProcessing;
      case 'Cancelled':
        return styles.statusCancelled;
      default:
        return '';
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Orders</h1>
        <button className={styles.addButton}>
          <span className={styles.plusIcon}>+</span>
          Add new order
        </button>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.searchContainer}>
          <span className={styles.searchIcon}>⌕</span>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search by order number or customer"
          />
        </div>

        <div className={styles.filterContainer}>
          <span className={styles.filterLabel}>
            <span className={styles.filterIcon}>⊻</span>
            Filter:
          </span>
          
          <div className={styles.dateFilter}>
            <span className={styles.calendarIcon}>📅</span>
            <span>By Date</span>
          </div>
          
          <div className={styles.statusFilter}>
            <span>Status</span>
            <span className={styles.dropdownIcon}>▼</span>
          </div>
          
          <button className={styles.resetButton}>Reset</button>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Order No</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Collection</th>
              <th>Delivery</th>
              <th>Total</th>
              <th>Order Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.date}</td>
                <td>{order.collection}</td>
                <td>{order.delivery}</td>
                <td>{order.total}</td>
                <td>
                  <span className={`${styles.statusPill} ${getStatusClass(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td>
                  <button className={styles.viewButton}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;