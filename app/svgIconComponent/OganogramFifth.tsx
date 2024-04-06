import { SVGAttributes } from "react";

interface OrganogramFifthProps extends SVGAttributes<SVGElement> {
  className?: string;
}
const OrganogramFifth = ({ className, ...props }: OrganogramFifthProps) => (
  <svg
    width={373}
    height={160}
    className={className}
    viewBox="0 0 373 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M304.656 159.201L0.833823 155.242L69.646 77.309L2.97045 0.0743232L306.792 4.03338L372.835 81.2598L304.656 159.201Z"
      fill="#D9D9D9"
    />
  </svg>
);
export default OrganogramFifth;
