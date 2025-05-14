import React, { useState, useEffect } from 'react';
import styles from './User.module.css';
import UserOrderModal from './UserOrder';

const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userOrders, setUserOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchUsers = async () => {
    try {
      const apiUrl = `${process.env.REACT_APP_BASE_URL}/api/admin/auth/user/get`;
      const token = localStorage.getItem('token');

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
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
        headers: {
          'Authorization': `Bearer ${token}`,
        },
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

  useEffect(() => {
    fetchUsers();
  }, []);

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      {/* Header + Filter UI (unchanged) */}
      <div className={styles.header}>
        <h1 className={styles.title}>USER MANAGEMENT</h1>
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
              <tr>
                <td colSpan="6" className={styles.loadingRow}>Loading...</td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.firstName || 'Not Available'} {user.lastName || ''}</td>
                  <td>{user.email}</td>
                  <td>
                    <div className={styles.userIcon}> {/* existing svg icon */}</div>
                  </td>
                  <td>{new Date(user.Reg_Date).toLocaleDateString()}</td>
                  <td>
                    <button
                      className={styles.viewButton}
                      onClick={() => fetchUserOrders(user._id, user)}
                    >
                      {/* eye icon svg */}
                      <td>
                        <button
                          className={styles.viewButton}
                          onClick={() => fetchUserOrders(user._id, user)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                        </button>
                      </td>

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
    </div>
  );
};

export default User;
