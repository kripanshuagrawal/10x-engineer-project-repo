import axios from 'axios';

// Set up a base URL for the API endpoints
const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Replace with your backend API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor if you need authorization, logging, etc.
api.interceptors.request.use(
  config => {
    // Modify request config if necessary, e.g., add authorization token
    return config;
  },
  error => Promise.reject(error)
);

// Response interceptor for handling global errors
api.interceptors.response.use(
  response => response,
  error => {
    // Handle errors, e.g., redirect on 401 or log errors globally
    return Promise.reject(error);
  }
);

export default api;