import React, { useState } from 'react';
import styles from './Profile.module.css';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [formData, setFormData] = useState({
    firstName: 'Hussain',
    lastName: 'Hussaini',
    email: 'hussaini.7@icloud.com',
    phone: '07476684500',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handlePersonalSubmit = (e) => {
    e.preventDefault();
    console.log('Personal information updated:', {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone
    });
    // Here you would typically send the data to your backend
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    console.log('Password updated');
    // Here you would typically send the password update to your backend
    // Reset password fields
    setFormData({
      ...formData,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
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