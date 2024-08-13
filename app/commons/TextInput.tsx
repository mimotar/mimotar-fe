import { FieldError, UseFormRegister } from "react-hook-form";

import { ReactNode } from "react";
import Label from "./Label";
import InputError from "./InputError";

interface TextInputProps {
  type?: string;
  name: string;
  label?: string;
  register: UseFormRegister<any>; 
  error?: FieldError | undefined;
  children?: ReactNode;
  className?: string;
  placeholder?: string;
  row?: number;
}

export const TextInput: React.FC<TextInputProps> = ({
  type,
  name,
  label,
  register,
  error,
  placeholder,
}) => {
  return (
    <div className="flex flex-col space-y-1 w-full">
      <Label value={label} />
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full h-9 bg-inherit border border-neutral-400  focus:border-primary-700 focus:ring-primary-300 rounded-lg outline-none shadow-sm px-2  text-sm xl:text-base`}
        {...register(name)}
      />
      {error && <InputError message={error.message} />}
    </div>
  );
};



