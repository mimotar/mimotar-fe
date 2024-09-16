import PrimaryButton from "@/app/commons/PrimaryButtons";
import { blogSampleDatasetType } from "@/app/types.ts/blogSampleDataseType";
import React from "react";

interface BlogPreviewCardProps {
  data: blogSampleDatasetType;
}
export default function BlogPreviewCard({ data }: BlogPreviewCardProps) {
  return (
    <div className="grid grid-cols-2 gap-2  h-[268px]">
      <div style={{ backgroundImage: `url(${data.imgUrl})` }}></div>
      <div className="flex flex-col p-2 space-y-4 bg-neutral-50">
        {data.category && <h1 className="text-neutral-900">{data.category}</h1>}
        <h1 className="font-bold text-lg">{data.title}</h1>
        <p className="text-lg">{data.content}</p>

        <PrimaryButton className=" py-1 self-end w-32 h-12 text-sm">
          Read More
        </PrimaryButton>
      </div>
    </div>
  );
}
