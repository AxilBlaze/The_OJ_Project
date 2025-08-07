import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './SignInPage.css';

const SignInPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.username, formData.password);
      navigate('/home');
    } catch (err) {
      setError('Failed to sign in. Please check your credentials.');
      console.error(err);
    }
  };



  return (
    <div className="signin-page">
      {/* Animated Background */}
      <div className="animated-bg">
        <div className="floating-shapes">
          <div className="shape"></div>
          <div className="shape"></div>
          <div className="shape"></div>
          <div className="shape"></div>
          <div className="shape"></div>
          <div className="shape"></div>
          <div className="shape"></div>
          <div className="shape"></div>
        </div>
        
        <div className="particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>
      </div>

      {/* Main Container */}
      <div className="container">
        <div className="signin-card">
          <Link to="/" className="back-link">
            Back to Landing Page
          </Link>
          
          <h1 className="welcome-text">Welcome Back!</h1>
          <p className="subtitle">Ready to continue your coding journey?</p>
          
          {error && <p className="error-message">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                className="form-input"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <div className="input-highlight"></div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-input"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <div className="input-highlight"></div>
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" name="rememberMe" />
                <span className="checkmark"></span>
                Remember Me
              </label>
              <a href="#" className="forgot-password">
                Forgot Password?
              </a>
            </div>

            <button type="submit" className="signin-btn">Sign In</button>
          </form>

          <div className="welcome-section">
            <div className="code-icon">{'</>'}</div>
            <div className="welcome-text-secondary">Great to see you again!</div>
            <div className="welcome-subtitle">Continue where you left off</div>
            <div className="welcome-list">
              <div className="welcome-item">🚀 Pick up your latest challenges</div>
              <div className="welcome-item">🏆 Check your progress and rankings</div>
              <div className="welcome-item">📈 Track your skill improvements</div>
            </div>
          </div>

          <div className="signup-link">
            <p>Don't have an account? <Link to="/signup" className="link-highlight">Sign up here</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage; 