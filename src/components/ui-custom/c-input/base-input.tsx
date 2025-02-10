import { Input } from "@/components/ui/input";
import React from "react";

/**
 * Types for the base input component
 */
export interface BaseInputProps extends React.ComponentProps<"input"> {
  className?: string;
}

export const CBaseInput = React.forwardRef<HTMLInputElement, BaseInputProps>(
  ({ className, ...rest }, ref) => {
    return (
      <Input
        ref={ref}
        className={`${className} `}
        {...rest}
      />
    );
  }
);
CBaseInput.displayName = "CBaseInput";
