import axios from "axios";

// Axios Instance oluştur
const AxiosInstance = axios.create({
  baseURL: "http://localhost:8080/api", // API URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Token'i yalnızca signup ve signin dışında ekleyelim
AxiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && !config.url.includes("/auth/signin") && !config.url.includes("/auth/signup")) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default AxiosInstance;
