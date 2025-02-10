import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";
import { BaseInputProps } from "./base-input";

/**
 * Search input component
 */
export const CSearchInput = React.forwardRef<HTMLInputElement, BaseInputProps>(
  ({ className, ...rest }, ref) => {
    return (
      <div className="space-y-2">
        <div className="relative">
          <Input
            ref={ref}
            className={`peer ps-9 ${className}`}
            {...rest}
          />
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
            <Search className="text-c-contrast" size={16} strokeWidth={2} />
          </div>
        </div>
      </div>
    );
  }
);
CSearchInput.displayName = "CSearchInput";
