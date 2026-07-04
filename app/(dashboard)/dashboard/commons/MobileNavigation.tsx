"use client";
import { FolderKanban, LayoutDashboard, UserIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const MobileNavigation: React.FC = () => {
  const activePage = usePathname();

  const items = [
    { page: "dashboard", name: "Dashboard", icon: LayoutDashboard },
    { page: "projects", name: "Projects", icon: FolderKanban },
    { page: "wallet", name: "Wallet", icon: UserIcon },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-100 flex items-center justify-around px-2 z-40 lg:hidden shadow-lg">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activePage === item.page;
        return (
          <Link
            href={item.page}
            key={item.page}
            className={`flex flex-col items-center justify-center py-2 h-full w-16 transition-all relative ${
              isActive
                ? "text-brand-primary"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <Icon className="w-[19px] h-[19px] mb-1" />
            <span className="text-[9px] font-bold tracking-tight">
              {item.name}
            </span>
            {isActive && (
              <span className="absolute top-0 w-8 h-1 bg-brand-primary rounded-b-md" />
            )}
          </Link>
        );
      })}
    </nav>
  );
};
