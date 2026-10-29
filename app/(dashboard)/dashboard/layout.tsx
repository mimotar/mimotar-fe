import LeftPanel from "../commons/leftpanel";
// import DashboardNavBar from "./DashboardNavBar";
import Link from "next/link";
import LogoIcon from "@/app/svgIconComponent/Logo";
import DashboardNavbar from "../commons/DashboardNavbar";
import { Header } from "./commons/Header";
import { Sidebar } from "./commons/Sidebar";
import { MobileNavigation } from "./commons/MobileNavigation";
// import MobileLeftPanel from "./MobileLeftPanel";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      className={`flex flex-col bg-gray-50/50 font-sans text-gray-800 h-screen overflow-hidden`}
    >
      <Header />

      <div className="flex-1 flex overflow-hidden pb-16 lg:pb-0">
        {/* Sidebar is fixed on desktop layout */}
        <Sidebar />

        {/* Main scrollable body column */}
        <section
          id="main-content-scroll"
          className="flex-1 py-6 px-4 md:py-8 md:px-8 max-w-6xl w-full mx-auto overflow-y-auto h-full"
        >
          {/* {activePage === "dashboard" && <Dashboard />} */}

          {children}
        </section>
      </div>

      {/* Mobile navigation row on small devices */}
      <MobileNavigation />
    </main>
  );
}
