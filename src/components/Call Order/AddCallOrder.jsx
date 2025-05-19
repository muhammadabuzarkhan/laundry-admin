import React, { useState } from 'react';
import styles from './CallOrder.module.css';

const AddCallOrderModal = ({ onClose, onOrderAdded }) => {
  const [formData, setFormData] = useState({
    user_name: '',
    user_phone: '',
    category: '',
    sub_category: '',
    product: '',
    weight: '',
    price: '',
    description: '',
    address: '',
    title: ''
  });
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/callorder/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok && data._id) {
        setIsError(false);
        setMessage('✅ Order created!');
        onOrderAdded(data);
        setTimeout(() => {
          onClose();
        }, 1500);
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
          {[
            ['user_name', 'User Name'],
            ['user_phone', 'Phone Number'],
            ['category', 'Category'],
            ['sub_category', 'Sub Category'],
            ['product', 'Product'],
            ['weight', 'Weight (kg)'],
            ['price', 'Price'],
            ['address', 'Address'],
            ['title', 'Title']
          ].map(([key, label]) => (
            <div className={styles.formGroup} key={key}>
              <label>{label}</label>
              <input name={key} value={formData[key]} onChange={handleChange} required />
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
