// import React, { useState } from 'react';
// import styles from './Product.module.css';

// const Product = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     title: '',
//     price: '',
//     weight: '',
//     subcategory: '',
//     category: '',
//     image: null
//   });

//   const products = [
//     { 
//       id: '01', 
//       title: 'Small Service Wash (Up To 7kg)', 
//       price: '14',
//       weight: '7kg',
//       subcategory: 'Small',
//       category: 'None',
//       date: '5/31/2024',
//       imageColor: '#3ECACB'
//     }
//   ];

//   const handleOpenModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleImageChange = (e) => {
//     setFormData({
//       ...formData,
//       image: e.target.files[0]
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Form submitted:', formData);
//     // Here you would typically send the data to your backend
//     setIsModalOpen(false);
//     // Reset form
//     setFormData({
//       title: '',
//       price: '',
//       weight: '',
//       subcategory: '',
//       category: '',
//       image: null
//     });
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.header}>
//         <h1 className={styles.title}>PRODUCT MANAGEMENT</h1>
//         <button className={styles.addButton} onClick={handleOpenModal}>
//           ADD PRODUCT
//         </button>
//       </div>

//       <div className={styles.filterSection}>
//         <div className={styles.entriesContainer}>
//           <span>Show : </span>
//           <div className={styles.dropdown}>
//             <span>10</span>
//             <span className={styles.dropdownIcon}>▼</span>
//           </div>
//           <span>Entries</span>
//         </div>

//         <div className={styles.searchContainer}>
//           <input
//             type="text"
//             className={styles.searchInput}
//             placeholder="Search"
//           />
//           <button className={styles.searchButton}>
//             <span className={styles.searchIcon}>⌕</span>
//           </button>
//           <button className={styles.filterButton}>
//             <span className={styles.filterIcon}>⊻</span>
//           </button>
//         </div>
//       </div>

