import { IoSearchOutline } from "react-icons/io5";
import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export default function Input({ ...props }) {
  return (
    <span className="relative">
      <input
        {...props}
        className={`rounded-md p-3 active:border active:border-[#86198F] focus:border-[#86198F]  outline-none border-2 border-gray-400 placeholder:pl-4 peer`}
      />
      <IoSearchOutline className="absolute left-2 top-4 text-xl text-gray-400 peer-focus:hidden" />
    </span>
  );
}
