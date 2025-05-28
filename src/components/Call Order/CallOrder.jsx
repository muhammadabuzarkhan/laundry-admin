// import React, { useState, useEffect } from 'react';
// import styles from './CallOrder.module.css';
// import AddCallOrderModal from './AddCallOrder';
// import ViewCallOrderModal from './ViewCallOrder';
// import { Eye, Trash2, Pencil } from 'lucide-react';
// import EditCallOrderModal from './EditCallOrderModel'

// const CallOrder = () => {
//   const [orders, setOrders] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [viewOrder, setViewOrder] = useState(null);
//   const [editOrder, setEditOrder] = useState(null);
//   const [deleteOrder, setDeleteOrder] = useState(null); // holds the order to delete
//   const [showDeleteModal, setShowDeleteModal] = useState(false);


//   useEffect(() => {
//     const fetchOrders = async () => {
//       const token = localStorage.getItem('token');
//       try {
//         const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/callorder/getall`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         const data = await res.json();
//         if (Array.isArray(data)) setOrders(data);
//       } catch (err) {
//         console.error('Failed to fetch orders:', err);
//       }
//     };

//     fetchOrders();
//   }, []);

//   const filteredOrders = orders.filter(order =>
//     order.order_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     order.title?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   //Delete Here 
//   const handleDelete = async () => {
//     if (!deleteOrder) return;
//     const token = localStorage.getItem('token');
//     try {
//       const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/callorder/${deleteOrder._id}`, {
//         method: 'DELETE',
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       if (res.ok) {
//         setOrders(prev => prev.filter(order => order._id !== deleteOrder._id));
//         setDeleteOrder(null);
//         setShowDeleteModal(false);
//       } else {
//         console.error('Failed to delete order');
//       }
//     } catch (err) {
//       console.error('Error deleting order:', err);
//     }
//   };



//   return (
//     <div className={styles.container}>
//       <div className={styles.header}>
//         <h1>CALL ORDER MANAGEMENT</h1>
//         <button className={styles.addButton} onClick={() => setShowAddModal(true)}>ADD ORDER</button>
//       </div>

//       <div className={styles.searchContainer}>
//         <input
//           type="text"
//           className={styles.searchInput}
//           placeholder="Search by order # or title"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       <div className={styles.tableContainer}>
//         <table className={styles.table}>
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Order #</th>
//               <th>Title</th>
//               <th>Category</th>
//               <th>Sub Category</th>
//               <th>Product</th>
//               <th>Price</th>
//               <th>Created</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredOrders.map((order, index) => (
//               <tr key={order._id}>
//                 <td>{index + 1}</td>
//                 <td>{order.order_number}</td>
//                 <td>{order.title}</td>
//                 <td>{order.category}</td>
//                 <td>{order.sub_category}</td>
//                 <td>{order.product}</td>
//                 <td>${order.price}</td>
//                 <td>{new Date(order.createdAt).toLocaleDateString()}</td>
//                 <td className={styles.actionButtons}>
//                   <Eye className={styles.icon} onClick={() => setViewOrder(order)} />
//                   <Pencil className={styles.icon} onClick={() => setEditOrder(order)} />

//                   <Trash2
//                     className={styles.icon}
//                     onClick={() => {
//                       setDeleteOrder(order);
//                       setShowDeleteModal(true);
//                     }}
//                   />

//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       {/* Edit Modal  */}
//       {editOrder && (
//         <EditCallOrderModal
//           order={editOrder}
//           onClose={() => setEditOrder(null)}
//           onOrderUpdated={(updated) => {
//             setOrders(prev => prev.map(o => o._id === updated._id ? updated : o));
//           }}
//         />
//       )}




//       {/* Delete Modle  */}
//       {showDeleteModal && (
//         <div className={styles.modalBackdrop}>
//           <div className={styles.modal}>
//             <h3>Confirm Deletion</h3>
//             <p>Are you sure you want to delete order <strong>{deleteOrder?.order_number}</strong>?</p>
//             <div className={styles.modalActions}>
//               <button onClick={handleDelete} className={styles.confirmButton}>OK</button>
//               <button onClick={() => setShowDeleteModal(false)} className={styles.cancelButton}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}




//       {showAddModal && (
//         <AddCallOrderModal
//           onClose={() => setShowAddModal(false)}
//           onOrderAdded={(newOrder) => setOrders(prev => [...prev, newOrder])}
//         />
//       )}

//       {viewOrder && (
//         <ViewCallOrderModal order={viewOrder} onClose={() => setViewOrder(null)} />
//       )}
//     </div>
//   );
// };

// export default CallOrder;


import React, { useState, useEffect } from 'react';
import styles from './CallOrder.module.css';
import AddCallOrderModal from './AddCallOrder';
import ViewCallOrderModal from './ViewCallOrder';
import { Eye, Trash2, Pencil } from 'lucide-react';
import EditCallOrderModal from './EditCallOrderModel';

const CallOrder = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewOrder, setViewOrder] = useState(null);
  const [editOrder, setEditOrder] = useState(null);
  const [deleteOrder, setDeleteOrder] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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

  const handleDelete = async () => {
    if (!deleteOrder) return;
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/callorder/${deleteOrder._id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res.ok) {
        setOrders(prev => prev.filter(order => order._id !== deleteOrder._id));
        setDeleteOrder(null);
        setShowDeleteModal(false);
      } else {
        console.error('Failed to delete order');
      }
    } catch (err) {
      console.error('Error deleting order:', err);
    }
  };

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
              <th>Phone Number</th>
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
                <td>{order.user_phone}</td>
                <td>{order.product}</td>
                <td>${order.price}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className={styles.actionButtons}>
                  <Eye className={styles.icon} onClick={() => setViewOrder(order)} />
                  <Pencil className={styles.icon} onClick={() => setEditOrder(order)} />
                  <Trash2
                    className={styles.icon}
                    onClick={() => {
                      setDeleteOrder(order);
                      setShowDeleteModal(true);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editOrder && (
        <EditCallOrderModal
          order={editOrder}
          onClose={() => setEditOrder(null)}
          onOrderUpdated={(updated) => {
            setOrders(prev => prev.map(o => o._id === updated._id ? updated : o));
          }}
        />
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modal}>
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete order <strong>{deleteOrder?.order_number}</strong>?</p>
            <div className={styles.modalActions}>
              <button onClick={handleDelete} className={styles.confirmButton}>OK</button>
              <button onClick={() => setShowDeleteModal(false)} className={styles.cancelButton}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <AddCallOrderModal
          onClose={() => setShowAddModal(false)}
          onOrderAdded={(newOrder) => setOrders(prev => [...prev, newOrder])}
        />
      )}

      {/* View Modal */}
      {viewOrder && (
        <ViewCallOrderModal order={viewOrder} onClose={() => setViewOrder(null)} />
      )}
    </div>
  );
};

export default CallOrder;
