import { MoreInfoPreviewDataType } from "@/app/types.ts/moreInfoPreviewDataType";

interface MoreInfoPreviewCardProps {
  data: MoreInfoPreviewDataType;
}

export default function MoreInfoPreviewCard({
  data,
}: MoreInfoPreviewCardProps) {
  return (
    <section className="h-[281px] bg-black flex flex-col py-8 px-4 text-white overflow-y-auto">
      {/* Iterate over the dynamic keys in the data object */}
      {Object.keys(data).map((key) => (
        <div key={key}>
          {/* Display the key as the heading */}
          <h1 className="text-xl mb-2">{key}</h1>

          {/* Ensure the value is an array and loop through it */}
          <ul className=" ml-4 space-y-3">
            {(data[key as keyof MoreInfoPreviewDataType] as string[]).map(
              (item: string, index: number) => (
                <li key={index}>{item}</li>
              )
            )}
          </ul>
        </div>
      ))}
    </section>
  );
}
