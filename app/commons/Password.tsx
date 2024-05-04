import React, { useState } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";
import { ReactNode } from "react";
import Label from "./Label";
import InputError from "./InputError";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";


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

export const Password: React.FC<TextInputProps> = ({
  type,
  name,
  label,
  register,
  error,
  placeholder,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col space-y-1 w-full my-2">
      <Label value={label} />
      <div  className="relative">
        <input
          type={showPassword ? "text" : type}
          placeholder={placeholder}
          className={`w-full h-10 bg-inherit border text-sm xl:text-base border-neutral-400  focus:border-primary-700 focus:ring-primary-300 rounded-lg outline-none shadow-sm px-2 `}
          {...register(name)}
        />
        {type === "password" && (
            <div className="cursor-pointer absolute right-2 top-3" onClick={togglePasswordVisibility}>
                {showPassword ?<IoEyeOffOutline />:<IoEyeOutline />    }
            </div>
        //   <FontAwesomeIcon
        //     icon={showPassword ? faEyeSlash : faEye}
        //     style={{
        //       position: "absolute",
        //       right: "10px",
        //       top: "50%",
        //       transform: "translateY(-50%)",
        //       cursor: "pointer",
        //     }}
        //     onClick={togglePasswordVisibility}
        //   />
        )}
      </div>
      {error && <InputError message={error.message} />}
    </div>
  );
};

export default Password


