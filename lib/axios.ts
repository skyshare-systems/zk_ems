import axios from "axios";
/* import { cookies } from "next/headers";
import httpCodes from "http-codes"; */

const api = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/* 
api.interceptors.req.use(
  async (config) => {
    const token = (await cookies()).get("token");

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
        (await cookies()).delete("token");
      }
    }
    return Promise.reject(error);
  }
); */

export default api;
