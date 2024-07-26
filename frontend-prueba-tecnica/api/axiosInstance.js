import axios from 'axios';

// Crear una instancia de Axios con la configuración predeterminada
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL, // Cambia esta URL por la de tu API
  timeout: 10000, // Tiempo de espera para las solicitudes en milisegundos
});

// Agregar un interceptor para agregar el token en cada solicitud
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // O usa otro método para obtener el token
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;