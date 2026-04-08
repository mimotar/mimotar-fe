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
          <ContactUsForm />
          <div className="flex flex-col md:mt-28 mt-10 gap-10">
            <div className="flex flex-col items-center justify-center gap-2">
              <PhoneIcon />
              <p className=" font-normal text-center">
                Tel +234 803 246 5303, +234 813 019 730{" "}
              </p>
              <p className=" font-normal text-center">
                Sales +234 803 246 5303, +234 813 019 730{" "}
              </p>
              <p className=" font-normal text-center">
                Support +234 803 246 5303, +234 813 019 730
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
