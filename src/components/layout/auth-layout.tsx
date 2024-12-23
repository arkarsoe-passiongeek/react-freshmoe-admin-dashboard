import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router"
import Loading from "./loading"
import { useLinkRoutes } from "@/lib/route"

const AuthLayout = () => {
    const userData = localStorage.getItem('userdata')
    const navigate = useNavigate()
    const routes = useLinkRoutes()

    useEffect(() => {
        if (userData) {
            navigate('/')
        } else {
            navigate(routes.unauthorized())
        }

        console.log(userData)
    }, [])

    return (
        <div>
            <Outlet />
        </div>
    )
}

export default AuthLayout