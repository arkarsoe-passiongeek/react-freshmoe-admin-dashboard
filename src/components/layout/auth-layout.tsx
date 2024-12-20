import { useEffect } from "react"
import { useNavigate } from "react-router"

const AuthLayout = () => {
    const userData = localStorage.getItem('userdata')
    const navigate = useNavigate()

    useEffect(() => {
        if (userData) {
            navigate('/')
        } else {
            navigate('/unauthorized')
        }

        console.log(userData)
    }, [])

    return (
        <div>AuthLayout</div>
    )
}

export default AuthLayout