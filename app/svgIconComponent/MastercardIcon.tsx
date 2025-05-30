import { HtmlHTMLAttributes } from "react";

interface MasterCardIconProps extends HtmlHTMLAttributes<HTMLOrSVGElement> {
  className: string;
}
const MasterCardIcon = ({ className, ...props }: MasterCardIconProps) => (
  <svg
    className={className}
    viewBox="0 0 30 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.9053 16.4392C13.3266 17.7699 11.2787 18.5732 9.04092 18.5732C4.04776 18.5732 0 14.5736 0 9.63988C0 4.70613 4.04776 0.706543 9.04092 0.706543C11.2787 0.706543 13.3266 1.50987 14.9053 2.8406C16.484 1.50987 18.5319 0.706543 20.7697 0.706543C25.7628 0.706543 29.8106 4.70613 29.8106 9.63988C29.8106 14.5736 25.7628 18.5732 20.7697 18.5732C18.5319 18.5732 16.484 17.7699 14.9053 16.4392Z"
      fill="#ED0006"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.9053 16.4392C16.8492 14.8006 18.0818 12.3625 18.0818 9.63988C18.0818 6.91727 16.8492 4.47913 14.9053 2.8406C16.484 1.50987 18.5319 0.706543 20.7697 0.706543C25.7628 0.706543 29.8106 4.70613 29.8106 9.63988C29.8106 14.5736 25.7628 18.5732 20.7697 18.5732C18.5319 18.5732 16.484 17.7699 14.9053 16.4392Z"
      fill="#F9A000"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.9053 16.4391C16.8492 14.8005 18.0818 12.3624 18.0818 9.63983C18.0818 6.91724 16.8492 4.47911 14.9053 2.84058C12.9614 4.47911 11.7288 6.91724 11.7288 9.63983C11.7288 12.3624 12.9614 14.8005 14.9053 16.4391Z"
      fill="#FF5E00"
    />
  </svg>
);
export default MasterCardIcon;
