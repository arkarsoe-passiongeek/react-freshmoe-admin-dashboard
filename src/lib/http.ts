import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";

const http: AxiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_PUBLIC_APP_BASE_URL}/api/v1`,
    withCredentials: true
})

// Add a request interceptor to attach the bearer token
http.interceptors.request.use(
    (config) => {
        // Retrieve the token from localStorage or another storage mechanism
        const token = Cookies.get("token");

        if (token) {
            // Attach the token to the Authorization header
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        // Handle errors in request configuration
        return Promise.reject(error);
    }
);

export { http }