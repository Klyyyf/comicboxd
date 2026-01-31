import axios from "axios";
import { parseCookies } from "nookies";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

api.interceptors.request.use(
  (config) => {
    const cookies = parseCookies();
    const token = cookies["comicboxd.token"];

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const requestUrl = error.config?.url || "";

      if (requestUrl.includes("/login")) {
        return Promise.reject(error);
      }

      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default api;
