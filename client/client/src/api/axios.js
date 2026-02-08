import axios from 'axios';

const api = axios.create({
  // Swagger-дегі Production Server мекенжайы
  baseURL: 'http://46.247.41.196/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Әр сұраныс сайын localStorage-тан токенді тексеріп, қосып отырады
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
