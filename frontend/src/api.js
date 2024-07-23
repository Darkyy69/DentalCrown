import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

const apiUrl = "http://127.0.0.1:8000";
// const apiUrl = "http://192.168.100.30:8000";

const api = axios.create({
  baseURL: apiUrl,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401) {
      const refreshToken = localStorage.getItem(REFRESH_TOKEN);
      if (refreshToken && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const res = await api.post("/api/token/refresh/", {
            refresh: refreshToken,
          });
          if (res.status === 200) {
            localStorage.setItem(ACCESS_TOKEN, res.data.access);
            originalRequest.headers.Authorization = `Bearer ${res.data.access}`;
            return api(originalRequest);
          }
        } catch (refreshError) {
          if (refreshError.response && refreshError.response.status === 401) {
            window.dispatchEvent(new CustomEvent("refreshTokenExpired"));
            return Promise.reject(refreshError);
          }
        }
      } else {
        // Add a delay before retrying the request
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Adjust the delay time as needed
        return api(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
