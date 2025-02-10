import Cookies from "js-cookie";
import { CONSTANTS } from "./constants";

export const isAuth = () => {
  return !!Cookies.get(CONSTANTS.AUTH_COOKIE);
};
