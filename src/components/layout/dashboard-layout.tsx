import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router";

const DashboardLayout = () => {
    let navigate = useNavigate();

    const userData = localStorage.getItem('userdata')
    useEffect(() => {
        if (userData) {
            navigate('/')
        } else {
            navigate('/unauthorized')
        }
    }, [])

    return (
        <div>
            <h1>Dashboard Layout</h1>
            <Outlet />
        </div>
    )
}

export default DashboardLayout