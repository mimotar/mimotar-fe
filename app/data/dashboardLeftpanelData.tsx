import DiceIcon from "../svgIconComponent/DiceIcon";
import HelpOutlineIcon from "../svgIconComponent/Help_outlineIcon";
import TransactionIcon from "../svgIconComponent/TransactionIcon";
import { IoSettingsSharp } from "react-icons/io5";

export const dashboardLeftPanelData = [
  {
    label: "Overview",
    icon: <DiceIcon className="size-4" />,
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
