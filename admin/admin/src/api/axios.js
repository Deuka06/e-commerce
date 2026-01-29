import axios from "axios";

const instance = axios.create({
  baseURL: "http://46.247.41.196/api/v1", // Сіздің сервердің адресі
});

// Сұраныс жіберлер алдында токенді автоматты түрде қосу
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
