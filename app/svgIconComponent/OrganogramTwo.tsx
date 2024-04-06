import { SVGAttributes } from "react";

interface OrganogramTwoProps extends SVGAttributes<SVGElement> {
  className?: string;
}
const OrganogramTwo = ({ className, ...props }: OrganogramTwoProps) => (
  <svg
    width={366}
    height={155}
    viewBox="0 0 366 155"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    className={className}
  >
    <path
      d="M62.1092 0H366L298.258 78.7302L366 155H62.1092L0 78.7302L62.1092 0Z"
      fill="#D9D9D9"
    />
  </svg>
);
export default OrganogramTwo;
