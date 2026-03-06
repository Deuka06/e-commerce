import axios from "axios";

const api = axios.create({
  // Swagger-дегі Production Server мекенжайы
  baseURL: "/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Сұраныс жіберлер алдында токенді автоматты түрде қосу
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
