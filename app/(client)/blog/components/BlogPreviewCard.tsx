import PrimaryButton from "@/app/commons/PrimaryButtons";
import { blogSampleDatasetType } from "@/app/types.ts/blogSampleDataseType";
import Image from "next/image";
import React from "react";

interface BlogPreviewCardProps {
  data: blogSampleDatasetType;
}
export default function BlogPreviewCard({ data }: BlogPreviewCardProps) {
  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 gap-2 lg:h-[268px] h-fit">
      <div className="relative block h-[268px]">
        <Image
          src={data.imgUrl}
          alt="blog image"
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col p-2 space-y-4 bg-neutral-50">
        {data.category && <h1 className="text-neutral-900">{data.category}</h1>}
        <h1 className="font-bold text-lg">{data.title}</h1>
        <p className="sm:text-lg">{data.content}</p>

        <PrimaryButton className=" py-1 self-end w-32 h-12 text-sm">
          Read More
        </PrimaryButton>
      </div>
    </div>
  );
}
