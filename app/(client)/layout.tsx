import "../globals.css";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ScrollAreaScrollbar } from "@radix-ui/react-scroll-area";
import HomeNavbar from "./component/HomeNavbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-screen w-screen overflow-auto">
      <div className="py-7 h-[100px] flex items-center ">
        {/* min-[1440px]:w-[80%] */}
        <div className=" w-[90%] mx-auto">
          <HomeNavbar />
        </div>
      </div>
      <ScrollArea data-state="hidden" className="">
        <section className=" h-[calc(100vh-100px)] ">{children}</section>
        <ScrollAreaScrollbar hidden={false} />
      </ScrollArea>
    </main>
  );
}
