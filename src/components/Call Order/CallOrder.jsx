import React, { useState, useEffect } from 'react';
import styles from './CallOrder.module.css';
import AddCallOrderModal from './AddCallOrder';
import ViewCallOrderModal from './ViewCallOrder';
import { Eye, Trash2, Pencil } from 'lucide-react';

const CallOrder = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewOrder, setViewOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/callorder/getall`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (Array.isArray(data)) setOrders(data);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(order =>
    order.order_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>CALL ORDER MANAGEMENT</h1>
        <button className={styles.addButton} onClick={() => setShowAddModal(true)}>ADD ORDER</button>
      </div>

      <div className={styles.searchContainer}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search by order # or title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Order #</th>
              <th>Title</th>
              <th>Category</th>
              <th>Sub Category</th>
              <th>Product</th>
              <th>Price</th>
              <th>Created</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, index) => (
              <tr key={order._id}>
                <td>{index + 1}</td>
                <td>{order.order_number}</td>
                <td>{order.title}</td>
                <td>{order.category}</td>
                <td>{order.sub_category}</td>
                <td>{order.product}</td>
                <td>${order.price}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className={styles.actionButtons}>
                  <Eye className={styles.icon} onClick={() => setViewOrder(order)} />
                  <Pencil className={styles.icon} /> {/* edit logic next */}
                  <Trash2 className={styles.icon} /> {/* delete logic next */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <AddCallOrderModal
          onClose={() => setShowAddModal(false)}
          onOrderAdded={(newOrder) => setOrders(prev => [...prev, newOrder])}
        />
      )}

      {viewOrder && (
        <ViewCallOrderModal order={viewOrder} onClose={() => setViewOrder(null)} />
      )}
    </div>
  );
};

export default CallOrder;
