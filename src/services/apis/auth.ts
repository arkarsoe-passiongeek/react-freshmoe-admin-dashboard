import axios from 'axios'
import Cookies from 'js-cookie'

export const logout = async () => {
    console.log('logout')
    const token = Cookies.get('token')
    await axios.post(`https://dev-api.freshmoe.com/api/admin/logout`, {
        withCredentials: true, headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
    localStorage.removeItem('userdata')
    Cookies.remove('token')
    return 'success'
}
