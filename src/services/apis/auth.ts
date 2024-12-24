import axios from 'axios'
import Cookies from 'js-cookie'

export const logout = async () => {
    console.log('logout')
    await axios.post(`https://dev-api.freshmoe.com/api/admin/logout`, { withCredentials: true })
    localStorage.removeItem('userdata')
    Cookies.remove('token')
    return 'success'
}
