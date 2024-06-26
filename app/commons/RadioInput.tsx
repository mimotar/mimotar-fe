import { IoSearchOutline } from "react-icons/io5";
import React, { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface RadioInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  labelName?: string;
}

export default function RadioInput({
  className,

  labelName,
  ...props
}: RadioInputProps) {
  return (
    <span className={`flex flex-col w-full`}>
      <div className="flex gap-2 items-center">
        <input
          {...props}
          className={twMerge(
            `rounded-md accent-[#86198F] active:border active:accent-[#86198F] focus:accent-[#86198F]`,
            className
          )}
        />
        <label htmlFor={props.id}>{labelName}</label>
      </div>
    </span>
  );
}
