import * as React from "react";

interface DiceIconProps extends React.HTMLAttributes<HTMLOrSVGElement> {
  className?: string;
}
const DiceIcon = ({ className, ...props }: DiceIconProps) => (
  <svg
    {...props}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M0 10H8V0H0V10ZM0 18H8V12H0V18ZM10 18H18V8H10V18ZM10 0V6H18V0H10Z"
      fill="#A21CAF"
    />
  </svg>
);
export default DiceIcon;
