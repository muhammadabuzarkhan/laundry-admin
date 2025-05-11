import React, { useState } from 'react';
import styles from './CouponsCode.module.css';

const AddCouponModal = ({ onClose, onCouponAdded }) => {
    const [formData, setFormData] = useState({
        title: '',
        code: '',
        usageLimit: '',
        limitCouponTimes: '',
        discount: '',
        expiryDate: ''
    });

    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const generateCouponCode = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = 'L';
        for (let i = 0; i < 6; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newCoupon = {
            title: formData.title,
            expireDate: new Date(formData.expiryDate).toISOString(),
            discount: parseFloat(formData.discount),
            limitCoupenTimes: parseInt(formData.limitCouponTimes, 10)
        };

        if (formData.code) {
            newCoupon.code = formData.code;
        } else {
            newCoupon.code = generateCouponCode();
        }

        if (formData.usageLimit) {
            newCoupon.usageLimit = parseInt(formData.usageLimit, 10);
        }

        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`http://localhost:3021/api/admin/auth/coupen/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(newCoupon),
            });

            const data = await response.json();

            if (data.success) {
                setIsError(false);
                setMessage(data.message);  // Set the message without icon here

                if (data.data && data.data.newCoupen) {
                    onCouponAdded(data.data.newCoupen);
                }

                setTimeout(() => {
                    setMessage('');
                    onClose();
                }, 2000);
            } else {
                setIsError(true);
                setMessage(data.message);  // Set the error message here
            }
        } catch (error) {
            setIsError(true);
            setMessage('❌ Network error or server unavailable.');
            console.error('Failed to create coupon:', error);
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <div className={styles.modalHeader}>
                    <h2>Add New Coupon</h2>
                    <button className={styles.closeButton} onClick={onClose}>×</button>
                </div>

                <form onSubmit={handleSubmit} className={styles.modalForm}>
                    {message && (
                        <div
                            className={isError ? styles.errorMessage : styles.successMessage}
                            style={{ marginBottom: '12px' }}
                        >
                            {isError ? '❌ ' : ''}
                            {message}
                        </div>
                    )}

                    <div className={styles.formGroup}>
                        <label htmlFor="title">Coupon Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter coupon title"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="code">Coupon Code (Optional)</label>
                        <input
                            type="text"
                            id="code"
                            name="code"
                            value={formData.code}
                            onChange={handleInputChange}
                            placeholder="Leave blank to auto-generate"
                        />
                    </div>

                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label htmlFor="usageLimit">Usage Limit (Optional)</label>
                            <input
                                type="number"
                                id="usageLimit"
                                name="usageLimit"
                                value={formData.usageLimit}
                                onChange={handleInputChange}
                                min="0"
                                placeholder="Per user"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="limitCouponTimes">Limit Coupon Times</label>
                            <input
                                type="number"
                                id="limitCouponTimes"
                                name="limitCouponTimes"
                                value={formData.limitCouponTimes}
                                onChange={handleInputChange}
                                min="0"
                                required
                                placeholder="Total usage limit"
                            />
                        </div>
                    </div>

                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label htmlFor="discount">Discount Amount</label>
                            <input
                                type="number"
                                id="discount"
                                name="discount"
                                value={formData.discount}
                                onChange={handleInputChange}
                                min="0"
                                required
                                placeholder="Enter discount amount"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="expiryDate">Expiry Date</label>
                            <input
                                type="date"
                                id="expiryDate"
                                name="expiryDate"
                                value={formData.expiryDate}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    <div className={styles.formActions}>
                        <button type="button" className={styles.cancelButton} onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className={styles.submitButton}>
                            Save Coupon
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCouponModal;
