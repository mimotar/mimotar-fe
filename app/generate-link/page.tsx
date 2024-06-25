import { useSearchParams } from "next/navigation";
import Steps from "./components/Steps";
import StepOne from "./components/StepOne";

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
            title="Step 1"
            subtitle="Personal Information "
            stage={params}
          />
          <Steps
            title="Step 2"
            subtitle="Transaction Details "
            stage={params}
          />
          <Steps
            title="Step 3"
            subtitle="Terms and Agreement "
            stage={params}
          />
          <Steps
            title="Step 4"
            subtitle="2nd Transactor's Info "
            stage={params}
          />
        </div>

        <div className="flex flex-col h-full items-center w-full">
          {params == 0 && <StepOne />}
          {params == 1 && "step 2"}
          {params == 2 && "step 3"}
        </div>
        <div className="flex flex-col h-full items-center w-[20%]">
          right content
        </div>
      </div>
      <div className="bg-green-400 flex-shrink-0">Footer</div>
    </section>
  );
}
