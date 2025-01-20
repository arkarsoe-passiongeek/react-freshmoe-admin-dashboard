import { MAIN_SERVICE } from '@/services/apis';
import * as service from '@/services/apis/endpoints';
import Cookies from 'js-cookie';

// Create
export async function logout() {
   let res = await MAIN_SERVICE.post(service.LOGOUT);
   if (res.status === 201) {
      Cookies.remove('token');
      localStorage?.removeItem('userdata');
      return res;
   }
}
