import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 80000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

//Request interceptor for API calls
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);



//Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Log successful responses for debugging
    console.debug(`Response from ${response.config.url}: Status ${response.status}`);
    return response;
  },
  (error) => {
    // Enhanced error logging
    if (error.response) {
      console.error(`API Error (${error.config?.url}): ${error.response.status}`, error.response.data);
      
      if (error.response.status === 401) {
        console.warn("Authentication error, redirecting to login");
        // Don't redirect immediately on 401, let the component handle it
        // This prevents infinite loops if multiple calls happen quickly
        if (window.location.pathname !== '/' && window.location.pathname !== '/login') {
          window.location.href = "/";
        }
      } else if (error.response.status === 500) {
        console.error("Server error, please try again later");
      }
    } else if (error.code === "ECONNABORTED") {
      console.error("Request timeout, please try again later");
    } else if (error.request) {
      console.error("Network error - no response received", error.request);
    } else {
      console.error("Request configuration error", error);
    }
    return Promise.reject(error);
  }
);


export default axiosInstance;
