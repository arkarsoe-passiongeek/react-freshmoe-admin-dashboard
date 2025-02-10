import { Input } from "@/components/ui/input";
import React, { ReactNode } from "react";
import { BaseInputProps } from "./base-input";

/**
 * Types for the input with an end icon
 */
export interface InputWithEndIconProps extends BaseInputProps {
  getIcon: () => ReactNode; // Function to return the appropriate icon
}

/**
 * Input component with an end icon
 */
export const CInputWithEndIcon = React.forwardRef<
  HTMLInputElement,
  InputWithEndIconProps
>(({ className, getIcon, ...rest }, ref) => {
  return (
    <div className="space-y-2">
      <div className="relative">
        <Input
          ref={ref}
          className={`${className}`}
          {...rest}
        />
        {getIcon && (
          <div className="pointer-events-none absolute inset-y-0 end-0 pe-4 flex items-center justify-center text-muted-foreground/80 peer-disabled:opacity-50">
            {getIcon()}
          </div>
        )}
      </div>
    </div>
  );
});
CInputWithEndIcon.displayName = "CInputWithEndIcon";
