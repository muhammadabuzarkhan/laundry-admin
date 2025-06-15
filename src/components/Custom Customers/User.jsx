


import React, { useState, useEffect } from 'react';
import styles from './User.module.css'; // Create a matching CSS module
import AddUserModal from './Add New/AddUserModal';
import AllOrder from './My Orders/AllOrder'; // Make sure this component exists and is imported correctly

import { ArchiveRestore } from 'lucide-react';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // New states for orders modal
  const [showAllOrderModal, setShowAllOrderModal] = useState(false);
  const [allOrders, setAllOrders] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/custom-customer/get`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (data.status && Array.isArray(data.data)) {
          setUsers(data.data);
        } else {
          console.warn('Unexpected user data:', data);
        }
      } catch (err) {
        console.error('Failed to fetch users:', err);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/custom-customer/${deleteId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (data.status === 'Success' || data.status === true) {
        setUsers((prev) => prev.filter((u) => u._id !== deleteId));
      } else {
        console.warn('Failed to delete user:', data);
      }
    } catch (err) {
      console.error('Delete failed:', err);
    } finally {
      setShowDeleteModal(false);
      setDeleteId(null);
    }
  };

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    const email = (user.email || '').toLowerCase();
    const phone = (user.phone || '').toLowerCase();
    const term = searchTerm.toLowerCase();
    return fullName.includes(term) || email.includes(term) || phone.includes(term);
  });
const fetchAllOrders = async (userId, user) => {
  try {
    const apiUrl = `${process.env.REACT_APP_BASE_URL}/api/callorder/customer/${userId}`;
    const token = localStorage.getItem('token');

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error('Failed to fetch all user orders');
    const data = await response.json();

    setAllOrders(data.data || []);
    setSelectedUser(user);
    setShowAllOrderModal(true);
  } catch (error) {
    alert(error.message);
  }
};


  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>USER MANAGEMENT</h1>
        <button className={styles.addButton} onClick={() => setShowAddModal(true)}>
          ADD USER
        </button>
      </div>

      <div className={styles.searchContainer}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search by name, email or phone"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className={styles.searchButton}>
          <span className={styles.searchIcon}>⌕</span>
        </button>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>S#</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Created</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{`${user.firstName} ${user.lastName}`}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.address}</td>
                <td>{new Date(user.createdAt).toLocaleDateString('en-US')}</td>
                <td className={styles.actionButtons}>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDeleteClick(user._id)}
                    title="Delete User"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
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
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <AddUserModal
          onClose={() => setShowAddModal(false)}
          onUserAdded={(newUser) => setUsers((prev) => [...prev, newUser])}
        />
      )}

      {showDeleteModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.confirmationModal}>
            <div className={styles.modalHeader}>
              <h2>Confirm Deletion</h2>
              <button className={styles.closeButton} onClick={() => setShowDeleteModal(false)}>
                ×
              </button>
            </div>
            <div className={styles.modalContent}>
              <p>Are you sure you want to delete this user?</p>
            </div>
            <div className={styles.modalActions}>
              <button onClick={() => setShowDeleteModal(false)}>No</button>
              <button onClick={handleConfirmDelete}>Yes</button>
            </div>
          </div>
        </div>
      )}

      {showAllOrderModal && (
        <AllOrder user={selectedUser} orders={allOrders} onClose={() => setShowAllOrderModal(false)} />
      )}
    </div>
  );
};

export default UserManagement;
