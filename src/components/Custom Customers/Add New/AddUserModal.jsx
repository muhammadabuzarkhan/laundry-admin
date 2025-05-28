


// // AddUserModal.js
// import React, { useState } from 'react';
// import styles from './AddUserModal.module.css';
// import { createUser } from '../UserServices'; // ⬅ import the service

// const AddUserModal = ({ onClose, onAddUser }) => {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     address: ''
//   });

//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       const newUser = await createUser(formData);
//       onAddUser(newUser);
//       onClose();
//     } catch (err) {
//       // setError(err.response?.data?.message || 'Failed to add user');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className={styles.modalOverlay}>
//       <div className={styles.modal}>
//         <h2>Add New User</h2>
//         <form onSubmit={handleSubmit} className={styles.form}>
//           <input
//             type="text"
//             name="firstName"
//             placeholder="First Name"
//             value={formData.firstName}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="text"
//             name="lastName"
//             placeholder="Last Name"
//             value={formData.lastName}
//             onChange={handleChange}
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email Address"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="text"
//             name="phone"
//             placeholder="Contact Number"
//             value={formData.phone}
//             onChange={handleChange}
//           />
//           <textarea
//             name="address"
//             placeholder="Address"
//             value={formData.address}
//             onChange={handleChange}
//           ></textarea>

//           {error && <p className={styles.error}>{error}</p>}

//           <div className={styles.actions}>
//             <button type="submit" className={styles.submitButton} disabled={loading}>
//               {loading ? 'Adding...' : 'Add User'}
//             </button>
//             <button type="button" className={styles.cancelButton} onClick={onClose}>Cancel</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddUserModal;

import React, { useState } from 'react';
import styles from './AddUserModal.module.css';
import { createUser } from '../UserServices';

const AddUserModal = ({ onClose, onAddUser }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await createUser(formData);

      if (response.status) {
        onAddUser(response.data);  // response.data contains the created user
        onClose();
      } else {
        setError('Failed to add user');
      }
    } catch (err) {
      console.error("Error creating user:", err);
      setError(err.response?.data?.message || 'Failed to add user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Add New User</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Contact Number"
            value={formData.phone}
            onChange={handleChange}
          />
          <textarea
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
          ></textarea>

          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.actions}>
            <button type="submit" className={styles.submitButton} disabled={loading}>
              {loading ? 'Adding...' : 'Add User'}
            </button>
            <button type="button" className={styles.cancelButton} onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
