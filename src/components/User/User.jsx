// // import React, { useState, useEffect } from 'react';
// // import styles from './User.module.css';
// // import UserOrderModal from './UserOrder';

// // const User = () => {
// //   const [users, setUsers] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [selectedUser, setSelectedUser] = useState(null);
// //   const [userOrders, setUserOrders] = useState([]);
// //   const [showModal, setShowModal] = useState(false);

// //   const fetchUsers = async () => {
// //     try {
// //       const apiUrl = `${process.env.REACT_APP_BASE_URL}/api/admin/auth/user/get`;
// //       const token = localStorage.getItem('token');

// //       const response = await fetch(apiUrl, {
// //         method: 'GET',
// //         headers: {
// //           'Authorization': `Bearer ${token}`,
// //         },
// //       });

// //       if (!response.ok) throw new Error('Failed to fetch user data');
// //       const data = await response.json();
// //       setUsers(data.data.getallUser);
// //     } catch (error) {
// //       setError(error.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const fetchUserOrders = async (userId, user) => {
// //     try {
// //       const apiUrl = `${process.env.REACT_APP_BASE_URL}/api/admin/auth/user/userorder/${userId}`;
// //       const token = localStorage.getItem('token');

// //       const response = await fetch(apiUrl, {
// //         method: 'GET',
// //         headers: {
// //           'Authorization': `Bearer ${token}`,
// //         },
// //       });

// //       if (!response.ok) throw new Error('Failed to fetch user orders');
// //       const data = await response.json();
// //       setUserOrders(data.data.orders);
// //       setSelectedUser(user);
// //       setShowModal(true);
// //     } catch (error) {
// //       alert(error.message);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchUsers();
// //   }, []);

// //   if (error) {
// //     return <div className={styles.error}>Error: {error}</div>;
// //   }

// //   return (
// //     <div className={styles.container}>
// //       {/* Header + Filter UI (unchanged) */}
// //       <div className={styles.header}>
// //         <h1 className={styles.title}>Customer MANAGEMENT</h1>
// //       </div>
// //        <div className={styles.filterSection}>


// //         <div className={styles.searchContainer}>
// //           <input
// //             type="text"
// //             className={styles.searchInput}
// //             placeholder="Search by name or email"

// //           />
// //           <button className={styles.searchButton}>
// //             <span className={styles.searchIcon}>⌕</span>
// //           </button>
// //         </div>
// //       </div>



// //       <div className={styles.tableContainer}>
// //         <table className={styles.table}>
// //           <thead>
// //             <tr>
// //               <th>S.NO.</th>
// //               <th>FULL NAME</th>
// //               <th>EMAIL ADDRESS</th>
// //               <th>IMAGE</th>
// //               <th>REGISTRATION DATE</th>
// //               <th>ACTION</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {loading ? (
// //               <tr>
// //                 <td colSpan="6" className={styles.loadingRow}>Loading...</td>
// //               </tr>
// //             ) : (
// //               users.map((user, index) => (
// //                 <tr key={user._id}>
// //                   <td>{index + 1}</td>
// //                   <td>{user.firstName || 'Not Available'} {user.lastName || ''}</td>
// //                   <td>{user.email}</td>
// //                   <td>
// //                     <div className={styles.userIcon}> {/* existing svg icon */}</div>
// //                   </td>
// //                   <td>{new Date(user.Reg_Date).toLocaleDateString()}</td>
// //                   <td>
// //                     <button
// //                       className={styles.viewButton}
// //                       onClick={() => fetchUserOrders(user._id, user)}
// //                     >
// //                       {/* eye icon svg */}
// //                       <td>
// //                         <button
// //                           className={styles.viewButton}
// //                           onClick={() => fetchUserOrders(user._id, user)}
// //                         >
// //                           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //                             <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
// //                             <circle cx="12" cy="12" r="3"></circle>
// //                           </svg>
// //                         </button>
// //                       </td>

// //                     </button>
// //                   </td>
// //                 </tr>
// //               ))
// //             )}
// //           </tbody>
// //         </table>
// //       </div>

// //       {showModal && (
// //         <UserOrderModal
// //           user={selectedUser}
// //           orders={userOrders}
// //           onClose={() => setShowModal(false)}
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // export default User;


// import React, { useState, useEffect } from 'react';
// import styles from './User.module.css';
// import UserOrderModal from './UserOrder';
// import { UserCircle } from 'lucide-react';


// const User = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [userOrders, setUserOrders] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [searchTerm, setSearchTerm] = useState(''); // 🔍 Search state

//   const fetchUsers = async () => {
//     try {
//       const apiUrl = `${process.env.REACT_APP_BASE_URL}/api/admin/auth/user/get`;
//       const token = localStorage.getItem('token');

