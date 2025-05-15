
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate(); // redirect hook


  const handleSubmit = async (e) => {
    e.preventDefault();
    

    try {
      const response = await fetch(`${BASE_URL}/api/admin/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.status) {
        localStorage.setItem('token', data.data.token);
        navigate('/admin/dashboard'); // redirect after login
      } else {
        console.error('Login failed:', data.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <div className={styles.leftSide}>
          <div className={styles.header}>
            <div className={styles.logo}>Laundry Admin</div>
          </div>

                  <div className={styles.loginForm}>
            <h1 className={styles.title}>Log in</h1>

            <form onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <input
                  type="email"
                  placeholder="Email"
                  className={styles.input}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <span className={styles.inputIcon}>📧</span>
              </div>

              <div className={styles.inputGroup}>
                <input
                  type="password"
                  placeholder="Password"
                  className={styles.input}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span className={styles.inputIcon}>🔒</span>
              </div>

              <div className={styles.options}>
                <div className={styles.rememberMe}>
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label htmlFor="rememberMe">Remember Me</label>
                </div>
              </div>

              <button type="submit" className={styles.loginButton}>
                Log in
              </button>
            </form>
          </div>
        </div>

        <div className={styles.rightSide}></div>
      </div>
    </div>
  );
};

export default Login;
