import { useSearchParams } from "next/navigation";
import Stepper from "./components/Stepper";
import StepTwo from "./components/StepTwo";
import StepOne from "./components/StepOne";
import StepThree from "./components/StepThree";
import StepFour from "./components/StepFour";
import StepFive from "./components/StepFive";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { MobileStepper } from "./components/Stepper";
import Footer from "./components/Footer";

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
    <section className="flex flex-col h-screen w-full">
      <div className="h-full flex sm:flex-row flex-col justify-between xl:gap-20 lg:gap-14 md:gap-10 ">
        {/* <div className="w-fit h-full overflow-y-auto"> */}

        <div className="flex flex-row sm:flex-col sm:h-full h-fit sm:w-[413px] w-full overflow-y-auto justify-center items-center xl:pr-14 lg:pr-7 px-4 py-14 bg-[#0F172A] text-white z-0">
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
      <Footer />
    </section>
  );
}
