"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoMdClose } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navLinks = [
    { name: "Register", href: "register" },
    { name: "Login", href: "login" },
  ];
  const pathname = usePathname();
  return (
    <main className="w-screen h-screen bg-[#A21CAF]  flex flex-row items-center justify-center">
      <div className="w-[90%] md:w-[50%] xl:w-[35%] h-[80%] bg-white rounded-xl py-2 xl:py-4">
        <nav className="w-full flex flex-row items-center justify-between px-4">
          <div className="w-full flex flex-row items-center justify-center">
            <div className="border-b">
              <div className="flex flex-row gap-x-4 ">
                {navLinks.map((link) => {
                  const isActive = pathname.endsWith(link.href);
                  console.log(link);
                  return (
                    <div className="">
                      <Link
                        href={link.href}
                        key={link.name}
                        className={`xl:text-base text-sm ${
                          isActive
                            ? " text-primary-800 font-bold border-primary-800 border-b-2 "
                            : " text-neutral-700 "
                        }`}
                      >
                        {link.name}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <Link href={"/"}>
            {/* <IoCloseOutline  /> */}
            <IoMdClose className="h-6 w-6" />
          </Link>
        </nav>
        <div className=" h-full flex flex-col items-center justify-center my-4 w-full ">{children}</div>
      </div>
    </main>
  );
}
