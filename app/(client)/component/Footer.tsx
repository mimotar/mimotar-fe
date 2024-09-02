import Link from "next/link";
import { Images } from "../../Images";
import FacebookIcon from "@/app/svgIconComponent/FacebookIcon";
import LogoIcon from "@/app/svgIconComponent/Logo";
import WhiteLogoIcon from "@/app/svgIconComponent/whiteLogoIcon";
import Image from "next/image";

export default function Footer() {
  return (
    <section className="bg-[#334155] flex flex-col w-full pt-5">
      <div className="w-[90%] mx-auto grid md:grid-cols-4 sm:grid-cols-2 grid-cols-2 gap-20">
        <div className="flex flex-col ">
          {/* <WhiteLogoIcon className=" w-[300px] h-[67px]" /> */}
          <Image
            src={Images.logo}
            alt=""
            height={67}
            width={300}
            className="sm:w-auto sm:h-auto h-8 w-36"
          />
          <div className="flex items-center gap-8 mt-12">
            <Image
              src={Images.facebookLogo}
              alt=""
              width={24}
              height={24}
              className="w-6 h-6"
            />

            <Image
              src={Images.instagramLogo}
              alt=""
              width={24}
              height={24}
              className="w-6 h-6"
            />
            <Image
              src={Images.twitterLogo}
              alt=""
              width={24}
              height={24}
              className="w-6 h-6"
            />
          </div>
        </div>

        <div className="flex flex-col ">
          <h2 className="lg:text-3xl sm:text-2xl text-xl  font-bold text-white mb-8">
            Services
          </h2>
          <ul className="space-y-6 text-white lg:text-xl text-base font-medium">
            <li>
              <Link href={""} className="hover:text-slate-300">
                Escrow
              </Link>
            </li>
            <li>
              <Link href={""} className="hover:text-slate-300">
                Buy
              </Link>
            </li>
            <li>
              <Link href={""} className="hover:text-slate-300">
                Sell
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col ">
          <h2 className="lg:text-3xl sm:text-2xl text-xl  font-bold text-white mb-8">
            About Us
          </h2>
          <ul className="space-y-6 text-white lg:text-xl text-base font-medium">
            <li>
              <Link href={""} className="hover:text-slate-300">
                Company
              </Link>
            </li>
            <li>
              <Link href={""} className="hover:text-slate-300">
                Leadership
              </Link>
            </li>
            <li>
              <Link href={""} className="hover:text-slate-300">
                Career
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col ">
          <h2 className="sm:text-2xl text-xl font-bold text-white mb-8">
            Help
          </h2>
          <ul className="space-y-6 text-white lg:text-xl text-base font-medium">
            <li>
              <Link href={""} className="hover:text-slate-300">
                Contact us
              </Link>
            </li>
            <li>
              <Link href={""} className="hover:text-slate-300">
                FAQs
              </Link>
            </li>
            <li>
              <Link href={""} className="hover:text-slate-300">
                Blog
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex sm:justify-center sm:text-base text-sm gap-12 text-white items-center sm:py-10 py-4 px-4  mt-14 border-t-2">
        <div className="sm:block hidden">
          &#169; {new Date().getFullYear()}, Mimotar
        </div>
        <Link href={""} className="hover:text-slate-300">
          Terms and Conditions
        </Link>
        <Link href={""} className="hover:text-slate-300">
          Privacy Policy
        </Link>
      </div>
      <div className="sm:hidden block text-white ml-4 sm:text-base text-sm">
        &#169; {new Date().getFullYear()}, Mimotar
      </div>
    </section>
  );
}
