import { SVGAttributes } from "react";

interface OrganogramThirdProps extends SVGAttributes<SVGElement> {
  className?: string;
}
const OrganogramThird = ({ className, ...props }: OrganogramThirdProps) => (
  <svg
    width={328}
    height={390}
    viewBox="0 0 328 390"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M0 322.9C0 322.9 16.7445 98.6832 41.0493 70.9815C65.3541 43.2798 56.2523 36.6419 135.856 15.7116C215.46 -5.21881 328 0.803487 328 0.803487L261.668 81.3089L328 156.412C328 156.412 184.245 155.642 173.5 189.5C169.02 203.615 159.277 217.633 159.277 243.488C159.277 275.226 159.277 294.582 159.277 294.582V333.365L76.478 390L0 322.9Z"
      fill="#8A8A8A"
    />
  </svg>
);
export default OrganogramThird;
