import { MdDashboard } from "react-icons/md";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { IoSettingsSharp } from "react-icons/io5";
import { TbArrowsDoubleNwSe } from "react-icons/tb";

export const dashboardLeftPanelData = [
  {
    label: "Overview",
    icon: <MdDashboard className="size-4" />,
    link: "/dashboard",
  },
  {
    label: "Transactions",
    icon: <TbArrowsDoubleNwSe className="size-4 -rotate-45" />,
    link: "/dashboard/transactions",
  },
  {
    label: "Help",
    icon: <IoMdHelpCircleOutline className="size-5" />,
    link: "/dashboard/help",
  },
  {
    label: "Settings",
    icon: <IoSettingsSharp className="size-4" />,
    link: "/dashboard/settings",
  },
];
