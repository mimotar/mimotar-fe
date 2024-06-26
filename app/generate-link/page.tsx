import { useSearchParams } from "next/navigation";
import Steps from "./components/Steps";
import StepTwo from "./components/StepTwo";
import StepOne from "./components/StepOne";
import StepThree from "./components/StepThree";
import StepFour from "./components/StepFour";

export default function page({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | number | string[] | number[] | undefined;
  };
}) {
  const params = searchParams.step ?? 0;
  console.log(params);
  return (
    <section className="flex flex-col h-full w-full">
      <div className="h-full flex justify-between  gap-20">
        <div className="flex flex-col justify-center items-center bg-[#0F172A] text-white px-14 py-14">
          <Steps
            showStroke={true}
            title="Step 1"
            subtitle="Personal Information "
            stage={params}
          />
          <Steps
            showStroke={true}
            title="Step 2"
            subtitle="Transaction Details "
            stage={params}
          />
          <Steps
            showStroke={true}
            title="Step 3"
            subtitle="Terms and Agreement "
            stage={params}
          />
          <Steps
            showStroke={false}
            title="Step 4"
            subtitle="2nd Transactor's Info "
            stage={params}
          />
        </div>

        <div className="flex flex-col h-full items-center w-full">
          {params == 0 && <StepOne />}
          {params == 2 && <StepTwo />}
          {params == 3 && <StepThree />}
          {params == 4 && <StepFour />}
        </div>
        <div className="flex flex-col h-full items-center w-[20%]">
          right content
        </div>
      </div>
      <div className="bg-green-400 flex-shrink-0">Footer</div>
    </section>
  );
}
