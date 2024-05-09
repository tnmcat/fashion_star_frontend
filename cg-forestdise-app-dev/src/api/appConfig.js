import axios from "axios";

export const API_BASE_URL = "http://localhost:5454/api";
const jwt = localStorage.getItem("jwt");
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
    },
});

export default api;
api.interceptors.request.use(
    (config) => {
        const jwt = localStorage.getItem("token");
        if (jwt) {
            config.headers.Authorization = `Bearer ${jwt}`;
        }
        return config;
    },
    (error) => {
        // Handle request error
        return Promise.reject(error);
    }
);
