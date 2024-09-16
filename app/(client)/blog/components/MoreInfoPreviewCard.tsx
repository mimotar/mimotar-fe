import { MoreInfoPreviewDataType } from "@/app/types.ts/moreInfoPreviewDataType";

interface MoreInfoPreviewCardProps {
  data: MoreInfoPreviewDataType;
}

export default function MoreInfoPreviewCard({
  data,
}: MoreInfoPreviewCardProps) {
  return (
    <section className="h-[281px] bg-black flex flex-col py-8 px-4 text-white">
      <h1 className="text-xl">{Object.keys(data)}</h1>
      {Object.entries(data).map((item, i) => (
        <ul className="space-y-4 mt-5">
          <li>{item}</li>
          {/* <li>Real Estate</li>
          <li>Online Shopping</li>
          <li>Freelancing</li> */}
        </ul>
      ))}
    </section>
  );
}
