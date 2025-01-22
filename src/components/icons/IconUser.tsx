import { IconBaseProps } from "@/types"; // Adjust the import path as necessary
import * as React from "react";

export const IconUser: React.FC<IconBaseProps> = ({
  size = 20,
  color = "currentColor",
  title,
  ...rest
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 16"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      {title && <title>{title}</title>}
      <path
        d="M10.2137 3.50555C10.2137 5.27812 8.77373 6.72155 6.99773 6.72155C5.22173 6.72155 3.78516 5.27812 3.78516 3.50555C3.78516 1.73297 5.22516 0.286133 6.99773 0.286133C8.7703 0.286133 10.2137 1.72612 10.2137 3.50555Z"
        fill="currentColor"
      />
      <path
        d="M13.5498 13.9148C13.5498 14.9057 12.7406 15.7148 11.7498 15.7148H2.24922C1.25836 15.7148 0.449219 14.9057 0.449219 13.9148C0.449219 10.3045 3.38751 7.36621 6.99779 7.36621C10.6081 7.36621 13.5498 10.3045 13.5498 13.9148Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default IconUser;
