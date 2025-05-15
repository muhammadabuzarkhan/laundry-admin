

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Profile.module.css';

const BASE_URL = process.env.REACT_APP_BASE_URL_Local;

const Profile = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [userId, setUserId] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/admin/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const { _id, firstName, lastName, email } = res.data.data.user;

        setUserId(_id);
        setFormData(prev => ({
          ...prev,
          firstName,
          lastName,
          email,
          phone: '' // optional
        }));
      } catch (err) {
        console.error('Failed to load profile:', err.response?.data || err.message);
      }
    };

    fetchProfile();
  }, [token]);

  const handleTabChange = (tab) => setActiveTab(tab);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePersonalSubmit = async (e) => {
    e.preventDefault();
    if (!userId) return alert("User ID not available");

    try {
      const res = await axios.put(
        `${BASE_URL}/api/admin/auth/updateAdmin/${userId}`,
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const { user } = res.data.data;

      setFormData(prev => ({
        ...prev,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }));

      alert(res.data.message);
    } catch (err) {
      console.error('Edit profile failed:', err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to update profile");
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      return alert("New passwords do not match");
    }

    try {
      const res = await axios.put(`${BASE_URL}/api/admin/auth/change-password`, {
        oldPassword: formData.currentPassword,
        newPassword: formData.newPassword
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert(res.data.message);

      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
    } catch (err) {
      console.error('Change password error:', err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to change password");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Profile</h1>

      <div className={styles.tabs}>
        <button
          className={`${styles.tabButton} ${activeTab === 'personal' ? styles.activeTab : ''}`}
          onClick={() => handleTabChange('personal')}
        >
          Personal Information
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'security' ? styles.activeTab : ''}`}
          onClick={() => handleTabChange('security')}
        >
          Security
        </button>
      </div>

      {activeTab === 'personal' && (
        <div className={styles.formContainer}>
          <h2 className={styles.sectionTitle}>Personal Information</h2>
          <p className={styles.sectionDescription}>Update your personal details here.</p>

          <form onSubmit={handlePersonalSubmit}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>

            <button type="submit" className={styles.submitButton}>
              Save Changes
            </button>
          </form>
        </div>
      )}

      {activeTab === 'security' && (
        <div className={styles.formContainer}>
          <h2 className={styles.sectionTitle}>Change Password</h2>
          <p className={styles.sectionDescription}>Update your password here.</p>

          <form onSubmit={handlePasswordSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="currentPassword">Current Password</label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
            </div>

            <button type="submit" className={styles.submitButton}>
              Update Password
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Profile;
