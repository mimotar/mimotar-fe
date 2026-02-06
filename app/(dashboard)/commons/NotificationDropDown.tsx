"use client";

import PrimaryButton from "@/app/commons/PrimaryButtons";
import NotifyBellIcon from "@/app/svgIconComponent/NotifyBellIcon";
import { useRouter } from "next/navigation";
import { ReactNode, SetStateAction } from "react";
import { IoIosClose } from "react-icons/io";

interface NotificationDropDownProps {
  isActive: boolean;
  className?: string;
  closeDropdown: () => void;
  children?: ReactNode;
  dataLength: number;
}
export default function NotificationDropDown({
  isActive,
  className,
  closeDropdown,
  children,
  dataLength,
}: NotificationDropDownProps) {
  const navigate = useRouter();
  return (
    <section
      className={`${
        isActive ? "flex" : "hidden"
      } flex-col w-[400px] h-[450px] overflow-y-auto rounded-md transition-all duration-1000 ${className} bg-white  shadow-md p-3`}
    >
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-semibold ">Notifications</h1>
        <IoIosClose
          className="text-3xl text-[#64748B] hover:bg-gray-200 p-0.5 rounded-full"
          onClick={() => closeDropdown}
        />
      </div>
      <div className="flex flex-col space-y-4">
        {dataLength < 1 && (
          <div className="flex flex-col justify-center items-center space-y-4">
            <NotifyBellIcon className="w-[152px] h-[152px]" />
            <p>No notifications yet</p>
            <PrimaryButton onClick={() => navigate.push("/dashboard")}>
              Return to Dashboard
            </PrimaryButton>
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
