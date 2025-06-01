
// import React, { useState } from 'react';
// import styles from './CallOrder.module.css';
// import { createCallOrder } from './CallOrderSevice'; // Adjust path if needed

// const AddCallOrderModal = ({ onClose, onOrderAdded }) => {
//   const [formData, setFormData] = useState({
//     user_name: '',
//     user_phone: '',
//     product: '',
//     weight: '',
//     price: '',
//     description: '',
//     address: '',
//     title: ''
//   });

//   const [message, setMessage] = useState('');
//   const [isError, setIsError] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const payload = {
//       ...formData,
//       weight: parseFloat(formData.weight),
//       price: parseFloat(formData.price)
//     };

//     try {
//       const data = await createCallOrder(payload);
//       if (data._id) {
//         setIsError(false);
//         setMessage('✅ Order created!');
//         onOrderAdded(data);
//         setTimeout(() => onClose(), 1500);
//       } else {
//         setIsError(true);
//         setMessage(data.message || '❌ Failed to create order');
//       }
//     } catch (err) {
//       setIsError(true);
//       setMessage('❌ Server error');
//     }
//   };

//   return (
//     <div className={styles.modalOverlay}>
//       <div className={styles.modal}>
//         <div className={styles.modalHeader}>
//           <h2>Add Call Order</h2>
//           <button className={styles.closeButton} onClick={onClose}>×</button>
//         </div>
//         <form onSubmit={handleSubmit} className={styles.modalForm}>
//           {message && (
//             <div className={isError ? styles.errorMessage : styles.successMessage}>
//               {message}
//             </div>
//           )}

//           {[
//             ['user_name', 'User Name'],
//             ['user_phone', 'Phone Number'],
//             ['product', 'Product Name'],
//             ['weight', 'Weight (kg)', 'number'],
//             ['price', 'Price', 'number'],
//             ['address', 'Address'],
//             ['title', 'Title']
//           ].map(([key, label, type = 'text']) => (
//             <div className={styles.formGroup} key={key}>
//               <label>{label}</label>
//               <input
//                 type={type}
//                 step={type === 'number' ? 'any' : undefined}
//                 name={key}
//                 value={formData[key]}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//           ))}

//           <div className={styles.formGroup}>
//             <label>Description</label>
//             <textarea name="description" value={formData.description} onChange={handleChange} />
//           </div>

//           <div className={styles.formActions}>
//             <button type="button" className={styles.cancelButton} onClick={onClose}>Cancel</button>
//             <button type="submit" className={styles.submitButton}>Save Order</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddCallOrderModal;

import React, { useState, useEffect } from 'react';
import styles from './CallOrder.module.css';
import { createCallOrder, getAllCustomers } from './CallOrderSevice'; // Ensure correct path

const AddCallOrderModal = ({ onClose, onOrderAdded }) => {
  const [formData, setFormData] = useState({
    user_name: '',
    user_phone: '',
    product: '',
    weight: '',
    price: '',
    description: '',
    address: '',
    title: '',
    delivery_datetime: '' // New field
  });

  const [customers, setCustomers] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await getAllCustomers();
        if (res.status && res.data) {
          setCustomers(res.data);
        }
      } catch (err) {
        console.error('Failed to fetch customers:', err);
      }
    };
    fetchCustomers();
  }, []);

  const handleCustomerChange = (e) => {
    const customerId = e.target.value;
    setSelectedCustomerId(customerId);

    const customer = customers.find(c => c._id === customerId);
    if (customer) {
      setFormData(prev => ({
        ...prev,
        user_name: `${customer.firstName} ${customer.lastName}`,
        user_phone: customer.phone,
        address: customer.address
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      weight: parseFloat(formData.weight),
      price: parseFloat(formData.price),
      delivery_datetime: formData.delivery_datetime || undefined
    };

    try {
      const data = await createCallOrder(payload);
      if (data._id) {
        setIsError(false);
        setMessage('✅ Order created!');
        onOrderAdded(data);
        setTimeout(() => onClose(), 1500);
      } else {
        setIsError(true);
        setMessage(data.message || '❌ Failed to create order');
      }
    } catch (err) {
      setIsError(true);
      setMessage('❌ Server error');
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>Add Call Order</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className={styles.modalForm}>
          {message && (
            <div className={isError ? styles.errorMessage : styles.successMessage}>
              {message}
            </div>
          )}

          <div className={styles.formGroup}>
            <label>Select Customer (Email)</label>
            <select value={selectedCustomerId} onChange={handleCustomerChange} required>
              <option value="">-- Select Email --</option>
              {customers.map(customer => (
                <option key={customer._id} value={customer._id}>
                  {customer.email}
                </option>
              ))}
            </select>
          </div>

          {[
            ['user_name', 'Customer Name'],
            ['user_phone', 'Phone Number'],
            ['product', 'Product Name'],
            ['weight', 'Weight (kg)', 'number'],
            ['price', 'Price', 'number'],
            ['address', 'Address'],
            ['title', 'Title'],
            ['delivery_datetime', 'Delivery Date & Time', 'datetime-local']
          ].map(([key, label, type = 'text']) => (
            <div className={styles.formGroup} key={key}>
              <label>{label}</label>
              <input
                type={type}
                step={type === 'number' ? 'any' : undefined}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                required={key !== 'description'}
              />
            </div>
          ))}

          <div className={styles.formGroup}>
            <label>Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} />
          </div>

          <div className={styles.formActions}>
            <button type="button" className={styles.cancelButton} onClick={onClose}>Cancel</button>
            <button type="submit" className={styles.submitButton}>Save Order</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCallOrderModal;