//       const response = await fetch(apiUrl, {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) throw new Error('Failed to fetch user data');
//       const data = await response.json();
//       setUsers(data.data.getallUser);
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchUserOrders = async (userId, user) => {
//     try {
//       const apiUrl = `${process.env.REACT_APP_BASE_URL}/api/admin/auth/user/userorder/${userId}`;
//       const token = localStorage.getItem('token');

//       const response = await fetch(apiUrl, {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) throw new Error('Failed to fetch user orders');
//       const data = await response.json();
//       setUserOrders(data.data.orders);
//       setSelectedUser(user);
//       setShowModal(true);
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // 🔍 Filter users based on searchTerm
//   const filteredUsers = users.filter(user => {
//     const fullName = `${user.firstName || ''} ${user.lastName || ''}`.toLowerCase();
//     const email = (user.email || '').toLowerCase();
//     const term = searchTerm.toLowerCase();
//     return fullName.includes(term) || email.includes(term);
//   });

//   if (error) {
//     return <div className={styles.error}>Error: {error}</div>;
//   }

//   return (
//     <div className={styles.container}>
//       {/* Header */}
//       <div className={styles.header}>
//         <h1 className={styles.title}>Customer MANAGEMENT</h1>
//       </div>

//       {/* Search Section */}
//       <div className={styles.filterSection}>
//         <div className={styles.searchContainer}>
//           <input
//             type="text"
//             className={styles.searchInput}
//             placeholder="Search by name or email"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <button className={styles.searchButton}>
//             <span className={styles.searchIcon}>⌕</span>
//           </button>
//         </div>
//       </div>

//       {/* Table */}
//       <div className={styles.tableContainer}>
//         <table className={styles.table}>
//           <thead>
//             <tr>
//               <th>S.NO.</th>
//               <th>FULL NAME</th>
//               <th>EMAIL ADDRESS</th>
//               <th>IMAGE</th>
//               <th>REGISTRATION DATE</th>
//               <th>ACTION</th>
//             </tr>
//           </thead>
//           <tbody>
//             {loading ? (
//               <tr>
//                 <td colSpan="6" className={styles.loadingRow}>Loading...</td>
//               </tr>
//             ) : (
//               filteredUsers.map((user, index) => (
//                 <tr key={user._id}>
//                   <td>{index + 1}</td>
//                   <td>{user.firstName || 'Not Available'} {user.lastName || ''}</td>
//                   <td>{user.email}</td>
//                   <td>
//                     <div className={styles.userIcon}>
//                       <td>
//                         <UserCircle size={42} strokeWidth={2.0} />
//                       </td>

//                     </div>
//                   </td>
//                   <td>{new Date(user.Reg_Date).toLocaleDateString()}</td>
//                   <td>
//                     <button
//                       className={styles.viewButton}
//                       onClick={() => fetchUserOrders(user._id, user)}
//                     >
//                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                         <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
//                         <circle cx="12" cy="12" r="3"></circle>
//                       </svg>
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Modal */}
//       {showModal && (
//         <UserOrderModal
//           user={selectedUser}
//           orders={userOrders}
//           onClose={() => setShowModal(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default User;



import React, { useState, useEffect } from 'react';
import styles from './User.module.css';
import UserOrderModal from './UserOrder';
import AllOrder from './My Orders/AllOrder';
import { UserCircle, ArchiveRestore } from 'lucide-react';

const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userOrders, setUserOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAllOrderModal, setShowAllOrderModal] = useState(false);
  const [allOrders, setAllOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchUsers = async () => {
    try {
      const apiUrl = `${process.env.REACT_APP_BASE_URL}/api/admin/auth/user/get`;
      const token = localStorage.getItem('token');

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Failed to fetch user data');
      const data = await response.json();
      setUsers(data.data.getallUser);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserOrders = async (userId, user) => {
    try {
      const apiUrl = `${process.env.REACT_APP_BASE_URL}/api/admin/auth/user/userorder/${userId}`;
      const token = localStorage.getItem('token');

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Failed to fetch user orders');
      const data = await response.json();
      setUserOrders(data.data.orders);
      setSelectedUser(user);
      setShowModal(true);
    } catch (error) {
      alert(error.message);
    }
  };

  const fetchAllOrders = async (userId, user) => {
    try {
      const apiUrl = `${process.env.REACT_APP_BASE_URL}/api/admin/auth/user/userorder/${userId}`;
      const token = localStorage.getItem('token');

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Failed to fetch all user orders');
      const data = await response.json();
      setAllOrders(data.data.orders);
      setSelectedUser(user);
      setShowAllOrderModal(true);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => {
    const fullName = `${user.firstName || ''} ${user.lastName || ''}`.toLowerCase();
    const email = (user.email || '').toLowerCase();
    const term = searchTerm.toLowerCase();
    return fullName.includes(term) || email.includes(term);
  });

  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Customer MANAGEMENT</h1>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className={styles.searchButton}>
            <span className={styles.searchIcon}>⌕</span>
          </button>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>S.NO.</th>
              <th>FULL NAME</th>
              <th>EMAIL ADDRESS</th>
              <th>IMAGE</th>
              <th>REGISTRATION DATE</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" className={styles.loadingRow}>Loading...</td></tr>
            ) : (
              filteredUsers.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.firstName || 'Not Available'} {user.lastName || ''}</td>
                  <td>{user.email}</td>
                  <td>
                    <div className={styles.userIcon}><UserCircle size={42} strokeWidth={2.0} /></div>
                  </td>
                  <td>{new Date(user.Reg_Date).toLocaleDateString()}</td>
                  <td className={styles.actionCell}>
                    <button
                      className={styles.viewButton}
                      onClick={() => fetchUserOrders(user._id, user)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </button>
                    <button
                      className={styles.allOrderButton}
                      onClick={() => fetchAllOrders(user._id, user)}
                      title="View All Orders"
                    >
                      <ArchiveRestore size={24} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <UserOrderModal
          user={selectedUser}
          orders={userOrders}
          onClose={() => setShowModal(false)}
        />
      )}

      {showAllOrderModal && (
        <AllOrder
          user={selectedUser}
          orders={allOrders}
          onClose={() => setShowAllOrderModal(false)}
        />
      )}
    </div>
  );
};

export default User;