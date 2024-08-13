import React, { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}
export default function PrimaryButton({
  className,
  children,
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
      {children}
    </button>
  );
}

interface PrimaryOutlineProps{
  children:React.ReactNode
} 

export const PrimaryOutline:React.FC<PrimaryOutlineProps> = ({
  children
}) => (
  <button className="w-full border-primary-700  border rounded-lg justify-center h-10 flex flex-row gap-x-2 items-center hover:bg-primary-500">
    {/* <img src="../../../assets/png/image 49.png" className="h-4 w-4" alt="" /> */}
    {children}
  </button>
);
