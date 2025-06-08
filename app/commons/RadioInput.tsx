import React, { forwardRef, InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface RadioInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  labelName?: string;
  value: string;
  labelClassName?: string;
}

const RadioInput = forwardRef<HTMLInputElement, RadioInputProps>(
  ({ className, labelClassName, labelName, value, ...props }, ref) => {
    return (
      <span className={`flex flex-col w-full`}>
        <div className="flex gap-2 items-center ">
          <input
            value={value}
            ref={ref}
            {...props}
            className={twMerge(
              `rounded-md accent-[#86198F] active:border active:accent-[#86198F] focus:accent-[#86198F]`,
              className
            )}
          />
          <label htmlFor={props.id} className={`${labelClassName} `}>
            {labelName}
          </label>
        </div>
      </span>
    );
  }
);

RadioInput.displayName = "RadioInput";

export default RadioInput;
