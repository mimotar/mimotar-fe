// import "../globals.css";

import { ScrollArea } from "@/components/ui/scroll-area";
import { ScrollAreaScrollbar } from "@radix-ui/react-scroll-area";
import HomeNavbar from "./component/HomeNavbar";
import { SiteHeader } from "./component/site-header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-screen w-screen overflow-auto">
      {/* <div className="py-7 h-[100px] flex items-center "> */}
      {/* <div className=" w-[90%] mx-auto">
          <HomeNavbar />
        </div> */}
      <SiteHeader />
      {/* </div> */}
      <ScrollArea data-state="hidden" className="">
        <section className=" h-[calc(100vh-100px)] ">{children}</section>
        <ScrollAreaScrollbar hidden={false} />
      </ScrollArea>
    </main>
  );
}
