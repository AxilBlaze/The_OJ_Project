import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  // withCredentials removed for JWT usage
});

// Add a request interceptor to include JWT token
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export default api;