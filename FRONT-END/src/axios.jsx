import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000', // Base URL for your API
  timeout: 10000, // Request timeout (optional)
  headers: {
    'Content-Type': 'application/json', // Default headers
    // Add other headers as needed, e.g., Authorization
  },
  withCredentials:true
});

export default apiClient