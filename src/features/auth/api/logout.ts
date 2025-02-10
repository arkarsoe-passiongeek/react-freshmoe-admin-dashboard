import { CONSTANTS } from '@/lib/constants';
import Cookies from 'js-cookie';

export const ROOT_LOGOUT = import.meta.env.VITE_APP_API_URL;

export const logout = () => {
   Cookies.remove(CONSTANTS.AUTH_COOKIE);
   return 'success';
};

export const useLogout = () => {
   return logout();
};
