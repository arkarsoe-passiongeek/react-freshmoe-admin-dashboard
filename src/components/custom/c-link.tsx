import { Link, LinkProps } from "react-router";

interface CLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
}

const CLink: React.FC<CLinkProps> = ({ children, className = "", ...rest }) => {
  return (
    <Link
      className={`focus-visible:outline-none rounded-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${className}`}
      {...rest}
    >
      {children}
    </Link>
  );
};

export default CLink;
