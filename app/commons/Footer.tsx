import Link from "next/link";
import { Images } from "../Images";
import FacebookIcon from "../svgIconComponent/FacebookIcon";
import LogoIcon from "../svgIconComponent/Logo";
import WhiteLogoIcon from "../svgIconComponent/whiteLogoIcon";

export default function Footer() {
  return (
    <section className="bg-[#334155] flex flex-col w-full pt-5 ">
      <div className="w-[80%] mx-auto grid grid-cols-4 gap-20">
        <div className="flex flex-col ">
          {/* <WhiteLogoIcon className=" w-[300px] h-[67px]" /> */}
          <img src={Images.logo} alt="" height={67} width={300} />
          <div className="flex items-center gap-8 mt-12">
            <img src={Images.facebookLogo} alt="" className="w-6 h-6" />

            <img src={Images.instagramLogo} alt="" className="w-6 h-6" />
            <img src={Images.twitterLogo} alt="" className="w-6 h-6" />
          </div>
        </div>

        <div className="flex flex-col ">
          <h2 className="text-3xl font-bold text-white mb-8">Services</h2>
          <ul className="space-y-6 text-white text-xl font-medium">
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
          <h2 className="text-3xl font-bold text-white mb-8">About Us</h2>
          <ul className="space-y-6 text-white text-xl font-medium">
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
          <h2 className="text-3xl font-bold text-white mb-8">Help</h2>
          <ul className="space-y-6 text-white text-xl font-medium">
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
      <div className="flex justify-center gap-12 text-white items-center py-10 mt-14 border-t-2">
        <div>&#169; {new Date().getFullYear()}, Mimotar</div>
        <Link href={""} className="hover:text-slate-300">
          Terms and Conditions
        </Link>
        <Link href={""} className="hover:text-slate-300">
          Privacy Policy
        </Link>
      </div>
    </section>
  );
}
