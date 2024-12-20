import { Link as RouterLink, useLocation as routerUseLocation } from "react-router"

const createNavigation = () => {
    const Link = ({ children, ...rest }: any) => {
        return <RouterLink {...rest}>{children}</RouterLink>
    }

    const location = routerUseLocation()

    return { Link }
}

export const { Link } =
    createNavigation();