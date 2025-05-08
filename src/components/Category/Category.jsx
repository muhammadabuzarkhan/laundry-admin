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
    priceDescription: '',
    include: '',
    image: null
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/admin/auth/category/get`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();

        if (response.ok) {
          setCategories(data.data.allcategory);
        } else {
          throw new Error(data.status || 'Failed to fetch categories');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleOpenModal = () => {
    setIsEditMode(false);
    setEditId(null);
    setFormData({
      title: '',
      description: '',
      tags: '',
      price: '',
      priceDescription: '',
      include: '',
      image: null
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (category) => {
    setIsEditMode(true);
    setEditId(category._id);
    setFormData({
      title: category.title || '',
      description: category.description || '',
      tags: category.tags || '',
      price: category.price || '',
      priceDescription: category.priceDescription || '',
      include: category.include || '',
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
    setFormData({ ...formData, image: e.target.files[0] });
  };

  // In the handleSubmit function, update the fetch and error handling:

const handleSubmit = async (e) => {
  e.preventDefault();
  setSubmitLoading(true);
  
  try {
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('tags', formData.tags);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('priceDescription', formData.priceDescription);
    formDataToSend.append('include', formData.include);
    
    if (formData.image) {
      formDataToSend.append('catImage', formData.image);
    }

    let url = `${process.env.REACT_APP_BASE_URL}/api/admin/auth/category/create`;
    let method = 'POST';
    
    if (isEditMode && editId) {
      url = `${process.env.REACT_APP_BASE_URL}/api/admin/auth/category/update/${editId}`;
      method = 'PUT';
    }

    console.log('Submitting to URL:', url);

    const response = await fetch(url, {
      method: method,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: formDataToSend
    });

    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      // Not JSON, get the text instead
      const text = await response.text();
      console.error('Received non-JSON response:', text);
      throw new Error('Server returned non-JSON response. Check the API endpoint and server logs.');
    }

    const data = await response.json();

    if (response.ok) {
      // Refresh the categories list
      const refreshResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/api/admin/auth/category/get`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!refreshResponse.ok) {
        console.warn('Failed to refresh categories after save');
      } else {
        const refreshData = await refreshResponse.json();
        setCategories(refreshData.data.allcategory);
      }
      
      // Close modal and reset form
      setIsModalOpen(false);
      setFormData({
        title: '',
        description: '',
        tags: '',
        price: '',
        priceDescription: '',
        include: '',
        image: null
      });
      setIsEditMode(false);
      setEditId(null);
      
      // Show success message
      alert('Category saved successfully!');
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

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>CATEGORY MANAGEMENT</h1>
        <button className={styles.addButton} onClick={handleOpenModal}>ADD CATEGORY</button>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.entriesContainer}>
          <span>Show : </span>
          <div className={styles.dropdown}>
            <span>10</span>
            <span className={styles.dropdownIcon}>▼</span>
          </div>
          <span>Entries</span>
        </div>

        <div className={styles.searchContainer}>
          <input type="text" className={styles.searchInput} placeholder="Search" />
          <button className={styles.searchButton}><span className={styles.searchIcon}>⌕</span></button>
          <button className={styles.filterButton}><span className={styles.filterIcon}>⊻</span></button>
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
                    <img
                      src={`${process.env.REACT_APP_API_BASE_URL}/${category.catImage}`}
                      alt={category.title}
                      className={styles.thumbnail}
                    />
                  </td>
                  <td>{new Date(category.createdAt).toLocaleDateString()}</td>
                  <td className={styles.actionButtons}>
                    <button 
                      className={styles.editButton}
                      onClick={() => handleOpenEditModal(category)}
                    >✎</button>
                    <button className={styles.deleteButton}>🗑</button>
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
              {/* Form inputs here as before */}
              <div className={styles.formGroup}>
                <label htmlFor="title">Category Title</label>
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
                  placeholder="Separate tags with commas"
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
                    min="0"
                    step="0.01"
                  />
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
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="include">Include</label>
                <input
                  type="text"
                  id="include"
                  name="include"
                  value={formData.include}
                  onChange={handleInputChange}
                  placeholder="What's included in this category"
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="image">Category Image</label>
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