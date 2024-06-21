import { GrFormCheckmark } from "react-icons/gr";

interface StepsType {
  title: string;
  subtitle: string;
  stage: string | string[] | undefined | number[] | undefined | number;
}
export default function Steps({ title, subtitle, stage }: StepsType) {
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
    <div className="flex flex-col ">
      <div className="flex gap-10 justify-between items-center relative">
        <div className="flex flex-col ">
          <h3 className="font-bold">{title}</h3>
          <p>{subtitle}</p>
        </div>

        <div className="flex  flex-col items-center justify-center p-0.5 h-8  w-8 rounded-full bg-white">
          {condition && (
            <GrFormCheckmark className="bg-green-500 rounded-full text-2xl" />
          )}
        </div>
      </div>

      <div className="self-end h-52 w-0.5 bg-white -translate-x-4"></div>
    </div>
  );
}
