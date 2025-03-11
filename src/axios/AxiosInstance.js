import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",
});

// Request interceptor ekleyerek sadece belirli isteklerde Authorization header ekleyelim
AxiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  // Eğer istek signin veya signup değilse, Authorization header ekleyelim
  if (token && !config.url.includes("/auth/signin") && !config.url.includes("/auth/signup")) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default AxiosInstance;
