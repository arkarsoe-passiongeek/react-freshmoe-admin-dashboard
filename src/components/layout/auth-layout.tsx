import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router"
import Loading from "./loading"
import Cookies from 'js-cookie'
import { useLinkRoutes } from "@/lib/route"

const AuthLayout = () => {
    const navigate = useNavigate()
    const routes = useLinkRoutes()
    const userData = localStorage.getItem('userdata')

    useEffect(() => {
        if (Cookies.get('token')) {
            navigate('/')
        } else {
            navigate(routes.unauthorized())
        }
    }, [])

    return (
        <div>
            <Outlet />
        </div>
    )
}

export default AuthLayout