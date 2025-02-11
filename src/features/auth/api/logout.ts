import axios from 'axios';
import Cookies from 'js-cookie';

export const ROOT_LOGOUT = import.meta.env.VITE_APP_API_URL;

export const logout = async () => {
   const token = Cookies.get('token');
   const res = await axios.post(
      `https://dev-main-api.freshmoe.com/api/v1/logout`,
      undefined,
      {
         withCredentials: true,
         headers: {
            Authorization: `Bearer ${token}`,
         },
      },
   );
   if (res.data.status) {
      localStorage.removeItem('userdata');
      Cookies.remove('token');
      return 'success';
   }
};

export const useLogout = () => {
   return logout();
};
