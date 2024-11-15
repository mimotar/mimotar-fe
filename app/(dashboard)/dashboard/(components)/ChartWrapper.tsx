import { AiOutlineExclamationCircle } from "react-icons/ai";

interface ChartWrapperProps {
  heading: string;
  children: React.ReactNode;
  exclaimTitle: string;
}
export default function ChartWrapper({
  children,
  exclaimTitle,
  heading,
}: ChartWrapperProps) {
  return (
    <div className="w-full flex flex-col rounded-md border p-2 space-y-3">
      <div className="inline-flex gap-2  items-center">
        <h1 className="text-sm font-semibold">{heading}</h1>
        <AiOutlineExclamationCircle
          title={exclaimTitle}
          className="cursor-pointer"
        />
      </div>
      <hr />

      {/* <div className="w-full">
        <Doughnut data={data} options={option} />
      </div> */}

      {children}
    </div>
  );
}
