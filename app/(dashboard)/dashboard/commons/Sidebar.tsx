"use client";

import {
  FolderKanban,
  LayoutDashboard,
  Settings,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Sidebar = () => {
  //   const { activePage, setActivePage, setSelectedProjectId, wallet } =
  //     useAppState();
  const activePage = usePathname();

  const menuItems = [
    { page: "dashboard", name: "Dashboard", icon: LayoutDashboard },
    { page: "projects", name: "Projects", icon: FolderKanban },
    { page: "settings", name: "Settings", icon: Settings },
  ];

  const formatMoney = (val: number) => {
    return `₦${val.toLocaleString()}`;
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col justify-between hidden lg:flex h-full pt-8 pb-6 px-4 shrink-0">
      <div className="flex flex-col gap-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.page;
          //    || (item.id === 'projects' && activePage === 'project-workspace');
          return (
            <Link
              href={item.page}
              key={item.page}
              //   onClick={() => navigateTo(item.id)}
              className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all group ${
                isActive
                  ? "bg-magenta-50 text-brand-primary"
                  : "text-gray-500 hover:bg-gray-55/40 hover:text-brand-primary"
              }`}
            >
              <Icon
                className={`w-[20px] h-[20px] transition-transform group-hover:scale-110 ${isActive ? "text-brand-primary" : "text-gray-400 group-hover:text-brand-primary"}`}
              />
              {item.name}
            </Link>
          );
        })}
      </div>

      <div className="mt-auto space-y-4">
        {/* Sleek Design Wallet Balance Footer */}
        <div className="p-4 bg-gray-50/80 rounded-2xl border border-gray-100">
          <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-2">
            Wallet Balances
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-500 font-medium">Naira (NGN):</span>
              <span className="font-bold text-gray-900 font-display">
                {formatMoney(450000)}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs border-t border-gray-200/40 pt-1.5">
              <span className="text-gray-500 font-medium">Dollars (USD):</span>
              <span className="font-bold text-brand-primary font-mono">
                ${350}
              </span>
            </div>
          </div>
          <Link
            href={"/wallet"}
            type="button"
            // onClick={() => setActivePage("wallet")}
            className="mt-3.5 w-full py-2 bg-white border border-[#c026d3]/30 text-brand-primary hover:bg-brand-primary hover:text-white rounded-lg text-xs font-bold transition-all cursor-pointer"
          >
            Withdraw Funds
          </Link>
        </div>

        <div className="border-t border-gray-100 pt-4 px-1.5">
          <div className="flex items-center gap-2.5 bg-gradient-to-r from-amber-50/40 to-orange-50/40 p-2.5 rounded-xl border border-amber-100/30">
            <ShieldCheck className="w-4 h-4 text-brand-secondary shrink-0" />
            <div className="text-[10px] text-amber-900 font-semibold leading-relaxed">
              Locked by Mimotar smart protection.
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
