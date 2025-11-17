// src/api/axios.js
import axios from 'axios';

export default axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: false,
});
