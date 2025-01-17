import axios from "axios";
import Cookies from "js-cookie";

export const logout = async () => {
  // this is commented assuming that backend doesn't do anything

  // const token = decodeURIComponent(Cookies.get('token') ?? '')
  // console.log(token)
  //   const token = Cookies.get("token");
  const res = await axios.post(
    `https://dev-main-api.freshmoe.com/api/v1/logout`,
    undefined,
    {
      withCredentials: true,
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
    }
  );
  if (res.data.status) {
    localStorage.removeItem("userdata");
    Cookies.remove("token");
    return "success";
  }
};
