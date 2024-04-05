import React, { ButtonHTMLAttributes, HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}
export default function PrimaryButton({
  className,
  text,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={twMerge(
        "w-[270px] h-[64px] text-[#F8FAFC] hover:text-[#F8FAFC]  bg-[#A21CAF] rounded-lg hover:bg-[#D946EF] active:bg-[#A21CAF] active:font-bold focus:bg-[#A21CAF] focus:font-bold",
        className
      )}
    >
      {text}
    </button>
  );
}
