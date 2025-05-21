// import React, { useState } from 'react';
// import styles from './CallOrder.module.css';

// const AddCallOrderModal = ({ onClose, onOrderAdded }) => {
//   const [formData, setFormData] = useState({
//     user_name: '',
//     user_phone: '',
//     category: '',
//     sub_category: '',
//     product: '',
//     weight: '',
//     price: '',
//     description: '',
//     address: '',
//     title: ''
//   });
//   const [message, setMessage] = useState('');
//   const [isError, setIsError] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem('token');

//     try {
//       const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/callorder/create`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify(formData)
//       });

//       const data = await res.json();

//       if (res.ok && data._id) {
//         setIsError(false);
//         setMessage('✅ Order created!');
//         onOrderAdded(data);
//         setTimeout(() => {
//           onClose();
//         }, 1500);
//       } else {
//         setIsError(true);
//         setMessage(data.message || '❌ Failed to create order');
//       }
//     } catch (err) {
//       setIsError(true);
//       setMessage('❌ Server error');
//     }
//   };

//   return (
//     <div className={styles.modalOverlay}>
//       <div className={styles.modal}>
//         <div className={styles.modalHeader}>
//           <h2>Add Call Order</h2>
//           <button className={styles.closeButton} onClick={onClose}>×</button>
//         </div>
//         <form onSubmit={handleSubmit} className={styles.modalForm}>
//           {message && (
//             <div className={isError ? styles.errorMessage : styles.successMessage}>
//               {message}
//             </div>
//           )}
//           {[
//             ['user_name', 'User Name'],
//             ['user_phone', 'Phone Number'],
//             ['category', 'Category'],
//             ['sub_category', 'Sub Category'],
//             ['product', 'Product'],
//             ['weight', 'Weight (kg)'],
//             ['price', 'Price'],
//             ['address', 'Address'],
//             ['title', 'Title']
//           ].map(([key, label]) => (
//             <div className={styles.formGroup} key={key}>
//               <label>{label}</label>
//               <input name={key} value={formData[key]} onChange={handleChange} required />
//             </div>
//           ))}

//           <div className={styles.formGroup}>
//             <label>Description</label>
//             <textarea name="description" value={formData.description} onChange={handleChange} />
//           </div>

//           <div className={styles.formActions}>
//             <button type="button" className={styles.cancelButton} onClick={onClose}>Cancel</button>
//             <button type="submit" className={styles.submitButton}>Save Order</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddCallOrderModal;

import React, { useState, useEffect } from 'react';
import styles from './CallOrder.module.css';
import {
  fetchCategories,
  fetchSubCategories,
  fetchProducts,
  createCallOrder
} from './CallOrderSevice'; // Adjust path if needed

const AddCallOrderModal = ({ onClose, onOrderAdded }) => {
  const [formData, setFormData] = useState({
    user_name: '',
    user_phone: '',
    category: '',
    sub_category: '',
    product: '',
    weight: '',
    price: '',
    description: '',
    address: '',
    title: ''
  });

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetchCategories()
      .then(data => {
        if (Array.isArray(data?.data?.allcategory)) {
          setCategories(data.data.allcategory);
        }
      })
      .catch(err => {
        console.error("Fetch categories error:", err);
        setCategories([]);
      });
  }, []);

  useEffect(() => {
    if (!formData.category) {
      setSubCategories([]);
      setFormData(prev => ({ ...prev, sub_category: '', product: '' }));
      return;
    }

    fetchSubCategories(formData.category)
      .then(data => {
        setSubCategories(data?.data?.selectedSubCategory || []);
      })
      .catch(err => {
        console.error('Subcategory fetch error:', err);
        setSubCategories([]);
      });
  }, [formData.category]);

  useEffect(() => {
    if (!formData.sub_category) {
      setProducts([]);
      setFormData(prev => ({ ...prev, product: '' }));
      return;
    }

    fetchProducts(formData.category)
      .then(data => {
        setProducts(data?.data?.selectedProducts || []);
      })
      .catch(err => {
        console.error('Fetch products error:', err);
        setProducts([]);
      });
  }, [formData.sub_category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // const handleSubmit = async (e) => {

  //   e.preventDefault();
  //   const payload = {
  //     ...formData,
  //     weight: parseFloat(formData.weight),
  //     price: parseFloat(formData.price),
  //   };

  //   try {
  //     const data = await createCallOrder(payload);
  //     if (data._id) {
  //       setIsError(false);
  //       setMessage('✅ Order created!');
  //       onOrderAdded(data);
  //       setTimeout(() => onClose(), 1500);
  //     } else {
  //       setIsError(true);
  //       setMessage(data.message || '❌ Failed to create order');
  //     }
  //   } catch (err) {
  //     setIsError(true);
  //     setMessage('❌ Server error');
  //   }
  // };

  const handleSubmit = async (e) => {
  e.preventDefault();

  // Get full objects from the selected IDs
  const selectedCategory = categories.find(c => c._id === formData.category);
  const selectedSubCategory = subCategories.find(sc => sc._id === formData.sub_category);
  const selectedProduct = products.find(p => p._id === formData.product);

  const payload = {
    ...formData,
    weight: parseFloat(formData.weight),
    price: parseFloat(formData.price),
    category: selectedCategory?.title || '',
    sub_category: selectedSubCategory?.title || '',
    product: selectedProduct?.title || ''
  };

  try {
    const data = await createCallOrder(payload);
    if (data._id) {
      setIsError(false);
      setMessage('✅ Order created!');
      onOrderAdded(data);
      setTimeout(() => onClose(), 1500);
    } else {
      setIsError(true);
      setMessage(data.message || '❌ Failed to create order');
    }
  } catch (err) {
    setIsError(true);
    setMessage('❌ Server error');
  }
};

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>Add Call Order</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit} className={styles.modalForm}>
          {message && (
            <div className={isError ? styles.errorMessage : styles.successMessage}>
              {message}
            </div>
          )}

          {[
            ['user_name', 'User Name'],
            ['user_phone', 'Phone Number'],
            ['weight', 'Weight (kg)', 'number'],
            ['price', 'Price', 'number'],
            ['address', 'Address'],
            ['title', 'Title']
          ].map(([key, label, type = 'text']) => (
            <div className={styles.formGroup} key={key}>
              <label>{label}</label>
              <input
                type={type}
                step={type === 'number' ? 'any' : undefined}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                required
              />
            </div>
          ))}

          <div className={styles.formGroup}>
            <label>Category</label>
            <select name="category" value={formData.category} onChange={handleChange} required>
              <option value="">-- Select Category --</option>
              {categories.map(c => (
                <option key={c._id} value={c._id}>{c.title}</option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Sub Category</label>
            <select name="sub_category" value={formData.sub_category} onChange={handleChange} required>
              <option value="">-- Select Sub Category --</option>
              {subCategories.map(sc => (
                <option key={sc._id} value={sc._id}>{sc.title}</option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Product</label>
            <select name="product" value={formData.product} onChange={handleChange} required>
              <option value="">-- Select Product --</option>
              {products.map(p => (
                <option key={p._id} value={p._id}>{p.title}</option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} />
          </div>

          <div className={styles.formActions}>
            <button type="button" className={styles.cancelButton} onClick={onClose}>Cancel</button>
            <button type="submit" className={styles.submitButton}>Save Order</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCallOrderModal;
