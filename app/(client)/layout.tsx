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
        <div className="min-[1440px]:w-[80%] w-[95%] mx-auto">
          <HomeNavbar />
        </div>
      </div>
      <ScrollArea data-state="hidden" className="w-full">
        <section className=" h-[calc(100vh-100px)] w-full">{children}</section>
        <ScrollAreaScrollbar hidden={false} />
      </ScrollArea>
    </main>
  );
}
