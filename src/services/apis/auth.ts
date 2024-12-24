import Cookies from 'js-cookie'

export const logout = async () => {
    console.log('logout')
    localStorage.removeItem('userdata')
    Cookies.remove('token')
    return 'success'
}
