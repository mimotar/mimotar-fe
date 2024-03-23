import Link from "next/link";
import LogoIcon from "../svgIconComponent/Logo";
import Button from "./PrimaryButtons";
import PrimaryButton from "./PrimaryButtons";

export default function HomeNavbar() {
  return (
    <section className="flex justify-between items-center ">
      <LogoIcon className="" />
      <span className="flex gap-10">
        <Link className="text-[#0F172A]" href={""}>
          Escrow
        </Link>
        <Link className="text-[#0F172A]" href={""}>
          Escrow
        </Link>
        <Link className="text-[#0F172A]" href={""}>
          Escrow
        </Link>
        <Link className="text-[#0F172A]" href={""}>
          Escrow
        </Link>
      </span>

      <div className="flex gap-10">
        {/* <button className="py-4 px-7 border rounded-md">Login</button> */}
        <PrimaryButton type="button" text="Login" />
        <PrimaryButton type="button" text="Register" className="bg-none" />
        {/* <button>Register</button> */}
      </div>
    </section>
  );
}
