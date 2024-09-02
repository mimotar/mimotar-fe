import { GrFormCheckmark } from "react-icons/gr";

interface StepperType {
  showStroke: boolean;
  title: string;
  subtitle: string;
  stage: string | string[] | undefined | number[] | undefined | number;
}
export default function Stepper({
  showStroke,
  title,
  subtitle,
  stage,
}: StepperType) {
  const getStepNumber = (title: string): number => {
    switch (title) {
      case "Step 1":
        return 1;
      case "Step 2":
        return 2;
      case "Step 3":
        return 3;
      case "Step 4":
        return 4;
      default:
        return 0;
    }
  };

  const stepNumber = getStepNumber(title);
  const condition = stage !== undefined && stepNumber < Number(stage);
  return (
    // md:w-[250px] sm:w-[190px]
    <div className="sm:flex hidden flex-col h-full w-full">
      <div className="flex gap-10 justify-between items-center relative">
        <div className="flex flex-col">
          <h3 className="font-bold">{title}</h3>
          <p className="md:text-inherit text-xs">{subtitle}</p>
        </div>

        <div className="flex  flex-col items-center justify-center p-0.5 h-8  w-8 rounded-full bg-white">
          {condition && (
            <GrFormCheckmark className="bg-green-500 rounded-full text-2xl" />
          )}
        </div>
      </div>

      {showStroke && (
        // h-52
        <div className="self-end h-full w-0.5 bg-white -translate-x-4"></div>
      )}
    </div>
  );
}

export function MobileStepper({
  showStroke,
  title,
  subtitle,
  stage,
}: StepperType) {
  const getStepNumber = (title: string): number => {
    switch (title) {
      case "Step 1":
        return 1;
      case "Step 2":
        return 2;
      case "Step 3":
        return 3;
      case "Step 4":
        return 4;
      default:
        return 0;
    }
  };

  const stepNumber = getStepNumber(title);
  const condition = stage !== undefined && stepNumber < Number(stage);
  return (
    <div className="sm:hidden flex h-full flex-col w-full items-center justify-center  ">
      <div className="flex w-full space-x-1 items-center">
        <div className="flex flex-col items-center justify-center p-4 h-fit ml-1 w-fit rounded-full bg-white">
          <GrFormCheckmark
            className={`bg-green-500 rounded-full text-2xl ${
              condition ? "block" : "hidden"
            }`}
          />
        </div>
        <div
          className={` h-0.5 bg-white ${showStroke ? "flex w-full" : "hidden"}`}
        ></div>
      </div>
    </div>
  );
}
