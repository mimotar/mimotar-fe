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
        "text-[#F8FAFC] hover:text-[#F8FAFC] py-4 px-7 bg-[#A21CAF] rounded-lg hover:bg-[#D946EF] active:bg-[#A21CAF] focus:bg-[#A21CAF]",
        className
      )}
    >
      {text}
    </button>
  );
}
