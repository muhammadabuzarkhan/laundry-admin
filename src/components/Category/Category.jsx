import React, { useState } from 'react';
import styles from './Category.module.css';

const Category = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    price: '',
    priceDescription: '',
    include: '',
    image: null
  });

  const categories = [
    { 
      id: '01', 
      title: 'None', 
      deliveryTime: '', 
      date: '5/11/2024',
      imageColor: '#3ECACB'
    },
    { 
      id: '02', 
      title: 'Dry Cleaning', 
      deliveryTime: '4 Days', 
      date: '5/19/2024',
      imageColor: '#FDB813'
    },
  ];

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
    setIsModalOpen(false);
    // Reset form
    setFormData({
      title: '',
      description: '',
      tags: '',
      price: '',
      priceDescription: '',
      include: '',
      image: null
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>CATEGORY MANAGEMENT</h1>
        <button className={styles.addButton} onClick={handleOpenModal}>
          ADD CATEGORY
        </button>
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
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search"
          />
          <button className={styles.searchButton}>
            <span className={styles.searchIcon}>⌕</span>
          </button>
          <button className={styles.filterButton}>
            <span className={styles.filterIcon}>⊻</span>
          </button>
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
            {categories.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.title}</td>
                <td>{category.deliveryTime}</td>
                <td>
                  <div className={styles.categoryIcon} style={{ backgroundColor: category.imageColor }}>
                    {category.id === '01' ? (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.5 20C4.3 20 2.5 18.2 2.5 16C2.5 14.3 3.6 12.9 5.1 12.4C5.5 10 7.6 8 10 8C12.8 8 15 10.2 15 13C15 13.3 15 13.7 14.9 14C15.5 14 16.1 14.1 16.6 14.4C17.8 15.1 18.5 16.3 18.5 17.5C18.5 19.4 16.9 21 15 21C12.4 21 9.5 21 6.5 21V20Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10 8C10 5.8 11.8 4 14 4C16.2 4 18 5.8 18 8C18 8.5 17.9 8.9 17.8 9.3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 7.5C21 6.4 20.1 5.5 19 5.5H5C3.9 5.5 3 6.4 3 7.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M19 5.5V19.5C19 20.6 18.1 21.5 17 21.5H7C5.9 21.5 5 20.6 5 19.5V5.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M14.5 5.5V3.5C14.5 2.4 13.6 1.5 12.5 1.5H11.5C10.4 1.5 9.5 2.4 9.5 3.5V5.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                </td>
                <td>{category.date}</td>
                <td className={styles.actionButtons}>
                  <button className={styles.editButton}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </button>
                  <button className={styles.deleteButton}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2>Add New Category</h2>
              <button className={styles.closeButton} onClick={handleCloseModal}>×</button>
            </div>
            <form onSubmit={handleSubmit} className={styles.modalForm}>
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
                  Save Category
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