//       <div className={styles.tableContainer}>
//         <table className={styles.table}>
//           <thead>
//             <tr>
//               <th>S.NO</th>
//               <th>TITLE</th>
//               <th>PRICE</th>
//               <th>WEIGHT</th>
//               <th>SUBCATEGORY</th>
//               <th>CATEGORY</th>
//               <th>CATEGORY IMAGE</th>
//               <th>DATE</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((product) => (
//               <tr key={product.id}>
//                 <td>{product.id}</td>
//                 <td>{product.title}</td>
//                 <td>{product.price}</td>
//                 <td>{product.weight}</td>
//                 <td>{product.subcategory}</td>
//                 <td>{product.category}</td>
//                 <td>
//                   <div className={styles.categoryIcon} style={{ backgroundColor: product.imageColor }}>
//                     <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
//                       <path d="M6.5 20C4.3 20 2.5 18.2 2.5 16C2.5 14.3 3.6 12.9 5.1 12.4C5.5 10 7.6 8 10 8C12.8 8 15 10.2 15 13C15 13.3 15 13.7 14.9 14C15.5 14 16.1 14.1 16.6 14.4C17.8 15.1 18.5 16.3 18.5 17.5C18.5 19.4 16.9 21 15 21C12.4 21 9.5 21 6.5 21V20Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//                       <path d="M10 8C10 5.8 11.8 4 14 4C16.2 4 18 5.8 18 8C18 8.5 17.9 8.9 17.8 9.3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//                     </svg>
//                   </div>
//                 </td>
//                 <td>{product.date}</td>
//                 <td className={styles.actionButtons}>
//                   <button className={styles.editButton}>
//                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                       <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
//                       <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
//                     </svg>
//                   </button>
//                   <button className={styles.deleteButton}>
//                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                       <polyline points="3 6 5 6 21 6"></polyline>
//                       <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
//                     </svg>
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {isModalOpen && (
//         <div className={styles.modalOverlay}>
//           <div className={styles.modal}>
//             <div className={styles.modalHeader}>
//               <h2>Add New Product</h2>
//               <button className={styles.closeButton} onClick={handleCloseModal}>×</button>
//             </div>
//             <form onSubmit={handleSubmit} className={styles.modalForm}>
//               <div className={styles.formGroup}>
//                 <label htmlFor="title">Product Title</label>
//                 <input
//                   type="text"
//                   id="title"
//                   name="title"
//                   value={formData.title}
//                   onChange={handleInputChange}
//                   required
//                   placeholder="Enter product title"
//                 />
//               </div>

//               <div className={styles.formRow}>
//                 <div className={styles.formGroup}>
//                   <label htmlFor="price">Price</label>
//                   <input
//                     type="number"
//                     id="price"
//                     name="price"
//                     value={formData.price}
//                     onChange={handleInputChange}
//                     required
//                     min="0"
//                     step="0.01"
//                     placeholder="Enter price"
//                   />
//                 </div>

//                 <div className={styles.formGroup}>
//                   <label htmlFor="weight">Weight</label>
//                   <input
//                     type="text"
//                     id="weight"
//                     name="weight"
//                     value={formData.weight}
//                     onChange={handleInputChange}
//                     placeholder="e.g. 7kg"
//                   />
//                 </div>
//               </div>

//               <div className={styles.formRow}>
//                 <div className={styles.formGroup}>
//                   <label htmlFor="category">Category</label>
//                   <select
//                     id="category"
//                     name="category"
//                     value={formData.category}
//                     onChange={handleInputChange}
//                     required
//                   >
//                     <option value="">Select a category</option>
//                     <option value="None">None</option>
//                     <option value="Dry Cleaning">Dry Cleaning</option>
//                   </select>
//                 </div>

//                 <div className={styles.formGroup}>
//                   <label htmlFor="subcategory">Subcategory</label>
//                   <select
//                     id="subcategory"
//                     name="subcategory"
//                     value={formData.subcategory}
//                     onChange={handleInputChange}
//                   >
//                     <option value="">Select a subcategory</option>
//                     <option value="Small">Small</option>
//                     <option value="Medium">Medium</option>
//                     <option value="Large">Large</option>
//                   </select>
//                 </div>
//               </div>

//               <div className={styles.formGroup}>
//                 <label htmlFor="description">Description</label>
//                 <textarea
//                   id="description"
//                   name="description"
//                   onChange={handleInputChange}
//                   rows="3"
//                   placeholder="Enter product description"
//                 ></textarea>
//               </div>

//               <div className={styles.formGroup}>
//                 <label htmlFor="image">Product Image</label>
//                 <div className={styles.fileUpload}>
//                   <input
//                     type="file"
//                     id="image"
//                     name="image"
//                     onChange={handleImageChange}
//                     accept="image/*"
//                   />
//                   <div className={styles.uploadPlaceholder}>
//                     {formData.image ? formData.image.name : 'Choose file or drag and drop'}
//                   </div>
//                 </div>
//               </div>

//               <div className={styles.formActions}>
//                 <button type="button" className={styles.cancelButton} onClick={handleCloseModal}>
//                   Cancel
//                 </button>
//                 <button type="submit" className={styles.submitButton}>
//                   Save Product
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Product;


import React, { useState, useEffect } from 'react';
import styles from './Product.module.css';
import ProductModal from './AddProduct';

const Product = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    weight: '',
    subcategory: '',
    category: '',
    description: '',
    image: null
  });
  const [products, setProducts] = useState([]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsModalOpen(false);
    setFormData({
      title: '',
      price: '',
      weight: '',
      subcategory: '',
      category: '',
      description: '',
      image: null
    });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/admin/auth/product/get`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) throw new Error('Failed to fetch products');
        const result = await response.json();

        const apiProducts = result.data.selectedProducts.map((product, index) => ({
          id: index + 1,
          title: product.title,
          price: product.price,
          weight: `${product.weight}kg`,
          subcategory: product.subCatName || 'None',
          category: product.category?.title || 'None',
          description: product.description,
          date: new Date(product.createdAt).toLocaleDateString(),
          categoryImage: product.category?.catImage || null
        }));

        setProducts(apiProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>PRODUCT MANAGEMENT</h1>
        <button className={styles.addButton} onClick={handleOpenModal}>ADD PRODUCT</button>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.entriesContainer}>
          <span>Show : </span>
          <div className={styles.dropdown}><span>10</span><span className={styles.dropdownIcon}>▼</span></div>
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
              <th>S.NO</th><th>TITLE</th><th>PRICE</th><th>WEIGHT</th>
              <th>SUBCATEGORY</th><th>CATEGORY</th><th>CATEGORY IMAGE</th>
              <th>DATE</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>{product.weight}</td>
                <td>{product.subcategory}</td>
                <td>{product.category}</td>
                <td>
                  {product.categoryImage ? (
                    <img
                      src={`${process.env.REACT_APP_API_BASE_URL}/${product.categoryImage}`}
                      alt="Category"
                      className={styles.categoryImage}
                    />
                  ) : (
                    <div className={styles.categoryIcon} style={{ backgroundColor: '#ccc' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                        <path d="..." stroke="white" strokeWidth="1.5" />
                      </svg>
                    </div>
                  )}
                </td>
                <td>{product.date}</td>
                <td className={styles.actionButtons}>
                  <button className={styles.editButton}>✎</button>
                  <button className={styles.deleteButton}>🗑</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <ProductModal
          formData={formData}
          handleInputChange={handleInputChange}
          handleImageChange={handleImageChange}
          handleSubmit={handleSubmit}
          handleCloseModal={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Product;
