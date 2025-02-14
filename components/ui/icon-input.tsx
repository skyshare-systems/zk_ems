import * as React from "react";
import { cn } from "../../lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  endIconOnClick?: () => void;
}

const IconInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, startIcon, endIcon, endIconOnClick, ...props }, ref) => {
    return (
      <div className="w-full flex items-center border border-input rounded-md ">
        {startIcon && (
          <div className="pl-2">
            {typeof startIcon === "function"
              ? React.createElement(startIcon, {
                  size: 18,
                  className: "text-muted-foreground",
                })
              : startIcon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            "flex-1  py-2 px-4 text-sm bg-transparent focus:outline-none border-none placeholder:text-muted-foreground w-full",
            className
          )}
          ref={ref}
          {...props}
        />
        {endIcon && (
          <div onClick={endIconOnClick} className="pr-2 cursor-pointer">
            {typeof endIcon === "function"
              ? React.createElement(endIcon, {
                  size: 18,
                  className: "text-muted-foreground",
                })
              : endIcon}
          </div>
        )}
      </div>
    );
  }
);

IconInput.displayName = "IconInput";

export { IconInput };
