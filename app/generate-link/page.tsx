import { useSearchParams } from "next/navigation";
import Stepper from "./components/Stepper";
import StepTwo from "./components/StepTwo";
import StepOne from "./components/StepOne";
import StepThree from "./components/StepThree";
import StepFour from "./components/StepFour";
import StepFive from "./components/StepFive";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { MobileStepper } from "./components/Stepper";

interface StepperDataType {
  showStroke: boolean;
  title: string;
  subtitle: string;
  stage: string | number | string[] | number[] | undefined;
}

export default function page({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | number | string[] | number[] | undefined;
  };
}) {
  const params = searchParams.step ?? 0;
  // console.log(params);
  const stepperData: StepperDataType[] = [
    {
      showStroke: true,
      title: "Step 1",
      subtitle: "Personal Information ",
      stage: params,
    },
    {
      showStroke: true,
      title: "Step 2",
      subtitle: "Transaction Details ",
      stage: params,
    },

    {
      showStroke: true,
      title: "Step 3",
      subtitle: "Terms and Agreement ",
      stage: params,
    },

    {
      showStroke: false,
      title: "Step 4",
      subtitle: "2nd Transactor's Info ",
      stage: params,
    },
  ];

  return (
    <section className="flex flex-col h-full w-full">
      <div className="h-full flex sm:flex-row flex-col justify-between lg:gap-20 md:gap-10 ">
        {/* <div className="w-fit h-full overflow-y-auto"> */}
        <div className="flex flex-row sm:flex-col h-full justify-center items-center bg-[#0F172A] text-white lg:px-14 px-4 py-14 z-0">
          {stepperData.map((stepper, i) => (
            <Stepper
              key={i}
              showStroke={stepper.showStroke}
              title={stepper.title}
              subtitle={stepper.subtitle}
              stage={stepper.stage}
            />
          ))}
          <div className="w-full flex justify-center  items-center">
            {stepperData.map((stepper, i) => (
              <MobileStepper
                key={i}
                showStroke={stepper.showStroke}
                title={stepper.title}
                subtitle={stepper.subtitle}
                stage={stepper.stage}
              />
            ))}
          </div>
        </div>
        {/* </div> */}

        <div className="flex flex-col h-full items-center justify-center w-full p-2 sm:rounded-none rounded-t-2xl -translate-y-4 bg-white ">
          {params == 0 && <StepOne />}
          {params == 2 && <StepTwo />}
          {params == 3 && <StepThree />}
          {params == 4 && <StepFour />}
          {params == 5 && <StepFive />}
        </div>

        <div className="md:flex hidden flex-col h-full  w-[20%] ">
          <div className="flex items-center justify-start gap-2 font-bold text-[#A21CAF]">
            <AiOutlineQuestionCircle /> <h2>Help</h2>
          </div>
        </div>
      </div>
      <div className="bg-[#0F172A] flex flex-col sm:justify-center sm:h-40 h-fit sm:p-0 p-4">
        <div className="sm:w-[70%] w-full flex sm:justify-around text-white">
          <div className="sm:flex hidden justify-center items-center ">
            <span className="inline-flex text-2xl mr-1">&copy;</span>
            {new Date().getFullYear()}, Mimotar
          </div>
          <div className="flex sm:bg-inherit text-sm gap-10">
            <p>Terms and Conditions</p>
            <p>Privacy Policy</p>
          </div>
        </div>

        <div className="sm:hidden flex mt-4 text-white">
          <span className="inline-flex text-2xl mr-1">&copy;</span>
          {new Date().getFullYear()}, Mimotar
        </div>
      </div>
    </section>
  );
}
