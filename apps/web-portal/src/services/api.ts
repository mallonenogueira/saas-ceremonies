import axios from "axios";

export const BASE_URL = import.meta.env.VITE_URL;

export const api = axios.create({
  baseURL: BASE_URL,
});

export const fetcher = (url: string) => api.get(url).then((res) => res.data);

api.interceptors.request.use(
  (config) => {
    const authData = getAuthData();
    if (authData && authData.token) {
      config.headers.Authorization = `Bearer ${authData.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

function getAuthData() {
  const storedData = localStorage.getItem("authData");

  return storedData ? JSON.parse(storedData) : null;
}
