import React from "react";
import { Input } from "../ui/input";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Search } from "lucide-react";

interface CInputProps extends React.ComponentProps<"input"> {
    className?: string
    onButtonClick?: () => void
    buttonState?: boolean
}

const CBaseInput = React.forwardRef<HTMLInputElement, CInputProps>(({ className, children, ...rest }, ref) => {
    return (
        <Input ref={ref} className={`h-[52px] !text-lg placeholder:text-c-contrast ${className}`} {...rest} />
    );
})
CBaseInput.displayName = 'CBaseInput'

const CInputWithEndButton = React.forwardRef<HTMLInputElement, CInputProps>(({ className, children, onButtonClick, buttonState = false, ...rest }, ref) => {
    return (
        <div className="space-y-2">
            <div className="relative">
                <Input ref={ref} className={`h-[52px] !text-lg placeholder:text-c-contrast ${className}`} {...rest} />
                <button
                    onClick={onButtonClick}
                    type="button"
                    className="absolute inset-y-0 end-4 flex h-full w-9 items-center justify-center rounded-e-lg border border-transparent text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                    aria-label="Subscribe"
                >
                    {/* <Send size={16} strokeWidth={2} aria-hidden="true" /> */}
                    {!buttonState && <FaEye size={16} strokeWidth={2} aria-hidden="true" />}
                    {buttonState && <FaEyeSlash size={16} strokeWidth={2} aria-hidden="true" />}
                </button>
            </div>
        </div>
    );
})
CInputWithEndButton.displayName = 'CInputWithEndButton'

const CSearchInput = React.forwardRef<HTMLInputElement, CInputProps>(({ className, ...rest }, ref) => {
    return (
        <div className="space-y-2">
            <div className="relative">
                <Input ref={ref} className={`peer pe-9 ps-9 py-3 rounded-xl h-auto !text-base bg-c-white placeholder:text-c-contrast ${className}`} {...rest} />
                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                    <Search className="text-c-contrast" size={16} strokeWidth={2} />
                </div>
            </div>
        </div>
    );
})

const CInput = ({ children }: any) => {
    return <>{children}</>
}

CInput.Base = CBaseInput
CInput.WithEndButton = CInputWithEndButton
CInput.SearchInput = CSearchInput

export default CInput