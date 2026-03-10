// src/services/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

/* ================= REQUEST INTERCEPTOR ================= */
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const { token } = JSON.parse(storedUser);
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (err) {
        console.warn("Failed to parse stored user token", err);
      }
    }
  }
  return config;
});

/* ================= RESPONSE INTERCEPTOR  ================= */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If token expired or invalid
    if (error.response?.status === 401) {
      console.log("Unauthorized - Auto Logout");

      localStorage.removeItem("user"); // safer than clearing everything

      // Optional: redirect user to login page
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;