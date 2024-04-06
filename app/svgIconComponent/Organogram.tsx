import { SVGAttributes } from "react";

interface OrganogramProps extends SVGAttributes<SVGElement> {
  className?: string;
}
const Organogram = ({ className, ...props }: OrganogramProps) => (
  <svg
    width={371}
    height={156}
    className={className}
    viewBox="0 0 371 156"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M67.1092 0H371V156H67.1092L0 79.2381L67.1092 0Z"
      fill="#D9D9D9"
      {...props}
    />
  </svg>
);
export default Organogram;
