import axios from 'axios';

// Create a reusable Axios instance with a base URL and JSON headers
const api = axios.create({
  baseURL: 'https://ttt.dev.aboutdream.io', // API root URL
  headers: {
    'Content-Type': 'application/json', // All requests are JSON by default
  },
});

// Attach the token automatically to every request if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;