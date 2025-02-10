import { LinkProps, Link as RouterLink } from "react-router";

const Link = ({ children, ...rest }: LinkProps) => {
  return <RouterLink {...rest}>{children}</RouterLink>;
};

export default Link;
