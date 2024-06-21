import { useSearchParams } from "next/navigation";
import Steps from "./components/Steps";

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
    <section className="flex flex-col h-full w-full bg-blue-500">
      <div className="h-full flex justify-between">
        <div className="flex flex-col py-10 pr-28 pl-10 bg-[#0F172A] text-white">
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

        <div>middle content</div>
        <div>right content</div>
      </div>
      <div className="bg-green-400 flex-shrink-0">Footer</div>
    </section>
  );
}
