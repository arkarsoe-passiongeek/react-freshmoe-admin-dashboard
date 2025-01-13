import { Link } from "react-router"

const CLink = ({ children, className, ...rest }: any) => {
    return (
        <Link className={`focus-visible:outline-none rounded-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${className}`} {...rest}>{children}</Link>
    )
}

export default CLink