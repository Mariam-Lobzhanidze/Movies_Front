import axios from "axios";

const API_URL = import.meta.env.VITE_BASE_BACKEND_URL;

const httpClient = axios.create({
  baseURL: API_URL,
});

httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("activeUser");
    }
    return Promise.reject(error);
  }
);

export default httpClient;
