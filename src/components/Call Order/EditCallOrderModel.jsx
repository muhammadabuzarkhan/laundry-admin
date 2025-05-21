import React, { useState, useEffect } from 'react';
import styles from './CallOrder.module.css';

const EditCallOrderModal = ({ order, onClose, onOrderUpdated }) => {
  const [formData, setFormData] = useState({ ...order });

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/admin/auth/category/get`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setCategories(data?.data?.allcategory || []);
      } catch (err) {
        console.error('Fetch categories error:', err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!formData.category) return;

    const fetchSubCategories = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/admin/auth/subcategory/get/${formData.category}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setSubCategories(data?.data?.selectedSubCategory || []);
      } catch (err) {
        console.error('Subcategory fetch error:', err);
      }
    };
    fetchSubCategories();
  }, [formData.category]);

  useEffect(() => {
    if (!formData.sub_category) return;

    const fetchProducts = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/admin/auth/product/get/${formData.category}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setProducts(data?.data?.selectedProducts || []);
      } catch (err) {
        console.error('Fetch products error:', err);
      }
    };
    fetchProducts();
  }, [formData.sub_category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const payload = {
      ...formData,
      weight: parseFloat(formData.weight),
      price: parseFloat(formData.price),
    };

    try {
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/callorder/${order._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (res.ok) {
        setIsError(false);
        setMessage('✅ Order updated!');
        onOrderUpdated(data);
        setTimeout(() => onClose(), 1500);
      } else {
        setIsError(true);
        setMessage(data.message || '❌ Failed to update order');
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
          <h2>Edit Call Order</h2>
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
            ['weight', 'Weight (kg)', 'number'],
            ['price', 'Price', 'number'],
            ['address', 'Address'],
            ['title', 'Title']
          ].map(([key, label, type = 'text']) => (
            <div className={styles.formGroup} key={key}>
              <label>{label}</label>
              <input
                type={type}
                step={type === 'number' ? 'any' : undefined}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                required
              />
            </div>
          ))}

          <div className={styles.formGroup}>
            <label>Category</label>
            <select name="category" value={formData.category} onChange={handleChange} required>
              <option value="">-- Select Category --</option>
              {categories.map(c => (
                <option key={c._id} value={c._id}>{c.title}</option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Sub Category</label>
            <select name="sub_category" value={formData.sub_category} onChange={handleChange} required>
              <option value="">-- Select Sub Category --</option>
              {subCategories.map(sc => (
                <option key={sc._id} value={sc._id}>{sc.title}</option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Product</label>
            <select name="product" value={formData.product} onChange={handleChange} required>
              <option value="">-- Select Product --</option>
              {products.map(p => (
                <option key={p._id} value={p._id}>{p.title}</option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} />
          </div>

          <div className={styles.formActions}>
            <button type="button" className={styles.cancelButton} onClick={onClose}>Cancel</button>
            <button type="submit" className={styles.submitButton}>Update Order</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCallOrderModal;
