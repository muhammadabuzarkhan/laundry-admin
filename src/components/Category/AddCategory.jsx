// AddCategory.jsx
import React from 'react';
import styles from './Category.module.css';

const AddCategory = ({
  isModalOpen,
  isEditMode,
  formData,
  submitLoading,
  handleCloseModal,
  handleInputChange,
  handleImageChange,
  handleSubmit,
}) => {
  return (
    isModalOpen && (
      <div className={styles.modalOverlay}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h2>{isEditMode ? 'Edit Category' : 'Add New Category'}</h2>
            <button className={styles.closeButton} onClick={handleCloseModal}>×</button>
          </div>
          <form onSubmit={handleSubmit} className={styles.modalForm}>
            <div className={styles.formGroup}>
              <label htmlFor="title">Category Title*</label>
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
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
              ></textarea>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="tags">Tags</label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="Separate tags with commas or enter JSON array"
              />
              <small className={styles.helpText}>
                Example: tag1, tag2, tag3 or ["tag1", "tag2", "tag3"]
              </small>
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
                  min="0"
                  step="0.01"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="priceTypes">Price Types</label>
                <input
                  type="text"
                  id="priceTypes"
                  name="priceTypes"
                  value={formData.priceTypes}
                  onChange={handleInputChange}
                  placeholder="e.g. hourly, fixed"
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="priceDescription">Price Description</label>
              <input
                type="text"
                id="priceDescription"
                name="priceDescription"
                value={formData.priceDescription}
                onChange={handleInputChange}
                placeholder="e.g. per item, per kg"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="Includes">Includes</label>
              <input
                type="text"
                id="Includes"
                name="Includes"
                value={formData.Includes}
                onChange={handleInputChange}
                placeholder="What's included in this category"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="image">
                Category Image {!isEditMode && '*'}
                {isEditMode && ' (Leave empty to keep current image)'}
              </label>
              <div className={styles.fileUpload}>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleImageChange}
                  accept="image/*"
                  required={!isEditMode}
                />
                <div className={styles.uploadPlaceholder}>
                  {formData.image ? formData.image.name : isEditMode ? 'Choose new file or keep existing' : 'Choose file or drag and drop'}
                </div>
              </div>
            </div>

            <div className={styles.formActions}>
              <button type="button" className={styles.cancelButton} onClick={handleCloseModal}>
                Cancel
              </button>
              <button
                type="submit"
                className={styles.submitButton}
                disabled={submitLoading}
              >
                {submitLoading ? 'Saving...' : isEditMode ? 'Update Category' : 'Save Category'}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default AddCategory;
