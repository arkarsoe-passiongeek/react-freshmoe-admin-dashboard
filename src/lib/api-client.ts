import Axios, { InternalAxiosRequestConfig } from 'axios';

import { useNotifications } from '@/components/ui/notifications';
import { env } from '@/config/env';
import { paths } from '@/config/paths';
import Cookies from 'js-cookie';

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
   if (config.headers) {
      config.headers.Accept = 'application/json';
   }

   config.withCredentials = false;
   return config;
}

export const api = Axios.create({
   baseURL: env.API_URL,
});

// axios interceptor - request
api.interceptors.request.use(
   config => {
      // const token = localStorage.getItem('auth-storage')
      //    ? (JSON.parse(localStorage.getItem('auth-storage') ?? '')['state'][
      //         'token'
      //      ] ?? undefined)
      //    : false;
      const token = Cookies.get('token') ?? false;
      if (token) {
         config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
   },
   error => {
      return Promise.reject(new Error(error));
   },
);

api.interceptors.request.use(authRequestInterceptor);
api.interceptors.response.use(
   response => {
      return response.data;
   },
   error => {
      const message = error.response?.data?.message || error.message;
      useNotifications.getState().addNotification({
         type: 'error',
         title: 'Error',
         message,
      });

      if (error.response?.status === 401) {
         // const searchParams = new URLSearchParams();
         // const redirectTo =
         //    searchParams.get('redirectTo') || window.location.pathname;
         // window.location.href = paths.auth.login.getHref(redirectTo);
         Cookies.remove('token');
         localStorage.removeItem('auth-storage');
         if (window.location.pathname !== paths.notAuthorized.path) {
            window.location.href = paths.notAuthorized.path;
         }
      }

      return Promise.reject(error);
   },
);
