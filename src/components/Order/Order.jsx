
// import React, { useEffect, useState, useCallback } from 'react';
// import styles from './Order.module.css';
// import OrderDetails from './OrderDetails';

// const Order = () => {
//   const [orders, setOrders] = useState([]);
//   const [selectedOrderId, setSelectedOrderId] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);  // State for modal visibility
//   const [orderToChange, setOrderToChange] = useState(null);  // Order ID to change

//   // Fetch orders with polling
//   const fetchOrders = useCallback(async () => {
//     setIsLoading(true);
//     const token = localStorage.getItem('token');
//     const baseUrl = process.env.REACT_APP_BASE_URL;

//     try {
//       const response = await fetch(`${baseUrl}/api/admin/auth/order/get`, {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.ok) {
//         const { data } = await response.json();
//         setOrders(data.allOrder);
//       } else {
//         throw new Error('Failed to fetch orders');
//       }
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchOrders();

//     // Polling every 30 seconds for updates
//     const interval = setInterval(fetchOrders, 30000);
//     return () => clearInterval(interval);
//   }, [fetchOrders]);

//   const getStatusClass = (status) => {
//     switch (status) {
//       case 'completed':
//         return styles.statusCompleted;
//       case 'pending':
//         return styles.statusPending;
//       default:
//         return '';
//     }
//   };

//   const handleViewClick = (orderId) => {
//     setSelectedOrderId(orderId);
//   };

//   // Open the modal and store the order ID to be updated
//   const handleChangeStatusClick = (orderId) => {
//     setOrderToChange(orderId);
//     setIsModalOpen(true);
//   };

//   const handleConfirmChangeStatus = async () => {
//     const token = localStorage.getItem('token');
//     const baseUrl = process.env.REACT_APP_BASE_URL;

//     try {
//       const response = await fetch(`${baseUrl}/api/admin/auth/order/status/${orderToChange}`, {
//         method: 'PUT',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.ok) {
//         const { data } = await response.json();
//         // Update status locally after successful API call
//         setOrders((prevOrders) =>
//           prevOrders.map((order) =>
//             order._id === orderToChange ? { ...order, status: 'completed' } : order
//           )
//         );
//         setIsModalOpen(false); // Close modal after confirming
//       } else {
//         throw new Error('Failed to update order status');
//       }
//     } catch (error) {
//       console.error(error.message);
//     }
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false); // Close modal on cancel
//     setOrderToChange(null);
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.header}>
//         <h1 className={styles.title}>Orders</h1>
//       </div>

//       <div className={styles.tableContainer}>
//         {isLoading ? (
//           <p>Loading...</p>
//         ) : error ? (
//           <p>Error: {error}</p>
//         ) : (
//           <table className={styles.table}>
//             <thead>
//               <tr>
//                 <th>Order No</th>
//                 <th>Customer</th>
//                 <th>Total</th>
//                 <th>Status</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {orders.map((order) => (
//                 <tr key={order._id}>
//                   <td>{order._id}</td>
//                   <td>{order.userid.firstName || 'Unknown'}</td>
//                   <td>£{order.Total}</td>
//                   <td>
//                     <span className={`${styles.statusPill} ${getStatusClass(order.status)}`}>
//                       {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
//                     </span>
//                   </td>
//                   <td>
//                     <button className={styles.viewButton} onClick={() => handleViewClick(order._id)}>
//                       View
//                     </button>
//                     {order.status === 'pending' && (
//                       <button
//                         className={styles.statusButton}
//                         onClick={() => handleChangeStatusClick(order._id)}
//                       >
//                         Mark as Completed
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>

//       {selectedOrderId && (
//         <OrderDetails orderId={selectedOrderId} onClose={() => setSelectedOrderId(null)} />
//       )}

//       {/* Modal for confirmation */}
//       {isModalOpen && (
//         <div className={styles.modalOverlay}>
//           <div className={styles.modalContent}>
//             <h2>Are you sure you want to change the status?</h2>
//             <div className={styles.buttons}>
//               <button onClick={handleConfirmChangeStatus} className={styles.confirmButton}>
//                 Yes
//               </button>
//               <button onClick={handleCloseModal} className={styles.cancelButton}>
//                 No
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Order;

// Order.jsx
import React, { useEffect, useState, useCallback } from 'react';
import styles from './Order.module.css';
import OrderDetails from './OrderDetails';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderToChange, setOrderToChange] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    const token = localStorage.getItem('token');
    const baseUrl = process.env.REACT_APP_BASE_URL;

    try {
      const response = await fetch(`${baseUrl}/api/admin/auth/order/get`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const { data } = await response.json();
        setOrders(data.allOrder);
        setFilteredOrders(data.allOrder); // initialize filtered data
      } else {
        throw new Error('Failed to fetch orders');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 30000);
    return () => clearInterval(interval);
  }, [fetchOrders]);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = orders.filter(order =>
      order._id.toLowerCase().includes(term) ||
      order.userid?.firstName?.toLowerCase().includes(term)
    );
    setFilteredOrders(filtered);
  }, [searchTerm, orders]);

  const getStatusClass = (status) => {
    switch (status) {
      case 'completed':
        return styles.statusCompleted;
      case 'pending':
        return styles.statusPending;
      default:
        return '';
    }
  };

  const handleViewClick = (orderId) => {
    setSelectedOrderId(orderId);
  };

  const handleChangeStatusClick = (orderId) => {
    setOrderToChange(orderId);
    setIsModalOpen(true);
  };

  const handleConfirmChangeStatus = async () => {
    const token = localStorage.getItem('token');
    const baseUrl = process.env.REACT_APP_BASE_URL;

    try {
      const response = await fetch(`${baseUrl}/api/admin/auth/order/status/${orderToChange}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const { data } = await response.json();
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderToChange ? { ...order, status: 'completed' } : order
          )
        );
        setIsModalOpen(false);
      } else {
        throw new Error('Failed to update order status');
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setOrderToChange(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Orders</h1>
      </div>

      <div className={styles.searchContainer}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search by Order ID or Customer Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className={styles.tableContainer}>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Order No</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order._id}>
                  <td>{order?.orderNumber}</td>
                  <td>{order.userid?.firstName || 'Unknown'}</td>
                  <td>£{order.Total}</td>
                  <td>
                    <span className={`${styles.statusPill} ${getStatusClass(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td>
                    <button
                      className={styles.viewButton}
                      onClick={() => handleViewClick(order._id)}
                    >
                      View
                    </button>
                    {order.status === 'pending' && (
                      <button
                        className={styles.statusButton}
                        onClick={() => handleChangeStatusClick(order._id)}
                      >
                        Mark as Completed
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {selectedOrderId && (
        <OrderDetails orderId={selectedOrderId} onClose={() => setSelectedOrderId(null)} />
      )}

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Are you sure you want to change the status?</h2>
            <div className={styles.buttons}>
              <button onClick={handleConfirmChangeStatus} className={styles.confirmButton}>
                Yes
              </button>
              <button onClick={handleCloseModal} className={styles.cancelButton}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
