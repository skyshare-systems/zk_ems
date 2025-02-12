import axios from "axios";
import httpCodes from "http-codes";

const api = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token")

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error && error.response) {
      const { status } = error.response;
      if (status === httpCodes.UNAUTHORIZED) {
        localStorage.clear();
      }
    }
    return Promise.reject(error);
  }
); 

export default api;
