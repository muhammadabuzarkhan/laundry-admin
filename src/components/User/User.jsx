// import React from 'react';
// import styles from './User.module.css';

// const User = () => {
//   const users = [
//     { 
//       id: '01', 
//       name: 'Not Available', 
//       email: 'hussaini.7@icloud.com', 
//       registrationDate: '7/22/2024' 
//     },
//     { 
//       id: '02', 
//       name: 'alex michael', 
//       email: 'elexmichael134@gmail.com', 
//       registrationDate: '7/24/2024' 
//     },
//   ];

//   return (
//     <div className={styles.container}>
//       <div className={styles.header}>
//         <h1 className={styles.title}>USER MANAGEMENT</h1>
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
//               <th>S.NO.</th>
//               <th>FULL NAME</th>
//               <th>EMAIL ADDRESS</th>
//               <th>IMAGE</th>
//               <th>REGISTRATION DATE</th>
//               <th>ACTION</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => (
//               <tr key={user.id}>
//                 <td>{user.id}</td>
//                 <td>{user.name}</td>
//                 <td>{user.email}</td>
//                 <td>
//                   <div className={styles.userIcon}>
//                     <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                       <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//                       <path d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//                     </svg>
//                   </div>
//                 </td>
//                 <td>{user.registrationDate}</td>
//                 <td>
//                   <button className={styles.viewButton}>
//                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                       <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
//                       <circle cx="12" cy="12" r="3"></circle>
//                     </svg>
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default User;

import React, { useState, useEffect } from 'react';
import styles from './User.module.css';

const User = () => {
  // State to store user data and loading/error states
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users from the API
  const fetchUsers = async () => {
    try {
      // API base URL from .env file
      const apiUrl = `${process.env.REACT_APP_BASE_URL}/api/admin/auth/user/get`; // Replace with your actual API endpoint
      const token = localStorage.getItem('token'); // Get token from local storage

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Include token in the headers
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const data = await response.json();
      setUsers(data.data.getallUser); // Assuming the users data is in 'data.getallUser'
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false); // Set loading to false once data is fetched or error occurs
    }
  };

  // Fetch data when component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle case where no users are found or error occurs
  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>USER MANAGEMENT</h1>
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
              <th>S.NO.</th>
              <th>FULL NAME</th>
              <th>EMAIL ADDRESS</th>
              <th>IMAGE</th>
              <th>REGISTRATION DATE</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {/* Display loading spinner or data based on the state */}
            {loading ? (
              <tr>
                <td colSpan="6" className={styles.loadingRow}>
                  <span className={styles.loadingText}>Loading...</span>
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.firstName || 'Not Available'} {user.lastName || ''}</td>
                  <td>{user.email}</td>
                  <td>
                    <div className={styles.userIcon}>
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </td>
                  <td>{new Date(user.Reg_Date).toLocaleDateString()}</td>
                  <td>
                    <button className={styles.viewButton}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;
