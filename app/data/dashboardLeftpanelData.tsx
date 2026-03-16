import DiceIcon from "../svgIconComponent/DiceIcon";
import { MdDashboard } from "react-icons/md";
import HelpOutlineIcon from "../svgIconComponent/Help_outlineIcon";
import TransactionIcon from "../svgIconComponent/TransactionIcon";
import { IoSettingsSharp } from "react-icons/io5";

export const dashboardLeftPanelData = [
  {
    label: "Overview",
    icon: <MdDashboard className="size-4" />,
    link: "/dashboard",
  },
  {
    label: "Transactions",
    icon: <TransactionIcon className="size-4" />,
    link: "/dashboard/transactions",
  },
  {
    label: "Help",
    icon: <HelpOutlineIcon className="size-5" />,
    link: "/dashboard/help",
  },
  {
    label: "Settings",
    icon: <IoSettingsSharp className="size-4" />,
    link: "/dashboard/settings",
  },
];
