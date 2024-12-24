import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router"
import Cookies from 'js-cookie'
import { useLinkRoutes } from "@/lib/route"

const AuthLayout = () => {
    const navigate = useNavigate()
    const routes = useLinkRoutes()

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