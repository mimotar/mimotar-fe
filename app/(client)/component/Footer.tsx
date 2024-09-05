import Link from "next/link";
import { Images } from "../../Images";
import FacebookIcon from "@/app/svgIconComponent/FacebookIcon";
import LogoIcon from "@/app/svgIconComponent/Logo";
import WhiteLogoIcon from "@/app/svgIconComponent/whiteLogoIcon";
import Image from "next/image";
import PrimaryButton from "@/app/commons/PrimaryButtons";
import LinkedInIcon from "@/app/svgIconComponent/LinkedInIcon";

export default function Footer() {
  return (
    // <section className="bg-[#334155] flex flex-col w-full pt-5">
    //   <div className="w-[90%] mx-auto grid md:grid-cols-4 sm:grid-cols-2 grid-cols-2 gap-20">
    //     <div className="flex flex-col ">
    //       {/* <WhiteLogoIcon className=" w-[300px] h-[67px]" /> */}
    //       <Image
    //         src={Images.logo}
    //         alt=""
    //         height={67}
    //         width={300}
    //         className="sm:w-auto sm:h-auto h-8 w-36"
    //       />
    //       <div className="flex items-center gap-8 mt-12">
    //         <Image
    //           src={Images.facebookLogo}
    //           alt=""
    //           width={24}
    //           height={24}
    //           className="w-6 h-6"
    //         />

    //         <Image
    //           src={Images.instagramLogo}
    //           alt=""
    //           width={24}
    //           height={24}
    //           className="w-6 h-6"
    //         />
    //         <Image
    //           src={Images.twitterLogo}
    //           alt=""
    //           width={24}
    //           height={24}
    //           className="w-6 h-6"
    //         />
    //       </div>
    //     </div>

    //     <div className="flex flex-col ">
    //       <h2 className="lg:text-3xl sm:text-2xl text-xl  font-bold text-white mb-8">
    //         Services
    //       </h2>
    //       <ul className="space-y-6 text-white lg:text-xl text-base font-medium">
    //         <li>
    //           <Link href={""} className="hover:text-slate-300">
    //             Escrow
    //           </Link>
    //         </li>
    //         <li>
    //           <Link href={""} className="hover:text-slate-300">
    //             Buy
    //           </Link>
    //         </li>
    //         <li>
    //           <Link href={""} className="hover:text-slate-300">
    //             Sell
    //           </Link>
    //         </li>
    //       </ul>
    //     </div>

    //     <div className="flex flex-col ">
    //       <h2 className="lg:text-3xl sm:text-2xl text-xl  font-bold text-white mb-8">
    //         About Us
    //       </h2>
    //       <ul className="space-y-6 text-white lg:text-xl text-base font-medium">
    //         <li>
    //           <Link href={""} className="hover:text-slate-300">
    //             Company
    //           </Link>
    //         </li>
    //         <li>
    //           <Link href={""} className="hover:text-slate-300">
    //             Leadership
    //           </Link>
    //         </li>
    //         <li>
    //           <Link href={""} className="hover:text-slate-300">
    //             Career
    //           </Link>
    //         </li>
    //       </ul>
    //     </div>

    //     <div className="flex flex-col ">
    //       <h2 className="sm:text-2xl text-xl font-bold text-white mb-8">
    //         Help
    //       </h2>
    //       <ul className="space-y-6 text-white lg:text-xl text-base font-medium">
    //         <li>
    //           <Link href={""} className="hover:text-slate-300">
    //             Contact us
    //           </Link>
    //         </li>
    //         <li>
    //           <Link href={""} className="hover:text-slate-300">
    //             FAQs
    //           </Link>
    //         </li>
    //         <li>
    //           <Link href={""} className="hover:text-slate-300">
    //             Blog
    //           </Link>
    //         </li>
    //       </ul>
    //     </div>
    //   </div>
    //   <div className="flex sm:justify-center sm:text-base text-sm gap-12 text-white items-center sm:py-10 py-4 px-4  mt-14 border-t-2">
    //     <div className="sm:block hidden">
    //       &#169; {new Date().getFullYear()}, Mimotar
    //     </div>
    //     <Link href={""} className="hover:text-slate-300">
    //       Terms and Conditions
    //     </Link>
    //     <Link href={""} className="hover:text-slate-300">
    //       Privacy Policy
    //     </Link>
    //   </div>
    //   <div className="sm:hidden block text-white ml-4 sm:text-base text-sm">
    //     &#169; {new Date().getFullYear()}, Mimotar
    //   </div>
    // </section>

    <section className="flex flex-col bg-neutral-900 w-full h-full text-white py-10 xl:px-20 sm:px-10 p-4">
      <div className="flex  lg:flex-row flex-col gap-10 justify-between">
        <div className="flex flex-col space-y-4">
          <Image
            src={Images.logo}
            alt=""
            height={67}
            width={300}
            className=" h-8 w-auto self-start"
          />
          <ul className="min-[500px]:inline-flex hidden gap-4 text-sm">
            <li>
              <Link href={""} className="hover:text-slate-300">
                How it works
              </Link>
            </li>

            <li>
              <Link href={""} className="hover:text-slate-300">
                About us
              </Link>
            </li>

            <li>
              <Link href={""} className="hover:text-slate-300">
                Blog
              </Link>
            </li>
            <li>
              <Link href={""} className="hover:text-slate-300">
                Contact us
              </Link>
            </li>
            <li>
              <Link href={""} className="hover:text-slate-300">
                FAQ
              </Link>
            </li>
            <li>
              <Link href={""} className="hover:text-slate-300">
                Privacy
              </Link>
            </li>
            <li>
              <Link href={""} className="hover:text-slate-300">
                Terms
              </Link>
            </li>
          </ul>

          {/* mobile device */}
          <div className="min-[500px]:hidden grid grid-cols-2">
            <ul className="space-y-3 text-left">
              <li>
                <Link href={""} className="hover:text-slate-300">
                  How it works
                </Link>
              </li>

              <li>
                <Link href={""} className="hover:text-slate-300">
                  About us
                </Link>
              </li>

              <li>
                <Link href={""} className="hover:text-slate-300">
                  Blog
                </Link>
              </li>
              <li>
                <Link href={""} className="hover:text-slate-300">
                  Contact us
                </Link>
              </li>
            </ul>

            <ul className="space-y-3 text-left">
              <li>
                <Link href={""} className="hover:text-slate-300">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href={""} className="hover:text-slate-300">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href={""} className="hover:text-slate-300">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <h3 className="text-sm">Stay up to date</h3>
          <div className="flex min-[500px]:flex-row flex-col gap-4">
            <input
              type="text"
              name=""
              id=""
              placeholder="Enter your email"
              className="p-2 rounded-md"
            />
            <PrimaryButton
              type="button"
              className="min-[500px]:w-fit h-fit p-2 w-full px-6"
            >
              Subscribe
            </PrimaryButton>
          </div>
        </div>
      </div>
      <hr className="my-10" />
      <div className="flex  gap-4 sm:flex-row flex-col justify-between">
        <p className="text-neutral-50 sm:order-1 order-2">
          &#169; {new Date().getFullYear()}, Mimotar
        </p>

        <div className="flex items-center gap-6 sm:order-2 order-1">
          <Image
            src={Images.twitterLogo}
            alt=""
            width={24}
            height={24}
            className="w-6 h-6 cursor-pointer"
          />
          <Image
            src={Images.facebookLogo}
            alt=""
            width={24}
            height={24}
            className="w-6 h-6 cursor-pointer"
          />

          <Image
            src={Images.instagramLogo}
            alt=""
            width={24}
            height={24}
            className="w-6 h-6 cursor-pointer"
          />

          <LinkedInIcon className="w-6 h-6 cursor-pointer" />
        </div>
      </div>
    </section>
  );
}
