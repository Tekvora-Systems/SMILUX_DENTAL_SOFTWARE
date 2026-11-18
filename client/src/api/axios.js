import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4200/api/v1',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Attach JWT token from localStorage on every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('smilux_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auto-redirect to login on 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const isAuthRoute = error.config?.url?.includes('/auth/');
      if (!isAuthRoute) {
        localStorage.removeItem('smilux_token');
        localStorage.removeItem('smilux_user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
