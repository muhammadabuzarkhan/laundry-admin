
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './SubCategory.module.css';
import AddSubCategory from './AddSubCategory';
import EditSubCategory from './EditSubCategory';

const SubCategory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [subcategories, setSubcategories] = useState([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/admin/auth/subcategory/get`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data?.data?.allSubCat) {
          const mapped = response.data.data.allSubCat.map((item, index) => ({
            id: item._id,
            title: item.title,
            category: item.catId?.title || 'N/A',
            imageUrl: item.catId?.catImage,
            date: new Date(item.createdAt).toLocaleDateString(),
            imageColor: '#3ECACB',
          }));
          setSubcategories(mapped);
          setFilteredSubcategories(mapped);
        }
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      }
    };

    fetchSubCategories();
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = subcategories.filter(item =>
      item.title.toLowerCase().includes(term) ||
      item.category.toLowerCase().includes(term)
    );
    setFilteredSubcategories(filtered);
  }, [searchTerm, subcategories]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleOpenEditModal = (subCategory) => {
    setSelectedSubCategory(subCategory);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedSubCategory(null);
  };

  const handleSubmit = (formData) => {
    console.log('Form submitted:', formData);
    setIsModalOpen(false);
  };

  const handleEditSubmit = (updatedSubCategory) => {
    setSubcategories((prevSubCategories) =>
      prevSubCategories.map((subCategory) =>
        subCategory.id === updatedSubCategory.id ? updatedSubCategory : subCategory
      )
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>SUB CATEGORY MANAGEMENT</h1>
        <button className={styles.addButton} onClick={handleOpenModal}>ADD SUB CATEGORY</button>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className={styles.searchButton}><span className={styles.searchIcon}>⌕</span></button>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>S.NO</th>
              <th>TITLE</th>
              <th>CATEGORY</th>
              <th>CATEGORY IMAGE</th>
              <th>DATE</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubcategories.map((subcategory) => (
              <tr key={subcategory.id}>
                <td>{subcategory.id}</td>
                <td>{subcategory.title}</td>
                <td>{subcategory.category}</td>
                <td>
                  <div className={styles.categoryIcon} style={{ backgroundColor: subcategory.imageColor }}>
                    <img src={`${process.env.REACT_APP_BASE_URL}/${subcategory.imageUrl}`} alt="Category" width="24" height="24" />
                  </div>
                </td>
                <td>{subcategory.date}</td>
                <td className={styles.actionButtons}>
                  <button
                    className={styles.editButton}
                    onClick={() => handleOpenEditModal(subcategory)}
                  >
                    ✏️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddSubCategory isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleSubmit} />
      <EditSubCategory
        isOpen={isEditModalOpen}
        subCategory={selectedSubCategory}
        onClose={handleCloseEditModal}
        onSubmit={handleEditSubmit}
      />
    </div>
  );
};

export default SubCategory;
