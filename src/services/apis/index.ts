import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';

// axios instance
export const MAIN_SERVICE: AxiosInstance = axios.create({
   baseURL: `${import.meta.env.VITE_PUBLIC_APP_BASE_URL}`,
   withCredentials: true,
   headers: {
      'Content-Type': 'application/json',
   },
});

// axios interceptor - request
MAIN_SERVICE.interceptors.request.use(
   config => {
      const token = Cookies.get('token');
      if (token) {
         config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
   },
   error => {
      return Promise.reject(new Error(error));
   }
);

// axios interceptor - response
MAIN_SERVICE.interceptors.response.use(
   response => response,
   async error => {
      if (error.response && error.response.status === 401) {
         Cookies.remove('token');
         localStorage?.removeItem('userdata');
         window.location.replace('/auth/unauthorized');
      }

      if (error.response) {
         // Handle HTTP errors with a response from the server
         console.error('Error response:', error.response.data);
         return Promise.reject(error.response.data);
      } else if (error.request) {
         // Handle errors where no response was received
         console.error('No response received:', error.request);
         return Promise.reject(
            new Error('No response received from the server.')
         );
      } else {
         // Handle unexpected errors
         console.error('Unexpected error:', error.message);
         return Promise.reject(new Error('An unexpected error occurred.'));
      }
   }
);
