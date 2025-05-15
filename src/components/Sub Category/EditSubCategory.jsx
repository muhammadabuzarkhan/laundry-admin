// EditSubCategory.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './EditSubCategory.module.css';

const EditSubCategory = ({ isOpen, subCategory, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (subCategory) {
      setTitle(subCategory.title); // Set the title when the modal is opened
    }
  }, [subCategory]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/admin/auth/subcategory/edit/${subCategory.id}`,
        { title },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    //   if (response.data.success) {
    //     onSubmit({ ...subCategory, title }); 
    //     alert('Subcategory updated successfully!');
    //   } else {
    //     alert('Error updating subcategory');
    //   }
      onClose(); // Close the modal after successful update
    } catch (error) {
      console.error('Error updating subcategory:', error);
      alert('Error updating subcategory');
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Edit SubCategory</h2>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
        />
        <button onClick={handleSubmit}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default EditSubCategory;
