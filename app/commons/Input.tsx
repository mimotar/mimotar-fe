import { IoSearchOutline } from "react-icons/io5";
import React, { forwardRef, InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { LiaFlagUsaSolid } from "react-icons/lia";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  wrapperClassName?: string;
  isShowLabel?: boolean;
  labelName?: string;
  error?: string;
}

interface InputAndCountryFlagProps
  extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  wrapperClassName?: string;
  isShowLabel?: boolean;
  labelName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { className, wrapperClassName, isShowLabel, labelName, error, ...props },
    ref
  ) => {
    return (
      <span className={`flex flex-col ${wrapperClassName}`}>
        {isShowLabel && <label htmlFor={props.id}>{labelName}</label>}
        <div className="relative">
          <input
            ref={ref} // <-- this is the fix
            {...props}
            className={twMerge(
              `rounded-md h-11 w-full px-3 active:border active:border-[#86198F] focus:border-[#86198F]  outline-none border-2 border-gray-400 ${
                props.type === "search" && "placeholder:pl-4"
              }  peer`,
              className
            )}
          />
          {props.type === "search" && (
            <IoSearchOutline className="absolute left-2 top-3 text-xl text-gray-400 peer-focus:hidden" />
          )}
          {error && <small className="text-sm text-red-300">{error}</small>}
        </div>
      </span>
    );
  }
);

Input.displayName = "Input";
export default Input;

const InputAndCountryFlag = forwardRef<HTMLInputElement, InputProps>(
  (
    { className, wrapperClassName, isShowLabel, labelName, error, ...props },
    ref
  ) => {
    return (
      <span className={`flex flex-col ${wrapperClassName}`}>
        {isShowLabel && <label htmlFor="">{labelName}</label>}
        <div className="relative flex">
          <div className="inline-flex items-center px-1 border-2 border-gray-400 rounded-l-md border-r-0">
            <LiaFlagUsaSolid className="text-xl" />

            <select name="" id="" className="outline-none">
              <option value="">NGN</option>
              <option value="">USA</option>
              <option value="">UK</option>
            </select>
          </div>
          <input
            {...props}
            ref={ref} // <-- this is the fix
            className={twMerge(
              `rounded-r-md h-11 w-full px-3 active:border active:border-[#86198F] focus:border-[#86198F]  outline-none border-2 border-gray-400 ${
                props.type === "search" && "placeholder:pl-4"
              }  peer`,
              className
            )}
          />
          {props.type === "search" && (
            <IoSearchOutline className="absolute left-2 top-3 text-xl text-gray-400 peer-focus:hidden" />
          )}
        </div>
        {error && <small className="text-sm text-red-300">{error}</small>}
      </span>
    );
  }
);

InputAndCountryFlag.displayName = "InputAndCountryFlag";

export { InputAndCountryFlag };
