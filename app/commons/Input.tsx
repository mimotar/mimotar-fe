import { IoSearchOutline } from "react-icons/io5";
import React, { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  wrapperClassName?: string;
}

export default function Input({
  className,
  wrapperClassName,
  ...props
}: InputProps) {
  return (
    <span className={`relative ${wrapperClassName}`}>
      <input
        {...props}
        className={twMerge(
          `rounded-md h-11 px-3 active:border active:border-[#86198F] focus:border-[#86198F]  outline-none border-2 border-gray-400 placeholder:pl-4 peer`,
          className
        )}
      />
      <IoSearchOutline className="absolute left-2 top-3 text-xl text-gray-400 peer-focus:hidden" />
    </span>
  );
}
