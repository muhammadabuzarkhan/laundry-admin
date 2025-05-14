import React, { useState, useEffect } from 'react';
import styles from './SubCategory.module.css';

const AddSubCategory = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: '', // This will store the selected category ID
  });

  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');  // State for success/error message
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    if (isOpen) {
      const fetchCategories = async () => {
        setLoadingCategories(true);
        setError('');
        try {
          const token = localStorage.getItem('token');
          const res = await fetch(`${BASE_URL}/api/admin/auth/category/get`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          const data = await res.json();

          if (res.ok && Array.isArray(data?.data?.allcategory)) {
            setCategories(data.data.allcategory); // Set categories using allcategory
          } else {
            setError('Failed to load categories or invalid data format');
          }
        } catch (err) {
          console.error("Fetch error:", err);
          setError("Error loading categories");
        } finally {
          setLoadingCategories(false);
        }
      };

      fetchCategories();
    }
  }, [isOpen, BASE_URL]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title: formData.title,
      catId: formData.category, // Send the category ID
    };

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${BASE_URL}/api/admin/auth/subcategory/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (res.ok) {
        setMessage('Subcategory successfully created!');  // Success message
        onSubmit(result); // Pass success result to parent
        setFormData({ title: '', category: '' }); // Reset form
        setTimeout(() => {
          setMessage(''); // Clear message after 3 seconds
          onClose();
        }, 3000);
      } else {
        setMessage(result.message || 'Failed to create subcategory'); // Error message
      }
    } catch (err) {
      console.error("Error submitting subcategory:", err);
      setMessage("Something went wrong while submitting."); // Error message
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>Add New Sub Category</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>

        {/* Display success or error message */}
        {message && (
          <div className={styles.message}>
            <p>{message}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <div className={styles.formGroup}>
            <label htmlFor="title">Sub Category Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="category">Parent Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a category</option>
              {loadingCategories ? (
                <option disabled>Loading...</option>
              ) : (
                categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.title}
                  </option>
                ))
              )}
            </select>
            {error && <p className={styles.errorText}>{error}</p>}
          </div>

          <div className={styles.formActions}>
            <button type="button" className={styles.cancelButton} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={styles.submitButton}>
              Save Sub Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSubCategory;
