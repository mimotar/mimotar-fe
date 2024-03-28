import { Images } from "../Images";
import FacebookIcon from "../svgIconComponent/FacebookIcon";
import LogoIcon from "../svgIconComponent/Logo";
import WhiteLogoIcon from "../svgIconComponent/whiteLogoIcon";

export default function Footer() {
  return (
    <section className="bg-[#334155] w-full py-5 ">
      <div className="w-[80%] mx-auto grid grid-cols-4 gap-20">
        <div className="flex flex-col ">
          <WhiteLogoIcon className=" w-[300px] h-[67px]" />
          <div className="flex items-center">
            <FacebookIcon className="" />
          </div>
        </div>
      </div>
    </section>
  );
}
