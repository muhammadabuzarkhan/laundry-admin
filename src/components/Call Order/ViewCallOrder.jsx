// // import React from 'react';
// // import styles from './CallOrder.module.css';

// // const ViewCallOrderModal = ({ order, onClose }) => {
// //   return (
// //     <div className={styles.modalOverlay}>
// //       <div className={styles.modal}>
// //         <div className={styles.modalHeader}>
// //           <h2>Order Details</h2>
// //           <button className={styles.closeButton} onClick={onClose}>×</button>
// //         </div>
// //         <div className={styles.modalContent}>
// //           {Object.entries(order).map(([key, value]) => (
// //             <p key={key}><strong>{key.replace(/_/g, ' ')}:</strong> {String(value)}</p>
// //           ))}
// //         </div>
// //         <div className={styles.modalActions}>
// //           <button className={styles.cancelButton} onClick={onClose}>Close</button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ViewCallOrderModal;


// import React, { useRef } from 'react';
// import styles from './CallOrder.module.css';

// const ViewCallOrderModal = ({ order, onClose }) => {
//   const printRef = useRef();

//   const handlePrint = () => {
//     const printContents = printRef.current.innerHTML;
//     const printWindow = window.open('', '', 'height=600,width=800');
//     printWindow.document.write('<html><head><title>Order Details</title>');
//     printWindow.document.write('<style>body{font-family:sans-serif;padding:20px;} strong{display:inline-block; min-width:150px;}</style>');
//     printWindow.document.write('</head><body>');
//     printWindow.document.write(printContents);
//     printWindow.document.write('</body></html>');
//     printWindow.document.close();
//     printWindow.focus();
//     printWindow.print();
//     printWindow.close();
//   };

//   return (
//     <div className={styles.modalOverlay}>
//       <div className={styles.modal}>
//         <div className={styles.modalHeader}>
//           <h2>Order Details</h2>
//           <button className={styles.closeButton} onClick={onClose}>×</button>
//         </div>

//         <div className={styles.modalContent} ref={printRef}>
//           {Object.entries(order).map(([key, value]) => (
//             <p key={key}><strong>{key.replace(/_/g, ' ')}:</strong> {String(value)}</p>
//           ))}
//         </div>

//         <div className={styles.modalActions}>
//           <button className={styles.cancelButton} onClick={onClose}>Close</button>
//           <button className={styles.printButton} onClick={handlePrint}>Print</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewCallOrderModal;

import React, { useRef } from 'react';
import styles from './CallOrder.module.css';

const ViewCallOrderModal = ({ order, onClose }) => {
  const printRef = useRef();

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

  // Define visible and ordered fields
  const fields = [
    ['order_number', 'Order #'],
    ['user_name', 'User Name'],
    ['user_phone', 'Phone Number'],
    ['title', 'Title'],
    ['product', 'Product'],
    ['weight', 'Weight (kg)'],
    ['price', 'Price'],
    ['description', 'Description'],
    ['address', 'Address'],
    ['status', 'Status'],
    ['createdAt', 'Created At']
  ];

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>Order Details</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>

        <div className={styles.modalContent} ref={printRef}>
          {fields.map(([key, label]) => {
            let value = order[key];
            if (key === 'createdAt') {
              value = new Date(value).toLocaleString();
            }
            return (
              <p key={key}><strong>{label}:</strong> {value ?? 'N/A'}</p>
            );
          })}
        </div>

        <div className={styles.modalActions}>
          <button className={styles.cancelButton} onClick={onClose}>Close</button>
          <button className={styles.printButton} onClick={handlePrint}>Print</button>
        </div>
      </div>
    </div>
  );
};

export default ViewCallOrderModal;
