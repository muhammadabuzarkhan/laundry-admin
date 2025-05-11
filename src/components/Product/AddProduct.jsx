// src/components/ProductModal.jsx
import React from 'react';
import styles from './Product.module.css';

const ProductModal = ({
  formData,
  handleInputChange,
  handleImageChange,
  handleSubmit,
  handleCloseModal
}) => {
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
            <input type="text" id="title" name="title" value={formData.title} onChange={handleInputChange} required />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="price">Price</label>
              <input type="number" id="price" name="price" value={formData.price} onChange={handleInputChange} required min="0" step="0.01" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="weight">Weight</label>
              <input type="text" id="weight" name="weight" value={formData.weight} onChange={handleInputChange} />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="category">Category</label>
              <select id="category" name="category" value={formData.category} onChange={handleInputChange} required>
                <option value="">Select a category</option>
                <option value="None">None</option>
                <option value="Dry Cleaning">Dry Cleaning</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="subcategory">Subcategory</label>
              <select id="subcategory" name="subcategory" value={formData.subcategory} onChange={handleInputChange}>
                <option value="">Select a subcategory</option>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </select>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} rows="3" />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="image">Product Image</label>
            <div className={styles.fileUpload}>
              <input type="file" id="image" name="image" onChange={handleImageChange} accept="image/*" />
              <div className={styles.uploadPlaceholder}>
                {formData.image ? formData.image.name : 'Choose file or drag and drop'}
              </div>
            </div>
          </div>

          <div className={styles.formActions}>
            <button type="button" className={styles.cancelButton} onClick={handleCloseModal}>Cancel</button>
            <button type="submit" className={styles.submitButton}>Save Product</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
