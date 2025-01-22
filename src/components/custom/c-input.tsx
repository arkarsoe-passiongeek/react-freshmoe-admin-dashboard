import { Check, Search, X } from "lucide-react";
import React, { ReactNode, useId, useMemo, useState } from "react";
import { Input } from "../ui/input";

/**
 * Types for the base input component
 */
interface BaseInputProps extends React.ComponentProps<"input"> {
  className?: string;
}

/**
 * Types for the input with an end button
 */
interface InputWithEndButtonProps extends BaseInputProps {
  onButtonClick: () => void;
  getIcon: () => ReactNode; // Function to return the appropriate icon
}

/**
 * Types for the input with an end button
 */
interface InputWithPasswordStrengthIndicatorProps extends BaseInputProps {
  value: string;
  requirements: {
    regex: RegExp; // A regular expression
    text: string; // The corresponding text for the requirement
  }[];
  onButtonClick: () => void;
  getIcon: () => ReactNode; // Function to return the appropriate icon
}

/**
 * Types for the input with an end icon
 */
interface InputWithEndIconProps extends BaseInputProps {
  getIcon: () => ReactNode; // Function to return the appropriate icon
}

/**
 * Types for the search input component
 */
interface SearchInputProps extends BaseInputProps {}

/**
 * Base input component
 */
const CBaseInput = React.forwardRef<HTMLInputElement, BaseInputProps>(
  ({ className, ...rest }, ref) => {
    return (
      <Input
        ref={ref}
        className={`h-[46px] !mt-[6px] 2xl:!mt-2 text-sm md:text-sm placeholder:text-c-contrast ${className} outline-offset-[-2px]`}
        {...rest}
      />
    );
  }
);
CBaseInput.displayName = "CBaseInput";

/**
 * Input component with an end button
 */
const CInputWithEndButton = React.forwardRef<
  HTMLInputElement,
  InputWithEndButtonProps
>(({ className, onButtonClick, getIcon, ...rest }, ref) => {
  return (
    <div className="space-y-2">
      <div className="relative">
        <Input
          ref={ref}
          className={`h-[46px] !mt-[6px] 2xl:!mt-2 text-sm md:text-sm placeholder:text-c-contrast ${className}`}
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

/**
 * Input component with an end icon
 */
const CInputWithEndIcon = React.forwardRef<
  HTMLInputElement,
  InputWithEndIconProps
>(({ className, getIcon, ...rest }, ref) => {
  return (
    <div className="space-y-2">
      <div className="relative">
        <Input
          ref={ref}
          className={`h-[46px] !mt-[6px] 2xl:!mt-2 text-sm md:text-sm placeholder:text-c-contrast ${className}`}
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

/**
 * Search input component
 */
const CSearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, ...rest }, ref) => {
    return (
      <div className="space-y-2">
        <div className="relative">
          <Input
            ref={ref}
            className={`peer pe-9 ps-9 py-3 rounded-xl h-auto text-sm md:text-sm bg-c-white placeholder:text-c-contrast ${className}`}
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

/**
 * Input component with password strength indicator
 */
const CInputWithPasswordStrengthIndicator = React.forwardRef<
  HTMLInputElement,
  InputWithPasswordStrengthIndicatorProps
>(({ onButtonClick, getIcon, value, requirements, ...rest }, ref) => {
  const id = useId();

  const checkStrength = (pass: string) => {
    return requirements.map((req) => ({
      met: req.regex.test(pass),
      text: req.text,
    }));
  };

  const strength = checkStrength(value);

  const strengthScore = useMemo(() => {
    return strength.filter((req) => req.met).length;
  }, [strength]);

  // const getStrengthColor = (score: number) => {
  //   if (score === 0) return "bg-border";
  //   if (score <= 1) return "bg-red-500";
  //   if (score <= 2) return "bg-orange-500";
  //   if (score === 3) return "bg-amber-500";
  //   return "bg-emerald-500";
  // };

  const getStrengthText = (score: number) => {
    if (score === 0) return "Enter a password";
    if (score <= 2) return "Weak password";
    if (score === 3) return "Medium password";
    return "Strong password";
  };

  return (
    <div>
      {/* Password input field with toggle visibility button */}
      <div className="space-y-2 mb-4">
        <div className="relative">
          <Input
            className="pe-9"
            value={value}
            aria-invalid={strengthScore < 4}
            aria-describedby={`${id}-description`}
            ref={ref}
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

      {/* Password strength indicator */}
      {/* <div
        className="mb-4 mt-3 h-1 w-full overflow-hidden rounded-full bg-border"
        role="progressbar"
        aria-valuenow={strengthScore}
        aria-valuemin={0}
        aria-valuemax={4}
        aria-label="Password strength"
      >
        <div
          className={`h-full ${getStrengthColor(
            strengthScore
          )} transition-all duration-500 ease-out`}
          style={{ width: `${(strengthScore / 4) * 100}%` }}
        ></div>
      </div> */}

      {/* Password strength description */}
      <p
        id={`${id}-description`}
        className="mb-2 text-sm font-medium text-foreground"
      >
        {getStrengthText(strengthScore)}. Must contain:
      </p>

      {/* Password requirements list */}
      <ul className="space-y-1.5" aria-label="Password requirements">
        {strength.map((req, index) => (
          <li key={index} className="flex items-center gap-2">
            {req.met ? (
              <Check
                size={16}
                className="text-emerald-500"
                aria-hidden="true"
              />
            ) : (
              <X
                size={16}
                className="text-muted-foreground/80"
                aria-hidden="true"
              />
            )}
            <span
              className={`text-xs ${
                req.met ? "text-emerald-600" : "text-muted-foreground"
              }`}
            >
              {req.text}
              <span className="sr-only">
                {req.met ? " - Requirement met" : " - Requirement not met"}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
});
CInputWithPasswordStrengthIndicator.displayName =
  "InputWithPasswordStrengthIndicator";

/**
 * Wrapper component for input variations
 */
interface CInputWrapperProps {
  children: ReactNode;
}

/**
 * CInput component with static properties for variations
 */
interface CInputType extends React.FC<CInputWrapperProps> {
  Base: typeof CBaseInput;
  WithEndButton: typeof CInputWithEndButton;
  SearchInput: typeof CSearchInput;
  WithEndIcon: typeof CInputWithEndIcon;
  WithPasswordStrengthIndicator: typeof CInputWithPasswordStrengthIndicator;
}

const CInput: CInputType = ({ children }) => {
  return <>{children}</>;
};

CInput.Base = CBaseInput;
CInput.WithEndButton = CInputWithEndButton;
CInput.SearchInput = CSearchInput;
CInput.WithEndIcon = CInputWithEndIcon;
CInput.WithPasswordStrengthIndicator = CInputWithPasswordStrengthIndicator;

export default CInput;
