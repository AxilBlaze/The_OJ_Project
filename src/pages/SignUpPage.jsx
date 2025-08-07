import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import './SignUpPage.css';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState(null);
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
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    try {
      const response = await api.post('/api/accounts/signup/', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      console.log(response.data);
      navigate('/signin');
    } catch (err) {
      setError('Failed to create account. Please try again.');
      console.error(err);
    }
  };



  return (
    <div className="signup-page">
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
        <div className="signup-card">
          <Link to="/" className="back-link">
            Back to Landing Page
          </Link>
          
          <h1 className="welcome-text">Join CodeBlaze</h1>
          <p className="subtitle">Start your coding journey today!</p>
          
          {error && <p className="error-message">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                className="form-input"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
              <div className="input-highlight"></div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <div className="input-highlight"></div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                className="form-input"
                placeholder="Choose a username"
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
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <div className="input-highlight"></div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="form-input"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <div className="input-highlight"></div>
            </div>

            <button type="submit" className="signup-btn">Create Account</button>
          </form>

          <div className="benefits-section">
            <div className="code-icon">{'</>'}</div>
            <div className="benefits-text">Welcome to CodeBlaze</div>
            <div className="benefits-subtitle">You'll be developer #47,832!</div>
            <div className="benefits-list">
              <div className="benefit-item">🚀 Access to 1000+ coding challenges</div>
              <div className="benefit-item">🏆 Compete with developers worldwide</div>
              <div className="benefit-item">📈 Track your progress and skills</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage; 