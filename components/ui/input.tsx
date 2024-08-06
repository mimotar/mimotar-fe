import * as React from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A21CAF]  focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
const PasswordInput = ({ field }: { field: any }) => {
  const [show, setShow] = React.useState(false);
  return (
    <div className="w-full flex relative">
      <Input
        className="focus-visible:outline-none focus-visible:border-0"
        placeholder="Enter password"
        type={show ? "text" : "password"}
        {...field}
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute h-full w-10 flex items-center justify-center right-0"
      >
        {show ? <FaRegEyeSlash /> : <FaRegEye />}
      </button>
    </div>
  );
};

export { Input, PasswordInput };
