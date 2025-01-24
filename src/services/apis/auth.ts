import { http } from '@/lib/http';
import { User } from '@/types';
import axios from 'axios';
import Cookies from 'js-cookie';

export const profile = async (): Promise<User> => {
   const res = await http.get(`/profile`);
   return res.data.data;
};

export const logout = async () => {
   // this is commented assuming that backend doesn't do anything

   // const token = decodeURIComponent(Cookies.get('token') ?? '')
   // console.log(token)
   const token = Cookies.get('token');
   const res = await axios.post(
      `https://dev-main-api.freshmoe.com/api/v1/logout`,
      undefined,
      {
         withCredentials: true,
         headers: {
            Authorization: `Bearer ${token}`,
         },
      }
   );
   if (res.data.status) {
      localStorage.removeItem('userdata');
      Cookies.remove('token');
      return 'success';
   }
};
