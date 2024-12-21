import { Link as RouterLink } from "react-router"

const createNavigation = () => {
    const Link = ({ children, ...rest }: any) => {
        return <RouterLink {...rest}>{children}</RouterLink>
    }

    return { Link }
}

export const { Link } =
    createNavigation();