// import React, { useState, useEffect } from 'react';
// import styles from './Product.module.css';
// import ProductModal from './AddProduct';

// const Product = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     title: '',
//     price: '',
//     weight: '',
//     subcategory: '',
//     category: '',
//     description: '',
//     image: null
//   });
//   const [products, setProducts] = useState([]);
//   const [editProduct, setEditProduct] = useState(null); // Store the product to be edited

//   const handleOpenModal = (product = null) => {
//     if (product) {
//       setEditProduct(product); // Set the product data to be edited
//       setFormData({
//         title: product.title,
//         price: product.price,
//         weight: product.weight,
//         subcategory: product.subcategory,
//         category: product.category,
//         description: product.description,
//         image: product.image
//       });
//     } else {
//       setEditProduct(null);
//       setFormData({
//         title: '',
//         price: '',
//         weight: '',
//         subcategory: '',
//         category: '',
//         description: '',
//         image: null
//       });
//     }
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setEditProduct(null);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleImageChange = (e) => {
//     setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem('token');
//     try {
//       let response;
//       if (editProduct) {
//         // If editing, send PUT request
//         response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/admin/auth/product/update/${editProduct.id}`, {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`
//           },
//           body: JSON.stringify(formData)
//         });
//       } else {
//         // If adding new product, send POST request
//         response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/admin/auth/product/create`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`
//           },
//           body: JSON.stringify(formData)
//         });
//       }

//       if (!response.ok) throw new Error('Failed to save product');
//       const result = await response.json();
//       if (editProduct) {
//         // Update the product list with the edited product
//         setProducts((prev) =>
//           prev.map((product) =>
//             product.id === editProduct.id ? { ...product, ...formData } : product
//           )
//         );
//       } else {
//         // Add new product to the list
//         setProducts((prev) => [...prev, result.data]);
//       }

//       setIsModalOpen(false);
//       setFormData({
//         title: '',
//         price: '',
//         weight: '',
//         subcategory: '',
//         category: '',
//         description: '',
//         image: null
//       });
//     } catch (error) {
//       console.error('Error submitting product:', error);
//     }
//   };

//   const handleDelete = async (productId) => {
//     const token = localStorage.getItem('token');
//     try {
//       const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/admin/auth/product/delete/${productId}`, {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`
//         }
//       });

//       if (!response.ok) throw new Error('Failed to delete product');
//       setProducts((prev) => prev.filter((product) => product.id !== productId));
//     } catch (error) {
//       console.error('Error deleting product:', error);
//     }
//   };

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/admin/auth/product/get`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`
//           }
//         });

//         if (!response.ok) throw new Error('Failed to fetch products');
//         const result = await response.json();

//         const apiProducts = result.data.selectedProducts.map((product, index) => ({
//           id: index + 1,
//           title: product.title,
//           price: product.price,
//           weight: `${product.weight}kg`,
//           subcategory: product.subCatName || 'None',
//           category: product.category?.title || 'None',
//           description: product.description,
//           date: new Date(product.createdAt).toLocaleDateString(),
//           categoryImage: product.category?.catImage || null
//         }));

//         setProducts(apiProducts);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   return (
//     <div className={styles.container}>
//       <div className={styles.header}>
//         <h1 className={styles.title}>PRODUCT MANAGEMENT</h1>
//         <button className={styles.addButton} onClick={() => handleOpenModal()}>ADD PRODUCT</button>
//       </div>

//       <div className={styles.filterSection}>
//         <div className={styles.entriesContainer}>
//           <span>Show : </span>
//           <div className={styles.dropdown}><span>10</span><span className={styles.dropdownIcon}>▼</span></div>
//           <span>Entries</span>
//         </div>
//         <div className={styles.searchContainer}>
//           <input type="text" className={styles.searchInput} placeholder="Search" />
//           <button className={styles.searchButton}><span className={styles.searchIcon}>⌕</span></button>
//         </div>
//       </div>

//       <div className={styles.tableContainer}>
//         <table className={styles.table}>
//           <thead>
//             <tr>
//               <th>S.NO</th><th>TITLE</th><th>PRICE</th><th>WEIGHT</th>
//               <th>SUBCATEGORY</th><th>CATEGORY</th><th>CATEGORY IMAGE</th>
//               <th>DATE</th><th>Action</th>
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
//                   {product.categoryImage ? (
//                     <img
//                       src={`${process.env.REACT_APP_API_BASE_URL}/${product.categoryImage}`}
//                       alt="Category"
//                       className={styles.categoryImage}
//                     />
//                   ) : (
//                     <div className={styles.categoryIcon} style={{ backgroundColor: '#ccc' }}>
//                       <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
//                         <path d="..." stroke="white" strokeWidth="1.5" />
//                       </svg>
//                     </div>
//                   )}
//                 </td>
//                 <td>{product.date}</td>
//                 <td className={styles.actionButtons}>
//                   <button className={styles.editButton} onClick={() => handleOpenModal(product)}>✎</button>
//                   {/* <button className={styles.deleteButton} onClick={() => handleDelete(product.id)}>🗑</button> */}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {isModalOpen && (
//         <ProductModal
//           formData={formData}
//           handleInputChange={handleInputChange}
//           handleImageChange={handleImageChange}
//           handleSubmit={handleSubmit}
//           handleCloseModal={handleCloseModal}
//         />
//       )}
//     </div>
//   );
// };

// export default Product;

// Product.jsx
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
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditProduct(product);
      setFormData({
        title: product.title,
        price: product.price,
        weight: product.weight,
        subcategory: product.subcategory,
        category: product.category,
        description: product.description,
        image: product.image
      });
    } else {
      setEditProduct(null);
      setFormData({
        title: '',
        price: '',
        weight: '',
        subcategory: '',
        category: '',
        description: '',
        image: null
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditProduct(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      let response;
      if (editProduct) {
        response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/admin/auth/product/update/${editProduct.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(formData)
        });
      } else {
        response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/admin/auth/product/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(formData)
        });
      }

      if (!response.ok) throw new Error('Failed to save product');
      const result = await response.json();
      if (editProduct) {
        setProducts((prev) =>
          prev.map((product) =>
            product.id === editProduct.id ? { ...product, ...formData } : product
          )
        );
      } else {
        setProducts((prev) => [...prev, result.data]);
      }

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
    } catch (error) {
      console.error('Error submitting product:', error);
    }
  };

  const handleDelete = async (productId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/admin/auth/product/delete/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to delete product');
      setProducts((prev) => prev.filter((product) => product.id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
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
        setFilteredProducts(apiProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = products.filter(p =>
      p.title.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term) ||
      p.price.toString().includes(term)
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>PRODUCT MANAGEMENT</h1>
        <button className={styles.addButton} onClick={() => handleOpenModal()}>ADD PRODUCT</button>
      </div>

      <div className={styles.filterSection}>
        
        <div className={styles.searchContainer}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search by title, price, category"
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
              <th>S.NO</th><th>TITLE</th><th>PRICE</th><th>WEIGHT</th>
              <th>SUBCATEGORY</th><th>CATEGORY</th><th>CATEGORY IMAGE</th>
              <th>DATE</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
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
                      src={`${process.env.REACT_APP_BASE_URL}/${product.categoryImage}`}
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
                  <button className={styles.editButton} onClick={() => handleOpenModal(product)}>✎</button>
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
