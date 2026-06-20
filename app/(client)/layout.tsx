// import "../globals.css";

import { ScrollArea } from "@/components/ui/scroll-area";
import { ScrollAreaScrollbar } from "@radix-ui/react-scroll-area";
import HomeNavbar from "./component/HomeNavbar";
import { SiteHeader } from "./component/site-header";
import { Navbar } from "./commons/client/Navbar";
import Footer from "./commons/client/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <main className="h-screen w-screen overflow-auto">
    <main
      className={`flex flex-col bg-gray-50/50 font-sans text-gray-800 min-h-screen`}
    >
      {/* <div className="py-7 h-[100px] flex items-center "> */}
      {/* <div className=" w-[90%] mx-auto">
          <HomeNavbar />
        </div> */}
      {/* <SiteHeader /> */}
      <Navbar />
      {/* </div> */}
      {/* <ScrollArea data-state="hidden" className=""> */}
      <div className="flex-1">
        {children}

        <Footer />
      </div>
      {/* h-[calc(100vh-100px)] */}
      {/* <section className=" ">{children}</section>
        <ScrollAreaScrollbar hidden={false} /> */}
      {/* </ScrollArea> */}
    </main>
  );
}
