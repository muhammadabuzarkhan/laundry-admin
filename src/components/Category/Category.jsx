import React, { useState, useEffect } from 'react';
import styles from './Category.module.css';

const Category = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    price: '',
    priceTypes: '',
    priceDescription: '',
    Includes: '', // Note: Backend expects "Includes" with capital I
    image: null
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/admin/auth/category/get`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();

      if (response.ok) {
        setCategories(data.data.allcategory);
      } else {
        throw new Error(data.message || 'Failed to fetch categories');
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = () => {
    setIsEditMode(false);
    setEditId(null);
    setFormData({
      title: '',
      description: '',
      tags: '',
      price: '',
      priceTypes: '',
      priceDescription: '',
      Includes: '',
      image: null
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (category) => {
    setIsEditMode(true);
    setEditId(category._id);

    // Format the data properly for the form
    setFormData({
      title: category.title || '',
      description: category.description || '',
      tags: Array.isArray(category.tags) ? JSON.stringify(category.tags) : '',
      price: category.price ? JSON.stringify(category.price) : '',
      priceTypes: category.priceTypes || '',
      priceDescription: category.priceDescription || '',
      Includes: category.Includes || '',
      image: null
    });

    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);

    try {
      const formDataToSend = new FormData();

      // Add basic text fields
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('priceTypes', formData.priceTypes);
      formDataToSend.append('priceDescription', formData.priceDescription);
      formDataToSend.append('Includes', formData.Includes);

      // Handle tags - ensure it's a properly formatted JSON string of an array
      let tagsToSend = [];
      if (formData.tags) {
        try {
          // Try to parse as JSON first
          tagsToSend = JSON.parse(formData.tags);
          if (!Array.isArray(tagsToSend)) {
            // If it parsed but isn't an array, convert it
            tagsToSend = [tagsToSend.toString()];
          }
        } catch (e) {
          // If it's not valid JSON, treat as comma-separated string
          tagsToSend = formData.tags.split(',').map(tag => tag.trim());
        }
      }
      formDataToSend.append('tags', JSON.stringify(tagsToSend));

      // Handle price - ensure it's a properly formatted JSON number
      let priceToSend = 0;
      if (formData.price) {
        try {
          // Try to parse as JSON first
          priceToSend = JSON.parse(formData.price);
          if (typeof priceToSend !== 'number') {
            // If it parsed but isn't a number, convert it
            priceToSend = parseFloat(priceToSend) || 0;
          }
        } catch (e) {
          // If it's not valid JSON, treat as a number string
          priceToSend = parseFloat(formData.price) || 0;
        }
      }
      formDataToSend.append('price', JSON.stringify(priceToSend));

      // Add image if available
      if (formData.image) {
        formDataToSend.append('catImage', formData.image);
      }


      // Determine URL and method based on edit mode
      let url = `${process.env.REACT_APP_BASE_URL}/api/admin/auth/category/create`;
      let method = 'POST';

      if (isEditMode && editId) {
        url = `${process.env.REACT_APP_BASE_URL}/api/admin/auth/category/updated/${editId}`;
        method = 'PUT';
      }

      // Log what we're sending for debugging
      console.log('Submitting to URL:', url);
      console.log('Method:', method);
      console.log('FormData contents:');
      for (let pair of formDataToSend.entries()) {
        console.log(pair[0] + ': ' + (pair[1] instanceof File ? pair[1].name : pair[1]));
      }

      const response = await fetch(url, {
        method: method,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
          // Note: Do NOT set Content-Type header when sending FormData
        },
        body: formDataToSend
      });

      // Handle non-JSON responses
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Received non-JSON response:', text);
        throw new Error('Server returned non-JSON response. Check the API endpoint and server logs.');
      }

      const data = await response.json();

      if (response.ok) {
        // Success! Refresh the categories list
        await fetchCategories();

        // Close modal and reset form
        setIsModalOpen(false);
        setFormData({
          title: '',
          description: '',
          tags: '',
          price: '',
          priceTypes: '',
          priceDescription: '',
          Includes: '',
          image: null
        });
        setIsEditMode(false);
        setEditId(null);

        // Show success message
        alert(isEditMode ? 'Category updated successfully!' : 'Category created successfully!');
      } else {
        throw new Error(data.message || 'Failed to save category');
      }
    } catch (err) {
      console.error('Error saving category:', err);
      alert(`Error: ${err.message}`);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    if (!window.confirm('Are you sure you want to delete this category?')) {
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/admin/auth/category/status/${categoryId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status: 'Inactive' })
      });

      const data = await response.json();

      if (response.ok) {
        alert('Category deleted successfully!');
        fetchCategories(); // Refresh the list
      } else {
        throw new Error(data.message || 'Failed to delete category');
      }
    } catch (err) {
      console.error('Error deleting category:', err);
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>CATEGORY MANAGEMENT</h1>
        <button className={styles.addButton} onClick={handleOpenModal}>ADD CATEGORY</button>
      </div>

      <div className={styles.filterSection}>
                <div className={styles.searchContainer}>
          <input type="text" className={styles.searchInput} placeholder="Search" />
          <button className={styles.searchButton}><span className={styles.searchIcon}>⌕</span></button>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>S.NO</th>
              <th>TITLE</th>
              <th>Delivery Time</th>
              <th>IMAGE</th>
              <th>DATE</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className={styles.loadingRow}>Loading...</td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="6" className={styles.errorRow}>Error: {error}</td>
              </tr>
            ) : categories.length === 0 ? (
              <tr>
                <td colSpan="6" className={styles.emptyRow}>No categories found.</td>
              </tr>
            ) : (
              categories.map((category, index) => (
                <tr key={category._id}>
                  <td>{index + 1}</td>
                  <td>{category.title}</td>
                  <td>{category.NoOfDays ? `${category.NoOfDays} Days` : 'N/A'}</td>
                  <td>
                    {category.catImage ? (
                      <>
                        <img
                          src={`${process.env.REACT_APP_API_BASE_URL}/${category.catImage}`}
                          alt={category.title}
                          className={styles.thumbnail}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className={styles.categoryIcon} style={{ display: 'none' }}>
                          <svg viewBox="0 0 24 24" fill="none" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 12C14.8 12 17 9.8 17 7C17 4.2 14.8 2 12 2C9.2 2 7 4.2 7 7C7 9.8 9.2 12 12 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M20.6 22C20.6 18.1 16.7 15 12 15C7.3 15 3.4 18.1 3.4 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      </>
                    ) : (
                      <div className={styles.categoryIcon}>
                        <svg viewBox="0 0 24 24" fill="none" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 12C14.8 12 17 9.8 17 7C17 4.2 14.8 2 12 2C9.2 2 7 4.2 7 7C7 9.8 9.2 12 12 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M20.6 22C20.6 18.1 16.7 15 12 15C7.3 15 3.4 18.1 3.4 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    )}
                  </td>


                  <td>{new Date(category.createdAt).toLocaleDateString()}</td>
                  <td className={styles.actionButtons}>
                    <button
                      className={styles.editButton}
                      onClick={() => handleOpenEditModal(category)}
                      title="Edit"
                    >✎</button>
                  
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
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
      )}
    </div>
  );
};

export default Category;
