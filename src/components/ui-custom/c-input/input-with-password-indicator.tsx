import { Input } from "@/components/ui/input";
import { Check, X } from "lucide-react";
import React, { ReactNode, useId, useMemo } from "react";
import { BaseInputProps } from "./base-input";

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
 * Input component with password strength indicator
 */
export const CInputWithPasswordStrengthIndicator = React.forwardRef<
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
              className={`text-xs ${req.met ? "text-emerald-600" : "text-muted-foreground"
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
