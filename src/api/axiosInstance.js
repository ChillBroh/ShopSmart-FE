import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "https://webapi-fc6r.onrender.com/api/",
  baseURL: "https://localhost:7018/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jsonwebtoken");
    const payload = JSON.parse(token);
    if (payload) {
      config.headers["Authorization"] = `Bearer ${payload}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
