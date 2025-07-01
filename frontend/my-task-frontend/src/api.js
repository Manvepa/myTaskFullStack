// src/api.js
import axios from 'axios';

// Crear una instancia de Axios
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Interceptor para agregar el token JWT automáticamente si existe
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Obtenemos el token del localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Adjuntamos el token al header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
