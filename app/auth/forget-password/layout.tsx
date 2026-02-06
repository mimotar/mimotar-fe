// import "../../../app/globals.css";
import LogoIcon from "@/app/svgIconComponent/Logo";
import Link from "next/link";
import MobileHamburger from "./components/MobileHamburger";

export default function ForgetPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col min-h-screen w-full">
      <div className="sm:px-10 px-4 w-full flex justify-between py-4 sticky top-0 border-b mb-12">
        <LogoIcon className="w-36 h-8" />
        <MobileHamburger />
      </div>

      {children}

      <section className="flex sticky bottom-0 sm:px-10 px-5 justify-between items-center text-neutral-50 text-sm bg-[#0F172A] sm:h-20 h-10 w-full mt-auto p-6">
        <span>&copy; {new Date().getFullYear()} Mimotar.</span>
        <Link href="" className="">
          Contact us
        </Link>
      </section>
    </section>
  );
}
