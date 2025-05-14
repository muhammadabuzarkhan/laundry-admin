
import React, { useEffect, useState } from 'react';
import styles from './Product.module.css';

const ProductModal = ({
  formData,
  handleInputChange,
  handleImageChange,
  handleSubmit,
  handleCloseModal
}) => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');

  const baseURL = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem('token');

  // Fetch all categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${baseURL}/api/admin/auth/category/get`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await res.json();
        if (res.ok && data?.data?.allcategory) {
          setCategories(data.data.allcategory);
        } else {
          console.error('Error fetching categories:', data.status || data.message);
        }
      } catch (err) {
        console.error('Fetch error:', err);
      }
    };

    fetchCategories();
  }, [baseURL, token]);

  // Fetch subcategories when selectedCategoryId changes
  useEffect(() => {
    if (!selectedCategoryId) {
      setSubcategories([]);
      return;
    }

    const fetchSubcategories = async () => {
      try {
        const res = await fetch(`${baseURL}/api/admin/auth/subcategory/get/${selectedCategoryId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await res.json();
        if (res.ok && data?.data?.selectedSubCategory) {
          setSubcategories(data.data.selectedSubCategory);
        } else {
          console.error('Error fetching subcategories:', data.status || data.message);
        }
      } catch (err) {
        console.error('Subcategory fetch error:', err);
      }
    };

    fetchSubcategories();
  }, [selectedCategoryId, baseURL, token]);

  // When user selects a category by title
  const handleCategoryChange = (e) => {
    const selectedTitle = e.target.value;
    const selectedCategory = categories.find(cat => cat.title === selectedTitle);
    setSelectedCategoryId(selectedCategory?._id || '');
    handleInputChange(e); // update formData.category
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>Add New Product</h2>
          <button className={styles.closeButton} onClick={handleCloseModal}>×</button>
        </div>
        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <div className={styles.formGroup}>
            <label htmlFor="title">Product Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                min="0"
                step="0.01"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="weight">Weight</label>
              <input
                type="text"
                id="weight"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleCategoryChange}
                required
              >
                <option value="">Select a category</option>
                {categories.map(cat => (
                  <option key={cat._id} value={cat.title}>
                    {cat.title}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="subcategory">Subcategory</label>
              <select
                id="subcategory"
                name="subcategory"
                value={formData.subcategory}
                onChange={handleInputChange}
              >
                <option value="">Select a subcategory</option>
                {subcategories.map(sub => (
                  <option key={sub._id} value={sub.title}>
                    {sub.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="3"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="image">Product Image</label>
            <div className={styles.fileUpload}>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
                accept="image/*"
              />
              <div className={styles.uploadPlaceholder}>
                {formData.image ? formData.image.name : 'Choose file or drag and drop'}
              </div>
            </div>
          </div>

          <div className={styles.formActions}>
            <button type="button" className={styles.cancelButton} onClick={handleCloseModal}>
              Cancel
            </button>
            <button type="submit" className={styles.submitButton}>
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
