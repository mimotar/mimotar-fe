import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface SecondaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
        "text-brand-primary border-2 border-brand-primary rounded-lg hover:bg-brand-primary/90 hover:text-[#F8FAFC] hover:border-none text-xl",
        className,
      )}
    >
      {children}
    </button>
  );
}
