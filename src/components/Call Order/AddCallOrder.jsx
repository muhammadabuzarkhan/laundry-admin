

// import React, { useState, useEffect } from 'react';
// import styles from './CallOrder.module.css';
// import { createCallOrder, getAllCustomers } from './CallOrderSevice'; // Ensure correct path

// const AddCallOrderModal = ({ onClose, onOrderAdded }) => {
//   const [formData, setFormData] = useState({
//     user_name: '',
//     user_phone: '',
//     product: '',
//     weight: '',
//     price: '',
//     description: '',
//     address: '',
//     title: '',
//     delivery_datetime: '' // New field
//   });

//   const [customers, setCustomers] = useState([]);
//   const [selectedCustomerId, setSelectedCustomerId] = useState('');
//   const [message, setMessage] = useState('');
//   const [isError, setIsError] = useState(false);

//   useEffect(() => {
//     const fetchCustomers = async () => {
//       try {
//         const res = await getAllCustomers();
//         if (res.status && res.data) {
//           setCustomers(res.data);
//         }
//       } catch (err) {
//         console.error('Failed to fetch customers:', err);
//       }
//     };
//     fetchCustomers();
//   }, []);

//   const handleCustomerChange = (e) => {
//     const customerId = e.target.value;
//     setSelectedCustomerId(customerId);

//     const customer = customers.find(c => c._id === customerId);
//     if (customer) {
//       setFormData(prev => ({
//         ...prev,
//         user_name: `${customer.firstName} ${customer.lastName}`,
//         user_phone: customer.phone,
//         address: customer.address
//       }));
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const payload = {
//       ...formData,
//       weight: parseFloat(formData.weight),
//       price: parseFloat(formData.price),
//       delivery_datetime: formData.delivery_datetime || undefined
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

//           <div className={styles.formGroup}>
//             <label>Select Customer (Email)</label>
//             <select value={selectedCustomerId} onChange={handleCustomerChange} required>
//               <option value="">-- Select Email --</option>
//               {customers.map(customer => (
//                 <option key={customer._id} value={customer._id}>
//                   {customer.email}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {[
//             ['user_name', 'Customer Name'],
//             ['user_phone', 'Phone Number'],
//             ['product', 'Product Name'],
//             ['weight', 'Weight (kg)', 'number'],
//             ['price', 'Price', 'number'],
//             ['address', 'Address'],
//             ['title', 'Title'],
//             ['delivery_datetime', 'Delivery Date & Time', 'datetime-local']
//           ].map(([key, label, type = 'text']) => (
//             <div className={styles.formGroup} key={key}>
//               <label>{label}</label>
//               <input
//                 type={type}
//                 step={type === 'number' ? 'any' : undefined}
//                 name={key}
//                 value={formData[key]}
//                 onChange={handleChange}
//                 required={key !== 'description'}
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

// AddCallOrderModal.js
import React, { useState, useEffect } from 'react';
import styles from './CallOrder.module.css';
import { createBulkCallOrder, getAllCustomers } from './CallOrderSevice';

const defaultOrder = {
  user_name: '',
  user_phone: '',
  product: '',
  weight: '',
  price: '',
  description: '',
  address: '',
  title: '',
  delivery_datetime: ''
};

const AddCallOrderModal = ({ onClose, onOrderAdded }) => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [orders, setOrders] = useState([{ ...defaultOrder }]);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getAllCustomers().then(res => {
      if (res.status && res.data) setCustomers(res.data);
    }).catch(console.error);
  }, []);

  const handleCustomerChange = (e) => {
    const customerId = e.target.value;
    setSelectedCustomerId(customerId);
    const customer = customers.find(c => c._id === customerId);

    if (customer) {
      setOrders(prev => prev.map(order => ({
        ...order,
        user_name: `${customer.firstName} ${customer.lastName}`,
        user_phone: customer.phone,
        address: customer.address
      })));
    }
  };

  const handleOrderChange = (index, name, value) => {
    const updated = [...orders];
    updated[index][name] = value;
    setOrders(updated);
  };

  const addOrder = () => setOrders([...orders, { ...defaultOrder }]);
  const removeOrder = (i) => setOrders(orders.filter((_, index) => index !== i));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCustomerId) return;

    const payload = orders.map(o => ({
      ...o,
      weight: parseFloat(o.weight),
      price: parseFloat(o.price),
      delivery_datetime: o.delivery_datetime || undefined
    }));

    try {
      const data = await createBulkCallOrder({ customer: selectedCustomerId, orders: payload });
      if (data.length) {
        setIsError(false);
        setMessage('✅ Orders created!');
        onOrderAdded(data);
        setTimeout(() => onClose(), 1500);
      }
    } catch (err) {
      setIsError(true);
      setMessage('❌ Error creating orders');
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>Add Call Order(s)</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className={styles.modalForm}>
          {message && (
            <div className={isError ? styles.errorMessage : styles.successMessage}>{message}</div>
          )}

          <div className={styles.formGroup}>
            <label>Select Customer (Email)</label>
            <select value={selectedCustomerId} onChange={handleCustomerChange} required>
              <option value="">-- Select Email --</option>
              {customers.map(c => <option key={c._id} value={c._id}>{c.email}</option>)}
            </select>
          </div>

          {orders.map((order, index) => (
            <div key={index} className={styles.orderBlock}>
              <h4>Order #{index + 1}</h4>
              {[['user_name', 'Name'], ['user_phone', 'Phone'], ['product', 'Product'], ['weight', 'Weight', 'number'], ['price', 'Price', 'number'], ['address', 'Address'], ['title', 'Title'], ['delivery_datetime', 'Delivery DateTime', 'datetime-local']]
                .map(([key, label, type = 'text']) => (
                  <div className={styles.formGroup} key={key}>
                    <label>{label}</label>
                    <input
                      type={type}
                      name={key}
                      value={order[key]}
                      onChange={(e) => handleOrderChange(index, key, e.target.value)}
                      required={key !== 'description'}
                    />
                  </div>
              ))}

              <div className={styles.formGroup}>
                <label>Description</label>
                <textarea name="description" value={order.description} onChange={e => handleOrderChange(index, 'description', e.target.value)} />
              </div>

              {orders.length > 1 && (
                <button type="button" onClick={() => removeOrder(index)} className={styles.removeButton}>Remove</button>
              )}
              <hr />
            </div>
          ))}
          


          <div className={styles.formActions}>
            <button type="button" onClick={addOrder} className={styles.addButton}>+ Add Another Order</button>

            <button type="submit" className={styles.submitButton}>Save Orders</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCallOrderModal;
