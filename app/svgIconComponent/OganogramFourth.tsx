import { SVGAttributes } from "react";

interface OrganogramFourthProps extends SVGAttributes<SVGElement> {
  className?: string;
}
const OrganogramFourth = ({ className, ...props }: OrganogramFourthProps) => (
  <svg
    width={416}
    height={337}
    className={className}
    viewBox="0 0 416 337"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M343.475 336.77C343.475 336.77 112.497 325.773 83.2852 301.338C54.0731 276.902 47.5265 286.537 23.5954 204.519C-0.335659 122.501 0.33689 0.81129 0.33689 0.81129L82.8711 71.3066L162.416 11.0825C162.416 11.0825 165.546 140.679 196.335 161.003C208.914 169.306 223.16 183.418 255.783 182.515C288.406 181.612 298.831 182.593 298.831 182.593L351.374 182.688L415.375 259.433L343.475 336.77Z"
      fill="#D9D9D9"
    />
  </svg>
);
export default OrganogramFourth;
