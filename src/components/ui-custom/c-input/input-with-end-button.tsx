import { Input } from "@/components/ui/input";
import React, { ReactNode } from "react";
import { BaseInputProps } from "./base-input";

/**
 * Types for the input with an end button
 */
export interface InputWithEndButtonProps extends BaseInputProps {
  onButtonClick: () => void;
  getIcon: () => ReactNode; // Function to return the appropriate icon
}

/**
 * Input component with an end button
 */
export const CInputWithEndButton = React.forwardRef<
  HTMLInputElement,
  InputWithEndButtonProps
>(({ className, onButtonClick, getIcon, ...rest }, ref) => {
  return (
    <div className="space-y-2">
      <div className="relative">
        <Input
          ref={ref}
          className={`${className}`}
          {...rest}
        />
        {getIcon && (
          <button
            onClick={onButtonClick}
            type="button"
            className="absolute inset-y-0 end-0 flex h-full w-12 items-center justify-center rounded-e-lg border border-transparent text-muted-foreground/80 outline-offset-[-2px] transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Toggle visibility"
          >
            {getIcon()}
          </button>
        )}
      </div>
    </div>
  );
});
CInputWithEndButton.displayName = "CInputWithEndButton";
