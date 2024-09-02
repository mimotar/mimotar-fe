import { ReactNode } from "react";

interface Props {
  value: string | undefined;
  className?: string;
  children?: ReactNode;
  required?: boolean;
}

const Label: React.FC<Props> = ({
  value,
  className,
  children,
  required = false,
  ...props
}) => {
  return (
    <label {...props} className={`block text-xs xl:text-sm font-bold ${className}`}>
      {value ? value : children}{" "}
      {required && <span className=" text-rose-500 text-xs xl:text-lg">*</span>}
    </label>
  );
};

export default Label;
