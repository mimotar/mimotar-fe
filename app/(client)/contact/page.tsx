import Footer from "../component/Footer";
import PhoneIcon from "../../assets/icons/phone.svg";
import MapIcon from "../../assets/icons/map.svg";
import EmailIcon from "../../assets/icons/mail.svg";
import ContactUsForm from "./components/ContactUsForm";

function page() {
  return (
    <>
      <div className="min-h-screen xl:px-20 sm:px-10 p-4 ">
        <div className="grid grid-cols-1 lg:grid-cols-3 w-full gap-8 justify-between my-4 lg:my-8">
          {/* <div className="grid gap-4 lg:gap-8 w-full bg-red-400">
            <div className="flex flex-col gap-2 w-full">
              <h1 className=" font-bold text-[#0F172A] text-4xl">
                {" "}
                Contact Us
              </h1>
              <p className="text-bold text-[#0F172A] text-lg">
                Have questions or need assistance?
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Input labelName="Name" isShowLabel placeholder="Name" />
            </div>
            <div className="flex flex-col gap-2">
              <Input labelName="Email" isShowLabel placeholder="Email" />
            </div>
            <div className="flex flex-col gap-2">
              <TextAreaInput
                labelName="Message"
                isShowLabel
                id={""}
                className="border border-neutral-400"
              />
            </div>
            <div className=" grid grid-cols-2  w-full">
              <div className="w-full"></div>

              <PrimaryButton title="" className="w-full cursor-pointer">
                Send message
              </PrimaryButton>
            </div>
          </div> */}

          <ContactUsForm />
          <div className="flex flex-col md:mt-28 mt-10 gap-10">
            <div className="flex flex-col items-center justify-center gap-2">
              <PhoneIcon />
              <p className=" font-normal text-center"> Tel +2349126736456 </p>
              <p className=" font-normal text-center"> Sales +2349126736456 </p>
              <p className=" font-normal text-center">
                {" "}
                Support +2349126736456{" "}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <MapIcon />
              <p className=" text-center">
                {" "}
                8, Allen Avenue, Ikeja, Lagos, Nigeria
              </p>
            </div>
          </div>
          <div className="grid md:mt-28 mt-10">
            <div className="flex flex-col items-center gap-2">
              <EmailIcon />
              <p className=" font-normal  text-center">
                {" "}
                Enquires: www.mimotarenquires.com{" "}
              </p>
              <p className=" font-normal text-center">
                {" "}
                Sales: www.mimotarsales.com{" "}
              </p>
              <p className=" font-normal text-center">
                {" "}
                Support: www.mimotarsupport.com{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-auto">
        <Footer />
      </div>
    </>
  );
}

export default page;
