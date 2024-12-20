import axios, { AxiosInstance } from "axios";

const http: AxiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_PUBLIC_APP_BASE_URL}/api/v1`,
    withCredentials: true
})

export { http }