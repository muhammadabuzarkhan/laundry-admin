


// import React, { useEffect, useState } from 'react';
// import styles from './Order.module.css';

// const OrderDetails = ({ orderId, onClose }) => {
//   const [order, setOrder] = useState(null);

//   useEffect(() => {
//     const fetchOrderDetails = async () => {
//       const token = localStorage.getItem('token');
//       const baseUrl = process.env.REACT_APP_BASE_URL;
//       const response = await fetch(`${baseUrl}/api/admin/auth/order/get/${orderId}`, {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setOrder(data.data.orders[0]); // Since the response returns an array of orders
//       } else {
//         console.error('Failed to fetch order details');
//       }
//     };

//     fetchOrderDetails();
//   }, [orderId]);

//   if (!order) return <div>Loading...</div>;

//   return (
//     <div className={styles.modal}>
//       <div className={styles.modalContent}>
//         <span className={styles.closeButton} onClick={onClose}>&times;</span>
//         <h2>Order Details</h2>
//         <p><strong>Order ID:</strong> {order._id}</p>
//         <p><strong>Order Number:</strong> {order.orderNumber}</p>
//         <p><strong>Customer:</strong> {order.userid.firstName || 'Unknown'} {order.userid.lastName || ''}</p>
//         <p><strong>Email:</strong> {order.userid.email}</p>
//         <p><strong>Description:</strong> {order.description}</p>
        
//         <p><strong>Collection:</strong> {order.collectionTime.map(item => `${item.date} at ${item.time} - ${item.instructions}`).join(', ')}</p>
//         <p><strong>Delivery:</strong> {order.DeliveryTime.map(item => `${item.date} at ${item.time} - ${item.instructions}`).join(', ')}</p>

//         <p><strong>Address:</strong> {order.userid.address.address}, {order.userid.address.postcode}</p>

//         <p><strong>Total:</strong> £{order.Total}</p>
//         <p><strong>Service Fee:</strong> £{order.serviceFee}</p>
//         <p><strong>Delivery Fee:</strong> £{order.deliveryFee}</p>
//         <p><strong>Driver Tip:</strong> £{order.driverTip}</p>
//         <p><strong>Gross Total:</strong> £{order.grossTotal}</p>
//         <p><strong>Payment ID:</strong> {order.paymentId}</p>
//         <p><strong>Order Status:</strong> <span className={styles.statusPill}>{order.status}</span></p>
//       </div>
//     </div>
//   );
// };

// export default OrderDetails;

import React, { useEffect, useRef, useState } from 'react';
import styles from './Order.module.css';

const OrderDetails = ({ orderId, onClose }) => {
  const [order, setOrder] = useState(null);
  const printRef = useRef();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      const token = localStorage.getItem('token');
      const baseUrl = process.env.REACT_APP_BASE_URL;
      const response = await fetch(`${baseUrl}/api/admin/auth/order/get/${orderId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setOrder(data.data.orders[0]);
      } else {
        console.error('Failed to fetch order details');
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Order Details</title>');
    printWindow.document.write('<style>body{font-family:sans-serif;padding:20px;} strong{display:inline-block; min-width:150px;}</style>');
    printWindow.document.write('</head><body>');
    printWindow.document.write(printContents);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  if (!order) return <div>Loading...</div>;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.closeButton} onClick={onClose}>&times;</span>
        <h2>Order Details</h2>

        {/* Printable content */}
        <div ref={printRef}>
          <p><strong>Order ID:</strong> {order._id}</p>
          <p><strong>Order Number:</strong> {order.orderNumber}</p>
          <p><strong>Customer:</strong> {order.userid.firstName || 'Unknown'} {order.userid.lastName || ''}</p>
          <p><strong>Email:</strong> {order.userid.email}</p>
          <p><strong>Description:</strong> {order.description}</p>

          <p><strong>Collection:</strong> {order.collectionTime.map(item => `${item.date} at ${item.time} - ${item.instructions}`).join(', ')}</p>
          <p><strong>Delivery:</strong> {order.DeliveryTime.map(item => `${item.date} at ${item.time} - ${item.instructions}`).join(', ')}</p>

          <p><strong>Address:</strong> {order.userid.address.address}, {order.userid.address.postcode}</p>

          <p><strong>Total:</strong> £{order.Total}</p>
          <p><strong>Service Fee:</strong> £{order.serviceFee}</p>
          <p><strong>Delivery Fee:</strong> £{order.deliveryFee}</p>
          <p><strong>Driver Tip:</strong> £{order.driverTip}</p>
          <p><strong>Gross Total:</strong> £{order.grossTotal}</p>
          <p><strong>Payment ID:</strong> {order.paymentId}</p>
          <p><strong>Order Status:</strong> <span className={styles.statusPill}>{order.status}</span></p>
        </div>

        {/* Action buttons */}
        <div className={styles.modalActions}>
          <button className={styles.printButton} onClick={handlePrint}>Print</button>
          <button className={styles.cancelButton} onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
