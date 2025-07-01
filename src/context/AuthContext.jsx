import React, { createContext, useState, useContext, useEffect, useRef } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);
const INACTIVITY_LIMIT = 30 * 60 * 1000; // 30 minutes in ms

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const inactivityTimer = useRef(null);

  // Helper: logout and clear everything
  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    delete api.defaults.headers.common['Authorization'];
    setIsAuthenticated(false);
    navigate('/');
  };

  // Helper: reset inactivity timer
  const resetInactivityTimer = () => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(() => {
      logout();
      alert('You have been logged out due to inactivity.');
    }, INACTIVITY_LIMIT);
  };

  // Listen for user activity
  useEffect(() => {
    if (isAuthenticated) {
      window.addEventListener('mousemove', resetInactivityTimer);
      window.addEventListener('keydown', resetInactivityTimer);
      resetInactivityTimer();
      return () => {
        window.removeEventListener('mousemove', resetInactivityTimer);
        window.removeEventListener('keydown', resetInactivityTimer);
        if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
      };
    }
  }, [isAuthenticated]);

  // On mount: check token validity
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Try a protected endpoint to verify token
      api.get('/api/accounts/problems/')
        .then(() => setIsAuthenticated(true))
        .catch(() => logout());
    }
  }, []);

  // Login function: handles API call and sets tokens
  const login = async (username, password) => {
    try {
      const response = await api.post('/api/token/', { username, password });
      const { access, refresh } = response.data;
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      api.defaults.headers.common['Authorization'] = `Bearer ${access}`;
      setIsAuthenticated(true);
      navigate('/home');
    } catch (err) {
      throw new Error('Invalid credentials');
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 