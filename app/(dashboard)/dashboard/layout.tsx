import LeftPanel from "../commons/leftpanel";
// import DashboardNavBar from "./DashboardNavBar";
import Link from "next/link";
import LogoIcon from "@/app/svgIconComponent/Logo";
import DashboardNavbar from "../commons/DashboardNavbar";
// import MobileLeftPanel from "./MobileLeftPanel";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex h-screen 3xl:w-[80%] 3xl:mx-auto w-full bg-[#f1f5f9]">
      <div className="hidden md:flex flex-col h-full lg:w-[280px] w-[200px] bg-[#FFFFFF] border-r overflow-y-auto">
        <div className="w-full h-[100px] flex flex-col  justify-center p-3  sticky top-0">
          <Link href={"/"}>
            <LogoIcon className="text-sm md:w-auto md:h-auto w-28" />
          </Link>
        </div>
        <h1 className="text-sm text-neutral-400 p-5 font-semibold">MENU</h1>
        <LeftPanel />
      </div>
      <div className="flex flex-col h-full w-full overflow-y-auto relative ">
        {/* <MobileLeftPanel
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        /> */}
        <DashboardNavbar />
        <div className=".sm:p-4 p-2 overflow-y-auto h-full w-full">
          {children}
        </div>
      </div>
    </section>
  );
}
