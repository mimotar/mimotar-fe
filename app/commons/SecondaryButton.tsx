import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface SecondaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function SecondaryButton({
  className,
  children,
  ...props
}: SecondaryButtonProps) {
  return (
    <button
      {...props}
      className={twMerge(
        "text-[#A21CAF] border-2 border-[#A21CAF] rounded-lg hover:bg-[#D946EF] hover:text-[#F8FAFC] hover:border-none active:bg-transparent active:border-[#A21CAF] active:text-[#A21CAF] active:font-bold focus:border-[#FACC15] focus:bg-transparent focus:text-[#A21CAF] focus:font-bold",
        className
      )}
    >
      {children}
    </button>
  );
}
